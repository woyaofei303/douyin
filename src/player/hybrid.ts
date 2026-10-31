import { reactive } from 'vue'
import {
  canHandoff,
  PlaybackGate,
  speeds,
  validateRestore,
  type Danmaku,
  type PlaybackState
} from './model'

type Clip = {
  id: string
  version: string
  title: string
  quality: string
  sources: Record<string, string>
}
type Entry = { video: HTMLVideoElement; clip: Clip }
export type RemoteState = PlaybackState & {
  url: string
  title: string
  quality: string
  qualities: string[]
  ready: boolean
  nativeEligible: boolean
}
type HostMessage = { v: number; session: string; id: string; method: string; data?: unknown }

export const player = reactive({
  connected: false,
  language: 'zh',
  identity: 'guest',
  fullscreen: false,
  pending: false,
  current: null as RemoteState | null,
  error: '',
  notice: '',
  danmaku: true,
  comments: [] as Danmaku[],
  events: [] as string[],
  metrics: {
    startupMs: null as number | null,
    firstFrameKind: '',
    stalls: 0,
    stallMs: 0,
    failures: 0
  }
})
const gate = new PlaybackGate()
const entries = new Map<HTMLVideoElement, Entry>()
let active: Entry | null = null
let session = ''
let hostForeground = true,
  hostSuspended = false,
  routeActive = true
let waitingAt = 0,
  intentAt = 0,
  lastReport = 0
let queue = Promise.resolve()

function send(type: string, data?: unknown, id?: string, error?: string) {
  if (!session) return
  window.VideoLabChannel?.postMessage(JSON.stringify({ v: 2, session, type, data, id, error }))
}
function event(name: string) {
  player.events.unshift(`${new Date().toLocaleTimeString()} ${name}`)
  player.events.splice(40)
}
export function reportPlaybackError(error: unknown) {
  player.error = error instanceof Error ? error.message.slice(0, 100) : 'PLAYBACK_FAILED'
  player.metrics.failures++
  event(player.error)
  publish(true)
}
function endStall(count: boolean) {
  if (waitingAt && count) {
    player.metrics.stalls++
    player.metrics.stallMs += Math.round(performance.now() - waitingAt)
  }
  waitingAt = 0
}
function snapshot(): RemoteState | null {
  if (!active) return null
  const { video, clip } = active
  const url = video.currentSrc || clip.sources[clip.quality] || ''
  const nativeEligible = canHandoff(url, location.origin)
  return {
    videoId: clip.id,
    sourceVersion: clip.version,
    title: clip.title,
    url: nativeEligible ? url : '',
    nativeEligible,
    quality: clip.quality,
    qualities: Object.keys(clip.sources),
    ready: video.readyState >= 1,
    position: Number.isFinite(video.currentTime) ? video.currentTime : 0,
    duration: Number.isFinite(video.duration) ? video.duration : 0,
    speed: video.playbackRate,
    muted: video.muted,
    playing: !video.paused
  }
}
function publish(force = false) {
  player.current = snapshot()
  const now = performance.now()
  if (force || now - lastReport >= 500) {
    lastReport = now
    send('state', {
      media: player.current,
      metrics: { ...player.metrics },
      error: player.error,
      language: player.language,
      identity: player.identity
    })
  }
}
function updatePermission() {
  gate.setAllowed(hostForeground && !hostSuspended && !document.hidden && routeActive)
  publish(true)
}
export function setPageActive(value: boolean) {
  routeActive = value
  updatePermission()
}
function readComments(id: string): Danmaku[] {
  try {
    const rows: unknown = JSON.parse(localStorage.getItem(`video-lab:${id}`) || '[]')
    return Array.isArray(rows)
      ? rows
          .filter(
            (r): r is Danmaku =>
              r &&
              typeof r.id === 'string' &&
              typeof r.text === 'string' &&
              r.text.length <= 80 &&
              typeof r.time === 'number' &&
              Number.isFinite(r.time) &&
              r.time >= 0
          )
          .slice(-100)
      : []
  } catch {
    return []
  }
}
export function addComment(text: string) {
  if (!active || !text.trim() || text.length > 80) throw new Error('INVALID_COMMENT')
  const rows = [
    ...player.comments,
    { id: crypto.randomUUID(), time: active.video.currentTime, text: text.trim() }
  ].slice(-100)
  // Update the UI only after storage succeeds; a failed write leaves the draft intact.
  localStorage.setItem(`video-lab:${active.clip.id}`, JSON.stringify(rows))
  player.comments = rows
}
function select(entry: Entry) {
  gate.select(entry.video)
  if (active !== entry) {
    active = entry
    endStall(false)
    intentAt = 0
    player.error = ''
    player.comments = readComments(entry.clip.id)
    Object.assign(player.metrics, {
      startupMs: null,
      firstFrameKind: '',
      stalls: 0,
      stallMs: 0,
      failures: 0
    })
    event(`video ${entry.clip.id}`)
  }
  publish(true)
}
export async function playVideo(video: HTMLVideoElement) {
  const entry = entries.get(video)
  if (!entry) return
  select(entry)
  if (!gate.allowed) return
  if (!intentAt && player.metrics.startupMs === null) intentAt = performance.now()
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    await Promise.race([
      gate.play(video),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error('PLAY_TIMEOUT')), 8000)
      })
    ])
  } catch (error) {
    if (active !== entry) return
    gate.pause()
    throw error instanceof DOMException ? new Error(error.name) : error
  } finally {
    clearTimeout(timer)
  }
}
export function pauseVideo(video: HTMLVideoElement) {
  if (gate.active === video) gate.pause()
  else video.pause()
  publish(true)
}

export function registerVideo(
  video: HTMLVideoElement,
  item: {
    aweme_id: string
    desc?: string
    lab?: boolean
    video: { ratio?: string; play_addr: { uri?: string; url_list: string[] } }
  }
) {
  const quality = item.lab ? '720p' : item.video.ratio || '原片'
  const clip: Clip = {
    id: String(item.aweme_id),
    version: item.lab ? 'lab-v1' : String(item.video.play_addr.uri || item.aweme_id),
    title: (item.desc || '').slice(0, 160),
    quality,
    sources: item.lab
      ? {
          '360p': `${location.origin}/lab-media/demo-360.mp4`,
          '720p': `${location.origin}/lab-media/demo-720.mp4`
        }
      : { [quality]: item.video.play_addr.url_list[0] }
  }
  const entry = { video, clip }
  entries.set(video, entry)
  video.dataset.videoId = clip.id
  const handlers = new Map<string, EventListener>()
  for (const name of [
    'play',
    'pause',
    'playing',
    'waiting',
    'seeking',
    'seeked',
    'loadedmetadata',
    'timeupdate',
    'ratechange',
    'volumechange',
    'error'
  ]) {
    const callback = () => {
      if (name === 'play' && (gate.active !== video || !gate.allowed)) {
        video.pause()
        return
      }
      if (active !== entry) return
      if (name === 'waiting' && !video.paused && !video.seeking && !waitingAt)
        waitingAt = performance.now()
      if (name === 'pause' || name === 'seeking') endStall(false)
      if (name === 'playing') {
        endStall(true)
        const recordFrame = (kind: string) => {
          if (active !== entry || !intentAt || player.metrics.startupMs !== null || video.paused)
            return
          player.metrics.startupMs = Math.round(performance.now() - intentAt)
          player.metrics.firstFrameKind = kind
          publish(true)
        }
        if (typeof video.requestVideoFrameCallback === 'function')
          video.requestVideoFrameCallback(() => recordFrame('video-frame'))
        else recordFrame('playing-proxy')
      }
      if (name === 'error') reportPlaybackError(new Error(`MEDIA_ERROR_${video.error?.code || 0}`))
      publish(name !== 'timeupdate')
    }
    handlers.set(name, callback)
    video.addEventListener(name, callback)
  }
  return () => {
    pauseVideo(video)
    for (const [name, callback] of handlers) video.removeEventListener(name, callback)
    entries.delete(video)
    video.removeAttribute('src')
    video.querySelectorAll('source').forEach((source) => source.removeAttribute('src'))
    video.load()
    if (active === entry) {
      active = null
      gate.active = null
      publish(true)
    }
  }
}

function loadMedia(video: HTMLVideoElement, url: string) {
  return new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      clearTimeout(timer)
      video.removeEventListener('loadedmetadata', loaded)
      video.removeEventListener('error', error)
    }
    const loaded = () => {
      cleanup()
      resolve()
    }
    const error = () => {
      cleanup()
      reject(new Error('MEDIA_LOAD_FAILED'))
    }
    const timer = setTimeout(() => {
      cleanup()
      reject(new Error('MEDIA_LOAD_TIMEOUT'))
    }, 12000)
    video.addEventListener('loadedmetadata', loaded)
    video.addEventListener('error', error)
    video.src = url
    video.load()
  })
}
async function changeQuality(entry: Entry, quality: string) {
  if (!(quality in entry.clip.sources)) throw new Error('INVALID_QUALITY')
  if (entry.clip.quality === quality) return
  const state = snapshot()!,
    oldQuality = entry.clip.quality
  gate.pause()
  const restore = () => {
    if (active !== entry) throw new Error('VIDEO_CHANGED')
    entry.video.currentTime = Math.min(state.position, entry.video.duration)
    entry.video.playbackRate = state.speed
    entry.video.muted = state.muted
  }
  try {
    await loadMedia(entry.video, entry.clip.sources[quality])
    restore()
    entry.clip.quality = quality
    if (state.playing && gate.allowed) await playVideo(entry.video)
  } catch (error) {
    if (active === entry) {
      entry.clip.quality = oldQuality
      await loadMedia(entry.video, entry.clip.sources[oldQuality])
      restore()
      publish(true)
    }
    throw error
  }
}

export async function command(method: string, data?: unknown) {
  player.error = ''
  if (method === 'identity') {
    if (data !== 'guest' && data !== 'learner') throw new Error('INVALID_IDENTITY')
    player.identity = data
  } else if (method === 'language') {
    if (data !== 'zh' && data !== 'en') throw new Error('INVALID_LANGUAGE')
    player.language = data
  } else if (method === 'foreground' || method === 'suspend') {
    if (typeof data !== 'boolean') throw new Error('INVALID_BOOLEAN')
    if (method === 'foreground') hostForeground = data
    else hostSuspended = data
    updatePermission()
  } else if (method === 'fullscreen') {
    if (typeof data !== 'boolean') throw new Error('INVALID_BOOLEAN')
    player.fullscreen = data
    document.documentElement.classList.toggle('lab-fullscreen', data)
  } else if (method !== 'state') {
    const entry = active
    if (!entry || entry.video.readyState < 1) throw new Error('MEDIA_NOT_READY')
    const video = entry.video
    if (method === 'freeze') {
      const state = snapshot()
      gate.pause()
      publish(true)
      return state
    }
    if (method === 'pause') gate.pause()
    else if (method === 'play') await playVideo(video)
    else if (method === 'seek') {
      if (typeof data !== 'number' || !Number.isFinite(data) || data < 0)
        throw new Error('INVALID_POSITION')
      video.currentTime = Math.min(data, video.duration)
    } else if (method === 'speed') {
      if (typeof data !== 'number' || !speeds.includes(data)) throw new Error('INVALID_SPEED')
      video.playbackRate = data
    } else if (method === 'mute') {
      if (typeof data !== 'boolean') throw new Error('INVALID_BOOLEAN')
      video.muted = data
    } else if (method === 'quality') {
      if (typeof data !== 'string') throw new Error('INVALID_QUALITY')
      await changeQuality(entry, data)
    } else if (method === 'restore') {
      const state = validateRestore(data, snapshot()!)
      gate.pause()
      video.currentTime = state.position
      video.playbackRate = state.speed
      video.muted = state.muted
    } else throw new Error('UNKNOWN_METHOD')
  }
  publish(true)
  return snapshot()
}
export async function act(method: string, data?: unknown) {
  if (player.pending) return
  player.pending = true
  try {
    await command(method, data)
  } catch (error) {
    reportPlaybackError(error)
  } finally {
    player.pending = false
  }
}
export function requestNative() {
  if (player.current?.nativeEligible && player.connected) send('handoff')
}
export function requestPractice() {
  if (player.connected) send('practice')
  else location.assign('/home?lab=1')
}
export async function requestFullscreen() {
  if (player.connected) send('fullscreen', !player.fullscreen)
  else {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await document.documentElement.requestFullscreen()
    } catch {
      reportPlaybackError(new Error('FULLSCREEN_UNAVAILABLE'))
    }
  }
}

window.VideoLabRemote = {
  connect(value: string) {
    if (!/^[A-Za-z0-9_-]{20,100}$/.test(value) || !window.VideoLabChannel) return
    session = value
    player.connected = true
    document.documentElement.classList.add('lab-host')
    send('ready', { protocol: 2 })
    publish(true)
  },
  receive(raw: unknown) {
    if (!raw || typeof raw !== 'object' || JSON.stringify(raw).length > 16384) return
    const message = raw as HostMessage
    if (
      message.v !== 2 ||
      message.session !== session ||
      !session ||
      typeof message.id !== 'string' ||
      message.id.length > 80
    )
      return
    // Background suspension must pause immediately, even while a previous command is waiting.
    if (
      (message.method === 'foreground' && message.data === false) ||
      (message.method === 'suspend' && message.data === true)
    ) {
      void command(message.method, message.data)
    }
    const currentSession = session
    queue = queue.then(async () => {
      if (currentSession !== session) return
      try {
        const data = await command(message.method, message.data)
        if (currentSession === session) send('reply', data, message.id)
      } catch (error) {
        if (currentSession === session)
          send(
            'reply',
            undefined,
            message.id,
            error instanceof Error ? error.message : 'COMMAND_FAILED'
          )
      }
    })
  }
}
window.dispatchEvent(new Event('video-lab-ready'))
window.addEventListener('pagehide', () => {
  hostForeground = false
  updatePermission()
})
document.addEventListener('visibilitychange', updatePermission)
document.addEventListener('fullscreenchange', () => {
  player.fullscreen = !!document.fullscreenElement
  document.documentElement.classList.toggle('lab-fullscreen', player.fullscreen)
})

declare global {
  interface Window {
    VideoLabChannel?: { postMessage(value: string): void }
    VideoLabRemote?: { connect(session: string): void; receive(raw: unknown): void }
  }
}

export type PlaybackState = {
  videoId: string
  sourceVersion: string
  position: number
  duration: number
  speed: number
  muted: boolean
  playing: boolean
}

export const speeds = [0.5, 1, 1.5, 2]

export function canHandoff(raw: string, origin: string): boolean {
  try {
    const url = new URL(raw)
    return (
      url.origin === origin &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash &&
      /^\/lab-media\/demo-(360|720)\.mp4$/.test(url.pathname)
    )
  } catch {
    return false
  }
}

export function validateRestore(raw: unknown, current: PlaybackState): PlaybackState {
  if (!raw || typeof raw !== 'object') throw new Error('INVALID_STATE')
  const data = raw as PlaybackState
  if (data.videoId !== current.videoId || data.sourceVersion !== current.sourceVersion)
    throw new Error('VIDEO_CHANGED')
  if (
    typeof data.position !== 'number' ||
    !Number.isFinite(data.position) ||
    data.position < 0 ||
    !speeds.includes(data.speed) ||
    typeof data.muted !== 'boolean' ||
    typeof data.playing !== 'boolean'
  )
    throw new Error('INVALID_STATE')
  return {
    ...current,
    position: Math.min(data.position, current.duration),
    speed: data.speed,
    muted: data.muted,
    playing: false
  }
}

type Media = { play(): Promise<void>; pause(): void }

export class PlaybackGate {
  active: Media | null = null
  allowed = true
  private generation = 0

  select(media: Media) {
    if (this.active === media) return
    this.pause()
    this.active = media
  }

  pause() {
    this.generation++
    this.active?.pause()
  }

  setAllowed(value: boolean) {
    this.allowed = value
    if (!value) this.pause()
  }

  async play(media: Media) {
    this.select(media)
    if (!this.allowed) return
    const generation = ++this.generation
    await media.play()
    // A delayed play promise must not revive a video that lost playback ownership.
    if (this.active !== media || !this.allowed || this.generation !== generation) media.pause()
  }
}

export type Danmaku = { id: string; time: number; text: string }

export function visibleDanmaku(rows: Danmaku[], time: number): Danmaku[] {
  return rows.filter((row) => row.time <= time && time - row.time < 5).slice(-3)
}

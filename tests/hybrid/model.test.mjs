import test from 'node:test'
import assert from 'node:assert/strict'
import {
  PlaybackGate,
  canHandoff,
  validateRestore,
  visibleDanmaku
} from '../../src/player/model.ts'

const origin = 'https://dy.fameex-testnet.xyz'
const state = {
  videoId: 'demo-1',
  sourceVersion: 'demo-v1',
  position: 8,
  duration: 20,
  speed: 1.5,
  muted: true,
  playing: false
}

test('原生接力只接受精确同站自制素材，不信任伪造域名、端口、凭据和签名外链', () => {
  assert.equal(canHandoff(`${origin}/lab-media/demo-720.mp4`, origin), true)
  for (const url of [
    `${origin}.evil.test/lab-media/demo-720.mp4`,
    `${origin}:444/lab-media/demo-720.mp4`,
    `${origin}/lab-media/demo-720.mp4?token=x`,
    'https://user:pass@dy.fameex-testnet.xyz/lab-media/demo-720.mp4',
    'https://www.douyin.com/aweme/v1/play/',
    'file:///etc/passwd'
  ])
    assert.equal(canHandoff(url, origin), false)
})

test('恢复必须匹配视频与媒体版本，校验有限数字并限制到当前时长', () => {
  assert.equal(validateRestore({ ...state, position: 30 }, state).position, 20)
  for (const bad of [
    { ...state, videoId: 'demo-2' },
    { ...state, sourceVersion: 'other' },
    { ...state, position: NaN },
    { ...state, speed: 99 },
    { ...state, muted: 'true' }
  ])
    assert.throws(() => validateRestore(bad, state))
})

test('迟到的 play 不能在切换或后台暂停后重启旧视频', async () => {
  let finish
  const old = {
    paused: true,
    pause() {
      this.paused = true
    },
    play() {
      this.paused = false
      return new Promise((resolve) => {
        finish = resolve
      })
    }
  }
  const next = {
    paused: true,
    pause() {
      this.paused = true
    },
    async play() {
      this.paused = false
    }
  }
  const gate = new PlaybackGate()
  const pending = gate.play(old)
  await gate.play(next)
  assert.equal(old.paused, true)
  finish()
  await pending
  assert.equal(old.paused, true)
  assert.equal(next.paused, false)
  gate.setAllowed(false)
  await gate.play(next)
  assert.equal(next.paused, true)
  gate.setAllowed(true)
  assert.equal(next.paused, true)
})

test('弹幕按媒体时间取值，seek 后重算且轨道数量有上限', () => {
  const rows = [0, 1, 2, 3, 4, 8].map((time, id) => ({ id: String(id), time, text: `弹幕${id}` }))
  assert.equal(visibleDanmaku(rows, 4).length, 3)
  assert.equal(visibleDanmaku(rows, 0)[0].id, '0')
  assert.equal(visibleDanmaku(rows, 20).length, 0)
})

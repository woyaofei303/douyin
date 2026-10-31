import { expect, test } from '@playwright/test'

// Exercise the real recommendation page and real MP4s; only the native transport is simulated.
test.use({
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148'
})
const session = 'test_session_12345678901234'
test.beforeEach(async ({ page }) => {
  await page.route('**/*', (route) => {
    const request = route.request()
    return !['127.0.0.1', 'localhost'].includes(new URL(request.url()).hostname) &&
      ['image', 'media'].includes(request.resourceType())
      ? route.abort()
      : route.continue()
  })
  await page.goto('/home?lab=1')
  await page.getByRole('button', { name: '播放工具', exact: true }).click()
  await expect(page.getByRole('slider', { name: '播放进度' })).toBeEnabled()
})

test('暂停、8 秒、1.5 倍速、清晰度与本地弹幕按真实 video 状态保留', async ({ page }) => {
  if (await page.getByRole('button', { name: '暂停', exact: true }).isVisible())
    await page.getByRole('button', { name: '暂停', exact: true }).click()
  await page.getByRole('combobox', { name: '倍速' }).selectOption('1.5')
  await page.getByRole('slider', { name: '播放进度' }).fill('8')
  await page.getByRole('combobox', { name: '清晰度' }).selectOption('360p')
  const video = page.locator('video[data-video-id="lab-1"]')
  await expect
    .poll(() =>
      video.evaluate((v: HTMLVideoElement) => ({
        paused: v.paused,
        time: Math.round(v.currentTime),
        speed: v.playbackRate,
        quality: new URL(v.currentSrc).pathname
      }))
    )
    .toEqual({ paused: true, time: 8, speed: 1.5, quality: '/lab-media/demo-360.mp4' })
  await page.getByRole('textbox', { name: '弹幕内容' }).fill('第八秒的回归测试')
  await page.getByRole('button', { name: '发送', exact: true }).click()
  await expect(
    page.getByRole('listitem').filter({ hasText: '8.0s · 第八秒的回归测试' })
  ).toBeVisible()
  const navigation = await page.evaluate(() => performance.timeOrigin)
  await page.setViewportSize({ width: 812, height: 375 })
  expect(await page.evaluate(() => performance.timeOrigin)).toBe(navigation)
  expect(await video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeCloseTo(8)
})

test('清晰度加载失败回到原片并保留位置，明确显示失败', async ({ page }) => {
  if (await page.getByRole('button', { name: '暂停', exact: true }).isVisible())
    await page.getByRole('button', { name: '暂停', exact: true }).click()
  await page.getByRole('slider', { name: '播放进度' }).fill('8')
  await page.route('**/lab-media/demo-360.mp4', (route) => route.abort())
  await page.getByRole('combobox', { name: '清晰度' }).selectOption('360p')
  await expect(page.getByRole('alert')).toContainText('MEDIA_LOAD_FAILED')
  await expect(page.getByRole('combobox', { name: '清晰度' })).toHaveValue('720p')
  await expect
    .poll(() =>
      page
        .locator('video[data-video-id="lab-1"]')
        .evaluate((v: HTMLVideoElement) => ({ paused: v.paused, time: Math.round(v.currentTime) }))
    )
    .toEqual({ paused: true, time: 8 })
})

test('宿主握手、身份和暂停恢复，拒绝跨视频恢复及 App 内未接入路由', async ({ page }) => {
  await page.addInitScript((session) => {
    const replies: unknown[] = []
    Object.assign(window, { testReplies: replies })
    window.VideoLabChannel = { postMessage: (value) => replies.push(JSON.parse(value)) }
    window.addEventListener('video-lab-ready', () => window.VideoLabRemote!.connect(session), {
      once: true
    })
  }, session)
  await page.reload()
  await page.getByRole('button', { name: '播放工具', exact: true }).click()
  await expect(page.getByRole('slider', { name: '播放进度' })).toBeEnabled()
  const request = async (method: string, data?: unknown) => {
    const id = `${method}-${Date.now()}`
    await page.evaluate(
      ({ session, id, method, data }) => {
        window.VideoLabRemote!.receive({ v: 2, session, id, method, data })
      },
      { session, id, method, data }
    )
    await expect
      .poll(() =>
        page.evaluate(
          (id) =>
            (window as unknown as { testReplies: { id?: string }[] }).testReplies.some(
              (r) => r.id === id
            ),
          id
        )
      )
      .toBe(true)
    return page.evaluate(
      (id) =>
        (
          window as unknown as {
            testReplies: { id?: string; error?: string; data: Record<string, unknown> }[]
          }
        ).testReplies.find((r) => r.id === id)!,
      id
    )
  }
  await request('identity', 'learner')
  await expect(page.getByText('演示身份：learner', { exact: false })).toBeVisible()
  await request('pause')
  await request('seek', 8)
  await request('speed', 1.5)
  const frozen = (await request('freeze')).data
  expect(frozen.videoId).toBe('lab-1')
  await request('suspend', true)
  await request('play')
  expect(
    await page.locator('video[data-video-id="lab-1"]').evaluate((v: HTMLVideoElement) => v.paused)
  ).toBe(true)
  expect((await request('restore', { ...frozen, videoId: 'lab-2' })).error).toBe('VIDEO_CHANGED')
  expect((await request('restore', { ...frozen, position: 12 })).error).toBeUndefined()
  await request('suspend', false)
  expect(
    await page
      .locator('video[data-video-id="lab-1"]')
      .evaluate((v: HTMLVideoElement) => v.currentTime)
  ).toBeCloseTo(12)
  await page.getByRole('button', { name: '播放工具', exact: true }).click()
  await page.getByText('我', { exact: true }).click()
  await expect(page).toHaveURL(/\/home\?lab=1$/)
  await page.getByRole('button', { name: '播放工具', exact: true }).click()
  await expect(page.getByRole('alert')).toContainText('此页面暂不支持在 App 中打开')
})

test('推荐流换项先停止旧视频，旋转后当前项不变', async ({ page }) => {
  await page.getByRole('button', { name: '播放工具', exact: true }).click()
  await page.mouse.move(140, 550)
  await page.mouse.down()
  await page.mouse.move(140, 230, { steps: 12 })
  await page.mouse.up()
  await page.getByRole('button', { name: '播放工具', exact: true }).click()
  await expect(page.getByText('当前视频 · lab-2', { exact: true })).toBeVisible()
  await expect
    .poll(() =>
      page
        .locator('video[data-video-id]')
        .evaluateAll((videos: HTMLVideoElement[]) =>
          videos.filter((v) => !v.paused).map((v) => v.dataset.videoId)
        )
    )
    .toEqual(['lab-2'])
  await page.getByRole('button', { name: '暂停', exact: true }).click()
  const navigation = await page.evaluate(() => performance.timeOrigin)
  await page.setViewportSize({ width: 812, height: 375 })
  await expect(page.getByText('当前视频 · lab-2', { exact: true })).toBeVisible()
  expect(await page.evaluate(() => performance.timeOrigin)).toBe(navigation)
  expect(
    await page.locator('video[data-video-id="lab-2"]').evaluate((v: HTMLVideoElement) => v.paused)
  ).toBe(true)
})

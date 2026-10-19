import { expect, test } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'vue/compiler-sfc'

const files = (dir: string): string[] =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory() ? files(path.join(dir, entry.name)) : [path.join(dir, entry.name)]
    )

test('源码只保留原子类、基础 CSS、动画和必要动态样式', () => {
  for (const file of files('src').filter((file) => /\.(vue|js|ts|tsx)$/.test(file))) {
    const source = fs.readFileSync(file, 'utf8')
    expect(source, file).not.toMatch(/\btw:|@apply\b|(?:import|require)[^\n]*\.less/)
    expect(source, file).not.toMatch(/\[[^\]\s"'<>]*\.[A-Za-z][^\]\s"'<>]*&|\[&\.[A-Za-z]/)
    if (!file.endsWith('.vue')) continue
    const { descriptor, errors } = parse(source, { filename: file })
    expect(errors, file).toEqual([])
    expect(descriptor.styles, file).toEqual([])
    const visit = (node: { props?: { type: number; name: string }[]; children?: unknown[] }) => {
      for (const prop of node.props || [])
        expect(prop.type === 6 && prop.name === 'style', file).toBe(false)
      for (const child of node.children || []) visit(child as typeof node)
    }
    if (descriptor.template?.ast) visit(descriptor.template.ast)
  }
  expect(files('src').filter((file) => file.endsWith('.less'))).toEqual([])
})

test.beforeEach(async ({ page }, info) => {
  if (info.title.startsWith('源码')) return
  await page.route('**/*', (route) => {
    const url = new URL(route.request().url())
    return !['127.0.0.1', 'localhost'].includes(url.hostname) &&
      ['image', 'media'].includes(route.request().resourceType())
      ? route.abort()
      : route.continue()
  })
  await page.goto('/tests/style-fixture.html', { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => '__styleFixture' in window)
})

test('按钮大小、禁用和加载状态', async ({ page }) => {
  const button = page.getByTestId('button')
  await expect(button).toHaveCSS('height', '40px')
  await button.click()
  expect(await page.evaluate(() => window.__styleFixture.state.clicks)).toBe(1)
  await page.evaluate(() =>
    Object.assign(window.__styleFixture.state.button, { size: 'small', disabled: true })
  )
  await expect(button).toHaveCSS('height', '26px')
  await expect(button).toHaveCSS('width', '62px')
  await expect(button).toHaveCSS('background-color', 'rgb(220, 220, 220)')
  await button.click()
  expect(await page.evaluate(() => window.__styleFixture.state.clicks)).toBe(1)
  await page.evaluate(() =>
    Object.assign(window.__styleFixture.state.button, { disabled: false, loading: true })
  )
  await expect(button.locator('img')).toBeVisible()
  await button.click()
  expect(await page.evaluate(() => window.__styleFixture.state.clicks)).toBe(1)
})

test('开关主题、尺寸、禁用和键盘状态', async ({ page }) => {
  const control = page.getByTestId('switch'),
    track = control.locator('div'),
    input = control.locator('input')
  for (const [theme, color, off, on] of [
    ['default', 'blue', 'rgb(192, 218, 229)', 'rgb(119, 176, 200)'],
    ['bulma', 'primary', 'rgb(107, 255, 233)', 'rgb(5, 255, 218)'],
    ['bootstrap', 'success', 'rgb(199, 230, 199)', 'rgb(128, 199, 128)']
  ]) {
    await page.evaluate(
      ({ theme, color }) =>
        Object.assign(window.__styleFixture.state.switch, { theme, color, modelValue: false }),
      { theme, color }
    )
    await expect(track).toHaveCSS('background-color', off)
    await input.focus()
    await page.keyboard.press('Space')
    await expect(input).toBeChecked()
    await expect(track).toHaveCSS('background-color', on)
  }
  await page.evaluate(() =>
    Object.assign(window.__styleFixture.state.switch, { typeBold: true, disabled: true })
  )
  await expect(track).toHaveCSS('height', '26px')
  await expect(track).toHaveCSS('width', '51px')
  await expect(track).toHaveCSS('opacity', '0.3')
  await expect(input).toBeDisabled()
})

test('日期选择器显示、重建和确认', async ({ page }) => {
  await page.locator('#picker-trigger').click()
  const popup = page.locator('[data-picker-part="content"]').first()
  await expect(popup).toBeVisible()
  await expect(popup).toHaveCSS('bottom', '0px')
  await expect(popup.locator('li').first()).toHaveCSS('height', '40px')
  await page.evaluate(() => {
    const picker = window.__styleFixture.picker
    picker.updateWheel(0, ['四月', '五月', '六月'])
    picker.locatePosition(0, 1)
  })
  await expect(popup.locator('li').first()).toHaveText('四月')
  await expect(popup.locator('li').first()).toHaveCSS('height', '40px')
  await page.locator('[data-picker-part="ensure"]').first().click()
  await expect(page.locator('#picker-trigger')).toHaveText('五月')
  await expect(popup).toBeHidden()
})

test('底部弹窗遮罩和滚动恢复', async ({ page }) => {
  await page.evaluate(() => {
    document.documentElement.style.overflow = 'auto'
    document.documentElement.style.height = 'auto'
    document.body.style.height = '2000px'
    window.scrollTo(0, 100)
  })
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(100)
  await page.evaluate(() => (window.__styleFixture.state.dialog = true))
  await expect(page.locator('body')).toHaveCSS('position', 'fixed')
  await expect(page.getByText('弹窗正文')).toBeVisible()
  await page.waitForTimeout(300)
  await page.locator('[data-dialog-mask]').click({ position: { x: 20, y: 20 } })
  await expect(page.getByText('弹窗正文')).toBeHidden()
  await expect(page.locator('[data-dialog-mask]')).toHaveCount(0)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(100)
})

async function drag(page, locator, from: [number, number], to: [number, number]) {
  const box = await locator.boundingBox()
  await page.mouse.move(box.x + from[0], box.y + from[1])
  await page.mouse.down()
  await page.mouse.move(box.x + to[0], box.y + to[1], { steps: 8 })
  await page.mouse.up()
}

test('横向滑动切页与边界回弹', async ({ page }) => {
  const slider = page.getByTestId('horizontal')
  await drag(page, slider, [260, 80], [30, 80])
  await expect.poll(() => page.evaluate(() => window.__styleFixture.state.horizontalIndex)).toBe(1)
  await drag(page, slider, [30, 80], [260, 80])
  await expect.poll(() => page.evaluate(() => window.__styleFixture.state.horizontalIndex)).toBe(0)
  await drag(page, slider, [30, 80], [260, 80])
  await expect.poll(() => page.evaluate(() => window.__styleFixture.state.horizontalIndex)).toBe(0)
})

test('纵向虚拟列表生成节点与滑动切页', async ({ page }) => {
  const slider = page.getByTestId('vertical')
  await expect(slider.locator('[data-slide-item]').first()).toHaveCSS('height', '300px')
  await drag(page, slider, [150, 250], [150, 30])
  await expect.poll(() => page.evaluate(() => window.__styleFixture.state.verticalIndex)).toBe(1)
  await expect(slider.locator('[data-slide-item]').first()).toHaveCSS('flex-shrink', '0')
})

test('聊天长按菜单不依赖完整 class 字符串', async ({ page }) => {
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = () => Promise.resolve()
  })
  await page.goto('/home', { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => document.getElementById('app')?.__vue_app__)
  await page.evaluate(() =>
    document.getElementById('app').__vue_app__.config.globalProperties.$router.push('/message/chat')
  )
  const message = page.locator('[data-chat-message]').first()
  await expect(message).toBeVisible()
  await message.evaluate((element) => {
    const event = new Event('touchstart', { bubbles: true, cancelable: true })
    Object.defineProperty(event, 'touches', {
      value: [{ pageX: 100, pageY: 140, clientX: 100, clientY: 140 }]
    })
    element.dispatchEvent(event)
  })
  await expect(page.getByText('删除', { exact: true }).first()).toBeVisible()
  await message.dispatchEvent('touchend')
})

test('深色按钮无边框时保留文字颜色', async ({ page }) => {
  await page.evaluate(() =>
    Object.assign(window.__styleFixture.state.button, { type: 'dark', border: false })
  )
  await expect(page.getByTestId('button')).toHaveCSS('color', 'rgb(186, 186, 187)')
})

test('浅灰色弹窗遮罩保留透明度', async ({ page }) => {
  await page.evaluate(() =>
    Object.assign(window.__styleFixture.state, { dialogMaskMode: 'lightgray', dialog: true })
  )
  await expect(page.locator('[data-dialog-mask]')).toHaveCSS(
    'background-color',
    'rgba(0, 0, 0, 0.25)'
  )
})

test('加载指示器服从运行时透明度', async ({ page }) => {
  const loading = page.getByTestId('refresh').locator(':scope > div').last()
  await expect(loading).toHaveCSS('opacity', '0')
  await page.evaluate(() => (window.__styleFixture.state.refreshing = true))
  await expect(loading).toHaveCSS('opacity', '1')
  await page.evaluate(() => (window.__styleFixture.state.refreshing = false))
  await expect(loading).toHaveCSS('opacity', '0')
})

test('级联选择器在增减列后保持定位和确认', async ({ page }) => {
  await page.locator('#cascade-trigger').click()
  const wheels = page
    .locator('[data-picker-part="wheels"]')
    .last()
    .locator('[data-picker-part="wheel"]')
  await expect(wheels).toHaveCount(2)
  expect(await page.evaluate(() => window.__styleFixture.cascadePicker.getIndexArr())).toEqual([
    0, 0
  ])
  await page.evaluate(() =>
    window.__styleFixture.cascadePicker.updateWheels([
      { id: 3, value: '丙', childs: [{ id: 4, value: '丁', childs: [{ id: 5, value: '戊' }] }] }
    ])
  )
  await expect(wheels).toHaveCount(3)
  expect(await page.evaluate(() => window.__styleFixture.cascadePicker.getIndexArr())).toEqual([
    0, 0, 0
  ])
  await page.evaluate(() =>
    window.__styleFixture.cascadePicker.updateWheels([{ id: 6, value: '己' }])
  )
  await expect(wheels).toHaveCount(1)
  await page.evaluate(() =>
    window.__styleFixture.cascadePicker.updateWheels([
      { id: 7, value: '庚', childs: [{ id: 8, value: '辛' }] }
    ])
  )
  await expect(wheels).toHaveCount(2)
  await page.locator('[data-picker-part="ensure"]').last().click()
  await expect(page.locator('#cascade-trigger')).toHaveText('庚 辛')
})

test('热榜选中项使用渐变文字，切换后恢复普通文字', async ({ page }) => {
  await page.goto('/home', { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => document.getElementById('app')?.__vue_app__)
  await page.evaluate(() =>
    document.getElementById('app').__vue_app__.config.globalProperties.$router.push('/home/search')
  )
  const hot = page.getByText('抖音热榜', { exact: true })
  await expect(hot).toHaveCSS('background-clip', 'text')
  await expect(hot).toHaveCSS('color', 'rgba(0, 0, 0, 0)')
  await page.getByText('直播榜', { exact: true }).click()
  await expect(hot).toHaveCSS('color', 'rgb(186, 186, 187)')
  await hot.click()
  await expect(hot).toHaveCSS('background-clip', 'text')
})

test('未注册路由的协议页通过夹具保留文字与强调样式', async ({ page }) => {
  await page.evaluate(async () => {
    const fixture = window.__styleFixture
    await fixture.router.push({ path: '/', query: { type: '“抖音”隐私政策' } })
    fixture.state.protocol = '“抖音”隐私政策'
  })
  const protocol = page.getByTestId('protocol')
  await expect(protocol.getByText('“抖音”隐私政策', { exact: true })).toBeVisible()
  const date = protocol.getByText('更新日期：2021年7月13日', { exact: true })
  await expect(date).toHaveCSS('font-size', '14px')
  await expect(date).toHaveCSS('font-weight', '700')
  await expect(date).toHaveCSS('font-family', 'SimSuncss')
  await expect(protocol).toHaveCSS('overflow-y', 'auto')
})

test('联系人字母索引通过原子类切换选中颜色', async ({ page }) => {
  await page.goto('/home', { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => document.getElementById('app')?.__vue_app__)
  await page.evaluate(() =>
    document
      .getElementById('app')
      .__vue_app__.config.globalProperties.$router.push('/message/share-to-friend')
  )
  const items = page.locator('[data-contact-item]')
  await expect(items).toHaveCount(27)
  await page.locator('[data-contact-indicator]').evaluate((element) => {
    const first = element.querySelector('[data-contact-item]')
    const event = new Event('touchstart', { bubbles: true })
    Object.defineProperty(event, 'touches', {
      value: [{ pageY: element.offsetTop + first.clientHeight / 2 }]
    })
    element.dispatchEvent(event)
  })
  await expect(items.nth(0)).toHaveCSS('color', 'rgb(255, 255, 255)')
  await expect(items.nth(1)).toHaveCSS('color', 'rgb(143, 143, 158)')
})

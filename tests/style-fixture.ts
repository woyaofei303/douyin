import { createApp, h, nextTick, reactive } from 'vue'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import '../src/assets/styles/tailwind.css'
import BaseButton from '../src/components/BaseButton.vue'
import Switches from '../src/pages/message/components/swtich/switches.vue'
import FromBottomDialog from '../src/components/dialog/FromBottomDialog.vue'
import SlideHorizontal from '../src/components/slide/SlideHorizontal.vue'
import SlideVerticalInfinite from '../src/components/slide/SlideVerticalInfinite.vue'
import SlideItem from '../src/components/slide/SlideItem.vue'
import ServiceProtocol from '../src/pages/other/ServiceProtocol.vue'
import IndicatorHome from '../src/pages/home/components/IndicatorHome.vue'
import mixin from '../src/utils/mixin'
import MobileSelect from '../src/components/mobile-select/mobile-select'

const state = reactive({
  button: { type: 'primary', size: 'normal', disabled: false, loading: false },
  clicks: 0,
  switch: {
    theme: 'default',
    color: 'default',
    modelValue: false,
    typeBold: false,
    disabled: false
  },
  dialog: false,
  dialogMaskMode: 'dark',
  refreshing: false,
  protocol: '',
  horizontalIndex: 0,
  verticalIndex: 0,
  videos: [] as number[],
  picked: [] as string[]
})
const app = createApp({
  setup() {
    return () =>
      h('main', { id: 'fixture-page', style: { fontSize: '14px' } }, [
        h(
          BaseButton,
          { ...state.button, 'data-testid': 'button', onClick: () => state.clicks++ },
          () => '提交'
        ),
        h(Switches, {
          ...state.switch,
          'data-testid': 'switch',
          'onUpdate:modelValue': (value: boolean) => (state.switch.modelValue = value)
        }),
        h('button', { id: 'picker-trigger' }, '选择日期'),
        h('button', { id: 'cascade-trigger' }, '选择地区'),
        h(
          FromBottomDialog,
          {
            pageId: 'fixture-page',
            modelValue: state.dialog,
            maskMode: state.dialogMaskMode,
            height: '200px',
            'onUpdate:modelValue': (value: boolean) => (state.dialog = value)
          },
          () => h('p', '弹窗正文')
        ),
        h(
          'section',
          {
            style: { height: '180px', width: '300px', marginTop: '30px' },
            'data-testid': 'horizontal'
          },
          [
            h(
              SlideHorizontal,
              {
                index: state.horizontalIndex,
                'onUpdate:index': (value: number) => (state.horizontalIndex = value)
              },
              () => [0, 1, 2].map((value) => h(SlideItem, { key: value }, () => String(value)))
            )
          ]
        ),
        h(
          'section',
          {
            style: { height: '300px', width: '300px', marginTop: '30px' },
            'data-testid': 'vertical'
          },
          [
            h(SlideVerticalInfinite, {
              list: state.videos,
              index: state.verticalIndex,
              active: true,
              uniqueId: 'style-fixture',
              render: (value: number) =>
                h('div', { class: 'h-full w-full', 'data-video': value }, String(value)),
              'onUpdate:index': (value: number) => (state.verticalIndex = value)
            })
          ]
        ),
        state.protocol && h(ServiceProtocol, { key: state.protocol, 'data-testid': 'protocol' }),
        h('section', { class: 'relative' }, [
          h(IndicatorHome, { loading: state.refreshing, name: 'fixture', 'data-testid': 'refresh' })
        ])
      ])
  }
})
app.mixin(mixin)
app.use(createPinia())
const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { render: () => null } }]
})
app.use(router)
app.mount('#fixture')
await nextTick()
state.videos = [0, 1, 2, 3, 4, 5, 6]
await nextTick()
const picker = new MobileSelect({
  trigger: '#picker-trigger',
  title: '日期',
  wheels: [{ data: ['一月', '二月', '三月'] }],
  callback: (_indices: number[], values: string[]) => (state.picked = values)
})
const cascadePicker = new MobileSelect({
  trigger: '#cascade-trigger',
  wheels: [{ data: [{ id: 1, value: '甲', childs: [{ id: 2, value: '乙' }] }] }]
})
Object.assign(window, { __styleFixture: { state, picker, cascadePicker, router } })

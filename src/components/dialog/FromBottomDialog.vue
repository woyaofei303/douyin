<template>
  <Transition
    enter-from-class="[transform:translate3d(0,_101%,_0)]!"
    enter-active-class="[transition-duration:250ms]!"
    enter-to-class=""
    leave-from-class=""
    leave-active-class="[transition-duration:250ms]!"
    leave-to-class="[transform:translate3d(0,_101%,_0)]!"
    move-class=""
  >
    <div
      class="z-9 fixed w-full bottom-0 left-0 box-border rounded-[15px_15px_0_0] [transform:translate3d(0,_0,_0)] overflow-hidden flex h-[var(--dialog-height)] max-h-[var(--dialog-height)] flex-col"
      :class="[
        !showHengGang ? 'pt-0' : 'pt-6',
        mode === 'white'
          ? 'bg-white'
          : mode === 'light'
            ? 'bg-[whitesmoke]'
            : mode === 'dark'
              ? 'bg-[var(--main-bg)]'
              : ''
      ]"
      ref="dialog"
      :style="{ '--dialog-height': height }"
      v-if="modelValue"
      @touchstart="onStart"
      @touchmove="onMove"
      @touchend="onEnd"
    >
      <slot name="header"></slot>
      <div
        class="rounded-[15px_15px_0_0] z-3 w-full fixed h-7.5 flex [transform:translateY(-24px)] justify-center items-center touch-pan-y"
        :class="[
          mode === 'white'
            ? 'bg-white'
            : mode === 'light'
              ? 'bg-[whitesmoke]'
              : mode === 'dark'
                ? 'bg-[var(--main-bg)]'
                : ''
        ]"
        v-if="showHengGang"
      >
        <div
          class="rounded-[2px] h-1 w-7.5"
          :class="[
            mode === 'white'
              ? 'bg-[darkgray]'
              : mode === 'light'
                ? 'bg-[darkgray]'
                : mode === 'dark'
                  ? 'bg-[var(--second-btn-color)]'
                  : ''
          ]"
        ></div>
      </div>
      <div class="flex-[1] overflow-auto" ref="wrapper">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Dom, { _css } from '../../utils/dom'
import bus, { EVENT_KEY } from '@/utils/bus'
import { _stopPropagation } from '@/utils'

defineOptions({ name: 'FromBottomDialog' })

interface Props {
  modelValue?: boolean
  mode?: 'dark' | 'light' | 'white'
  maskMode?: 'dark' | 'light' | 'white' | 'lightgray'
  height?: string
  showHengGang?: boolean
  pageId: string
  borderRadius?: string
  tag?: string
}

interface Emits {
  (ev: 'update:modelValue', val: boolean): void
  (ev: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  mode: 'dark',
  maskMode: 'dark',
  height: 'calc(var(--vh, 1vh) * 70)',
  showHengGang: true,
  borderRadius: '15rem 15rem 0 0',
  tag: ''
})

const emit = defineEmits<Emits>()

const dialog = ref<HTMLElement | null>(null)

const wrapper = ref<HTMLElement | null>(null)

const scroll = ref(0)

const startY = ref(0)

const moveY = ref(0)

const startTime = ref(0)

const pagePosition = ref(null)

watch(
  () => props.modelValue,
  (newVal: boolean) => {
    const page = document.getElementById(props.pageId)
    if (!page) return
    if (newVal) {
      pagePosition.value = _css(page, 'position')
      page.style.position = 'absolute'
      scroll.value = document.documentElement.scrollTop
      document.body.style.position = 'fixed'
      document.body.style.top = -scroll.value + 'px'

      const maskClasses = {
        dark: 'bg-[var(--mask-dark)]',
        light: 'bg-[var(--mask-light)]',
        white: 'bg-[var(--mask-white)]',
        lightgray: 'bg-[var(--mask-lightgray)]'
      }
      const maskTemplate = `<div data-dialog-mask class="fixed inset-0 z-3 animate-[fade-in_0.3s] ${maskClasses[props.maskMode]}"></div>`
      const mask = new Dom().create(maskTemplate)
      setTimeout(() => {
        mask.on('click', (e: Event) => {
          _stopPropagation(e)
          onHide()
        })
      }, 200)
      page.appendChild(mask.els[0])
    } else {
      page.style.position = pagePosition.value || 'fixed'
      document.body.style.position = 'static'
      document.documentElement.scrollTop = scroll.value

      const mask = new Dom('[data-dialog-mask]').replaceClass(
        'animate-[fade-in_0.3s]',
        'animate-[fade-out_0.4s]'
      )
      setTimeout(() => {
        mask.remove()
      }, 250)
    }
  }
)

const onHide = (val = false) => {
  emit('update:modelValue', val)
  emit('cancel')
}

const onStart = (e: TouchEvent) => {
  if (wrapper.value?.scrollTop !== 0) return
  startY.value = e.touches[0].clientY
  startTime.value = Date.now()
  _css(dialog.value, 'transition-duration', '0ms')
}

const onMove = (e: TouchEvent) => {
  if (wrapper.value?.scrollTop !== 0) return
  moveY.value = e.touches[0].pageY - startY.value
  if (moveY.value > 0) {
    bus.emit(EVENT_KEY.DIALOG_MOVE, {
      tag: props.tag,
      e: moveY.value
    })
    _css(dialog.value, 'transform', `translate3d(0, ${moveY.value}px, 0)`)
  }
}

const onEnd = () => {
  // 如果是外部改变 modelValue 值的话，这里会没有 ref
  if (!dialog.value) return
  if (Date.now() - startTime.value < 150 && Math.abs(moveY.value) < 30) return
  const clientHeight = dialog.value?.clientHeight
  _css(dialog.value, 'transition-duration', `250ms`)
  if (Math.abs(moveY.value) > clientHeight / 2) {
    _css(dialog.value, 'transform', `translate3d(0,100%,0)`)
    bus.emit(EVENT_KEY.DIALOG_END, { tag: props.tag, isClose: true })
    setTimeout(onHide, 250)
  } else {
    _css(dialog.value, 'transform', `translate3d(0,0,0)`)
    bus.emit(EVENT_KEY.DIALOG_END, { tag: props.tag, isClose: false })
  }
}
</script>

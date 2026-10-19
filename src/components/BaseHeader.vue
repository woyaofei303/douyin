<template>
  <div class="w-full text-white" :class="[props.isFixed ? 'z-2 top-0 fixed' : '']" id="BaseHeader">
    <div
      class="flex justify-center items-center h-[var(--common-header-height)] box-border border-b-[length:var(--header-border-width,1px)] [border-bottom-style:solid] border-b-[#cccccc11] relative *:last:h-full *:last:absolute *:last:right-[17px] *:last:top-0 *:last:flex *:last:items-center"
    >
      <dy-back
        class="opacity-[var(--header-back-opacity,1)] absolute left-2.5 last:h-full last:absolute last:right-4.25 last:top-0 last:flex last:items-center"
        :mode="props.backMode"
        :img="props.backImg"
        @click="back"
        direction="left"
      />
      <slot name="center"
        ><span
          class="last:h-full last:absolute last:right-4.25 last:top-0 last:flex last:items-center"
        ></span
      ></slot>
      <slot name="right"
        ><span
          class="last:h-full last:absolute last:right-4.25 last:top-0 last:flex last:items-center"
        ></span
      ></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>
<script setup lang="ts">
import { useAttrs } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'BaseHeader'
})

const props = defineProps({
  backMode: {
    type: String,
    default: 'gray'
  },
  backImg: {
    type: String,
    default: 'back'
  },
  isClose: {
    type: Boolean,
    default: false
  },
  isFixed: {
    type: Boolean,
    default: true
  }
})
const router = useRouter()
const attrs: any = useAttrs()

function back() {
  if (attrs.onBack) {
    attrs.onBack()
  } else {
    router.back()
  }
}
</script>

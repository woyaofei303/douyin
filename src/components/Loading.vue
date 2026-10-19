<template>
  <div
    :class="[
      isFullScreen
        ? 'w-5.5 flex justify-between'
        : !isFullScreen
          ? 'w-full flex justify-center'
          : '',
      !isFullScreen ? 'h-10 items-center' : '',
      isFullScreen ? 'z-999 absolute left-[50%] top-[50%] [transform:translate(-50%,_-50%)]' : ''
    ]"
  >
    <div
      class="rounded-[50%] bg-[cadetblue] animate-[dy-anim-blue-51123b_0.4s_ease-in-out_0s_infinite_alternate]"
      :class="[type === 'small' ? 'w-2 h-2' : 'w-2.5 h-2.5']"
    ></div>
    <div
      class="rounded-[50%] bg-[var(--primary-btn-color)] animate-[dy-anim-red-d2c98f_0.4s_ease-in-out_0s_infinite_alternate]"
      :class="[type === 'small' ? 'w-2 h-2' : 'w-2.5 h-2.5']"
    ></div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    isFullScreen: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'normal'
    }
  }
}
</script>

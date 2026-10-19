<template>
  <div
    class="z-3 fixed top-0 bottom-0 left-0 right-0"
    :class="[
      mode === 'white'
        ? 'bg-[var(--mask-white)]'
        : mode === 'lightgray'
          ? 'bg-[var(--mask-lightgray)]'
          : mode === 'light'
            ? 'bg-[var(--mask-light)]'
            : mode === 'dark'
              ? 'bg-[var(--mask-dark)]'
              : 'bg-[var(--mask-dark)]'
    ]"
  ></div>
</template>
<script>
//未以组件的方式使用，FromBottomDialog.vue里面是用js append到dom里面去的，
//以组件的方式使用，不好随意插位置，插到app下面，又会出现定位覆盖的问题
export default {
  name: 'BaseMask',
  props: {
    mode: {
      type: String,
      default: 'dark'
    }
  }
}
</script>

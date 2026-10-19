<template>
  <div
    class="text-[13px] h-15 flex items-center justify-center text-[color:var(--second-text-color)]"
  >
    <slot v-if="$slots.default"></slot>
    <span v-else>暂时没有更多了</span>
  </div>
</template>
<script>
export default {
  name: 'NoMore'
}
</script>

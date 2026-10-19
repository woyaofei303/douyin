<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'FadeDialog' })
</script>

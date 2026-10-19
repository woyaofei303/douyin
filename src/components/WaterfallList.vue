<script setup>
import { computed } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    default() {
      return []
    }
  }
})

const leftList = computed(() => {
  return props.list.filter((v, index) => index % 2 === 0)
})
const rightList = computed(() => {
  return props.list.filter((v, index) => index % 2 !== 0)
})
</script>

<template>
  <div class="flex gap-2.5">
    <div class="w-[50%] flex flex-col">
      <slot :item="item" v-for="item in leftList"></slot>
    </div>
    <div class="w-[50%] flex flex-col">
      <slot :item="item" v-for="item in rightList"></slot>
    </div>
  </div>
</template>

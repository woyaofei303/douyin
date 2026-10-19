<template>
  <SlideItem data-slide-item="">
    <SlideList class="bg-[#000]!" uniqueId="home" :active="props.active" :api="recommendedVideo" />
  </SlideItem>
</template>

<script setup lang="jsx">
import SlideItem from '@/components/slide/SlideItem.vue'
import SlideList from './SlideList.vue'
import { recommendedVideo } from '@/api/videos'

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>

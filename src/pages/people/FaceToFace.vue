<template>
  <div class="bg-black fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white">
    <BaseHeader class="bg-black!">
      <template v-slot:right>
        <span class="text-[16px]" @click="nav('/common-setting')">设置</span>
      </template>
    </BaseHeader>
    <div class="pt-15"></div>
  </div>
</template>
<script setup lang="ts">
//TODO 动画效果麻烦
import { useNav } from '@/utils/hooks/useNav'

defineOptions({
  name: 'FaceToFace'
})
const nav = useNav()
</script>

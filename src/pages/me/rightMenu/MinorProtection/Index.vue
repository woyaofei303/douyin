<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]">
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">未成年保护工具</span>
      </template>
    </BaseHeader>
    <div class="pt-15">
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="nav('detail-setting', { type: 0 })"
      >
        <div class="flex justify-between items-center text-white">时间锁</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <span>未开启</span>
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="nav('detail-setting', { type: 1 })"
      >
        <div class="flex justify-between items-center text-white">青少年模式</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <span>未开启</span>
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="nav('detail-setting', { type: 2 })"
      >
        <div class="flex justify-between items-center text-white">亲子平台</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <span>未开启</span>
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useNav } from '@/utils/hooks/useNav'

defineOptions({
  name: 'MinorProtection'
})
const nav = useNav()
</script>

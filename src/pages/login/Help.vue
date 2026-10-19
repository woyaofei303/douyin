<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]">
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px] font-bold">帮助与设置</span>
      </template>
      <template v-slot:right>
        <span class="text-[14px]">我的反馈</span>
      </template>
    </BaseHeader>
    <div class="mt-15 h-[calc(var(--vh,_1vh)_*_100_-_60px)]">
      <iframe
        class="w-full h-full m-0 p-0 border-[0] border-current border-none"
        src="https://kf.qq.com/touch/product/wechat_app.html"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: 'Help'
})
</script>

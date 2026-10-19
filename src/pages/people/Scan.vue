<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white">
    <img
      class="z-3 mt-5 mr-0 mb-0 ml-5 fixed h-5"
      src="../../assets/img/icon/components/gray-back.png"
      @click="router.back()"
    />
    <div class="h-[calc(var(--vh,_1vh)_*_100)] w-[100vw]">
      <video
        class="h-[calc(var(--vh,_1vh)_*_100)] w-[100vw]"
        src="http://qy9rc9xff.hn-bkt.clouddn.com/0.mp4"
      ></video>
    </div>
    <div class="fixed bottom-15 flex justify-between w-[80%] left-[10vw]">
      <div
        class="fixed bottom-40 flex flex-col items-center left-[50%] [transform:translateX(-50%)]"
      >
        <img class="h-6 mb-2.5" src="../../assets/img/icon/qr-code-white.svg" alt="" />
        <span>轻触照亮</span>
      </div>
      <div class="flex flex-col items-center">
        <img
          class="rounded-[50%] bg-[var(--second-btn-color-tran)] h-6 mb-2.5 p-4"
          src="../../assets/img/icon/qr-code-white.svg"
          alt=""
        />
        <span>我的抖音码</span>
      </div>
      <div class="flex flex-col items-center">
        <img
          class="rounded-[50%] bg-[var(--second-btn-color-tran)] h-6 mb-2.5 p-4"
          src="../../assets/img/icon/qr-code-white.svg"
          alt=""
        />
        <span>相册</span>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script setup>
//TODO 那个动画没做，用css画有点麻烦，后面ps p一张图片吧

import { useRouter } from 'vue-router'

const router = useRouter()
defineOptions({
  name: 'Scan'
})
</script>

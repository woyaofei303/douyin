<template>
  <div
    class="bg-[#888485] fixed left-0 right-0 bottom-0 top-0 overflow-auto text-[14px]"
    id="MyCard"
  >
    <div
      class="fixed z-9 top-0 w-full box-border h-15 flex justify-between items-center px-3.75 py-0"
    >
      <dy-back mode="light" @click="router.back" />
      <!--      todo 差一-->
      <img
        class="w-6 h-6 ml-3.75"
        src="../../assets/img/icon/share-white.png"
        @click="data.isSharing = true"
      />
    </div>
    <div class="pt-[var(--common-header-height)] flex flex-col items-center">
      <div class="mt-[12vh] flex items-center justify-center relative">
        <img class="w-[60vw]" src="../../assets/img/icon/me/code-bg.png" alt="" />
        <img
          class="rounded-[50%] absolute w-[25vw]"
          :src="_checkImgUrl(store.userinfo.cover_url[0].url_list[0])"
          alt=""
        />
      </div>

      <span class="font-bold mt-5 text-[16px] text-white">ZZZZZZZZZZ</span>
      <span class="text-white text-[14px] mt-5 opacity-40">抖音扫一扫，立即关注我</span>
    </div>
    <div class="absolute bottom-7.5 flex justify-around w-full">
      <!--      <div class="btn" @click="$router.push('/scan')">-->
      <div class="text-white flex flex-col items-center text-[12px]" @click="_no">
        <div
          class="bg-[rgba(252,_250,_250,_0.3)] rounded-[50%] flex items-center justify-center mb-2.5 p-4.5"
        >
          <img class="w-6.5" src="../../assets/img/icon/scan.png" alt="" />
        </div>
        <span>扫一扫</span>
      </div>
      <div class="text-white flex flex-col items-center text-[12px]" @click="_no">
        <div
          class="bg-[rgba(252,_250,_250,_0.3)] rounded-[50%] flex items-center justify-center mb-2.5 p-4.5"
        >
          <img class="w-6.5" src="../../assets/img/icon/download.png" alt="" />
        </div>
        <span>保存</span>
      </div>
    </div>

    <Share v-model:value="data.isSharing" mode="qrcode" ref="share" page-id="MyCard" />
  </div>
</template>

<script setup lang="ts">
import Share from '../../components/Share.vue'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _no } from '@/utils'
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'MyCard'
})

const router = useRouter()
const store = useBaseStore()
const data = reactive({
  isSharing: false,
  okText: '',
  showSharePassword: false,
  shareToFriend: false,
  shareType: -1,
  showDouyinCode: false
})

watch(
  () => data.shareType,
  (newVal) => {
    if (newVal === -1) return
    data.showSharePassword = true
    switch (newVal) {
      case 2:
      case 3:
        return (data.okText = '去微信粘贴')
      case 4:
      case 5:
        return (data.okText = '去QQ粘贴')
      case 8:
        return (data.okText = '去微博粘贴')
    }
  }
)
</script>

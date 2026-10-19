<template>
  <div
    class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-[14px] bg-white"
    id="RedPacketDetail"
  >
    <BaseHeader mode="light">
      <template v-slot:right>
        <span class="text-[14px] text-[rgb(193,_135,_79)]" @click="_no">红包记录</span>
      </template>
    </BaseHeader>
    <div class="pt-15">
      <div class="text-[#6e573f] flex flex-col items-center">
        <img
          class="mt-13.75 w-13.75 h-13.75 rounded-[50%] mb-5"
          :src="_checkImgUrl(store.userinfo.cover_url[0].url_list[0])"
          alt=""
        />
        <span class="font-bold text-[13px] mb-2.5">{{ store.userinfo.nickname }}的红包</span>
        <div class="text-[12px] opacity-60">大吉大利</div>
        <span class="text-[#c1874f] text-[40px] font-bold mt-6.25 mb-2.5">0.01元</span>
        <!--        <span class="notice" @click="$router.push('/me/money')">已存入我的零钱，可直接使用></span>-->
        <span class="text-[12px]" @click="_no">已存入我的零钱，可直接使用></span>
      </div>
      <img
        class="bottom-0 absolute w-[100vw]"
        src="../../assets/img/icon/message/chat/money-detail-bg.png"
        alt=""
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _no } from '@/utils'

defineOptions({
  name: 'RedPacketDetail'
})

defineProps({
  modelValue: {
    type: Boolean,
    default() {
      return false
    }
  }
})
const store = useBaseStore()
</script>

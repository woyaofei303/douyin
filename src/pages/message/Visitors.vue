<template>
  <div
    class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]"
    id="Visitors"
  >
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">主页访客</span>
      </template>
      <template v-slot:right>
        <span class="text-[14px]" @click="data.isShowSetting = !data.isShowSetting">设置</span>
      </template>
    </BaseHeader>
    <div class="pt-[var(--common-header-height)] pb-[var(--page-padding)] px-[var(--page-padding)]">
      <template v-if="data.realDisplay">
        <Peoples v-model:list="data.recommend" :loading="false" mode="visitor" />
        <NoMore />
      </template>
      <template v-else>
        <div class="text-center">
          <div class="mt-25 flex items-center justify-center">
            <div class="inline-block relative">
              <img
                class="-left-5 bottom-5 absolute w-7.5"
                src="../../assets/img/icon/message/display2.webp"
                alt=""
              />
              <img
                class="z-2 relative bg-black rounded-[50%] w-20 h-20 p-[2.5px]"
                :src="_checkImgUrl(store.userinfo.cover_url[0].url_list[0])"
                alt=""
              />
              <img
                class="bottom-1.25 -right-7.5 z-3 absolute bg-black rounded-[50%] w-10 p-0.5"
                src="../../assets/img/icon/message/display1.webp"
                alt=""
              />
            </div>
          </div>
          <div class="mt-7.5 text-[16px] font-bold">查看新访客需要你的授权</div>
          <ul class="text-[color:var(--second-text-color)] text-left">
            <li>访客记录中仅展示同样已授权的用户</li>
            <li>开户后，你访问他人方面也将留下记录</li>
            <li>你可以随时在访客设置中关闭授权</li>
          </ul>

          <div
            class="fixed bottom-0 left-0 w-[100vw] box-border flex justify-between p-[var(--page-padding)]"
          >
            <base-button class="w-[49%]! first:text-white!" type="dark" @click="keepClose"
              >保持关闭</base-button
            >
            <base-button
              class="w-[49%]! first:text-white!"
              type="primary"
              @click="data.display = data.realDisplay = true"
              >开启访客</base-button
            >
          </div>
        </div>
      </template>
    </div>

    <from-bottom-dialog
      page-id="Visitors"
      v-model="data.isShowSetting"
      mode="white"
      mask-mode="dark"
      height="270rem"
      :show-heng-gang="false"
    >
      <div class="text-black text-center">
        <div class="pt-7.5 pb-5 flex items-center justify-center px-[var(--page-padding)]">
          <div class="relative">
            <img class="w-16" src="../../assets/img/icon/message/peoples-black2.png" alt="" />
            <transition
              enter-from-class="[transform:scale(0)]"
              enter-active-class="[transition:transform_0.3s_ease]"
              enter-to-class=""
              leave-from-class=""
              leave-active-class="[transition:transform_0.3s_ease]"
              leave-to-class="[transform:scale(0)]"
              move-class=""
            >
              <img
                class="bottom-0 right-0 absolute rounded-[50%] bg-white w-5 p-0.5"
                v-if="!data.display"
                src="../../assets/img/icon/message/remove.png"
                alt=""
              />
            </transition>
          </div>
          <img
            class="top-[var(--page-padding)] right-[var(--page-padding)] absolute w-5"
            @click="data.isShowSetting = false"
            src="../../assets/img/icon/components/gray-close-full2.png"
            alt=""
          />
        </div>
        <div class="text-[16px]">主页访客</div>
        <div class="text-[12px] text-[color:var(--second-text-color)] p-[var(--page-padding)]">
          关闭后，你查看他人主页时不会留下记录；同时，你也无法查看谁访问了你的主页
        </div>
        <div
          class="bg-[#f2f1f1] ml-[var(--page-padding)] w-[calc(100vw_-_var(--page-padding)_*_2)] h-0.25"
        ></div>
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] mb-2.5 px-[var(--page-padding)] py-0"
        >
          <div class="flex justify-between items-center text-black">展示主页访客</div>
          <div
            class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
          >
            <switches v-model="data.display" theme="bootstrap" color="success"></switches>
          </div>
        </div>
      </div>
    </from-bottom-dialog>
  </div>
</template>
<script setup lang="ts">
import Peoples from '../people/components/Peoples.vue'
import NoMore from '@/components/NoMore.vue'
import FromBottomDialog from '@/components/dialog/FromBottomDialog.vue'
import Switches from './components/swtich/switches.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _notice, cloneDeep } from '@/utils'

import { onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'Visitors'
})

const store = useBaseStore()
const router = useRouter()
const data = reactive({
  recommend: [],
  isShowSetting: false,
  display: false,
  realDisplay: false
})

onMounted(() => {
  data.recommend = cloneDeep(store.friends.all)
})

watch(
  () => data.isShowSetting,
  (newVal) => {
    if (!newVal) {
      data.realDisplay = data.display
    }
  }
)

function keepClose() {
  _notice('你将不会再收到相关通知')
  router.back()
}
</script>

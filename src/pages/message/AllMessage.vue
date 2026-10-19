<template>
  <div
    class="fixed left-0 right-0 bottom-0 top-0 bg-[var(--color-message)] overflow-auto text-white text-[14px] flex flex-col"
    id="AllMessage"
  >
    <BaseHeader :is-fixed="false">
      <template v-slot:center>
        <div class="flex items-center" @click="data.isShowType = !data.isShowType">
          <span class="text-[16px]">{{ showTypeText }}</span>
          <img
            class="w-3.75 [transition:all_0.3s] ml-0.75"
            :class="[data.isShowType ? '[transform:rotate(0deg)]' : '[transform:rotate(180deg)]']"
            src="@/assets/img/icon/arrow-up-white.png"
            alt=""
          />
        </div>
      </template>
    </BaseHeader>
    <transition
      enter-from-class="opacity-0"
      enter-active-class="[transition:opacity_0.3s_ease]"
      enter-to-class=""
      leave-from-class=""
      leave-active-class="[transition:opacity_0.3s_ease]"
      leave-to-class="opacity-0"
      move-class=""
    >
      <div
        class="z-9 fixed h-[calc(var(--vh,_1vh)_*_100)] w-[100vw] mt-[var(--common-header-height)]"
        v-if="data.isShowType"
      >
        <div class="rounded-[0_0_4px_4px] bg-[var(--color-message)] overflow-hidden">
          <div
            class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
            @click="toggleShowType(1)"
          >
            <div class="flex justify-between items-center text-white">
              <img class="mr-2.5 w-4.5" src="@/assets/img/icon/message/done-gray.png" alt="" />
              <span>全部消息</span>
            </div>
          </div>
          <div
            class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
            @click="toggleShowType(2)"
          >
            <div class="flex justify-between items-center text-white">
              <img class="mr-2.5 w-4.5" src="@/assets/img/icon/message/like-gray.png" alt="" />
              <span>赞</span>
            </div>
          </div>
          <div
            class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
            @click="toggleShowType(3)"
          >
            <div class="flex justify-between items-center text-white">
              <img class="mr-2.5 w-4.5" src="@/assets/img/icon/message/call-gray.png" alt="" />
              <span>@我的</span>
            </div>
          </div>
          <div
            class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
            @click="toggleShowType(4)"
          >
            <div class="flex justify-between items-center text-white">
              <img class="mr-2.5 w-4.5" src="@/assets/img/icon/message/comment-gray.png" alt="" />
              <span>评论</span>
            </div>
          </div>
        </div>
        <div
          class="z-8 fixed h-[calc(var(--vh,_1vh)_*_100)] w-[100vw] bg-[var(--mask-dark)]"
          @click="data.isShowType = false"
        ></div>
      </div>
    </transition>
    <Scroll class="flex-[1]! px-2.5! py-0!" ref="mainScroll">
      <div>
        <div
          class="mb-5 flex gap-2.5 first:mt-5"
          v-for="(item, i) in store.friends.all"
          :key="i"
          @click="nav('/message/visitors')"
        >
          <div class="flex items-center relative">
            <img class="w-14.5 h-14.5 rounded-[50%]" v-lazy="_checkImgUrl(item.avatar)" alt="" />
          </div>
          <div class="flex-[1] flex justify-between">
            <div class="flex flex-col justify-center gap-1.25 text-white text-[16px]">
              <div>{{ item.name }}</div>
              <div class="flex items-center text-[13px] text-[lightgrey]">
                <div>近期访问过你的主页</div>
                <div class="text-[12px] ml-2.5 text-[color:var(--second-text-color)]">01-11</div>
              </div>
            </div>
            <img
              class="ml-2.5 w-14.5 h-17.5 object-cover rounded-[3px]"
              v-lazy="_checkImgUrl(store.userinfo.cover_url[0].url_list[0])"
              alt=""
            />
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>
<script setup lang="ts">
import Scroll from '@/components/Scroll.vue'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl } from '@/utils'

import { computed, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav.js'

defineOptions({
  name: 'AllMessage'
})

const store = useBaseStore()
const nav = useNav()
const data = reactive({
  isShowType: false,
  selectShowType: 1
})

const showTypeText = computed(() => {
  switch (data.selectShowType) {
    case 1:
      return '全部消息'
    case 2:
      return '赞'
    case 3:
      return '@我的'
    case 4:
      return '评论'
    default:
      return ''
  }
})

function toggleShowType(index) {
  data.selectShowType = index
  data.isShowType = false
}
</script>

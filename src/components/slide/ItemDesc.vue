<script setup lang="ts">
import { inject, reactive } from 'vue'

const props = defineProps({
  isMy: {
    type: Boolean,
    default: () => {
      return false
    }
  },
  isLive: {
    type: Boolean,
    default: () => {
      return false
    }
  }
})

const item = inject<any>('item')

const state = reactive({
  isAttention: false,
  test: [1, 2]
})
</script>
<template>
  <div class="ml-2.5 mb-2.5 absolute bottom-0 w-[70%]">
    <div class="text-[#fff] text-left" v-if="!props.isMy">
      <div class="flex" v-if="item.city || item.address">
        <div
          class="mb-2.5 flex items-center text-[12px] rounded-[3px] bg-[var(--second-btn-color-tran)] p-1"
        >
          <img class="mr-1.75 w-4.5" src="../../assets/img/icon/location.webp" alt="" />
          <span>{{ item.city }}</span>
          <template v-if="item.address">
            <div class="h-2 w-[1.5px] bg-[gray] mx-1.25 my-0"></div>
          </template>
          <span>{{ item.address }}</span>
        </div>
      </div>
      <div
        class="rounded-[3px] mb-2.5 text-[11px] inline-flex bg-[var(--primary-btn-color)] text-white px-1.5 py-0.75"
        v-if="props.isLive"
      >
        直播中
      </div>
      <div class="mb-2.5 text-[18px] font-bold" @click.stop="$emit('goUserInfo')">
        @{{ item?.author?.nickname }}
      </div>
      <div>
        {{ item.desc }}
      </div>
      <!--      <div class="music" @click.stop="bus.emit('nav','/home/music')">-->
      <!--        <img src="../../assets/img/icon/music.svg" alt="" class="music-image">-->
      <!--        <span>{{ item.music.title }}</span>-->
      <!--      </div>-->
    </div>
    <div class="flex items-center" v-else>
      <div>
        <div class="flex bg-[#82152c] rounded-[50px] mb-5 p-0.75">
          <img class="w-9 h-9 rounded-[50%]" src="../../assets/img/icon/head-image.jpeg" alt="" />
          <div class="text-[color:var(--second-text-color)] mx-2.5 my-0">
            <p class="m-0 p-0">
              <span class="mr-2.5">zzzzz</span>
              <span>2020-01-20</span>
            </p>
            <p class="text-white m-0 p-0">北京</p>
          </div>
        </div>
        <transition-group
          enter-from-class=""
          enter-active-class=""
          enter-to-class=""
          leave-from-class=""
          leave-active-class=""
          leave-to-class=""
          move-class=""
          tag="div"
        >
          <div
            class="w-10 h-10 relative mb-5 animate-[dy-test-bfccf1_1s] [animation-delay:0.5s]"
            :key="i"
            v-for="i in state.test"
          >
            <img class="w-9 h-9 rounded-[50%]" src="../../assets/img/icon/head-image.jpeg" alt="" />
            <img
              class="absolute bottom-0 left-5 w-2.5 h-2.5 bg-[red] rounded-[50%] p-0.75 border-[2px] border-white border-solid"
              src="../../assets/img/icon/love.svg"
              alt=""
            />
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<template>
  <SlideItem data-slide-item="">
    <div class="w-full absolute top-0" :class="[state.subTypeIsTop ? 'z-2' : '']" ref="subTypeRef">
      <div
        class="[transition:all_0.3s] text-[14px] text-[gray] [background:linear-gradient(to_right,_#242254,_#070510)] flex justify-center items-center"
      >
        <div
          class="mt-[var(--common-header-height)] mb-5 rounded-[8px] w-full [background:linear-gradient(to_right,_#35336e,_#1d1542)] box-border flex items-end justify-between overflow-auto mx-5 p-5"
          @touchmove.capture="stop"
        >
          <div class="flex items-center flex-col shrink-0 w-[17vw]">
            <img class="w-8.75 h-8.75 mb-1.25" src="@/assets/img/icon/msg-icon9.webp" alt="" />
            <span>美食</span>
          </div>
          <div class="flex items-center flex-col shrink-0 w-[17vw]">
            <img class="w-8.75 h-8.75 mb-1.25" src="@/assets/img/icon/msg-icon9.webp" alt="" />
            <span>休闲娱乐</span>
          </div>
          <div class="flex items-center flex-col shrink-0 w-[17vw]">
            <img class="w-8.75 h-8.75 mb-1.25" src="@/assets/img/icon/msg-icon9.webp" alt="" />
            <span>游玩</span>
          </div>
          <div class="flex items-center flex-col shrink-0 w-[17vw]">
            <img class="w-8.75 h-8.75 mb-1.25" src="@/assets/img/icon/msg-icon9.webp" alt="" />
            <span>丽人/美发</span>
          </div>
          <div class="flex items-center flex-col shrink-0 w-[17vw]">
            <img class="w-8.75 h-8.75 mb-1.25" src="@/assets/img/icon/msg-icon9.webp" alt="" />
            <span>住宿</span>
          </div>
          <div class="flex items-center flex-col shrink-0 w-[17vw]">
            <img class="w-8.75 h-8.75 mb-1.25" src="@/assets/img/icon/msg-icon9.webp" alt="" />
            <span>游玩</span>
          </div>
          <div class="flex items-center flex-col shrink-0 w-[17vw]">
            <img class="w-8.75 h-8.75 mb-1.25" src="@/assets/img/icon/msg-icon9.webp" alt="" />
            <span>丽人/美发</span>
          </div>
          <div class="flex items-center flex-col shrink-0 w-[17vw]">
            <img class="w-8.75 h-8.75 mb-1.25" src="@/assets/img/icon/msg-icon9.webp" alt="" />
            <span>住宿</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute bg-[rgba(0,_0,_0,_0.4)] top-25 left-[50%] [transform:translateX(-50%)] rounded-[10px] z-3 text-[12px] text-white px-3 py-0.75"
      v-if="state.subType === -1 && !state.subTypeVisible"
      @click="showSubType"
    >
      附近吃喝玩乐
    </div>
    <SlideList
      class="bg-black"
      :active="props.active"
      uniqueId="hot"
      :style="{
        marginTop: state.subTypeVisible ? state.subTypeHeight : 0
      }"
      :api="recommendedVideo"
      @touchstart="pageClick"
    />
  </SlideItem>
</template>

<script setup lang="jsx">
import SlideItem from '@/components/slide/SlideItem.vue'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import bus, { EVENT_KEY } from '@/utils/bus'
import { _stopPropagation } from '@/utils'
import SlideList from './SlideList.vue'
import { recommendedVideo } from '@/api/videos'

const props = defineProps({
  cbs: {
    type: Object,
    default() {
      return {}
    }
  },
  active: {
    type: Boolean,
    default: false
  }
})

function stop(e) {
  e.stopPropagation()
}

const subTypeRef = ref(null)
const state = reactive({
  index: 0,
  subType: -1,
  subTypeVisible: false,
  subTypeHeight: '0',
  //用于改变zindex的层级到上层，反正比slide高就行。不然摸不到subType.
  subTypeIsTop: false
})

function showSubType(e) {
  _stopPropagation(e)
  console.log('subTypeRef')
  state.subTypeHeight = subTypeRef.value.getBoundingClientRect().height + 'px'
  state.subTypeVisible = true
  setTimeout(() => (state.subTypeIsTop = true), 300)
  bus.emit(EVENT_KEY.OPEN_SUB_TYPE)
}

function pageClick(e) {
  // console.log('pageClick')
  if (state.subTypeVisible) {
    state.subTypeIsTop = state.subTypeVisible = false
    bus.emit(EVENT_KEY.CLOSE_SUB_TYPE)
    _stopPropagation(e)
  }
}

onMounted(() => {
  // getData()
})
onUnmounted(() => {})
</script>

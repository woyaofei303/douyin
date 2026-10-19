<template>
  <SlideItem data-slide-item="">
    <div
      class="w-full absolute top-0 text-[12px] text-white"
      :class="[state.subTypeIsTop ? 'z-2' : '']"
      ref="subTypeRef"
    >
      <div
        class="mt-[var(--common-header-height)] pr-1.25 pl-5 w-full bg-[rgba(0,_0,_0,_0.4)] box-border flex overflow-auto gap-2.5 py-5"
        @touchmove="_stop"
      >
        <div
          class="w-13.75 flex items-center justify-center flex-col shrink-0 mx-1.25 my-0"
          @click="goLive(i)"
          :key="j"
          v-for="(i, j) in store.users"
        >
          <img
            class="w-12.5 h-12.5 rounded-[50%]"
            :src="_checkImgUrl(i.avatar_168x168.url_list[0])"
            alt=""
          />
          <span class="w-full overflow-hidden text-ellipsis whitespace-nowrap">{{
            i.nickname
          }}</span>
        </div>
      </div>
    </div>
    <div
      class="absolute bg-[rgba(0,_0,_0,_0.4)] top-25 left-[50%] [transform:translateX(-50%)] rounded-[10px] z-3 text-[12px] text-white px-3 py-0.75"
      v-if="state.subType === -1 && !state.subTypeVisible"
      @click.stop="showSubType"
    >
      {{ store.users.length }}个直播
    </div>
    <SlideList
      class="bg-black"
      :cbs="{ isLive: true }"
      :active="props.active"
      uniqueId="live"
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
import { _checkImgUrl, _stop, _stopPropagation } from '@/utils'
import SlideList from './SlideList.vue'
import { recommendedVideo } from '@/api/videos'
import { useBaseStore } from '@/store/pinia'

const store = useBaseStore()
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

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

function goLive(item) {
  bus.emit(EVENT_KEY.NAV, {
    path: '/home/live',
    query: { id: item.id }
  })
}

onMounted(() => {
  // getData()
})
onUnmounted(() => {})
</script>

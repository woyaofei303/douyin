<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]">
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">观看历史</span>
      </template>
      <template v-slot:right v-if="isClear">
        <span class="text-[13px] text-[color:var(--second-text-color)]" @click="clear">清空</span>
      </template>
    </BaseHeader>
    <div class="pt-15">
      <Indicator
        class="w-[calc(100vw_-_2px)]! ml-0.25!"
        tabStyleWidth="50%"
        :tabTexts="['视频', '影视综']"
        v-model:active-index="data.currentSlideItemIndex"
      >
      </Indicator>
      <SlideHorizontal
        class="h-[calc(var(--vh,_1vh)_*_100_-_var(--indicator-height)_-_var(--common-header-height))]!"
        v-model:index="data.currentSlideItemIndex"
      >
        <SlideItem data-slide-item="" class="overflow-auto">
          <Scroll
            class="h-[calc(var(--vh,_1vh)_*_100_-_var(--indicator-height)_-_var(--common-header-height))]!"
            @pulldown="getHistoryVideo"
          >
            <Posters :list="data.historyVideo.list" v-if="data.historyVideo.total"></Posters>
            <Loading :is-full-screen="false" v-if="data.loadingVideo" />
            <template v-else>
              <NoMore v-if="data.historyVideo.list.length" />
              <div class="h-[70vh] flex items-center justify-center flex-col" v-else>
                <img class="h-30" src="../../../assets/img/icon/none-bg1.webp" alt="" />
                <div class="text-[13px] mt-2.5 text-[color:var(--second-text-color)]">
                  暂无观看历史记录
                </div>
              </div>
            </template>
          </Scroll>
        </SlideItem>
        <SlideItem data-slide-item="">
          <div class="h-[70vh] flex items-center justify-center flex-col">
            <img class="h-30" src="../../../assets/img/icon/none-bg1.webp" alt="" />
            <div class="text-[13px] mt-2.5 text-[color:var(--second-text-color)]">
              暂无观影历史记录
            </div>
          </div>
        </SlideItem>
      </SlideHorizontal>
    </div>
  </div>
</template>
<script setup lang="ts">
import Posters from '@/components/Posters.vue'
import Scroll from '@/components/Scroll.vue'
import NoMore from '@/components/NoMore.vue'
import { historyOther, historyVideo } from '@/api/videos'

import { computed, onMounted, reactive } from 'vue'
import { _showConfirmDialog } from '@/utils'

defineOptions({
  name: 'LookHistory'
})

const data = reactive({
  loadingVideo: false,
  loadingOther: false,
  isClearHistoryVideo: false,
  isClearHistoryOther: false,
  currentSlideItemIndex: 0,
  pageSize: 15,
  historyVideo: {
    total: 0,
    pageNo: 0,
    list: []
  },
  historyOther: {
    total: 0,
    pageNo: 0,
    list: []
  }
})

const isClear = computed(() => {
  if (data.currentSlideItemIndex === 0) {
    return data.historyVideo.list.length
  }
  return data.historyOther.list.length
})
onMounted(() => {
  getHistoryVideo(true)
  getHistoryOther(true)
})

async function getHistoryVideo(init = false) {
  if (data.loadingVideo) return
  if (data.isClearHistoryVideo) return
  if (!init) {
    if (data.historyVideo.total <= data.historyVideo.list.length) return
    data.historyVideo.pageNo++
  }
  data.loadingVideo = true
  let res: any = await historyVideo({
    pageNo: data.historyVideo.pageNo,
    pageSize: data.pageSize
  })
  console.log(res)
  data.loadingVideo = false
  if (res.success) {
    data.historyVideo.list = data.historyVideo.list.concat(res.data.list)
    data.historyVideo.total = res.data.total
  }
}

async function getHistoryOther(init = false) {
  if (data.loadingOther) return
  if (data.isClearHistoryOther) return
  data.loadingOther = true
  if (!init) {
    data.historyOther.pageNo++
  }
  let res: any = await historyOther({
    pageNo: data.historyOther.pageNo,
    pageSize: data.pageSize
  })
  data.loadingOther = false
  if (res.success) {
    data.historyOther.list = data.historyOther.list.concat(res.data.list)
    data.historyOther.total = res.data.total
  }
}

function clear() {
  _showConfirmDialog('确定清空？', '清空后，以往观看记录不再展示', 'gray', () => {
    if (data.currentSlideItemIndex === 0) {
      data.historyVideo.list = []
      data.isClearHistoryVideo = true
      return
    }
    data.historyOther.list = []
    data.isClearHistoryVideo = true
  })
}
</script>

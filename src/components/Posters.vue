<template>
  <div class="grid [grid-template-columns:33.33%_33.33%_33.33%]">
    <div
      class="h-50 max-h-[calc(33.33vw_*_1.3)] overflow-hidden relative border-[0.5px] border-black border-solid"
      :key="index"
      v-for="(i, index) in list"
      @click="goDetail(index)"
    >
      <img
        class="w-full h-full block object-cover"
        v-lazy="_checkImgUrl(i.video.cover.url_list[0])"
        alt=""
      />
      <template v-if="mode === 'normal'">
        <div
          class="text-white absolute bottom-1.25 left-1.25 flex items-center text-[14px] gap-0.75"
        >
          <Icon icon="icon-park-outline:like" />
          <span>{{ _formatNumber(i.statistics.digg_count) }}</span>
        </div>
        <div
          class="absolute text-[12px] bg-[gold] text-black rounded-[2px] top-1.75 left-1.75 px-0.75 py-0.5"
          v-if="i.is_top"
        >
          置顶
        </div>
      </template>
      <div
        class="absolute top-1.25 left-1.25 flex items-center flex-col text-[14px] text-black bg-white rounded-[6px] p-1.5"
        v-if="mode === 'date'"
      >
        <div class="font-bold">{{ getDay(i.create_time) }}</div>
        <div class="text-[10px]">{{ getMonth(i.create_time) }}</div>
      </div>
      <template v-if="mode === 'music'">
        <div
          class="absolute text-[12px] bg-[gold] text-black rounded-[2px] top-1.75 left-1.75 px-0.75 py-0.5"
          v-if="index === 0"
        >
          首发
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { _checkImgUrl, _formatNumber } from '@/utils'
import { useBaseStore } from '@/store/pinia'
import { useRouter } from 'vue-router'
import { cloneDeep } from '@/utils'

const store = useBaseStore()
const nav = useRouter()
const props = defineProps({
  list: {
    type: [Array, Number],
    default: () => {
      return []
    }
  },
  mode: {
    type: String,
    default: 'normal' //date,music
  }
})

defineOptions({
  name: 'Posters'
})

function goDetail(index) {
  store.routeData = cloneDeep({ list: props.list, index })
  nav.push({ path: '/video-detail' })
}

function getDay(time) {
  let date = new Date(time * 1000)
  return date.getDate()
}

function getMonth(time) {
  let date = new Date(time * 1000)
  let month = date.getMonth() + 1
  switch (month) {
    case 1:
      return '一月'
    case 2:
      return '二月'
    case 3:
      return '三月'
    case 4:
      return '四月'
    case 5:
      return '五月'
    case 6:
      return '六月'
    case 7:
      return '七月'
    case 8:
      return '八月'
    case 9:
      return '九月'
    case 10:
      return '十月'
    case 11:
      return '十一月'
    case 12:
      return '十二月'
  }
}
</script>

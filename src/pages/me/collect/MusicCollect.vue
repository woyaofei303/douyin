<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]">
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">音乐收藏</span>
      </template>
    </BaseHeader>
    <div class="pt-15">
      <div>
        <div
          class="pt-5 pb-0 flex items-center justify-between px-3.75"
          v-for="(item, index) in data.list"
          :key="index"
          @click="togglePlay(item, data.list)"
        >
          <div class="flex">
            <div class="mr-2.5 relative flex items-center justify-center">
              <img
                class="rounded-[2px] w-15 object-cover h-15"
                v-lazy="_checkImgUrl(item.cover)"
                alt=""
              />
              <img
                class="w-7.5 h-7.5 absolute"
                v-if="!item.is_play"
                src="@/assets/img/icon/play-white.png"
                alt=""
              />
              <img
                class="w-7.5 h-7.5 absolute"
                v-if="item.is_play"
                src="@/assets/img/icon/pause-white.png"
                alt=""
              />
            </div>
            <div class="flex flex-col justify-between">
              <span class="whitespace-nowrap text-ellipsis overflow-hidden max-w-[40vw]">{{
                item.name
              }}</span>
              <div class="text-[12px] text-[color:var(--second-text-color)]">{{ item.author }}</div>
              <div class="text-[12px] text-[color:var(--second-text-color)] flex">
                <div class="mr-3.5 relative">{{ _duration(item.duration) }}</div>
              </div>
            </div>
          </div>
          <div>
            <img
              class="w-5 h-5 ml-5"
              src="@/assets/img/icon/menu2-white.png"
              alt=""
              @click.stop="nav('/home/music', item)"
            />
          </div>
        </div>
      </div>
      <Loading v-if="data.loading" :is-full-screen="false" />
      <no-more class="mb-17.5!" v-else />
    </div>
    <div
      class="fixed bottom-0 w-full bg-[var(--main-bg)] flex items-center justify-between"
      v-if="data.currentItem"
    >
      <div
        class="absolute top-0 z-2 h-0.25 w-[50vw] bg-[yellow]"
        :style="{ width: data.process + 'px' }"
      ></div>
      <div
        class="flex justify-between w-full h-11.25 relative border-t-[1px] [border-top-style:solid] border-t-[#414141] items-center px-3.75 py-2.5"
      >
        <div
          class="rounded-[50%] w-full h-full flex justify-center items-center animate-[dy-animations-4c87fc_5s_linear_forwards_infinite]"
        >
          <div
            class="mr-2.5 relative flex items-center justify-center"
            @click="togglePlay(data.currentItem, data.list)"
          >
            <img
              class="rounded-[2px] object-cover w-12.5 h-12.5"
              v-lazy="_checkImgUrl(data.currentItem.cover)"
              alt=""
            />
            <img
              class="w-7.5 h-7.5 absolute"
              v-if="!data.currentItem.is_play"
              src="@/assets/img/icon/play-white.png"
              alt=""
            />
            <img
              class="w-7.5 h-7.5 absolute"
              v-if="data.currentItem.is_play"
              src="@/assets/img/icon/pause-white.png"
              alt=""
            />
          </div>
          <div class="flex flex-col justify-between">
            <span class="whitespace-nowrap text-ellipsis overflow-hidden max-w-[40vw]">{{
              data.currentItem.name
            }}</span>
            <div class="text-[12px] text-[color:var(--second-text-color)] flex">
              <div class="mr-3.5 relative">{{ _duration(data.currentItem.duration) }}</div>
            </div>
          </div>
        </div>
        <div>
          <dy-button type="primary" size="small" @click="_no">使用</dy-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { userCollect } from '@/api/user'

import { onMounted, onUnmounted, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav.js'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _duration, _no } from '@/utils'

defineOptions({
  name: 'MusicCollect'
})

const store = useBaseStore()
const nav = useNav()
const data = reactive({
  loading: false,
  list: [],
  audio: new Audio(),
  currentItem: null,
  step: null,
  process: 0
})

onMounted(() => {
  getData()
  data.audio.addEventListener('loadedmetadata', () => {
    data.currentItem.duration = data.audio.duration
    data.step = store.bodyWidth / Math.floor(data.audio.duration)
  })
  data.audio.addEventListener('timeupdate', (e: any) => {
    data.process = Math.ceil(e.target.currentTime) * data.step
  })
})

onUnmounted(stopPlay)

async function getData() {
  data.loading = true
  let res: any = await userCollect()
  data.loading = false
  if (res.success) {
    data.list = res.data.music.list
  }
}

function togglePlay(item, list) {
  list.map((v) => {
    if (v.name !== item.name) {
      v.is_play = false
    }
  })
  item.is_play = !item.is_play
  if (item.is_play) {
    if (data.currentItem) {
      if (data.currentItem.name !== item.name) {
        data.audio.pause()
        data.audio.src = item.mp3
        data.audio.currentTime = 0
      }
    } else {
      data.audio.pause()
      data.audio.src = item.mp3
      data.audio.currentTime = 0
    }
    data.audio.play()
    data.audio.addEventListener('ended', () => (item.is_play = false))
  } else {
    stopPlay()
  }
  data.currentItem = item
}

function stopPlay() {
  data.audio.pause()
  // data.audio.currentTime = 0
  data.audio.removeEventListener('ended', null)
}
</script>

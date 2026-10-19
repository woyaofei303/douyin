<script setup>
import { reactive, ref, watch } from 'vue'
import { _checkImgUrl, _duration, _formatNumber, _stopPropagation } from '@/utils'
import { recommendedLongVideo } from '@/api/videos'
import ScrollList from '@/components/ScrollList.vue'
import { useNav } from '@/utils/hooks/useNav'

const props = defineProps({
  active: Boolean
})

const playingEl = ref()
const state = reactive({
  show: false,
  muted: true,
  danmu: false
})

watch(
  () => props.active,
  (n) => {
    if (n) {
      if (state.show) {
        let el = playingEl.value
        if (el) {
          delete el.parentNode.parentNode.dataset.paused
          el.play()
        }
      } else {
        state.show = true
      }
    } else {
      let el = playingEl.value
      if (el) {
        el.parentNode.parentNode.dataset.paused = 'true'
        el.pause()
      }
    }
  },
  { immediate: true }
)

const obList = []

const vIsCanPlay = {
  mounted(el) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let videoEls = document.querySelectorAll('[data-long-video] video')
          videoEls.forEach((item) => {
            item.pause()
            if (item.parentNode?.parentNode) {
              item.parentNode.parentNode.dataset.paused = 'true'
            }
          })
          delete el.parentNode.parentNode.dataset.paused
          el.play()
          playingEl.value = el
        } else {
          el.parentNode.parentNode.dataset.paused = 'true'
          el.pause()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    obList.push(observer)
  },
  unmounted() {
    obList.map((v) => {
      v.disconnect()
    })
  }
}

const nav = useNav()
</script>

<template>
  <div
    data-long-video=""
    class="text-[14px] text-white pt-[var(--home-header-height)] bg-[#151724]"
    @dragstart="(e) => _stopPropagation(e)"
  >
    <ScrollList
      class="h-[calc(var(--vh,_1vh)_*_100_-_var(--home-header-height)_-_var(--footer-height))]!"
      v-if="state.show"
      :api="recommendedLongVideo"
    >
      <template v-slot="{ list }">
        <div class="grid [grid-template-columns:repeat(2,_1fr)] gap-y-3.75 box-border">
          <div
            class="group/item flex flex-col gap-2 relative"
            :class="[
              i % 9 === 0 ? 'my-0' : 'my-0',
              !(i % 9 === 0) && i % 2 === 1 ? 'mr-1.25' : i % 9 === 0 ? 'mr-0' : 'mr-2.5',
              !(i % 9 === 0) && i % 2 === 0 ? 'ml-1.25' : i % 9 === 0 ? 'ml-0' : 'ml-2.5',
              i % 9 === 0 ? '[grid-column-start:1] [grid-column-end:3]' : ''
            ]"
            @click="nav('/video-detail', {}, { list, index: i })"
            :key="i"
            v-for="(item, i) in list"
          >
            <div class="h-55 relative" v-if="i % 9 === 0">
              <video
                class="w-full h-full object-cover"
                muted
                preload
                loop
                x5-video-player-type="h5-page"
                :x5-video-player-fullscreen="false"
                :webkit-playsinline="true"
                :x5-playsinline="true"
                :playsinline="true"
                :fullscreen="false"
                v-is-can-play
                :poster="_checkImgUrl(item.video.cover.url_list[0])"
                :src="item.video.play_addr.url_list[0]"
              ></video>
              <div
                class="w-full box-border flex absolute bottom-2 justify-between items-center text-white px-3 py-0"
                :class="[i % 9 === 0 ? 'group-data-[paused=true]/item:hidden' : '']"
              >
                <div></div>
                <div class="flex items-center gap-2.5">
                  <div @click.stop="state.danmu = !state.danmu">
                    <img class="w-5" v-if="state.danmu" src="@/assets/img/icon/danmu-open.svg" />
                    <img class="w-5" v-else src="@/assets/img/icon/danmu-close.svg" />
                  </div>
                  <div @click.stop="state.muted = !state.muted">
                    <Icon class="text-[20px]" v-if="state.muted" icon="charm:sound-mute" />
                    <Icon class="text-[20px]" v-else icon="akar-icons:sound-on" />
                  </div>
                  <div>
                    <img class="w-5" src="@/assets/img/icon/rotate.svg" />
                  </div>
                </div>
              </div>
            </div>
            <img
              class="rounded-[12px] w-full h-35 object-cover"
              v-else
              v-lazy="_checkImgUrl(item.video.cover.url_list[0])"
              alt=""
            />
            <div
              class="text-white absolute right-2.5 text-[13px]"
              :class="[
                i % 9 === 0 ? 'bottom-16.75' : 'bottom-20',
                i % 9 === 0 ? 'group-data-[paused=true]/item:block' : '',
                i % 9 === 0 ? 'hidden' : ''
              ]"
            >
              {{ _duration(item.duration / 1000) }}
            </div>
            <div
              class="text-white text-[14px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]"
              :class="[
                i % 9 === 0 ? 'h-[unset] [-webkit-line-clamp:1]' : 'h-9 [-webkit-line-clamp:2]',
                i % 9 === 0 ? 'px-2.5 py-0' : ''
              ]"
            >
              {{ item.desc }}
            </div>
            <div
              class="text-[gray] flex items-center justify-between gap-1.25 text-[13px]"
              :class="[i % 9 === 0 ? 'px-2.5 py-0' : '']"
            >
              <div class="flex items-center justify-start gap-1.25">
                <img
                  class="w-5 h-5 object-cover rounded-[50%]"
                  v-lazy="_checkImgUrl(item.author.avatar_168x168.url_list[0])"
                  alt=""
                />
                <div
                  class="overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1]"
                >
                  {{ item.author.nickname }}
                </div>
              </div>
              <div class="[word-break:keep-all] flex items-center justify-between gap-1.25">
                <Icon class="text-[16px]" icon="icon-park-outline:like" />
                <div>
                  {{ _formatNumber(item.statistics.digg_count) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ScrollList>
  </div>
</template>

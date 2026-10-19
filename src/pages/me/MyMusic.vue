<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]">
    <div
      class="z-9 fixed w-full top-0 h-12.5 flex items-center justify-between box-border px-[var(--page-padding)] py-0"
    >
      <dy-back class="z-10" mode="light" img="back" @click="router.back()" />
      <IndicatorLight
        class="w-[60vw]!"
        name="myMusicList"
        :tabTexts="['猜你爱听', '我的收藏']"
        v-model:active-index="data.slideIndex"
      >
      </IndicatorLight>
      <dy-back class="opacity-0" mode="light" img="back" />
    </div>
    <SlideHorizontal name="myMusicList" v-model:index="data.slideIndex">
      <SlideItem data-slide-item="">
        <GuessMusic :list="data.guessMusic" />
      </SlideItem>
      <SlideItem data-slide-item="" class="overflow-auto">
        <Loading class="left-[150%]!" v-if="data.loading" />
        <div class="touch-pan-y mt-12.5 text-[rgba(88,_88,_96)] relative" v-else>
          <div class="pt-[var(--page-padding)] pb-20 px-[var(--page-padding)]">
            <div class="mb-5 flex justify-between items-center text-white">
              <div class="flex items-center">
                <img class="w-7.5 mr-2.5" src="../../assets/img/icon/me/play-all.webp" alt="" />
                <span>播放全部</span>
                <span class="text-[13px] text-[gray] ml-1.25">(2)</span>
              </div>
              <img class="h-5" src="../../assets/img/icon/menu-white.png" alt="" />
            </div>
            <div>
              <div
                class="text-white flex justify-between mb-3.75"
                :key="index"
                v-for="(item, index) in data.collectMusic"
                @click="page2PlayMusic(item)"
              >
                <div class="flex">
                  <div class="mr-2.5 relative flex items-center justify-center">
                    <img
                      class="rounded-[2px] w-15 object-cover h-15"
                      v-lazy="_checkImgUrl(item.cover)"
                      alt=""
                    />
                  </div>
                  <div class="flex flex-col justify-between">
                    <span class="whitespace-nowrap text-ellipsis overflow-hidden max-w-[40vw]">{{
                      item.name
                    }}</span>
                    <div class="text-[12px] text-[color:var(--second-text-color)]">
                      {{ item.author }}
                    </div>
                    <div
                      class="text-[12px] text-[color:var(--second-text-color)] flex items-center"
                    >
                      <div
                        class="text-[10px] bg-[var(--second-btn-color-tran)] mr-1.25 px-1.25 py-0.5"
                      >
                        完整版
                      </div>
                      <div class="mr-3.5 relative">{{ _duration(item.duration) }}</div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <img
                    class="w-6"
                    v-if="data.page2SlideIndex === index"
                    src="../../assets/img/icon/me/pinlv.gif"
                  />
                </div>
              </div>
            </div>
            <div class="text-white flex items-center justify-between mx-0 my-7.5">
              <span>推荐收藏</span>
              <div class="flex items-center justify-between">
                <span class="text-[13px] text-[color:var(--second-text-color)] mr-2.5"
                  >自动播放</span
                >
                <switches v-model="data.isAutoPlay" theme="bootstrap" color="success"></switches>
              </div>
            </div>
            <div>
              <div
                class="text-white flex justify-between mb-3.75"
                :key="index"
                v-for="(item, index) in data.recommendMusic"
                @click="page2PlayMusic(item)"
              >
                <div class="flex">
                  <div class="mr-2.5 relative flex items-center justify-center">
                    <img
                      class="rounded-[2px] w-15 object-cover h-15"
                      v-lazy="_checkImgUrl(item.cover)"
                      alt=""
                    />
                  </div>
                  <div class="flex flex-col justify-between">
                    <span class="whitespace-nowrap text-ellipsis overflow-hidden max-w-[40vw]">{{
                      item.name
                    }}</span>
                    <div class="text-[12px] text-[color:var(--second-text-color)]">
                      {{ item.author }}
                    </div>
                    <div
                      class="text-[12px] text-[color:var(--second-text-color)] flex items-center"
                    >
                      <div
                        class="text-[10px] bg-[var(--second-btn-color-tran)] mr-1.25 px-1.25 py-0.5"
                      >
                        完整版
                      </div>
                      <div class="mr-3.5 relative">{{ _duration(item.duration) }}</div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <img
                    class="w-6"
                    v-if="data.page2SlideIndex - data.collectMusic.length === index"
                    src="../../assets/img/icon/me/pinlv.gif"
                  />
                  <div class="ml-7.5">
                    <img
                      class="w-6"
                      src="../../assets/img/icon/star-white.png"
                      v-show="!item.isCollect"
                      @click.stop="item.isCollect = !item.isCollect"
                    />
                    <img
                      class="w-6"
                      src="../../assets/img/icon/star-yellow.png"
                      v-show="item.isCollect"
                      @click.stop="item.isCollect = !item.isCollect"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <transition
            enter-from-class="[transition-duration:200ms] [transform:translateY(100%)]"
            enter-active-class="[transition-duration:200ms] [transform:translateY(0)]"
            enter-to-class=""
            leave-from-class=""
            leave-active-class="[transition-duration:200ms] [transform:translateY(0)]"
            leave-to-class="[transition-duration:200ms] [transform:translateY(100%)]"
            move-class=""
          >
            <div
              class="box-border fixed bottom-0 w-full text-white bg-[rgba(56,_59,_68)] px-[var(--page-padding)] py-0"
              v-if="data.isShowFloatPlay"
              @click="data.isShowCollectDialog = true"
            >
              <div class="[transform:translateY(-10px)] flex justify-between items-center">
                <div class="bg-[rgba(56,_59,_68)] rounded-[50%] p-1.75">
                  <img
                    class="bg-[rgba(97,_98,_103)] h-12.5 w-12.5 object-cover rounded-[50%] p-0.75"
                    v-lazy="_checkImgUrl(data.currentMusic.cover)"
                    alt=""
                  />
                </div>
                <div class="flex-[1] mx-2.5 my-0">{{ data.currentMusic.name }}</div>
                <img
                  class="w-9.5 h-9.5 mr-5"
                  v-show="data.page2IsPlay"
                  @click.stop="togglePage2Play"
                  src="../../assets/img/icon/me/float-pause-one.png"
                  alt=""
                />
                <img
                  class="w-9.5 h-9.5 mr-5"
                  v-show="!data.page2IsPlay"
                  @click.stop="togglePage2Play"
                  src="../../assets/img/icon/me/float-play.png"
                  alt=""
                />
                <img
                  class="w-7 h-7"
                  @click.stop="_no"
                  src="../../assets/img/icon/me/music-list.png"
                  alt=""
                />
              </div>
            </div>
          </transition>
        </div>
      </SlideItem>
    </SlideHorizontal>
    <transition
      enter-from-class="[transition-duration:300ms] [transform:translateY(calc(var(--vh,_1vh)_*_100))]"
      enter-active-class="[transition-duration:300ms] [transform:translateY(0)]"
      enter-to-class=""
      leave-from-class=""
      leave-active-class="[transition-duration:300ms] [transform:translateY(0)]"
      leave-to-class="[transition-duration:300ms] [transform:translateY(calc(var(--vh,_1vh)_*_100))]"
      move-class=""
    >
      <div
        class="fixed z-11 w-full h-[calc(var(--vh,_1vh)_*_100)] top-0 bg-[#888485]"
        v-show="data.isShowCollectDialog"
      >
        <div
          class="z-9 text-[16px] fixed top-0 w-full box-border h-12.5 flex items-center justify-between p-[var(--page-padding)]"
        >
          <dy-back
            class="[transform:rotate(-90deg)]"
            mode="light"
            img="back"
            @click="data.isShowCollectDialog = false"
          />
          <span>我的收藏</span>
          <dy-back class="[transform:rotate(-90deg)] opacity-0" mode="light" img="back" />
        </div>
        <CollectMusic
          ref="CollectMusic"
          :list="page2Music"
          v-model:page2SlideIndex="data.page2SlideIndex"
        />
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import Switches from '../message/components/swtich/switches.vue'
import IndicatorLight from '../../components/slide/IndicatorLight.vue'
import GuessMusic from './components/GuessMusic.vue'
import Loading from '../../components/Loading.vue'
import { userCollect } from '@/api/user'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { _checkImgUrl, _duration, _no } from '@/utils'

defineOptions({
  name: 'MyMusic'
})

const router = useRouter()
const CollectMusic = ref()
const data = reactive({
  loading: false,
  slideIndex: 1,
  currentMusic: {
    name: '告白气球',
    mp3: 'https://mp32.9ku.com/upload/128/2017/02/05/858423.mp3',
    cover: new URL('../../assets/img/music-cover/7.jpg', import.meta.url).href,
    author: '周杰伦',
    duration: 60,
    use_count: 37441000,
    is_collect: false,
    is_play: false
  },
  collectMusic: [],
  recommendMusic: [],
  guessMusic: [],

  isShowCollectDialog: false,
  isShowFloatPlay: false,

  isAutoPlay: true,
  isCollect: false,

  page2SlideIndex: -1,
  page2IsPlay: false
})
//TODO 两个page页面的播放冲突未做
onMounted(() => {
  getCollectMusic()
})

const page2Music = computed(() => {
  return data.collectMusic.concat(data.recommendMusic)
})

function togglePage2Play() {
  data.page2IsPlay = !data.page2IsPlay
  if (data.page2IsPlay) {
    CollectMusic.value.play(data.page2SlideIndex)
  } else {
    CollectMusic.value.pause()
  }
}

function page2PlayMusic(item) {
  data.currentMusic = item
  data.isShowFloatPlay = true
  data.page2IsPlay = true
  data.page2SlideIndex = page2Music.value.findIndex((v) => v.name === item.name)
  data.isShowCollectDialog = true
  CollectMusic.value.play(data.page2SlideIndex)
}

async function getCollectMusic() {
  data.loading = true
  let res: any = await userCollect()
  data.loading = false
  if (res.success) {
    data.collectMusic = res.data.music.list.slice(0, 2)
    data.guessMusic = data.recommendMusic = res.data.music.list.slice(2, -1)
  }
}
</script>

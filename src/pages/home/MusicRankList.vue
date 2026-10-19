<template>
  <div
    class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]"
    @scroll="scroll"
  >
    <dy-back
      class="fixed left-2.5 top-5 z-3"
      mode="light"
      img="back"
      @click="router.back()"
      direction="left"
    />
    <div
      class="bg-[var(--main-bg)] w-full fixed z-2 h-15 flex items-center justify-center"
      :style="fixedStyle"
    >
      <span class="text-[16px]">抖音音乐榜</span>
    </div>
    <!--    indicator没有像me页面那样做，应该那样做-->
    <div class="flex flex-col items-center">
      <div class="relative flex justify-center">
        <img class="w-[100vw]" src="../../assets/img/icon/music-rank-list.webp" alt="" />
        <div class="absolute bg-[rgba(172,_107,_251,_0.5)] bottom-5 rounded-[1px] px-7.5 py-0.5">
          更新于：{{ _dateFormat(data.updateTime, 'D') }}
        </div>
      </div>
      <Indicator
        class="w-[85%]!"
        name="musicRankList"
        tabStyleWidth="33%"
        :tabTexts="['热歌榜', '飙升樘', '原创榜']"
        v-model:active-index="data.contentIndex"
      >
      </Indicator>
      <SlideHorizontal name="musicRankList" v-model:index="data.contentIndex">
        <SlideItem data-slide-item="">
          <div>
            <div
              class="pt-5 pb-0 flex flex-col px-3.75"
              :key="index"
              v-for="(item, index) in data.hotList"
              @click="togglePlay(item, data.hotList)"
            >
              <div class="flex items-center">
                <div>
                  <img
                    class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75"
                    v-if="index === 0"
                    src="../../assets/img/icon/rank1.webp"
                    alt=""
                  />
                  <img
                    class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75"
                    v-else-if="index === 1"
                    src="../../assets/img/icon/rank2.webp"
                    alt=""
                  />
                  <img
                    class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75"
                    v-else-if="index === 2"
                    src="../../assets/img/icon/rank3.webp"
                    alt=""
                  />
                  <div class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75" v-else>
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="flex-[1] flex items-center justify-between">
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
                        src="../../assets/img/icon/play-white.png"
                        alt=""
                      />
                      <img
                        class="w-7.5 h-7.5 absolute"
                        v-if="item.is_play"
                        src="../../assets/img/icon/pause-white.png"
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
                      <div class="text-[12px] text-[color:var(--second-text-color)] flex">
                        <div
                          class="mr-3.5 relative after:content-[''] after:absolute after:w-[1.5px] after:h-[1.5px] after:rounded-[50%] after:bg-white after:-right-1.75 after:top-1.75"
                        >
                          {{ _duration(item.duration) }}
                        </div>
                        <div>{{ _formatNumber(item.use_count) }}人使用</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      class="w-5 h-5 ml-5"
                      v-if="item.is_collect"
                      src="../../assets/img/icon/star-yellow.png"
                      alt=""
                      @click.stop="toggleCollect(item)"
                    />
                    <img
                      class="w-5 h-5 ml-5"
                      v-else
                      src="../../assets/img/icon/star-white.png"
                      alt=""
                      @click.stop="toggleCollect(item)"
                    />
                    <img
                      class="w-5 h-5 ml-5"
                      src="../../assets/img/icon/menu2-white.png"
                      alt=""
                      @click.stop="nav('/home/music')"
                    />
                  </div>
                </div>
              </div>
              <div
                class="bg-[var(--second-btn-color-tran)] ml-8.25 mt-3.75 flex justify-between items-center relative px-3.75 py-2.5"
                v-if="item.is_collect"
              >
                <div class="flex">
                  <img
                    class="w-8.75 h-8.75 mr-2.5 rounded-[50%]"
                    src="../../assets/img/music-cover/2.jpg"
                    alt=""
                  />
                  <div>
                    <div>{{ item.author }}</div>
                    <div>粉丝：83.4w</div>
                  </div>
                </div>
                <dy-button class="w-15! h-6.25!" type="primary">关注</dy-button>
                <div
                  class="w-0 h-0 border-t-[transparent] border-r-[transparent] border-b-[var(--second-btn-color-tran)] border-l-[transparent] absolute left-5 -top-3.75 border-[8px] border-solid"
                ></div>
              </div>
            </div>
          </div>
        </SlideItem>
        <SlideItem data-slide-item="">
          <div>
            <div
              class="pt-5 pb-0 flex flex-col px-3.75"
              :key="index"
              v-for="(item, index) in data.hotList"
              @click="togglePlay(item, data.hotList)"
            >
              <div class="flex items-center">
                <div>
                  <img
                    class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75"
                    v-if="index === 0"
                    src="../../assets/img/icon/rank1.webp"
                    alt=""
                  />
                  <img
                    class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75"
                    v-else-if="index === 1"
                    src="../../assets/img/icon/rank2.webp"
                    alt=""
                  />
                  <img
                    class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75"
                    v-else-if="index === 2"
                    src="../../assets/img/icon/rank3.webp"
                    alt=""
                  />
                  <div class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75" v-else>
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="flex-[1] flex items-center justify-between">
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
                        src="../../assets/img/icon/play-white.png"
                        alt=""
                      />
                      <img
                        class="w-7.5 h-7.5 absolute"
                        v-if="item.is_play"
                        src="../../assets/img/icon/pause-white.png"
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
                      <div class="text-[12px] text-[color:var(--second-text-color)] flex">
                        <div
                          class="mr-3.5 relative after:content-[''] after:absolute after:w-[1.5px] after:h-[1.5px] after:rounded-[50%] after:bg-white after:-right-1.75 after:top-1.75"
                        >
                          {{ _duration(item.duration) }}
                        </div>
                        <div>{{ _formatNumber(item.use_count) }}人使用</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      class="w-5 h-5 ml-5"
                      v-if="item.is_collect"
                      src="../../assets/img/icon/star-yellow.png"
                      alt=""
                      @click.stop="toggleCollect(item)"
                    />
                    <img
                      class="w-5 h-5 ml-5"
                      v-else
                      src="../../assets/img/icon/star-white.png"
                      alt=""
                      @click.stop="toggleCollect(item)"
                    />
                    <img
                      class="w-5 h-5 ml-5"
                      src="../../assets/img/icon/menu2-white.png"
                      alt=""
                      @click.stop="nav('/home/music')"
                    />
                  </div>
                </div>
              </div>
              <div
                class="bg-[var(--second-btn-color-tran)] ml-8.25 mt-3.75 flex justify-between items-center relative px-3.75 py-2.5"
                v-if="item.is_collect"
              >
                <div class="flex">
                  <img
                    class="w-8.75 h-8.75 mr-2.5 rounded-[50%]"
                    src="../../assets/img/music-cover/2.jpg"
                    alt=""
                  />
                  <div>
                    <div>{{ item.author }}</div>
                    <div>粉丝：83.4w</div>
                  </div>
                </div>
                <dy-button class="w-15! h-6.25!" type="primary">关注</dy-button>
                <div
                  class="w-0 h-0 border-t-[transparent] border-r-[transparent] border-b-[var(--second-btn-color-tran)] border-l-[transparent] absolute left-5 -top-3.75 border-[8px] border-solid"
                ></div>
              </div>
            </div>
          </div>
        </SlideItem>
        <SlideItem data-slide-item="">
          <div>
            <div
              class="pt-5 pb-0 flex flex-col px-3.75"
              :key="index"
              v-for="(item, index) in data.hotList"
              @click="togglePlay(item, data.hotList)"
            >
              <div class="flex items-center">
                <div>
                  <img
                    class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75"
                    v-if="index === 0"
                    src="../../assets/img/icon/rank1.webp"
                    alt=""
                  />
                  <img
                    class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75"
                    v-else-if="index === 1"
                    src="../../assets/img/icon/rank2.webp"
                    alt=""
                  />
                  <img
                    class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75"
                    v-else-if="index === 2"
                    src="../../assets/img/icon/rank3.webp"
                    alt=""
                  />
                  <div class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75" v-else>
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="flex-[1] flex items-center justify-between">
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
                        src="../../assets/img/icon/play-white.png"
                        alt=""
                      />
                      <img
                        class="w-7.5 h-7.5 absolute"
                        v-if="item.is_play"
                        src="../../assets/img/icon/pause-white.png"
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
                      <div class="text-[12px] text-[color:var(--second-text-color)] flex">
                        <div
                          class="mr-3.5 relative after:content-[''] after:absolute after:w-[1.5px] after:h-[1.5px] after:rounded-[50%] after:bg-white after:-right-1.75 after:top-1.75"
                        >
                          {{ _duration(item.duration) }}
                        </div>
                        <div>{{ _formatNumber(item.use_count) }}人使用</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      class="w-5 h-5 ml-5"
                      v-if="item.is_collect"
                      src="../../assets/img/icon/star-yellow.png"
                      alt=""
                      @click.stop="toggleCollect(item)"
                    />
                    <img
                      class="w-5 h-5 ml-5"
                      v-else
                      src="../../assets/img/icon/star-white.png"
                      alt=""
                      @click.stop="toggleCollect(item)"
                    />
                    <img
                      class="w-5 h-5 ml-5"
                      src="../../assets/img/icon/menu2-white.png"
                      alt=""
                      @click.stop="nav('/home/music')"
                    />
                  </div>
                </div>
              </div>
              <div
                class="bg-[var(--second-btn-color-tran)] ml-8.25 mt-3.75 flex justify-between items-center relative px-3.75 py-2.5"
                v-if="item.is_collect"
              >
                <div class="flex">
                  <img
                    class="w-8.75 h-8.75 mr-2.5 rounded-[50%]"
                    src="../../assets/img/music-cover/2.jpg"
                    alt=""
                  />
                  <div>
                    <div>{{ item.author }}</div>
                    <div>粉丝：83.4w</div>
                  </div>
                </div>
                <dy-button class="w-15! h-6.25!" type="primary">关注</dy-button>
                <div
                  class="w-0 h-0 border-t-[transparent] border-r-[transparent] border-b-[var(--second-btn-color-tran)] border-l-[transparent] absolute left-5 -top-3.75 border-[8px] border-solid"
                ></div>
              </div>
            </div>
          </div>
        </SlideItem>
      </SlideHorizontal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, onDeactivated, onMounted, onUnmounted, reactive } from 'vue'
import { _checkImgUrl, _dateFormat, _duration, _formatNumber, _notice } from '@/utils/index.jsx'
import { useNav } from '@/utils/hooks/useNav'

defineOptions({
  name: 'MusicRankList'
})
const router = useRouter()
const nav = useNav()
const data = reactive({
  contentIndex: 0,
  hotList: [
    {
      name: '龙卷风',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/5605.mp3',
      cover: new URL('../../assets/img/music-cover/1.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 99,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '爱在西元前',
      mp3: 'https://m3.8js.net:99/1916/501204165042405.mp3',
      cover: new URL('../../assets/img/music-cover/2.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '蜗牛',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/3684.mp3',
      cover: new URL('../../assets/img/music-cover/3.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '半岛铁盒',
      mp3: 'https://m3.8js.net:99/2016n/46/94745.mp3',
      cover: new URL('../../assets/img/music-cover/4.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '轨迹',
      mp3: 'https://m3.8js.net:99/1832/411204324135934.mp3',
      cover: new URL('../../assets/img/music-cover/5.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '七里香',
      mp3: 'https://m3.8js.net:99/2016n/14/53717.mp3',
      cover: new URL('../../assets/img/music-cover/6.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '发如雪',
      mp3: 'https://m3.8js.net:99/2014/211204142150965.mp3',
      cover: new URL('../../assets/img/music-cover/7.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '霍元甲',
      mp3: 'https://m3.8js.net:99/1921/261204212643140.mp3',
      cover: new URL('../../assets/img/music-cover/8.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '千里之外(周杰伦/费玉清)',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/121.mp3',
      cover: new URL('../../assets/img/music-cover/9.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '菊花台',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/2022.mp3',
      cover: new URL('../../assets/img/music-cover/10.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '不能说的秘密',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/165.mp3',
      cover: new URL('../../assets/img/music-cover/11.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '牛仔很忙',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/219.mp3',
      cover: new URL('../../assets/img/music-cover/12.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '给我一首歌的时间',
      mp3: 'https://m3.8js.net:99/1938/041204380445445.mp3',
      cover: new URL('../../assets/img/music-cover/18.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '烟花易冷',
      mp3: 'https://m3.8js.net:99/1828/051204280535192.mp3',
      cover: new URL('../../assets/img/music-cover/14.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '惊叹号',
      mp3: 'https://m3.8js.net:99/20111103/150.mp3',
      cover: new URL('../../assets/img/music-cover/15.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '明明就',
      mp3: 'https://m3.8js.net:99/2016n/27/96537.mp3',
      cover: new URL('../../assets/img/music-cover/16.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '算什么男人',
      mp3: 'https://m3.8js.net:99/20150107/429.mp3',
      cover: new URL('../../assets/img/music-cover/17.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '告白气球',
      mp3: 'https://m3.8js.net:99/20161016/481.mp3',
      cover: new URL('../../assets/img/music-cover/18.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    }
  ],
  updateTime: Date.now(),
  audio: new Audio(),
  scrollTop: -1
})

const fixedStyle = computed(() => {
  return {
    opacity: data.scrollTop / 120 > 1 ? 1 : data.scrollTop / 120
  }
})

onMounted(() => {
  data.hotList = data.hotList.concat(data.hotList).concat(data.hotList).concat(data.hotList)
  data.hotList = data.hotList.slice(0, 50)
})

onUnmounted(stopPlay)
onDeactivated(stopPlay)

function scroll(e) {
  data.scrollTop = e.target.scrollTop
}

function toggleCollect(item) {
  item.is_collect = !item.is_collect
  if (item.is_collect) {
    _notice('收藏成功')
  } else {
    _notice('取消收藏')
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
    data.audio.pause()
    data.audio.src = item.mp3
    data.audio.currentTime = 0
    data.audio.play()
    data.audio.addEventListener('ended', () => (item.is_play = false))
  } else {
    stopPlay()
  }
}

function stopPlay() {
  data.audio.pause()
  data.audio.currentTime = 0
  data.audio.removeEventListener('ended', null)
}
</script>

<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]" id="Music">
    <div
      class="fixed z-9 top-0 bg-[var(--main-bg)] w-full box-border h-15 flex justify-between items-center px-3.75 py-0"
    >
      <dy-back mode="light" @click="router.back()" />
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
          class="text-[13px] absolute left-[50%] [transform:translateX(-50%)]"
          v-if="data.isFixed"
        >
          <span class="text-[16px]">{{ data.music.name }}</span>
        </div>
      </transition>
      <div class="flex items-center">
        <!--        TODO 没有淡入淡出的特效-->
        <template v-if="data.isFixed">
          <img
            class="w-6 h-6 ml-3.75"
            v-if="data.isCollect"
            src="../../assets/img/icon/star-yellow.png"
            @click.stop="toggleCollect()"
          />
          <img
            class="w-6 h-6 ml-3.75"
            v-else
            src="../../assets/img/icon/star-white.png"
            @click.stop="toggleCollect()"
          />
        </template>
        <div
          class="[background:linear-gradient(to_bottom,_#794cff_5%,_#4c3efe_50%)] w-20 h-5 rounded-[10px] flex items-center justify-center text-[10px]"
          v-if="!data.isFixed"
          @click="nav('/home/music-rank-list')"
        >
          抖音音乐榜
        </div>
        <img
          class="w-6 h-6 ml-3.75"
          src="../../assets/img/icon/share-white.png"
          @click="data.isSharing = true"
        />
      </div>
    </div>
    <div class="pt-15">
      <Scroll
        class="h-[calc(var(--vh,_1vh)_*_100_-_60px)]!"
        :fixedHeight="180"
        @fixed="(e) => (data.isFixed = e)"
        @pulldown="loadData"
      >
        <div class="pt-2.5 pb-7.5 flex h-30 px-3.75">
          <div class="relative flex items-center justify-center" @click="togglePlay()">
            <img
              class="w-30 object-cover h-full rounded-[3px]"
              :src="_checkImgUrl(data.music.cover)"
              alt=""
            />
            <img
              class="w-10 h-10 absolute"
              v-if="!data.isPlay"
              src="../../assets/img/icon/play-white.png"
              alt=""
            />
            <img
              class="w-10 h-10 absolute"
              v-if="data.isPlay"
              src="../../assets/img/icon/pause-white.png"
              alt=""
            />
          </div>
          <div class="ml-3.75 flex flex-col justify-between">
            <div class="text-[18px] text-[#fff] font-bold mb-2.5">{{ data.music.name }}</div>
            <div>
              <div class="text-[12px] mb-1.25 text-[#999999]">{{ data.music.author }}</div>
              <div class="text-[12px] mb-1.25 text-[#999999]">
                {{ _formatNumber(data.music.use_count) }} 人使用
              </div>
            </div>
            <div
              class="flex justify-center h-6.25 w-17.5 items-center text-[#ffffff] bg-[var(--second-btn-color)] rounded-[2px] text-[13px]"
              @click.stop="toggleCollect()"
            >
              <img
                class="mr-1.25 w-3.25 h-3.25"
                v-if="data.isCollect"
                src="../../assets/img/icon/star-yellow.png"
              />
              <img
                class="mr-1.25 w-3.25 h-3.25"
                v-else
                src="../../assets/img/icon/star-white.png"
              />
              <span>{{ data.isCollect ? '已' : '' }}收藏</span>
            </div>
          </div>
        </div>
        <Posters mode="music" :list="data.videos" />
        <Loading :is-full-screen="false" v-if="data.loading" />
        <NoMore v-else />
      </Scroll>
    </div>
    <div class="text-[14px] w-full fixed bottom-5 flex justify-center">
      <div
        class="w-35 rounded-[50px] flex items-center justify-center text-black bg-white mx-1.25 px-0 py-3.75"
        @click="_no"
      >
        <img class="w-5 h-5 mr-1.25" src="../../assets/img/icon/home/music3.png" alt="" />
        <span>分享到日常</span>
      </div>
      <div
        class="w-35 rounded-[50px] flex items-center justify-center bg-[var(--primary-btn-color)] text-white mx-1.25 px-0 py-3.75"
        @click="_no"
      >
        <img class="w-5 h-5 mr-1.25" src="../../assets/img/icon/home/record.png" alt="" />
        <span>拍同款</span>
      </div>
    </div>

    <Share
      v-model="data.isSharing"
      mode="music"
      ref="share"
      pageId="Music"
      @showDouyinCode="data.showDouyinCode = true"
      @showShare2WeChatZone="data.shareType = 2"
      @share2WeChat="data.shareType = 3"
      @share2QQZone="data.shareType = 4"
      @share2QQ="data.shareType = 5"
      @share2Webo="data.shareType = 8"
      @ShareToFriend="delayShowDialog(() => (data.shareToFriend = true))"
    />

    <DouyinCode v-model="data.showDouyinCode" />

    <ConfirmDialog
      v-model:visible="data.showSharePassword"
      title="你的口令已复制"
      subtitle="0F.:/ a【风就应该自由要什么归宿】长按复制此条消息，打开抖音搜索，聆听音乐##kwu3VCixHl8##[抖音口令]"
      :okText="data.okText"
      cancelText="不分享了"
      @ok="data.shareType = -1"
      @cancel="data.shareType = -1"
    >
      <template v-slot:header>
        <img class="w-full" src="../../assets/img/icon/share-password.webp" alt="" />
      </template>
    </ConfirmDialog>

    <ShareToFriend pageId="Music" v-model="data.shareToFriend" />
  </div>
</template>
<script setup lang="ts">
import Posters from '../../components/Posters.vue'
import Scroll from '../../components/Scroll.vue'
import Loading from '../../components/Loading.vue'
import Share from '../../components/Share.vue'
import DouyinCode from '../../components/DouyinCode.vue'
import ConfirmDialog from '../../components/dialog/ConfirmDialog.vue'
import ShareToFriend from './components/ShareToFriend.vue'
import { myVideo } from '@/api/videos'
import { onDeactivated, onMounted, onUnmounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNav } from '@/utils/hooks/useNav'
import { _checkImgUrl, _formatNumber, _no, _notice } from '@/utils'

const route = useRoute()
const router = useRouter()
const nav = useNav()

const data = reactive({
  loading: false,
  isFixed: false,
  isCollect: false,
  isPlay: false,
  isSharing: false,
  okText: '',

  showSharePassword: false,
  shareToFriend: false,
  shareType: -1,

  showDouyinCode: false,
  audio: new Audio(),
  total: 0,
  pageNo: 0,
  pageSize: 15,
  videos: [],

  music: {
    name: '发如雪',
    mp3: 'https://m3.8js.net:99/2014/211204142150965.mp3',
    cover: new URL('../../assets/img/music-cover/7.jpg', import.meta.url).href,
    author: '周杰伦',
    duration: 60,
    use_count: 37441000,
    is_collect: false,
    is_play: false
  }
})

watch(
  () => data.shareType,
  (newVal) => {
    if (newVal === -1) return
    data.showSharePassword = true
    switch (newVal) {
      case 2:
      case 3:
        return (data.okText = '去微信粘贴')
      case 4:
      case 5:
        return (data.okText = '去QQ粘贴')
      case 8:
        return (data.okText = '去微博粘贴')
    }
  }
)

onMounted(() => {
  if (route.query.name) {
    data.music = route.query as any
  }
  loadData(true)
})

onUnmounted(stopPlay)
onDeactivated(stopPlay)

function toggleCollect() {
  data.isCollect = !data.isCollect
}

async function loadData(init = false) {
  if (data.loading) return
  if (!init) {
    if (data.total <= data.videos.length) {
      _notice('暂时没有更多了')
    }
    data.pageNo++
  }
  data.loading = true
  let res: any = await myVideo({
    pageNo: data.pageNo,
    pageSize: data.pageSize
  })
  data.loading = false
  if (res.success) {
    data.videos = data.videos.concat(res.data.list)
    data.total = res.data.total
  }
}

function togglePlay() {
  data.isPlay = !data.isPlay
  if (data.isPlay) {
    if (!data.audio.src) {
      data.audio.src = data.music.mp3
    }
    data.audio.play()
    data.audio.addEventListener('ended', () => (data.isPlay = false))
  } else {
    stopPlay()
  }
}

function delayShowDialog(cb) {
  setTimeout(() => {
    cb()
  }, 100)
}

function stopPlay() {
  data.audio.pause()
  data.audio.removeEventListener('ended', null)
}
</script>

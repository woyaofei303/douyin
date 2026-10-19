<template>
  <div class="relative text-[14px] w-full h-full text-center" ref="videoWrapper">
    <Loading class="absolute!" v-if="state.loading" />
    <!--    <video :src="item.video + '?v=123'"-->
    <video
      class="max-w-full h-full [transition:height,_margin-top_0.3s]"
      :poster="poster"
      ref="videoEl"
      :muted="state.isMuted"
      preload="true"
      loop
      x5-video-player-type="h5-page"
      :x5-video-player-fullscreen="false"
      :webkit-playsinline="true"
      :x5-playsinline="true"
      :playsinline="true"
      :fullscreen="false"
      :autoplay="isPlay"
    >
      <source
        v-for="(urlItem, index) in item.video.play_addr.url_list"
        :key="index"
        :src="urlItem"
        type="video/mp4"
      />
      <p class="m-0 p-0">您的浏览器不支持 video 标签。</p>
    </video>
    <Icon
      class="w-15 h-15 opacity-30 absolute left-0 top-0 bottom-0 right-0 text-white animate-[dy-pause-animation-44a361_1.1s_linear] m-auto"
      icon="fluent:play-28-filled"
      v-if="!isPlaying"
    />
    <div class="absolute left-0 top-0 h-full w-full">
      <template v-if="isLive">
        <div
          class="absolute left-[50%] text-[18px] rounded-[50px] leading-[1] text-white top-[70%] [transform:translate(-50%,_-50%)] px-5 py-3.75 border border-[#e0e0e0] border-solid"
        >
          点击进入直播间
        </div>
        <ItemDesc :is-live="true" v-model:item="state.localItem" :position="position" />
      </template>
      <template v-else>
        <div
          :class="['', state.isMove ? 'opacity-0' : 'opacity-100']"
          class="absolute bottom-0 w-full [transition:all_0.3s]"
        >
          <template v-if="!state.commentVisible">
            <ItemToolbar v-model:item="state.localItem" />
            <ItemDesc v-model:item="state.localItem" />
          </template>
          <div class="flex items-center" v-if="isMy">
            <div>
              <div class="flex bg-[#82152c] rounded-[50px] mb-5 p-0.75">
                <img
                  class="w-9 h-9 rounded-[50%]"
                  src="../../assets/img/icon/head-image.jpeg"
                  alt=""
                />
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
                  <img
                    class="w-9 h-9 rounded-[50%]"
                    src="../../assets/img/icon/head-image.jpeg"
                    alt=""
                  />
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
        <div
          class="z-10 absolute -bottom-0.25 h-2.5 left-[calc((100%_-_90%)_/_2)] w-[90%] flex items-end mb-0.5"
          ref="progressEl"
          @click="null"
          @touchstart="touchstart"
          @touchmove="touchmove"
          @touchend="touchend"
        >
          <div
            class="absolute z-9 text-[24px] bottom-12.5 left-0 right-0 text-white text-center"
            v-if="state.isMove"
          >
            <span>{{ _duration(state.currentTime) }}</span>
            <span class="text-[darkgray]"> / {{ _duration(state.duration) }}</span>
          </div>
          <template v-if="state.duration > 15 || state.isMove || !isPlaying">
            <div
              class="[transition:height_0.3s] absolute w-full rounded-[10px]"
              :class="[
                progressClass === 'stop' ? 'h-1' : progressClass === 'move' ? 'h-2.5' : 'h-0.5',
                progressClass === 'move' ? 'bg-[var(--active-main-bg)]' : 'bg-[#4f4f4f]'
              ]"
            ></div>
            <div
              class="[transition:height_0.3s] w-12.5 rounded-[10px_0_0_10px] z-1"
              :class="[
                progressClass === 'stop'
                  ? 'h-1 bg-white'
                  : progressClass === 'move'
                    ? 'h-2.5 bg-[var(--second-text-color)]'
                    : 'h-[calc(2px_+_0.5px)] bg-[#777777]'
              ]"
              :style="durationStyle"
            ></div>
            <div
              class="[transition:all_0.2s] rounded-[50%] z-2 [transform:translate(-1px,_1px)]"
              :class="[
                progressClass === 'stop'
                  ? 'w-1.5 h-1.5 bg-white'
                  : progressClass === 'move'
                    ? 'w-3 h-3 bg-white'
                    : 'w-1 h-1 bg-[gray]'
              ]"
            ></div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { _checkImgUrl, _duration, _stopPropagation } from '@/utils'
import Loading from '../Loading.vue'
import ItemToolbar from './ItemToolbar.vue'
import ItemDesc from './ItemDesc.vue'
import bus, { EVENT_KEY } from '../../utils/bus'
import { SlideItemPlayStatus } from '@/utils/const_var'
import { computed, onMounted, onUnmounted, provide, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { _css } from '@/utils/dom'

defineOptions({
  name: 'BaseVideo'
})

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    }
  },
  position: {
    type: Object,
    default: () => {
      return {}
    }
  },
  //用于第一条数据，自动播放，如果都用事件去触发播放，有延迟
  isPlay: {
    type: Boolean,
    default: () => {
      return true
    }
  },
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

provide(
  'isPlaying',
  computed(() => isPlaying)
)
provide(
  'isMuted',
  computed(() => state.isMuted)
)
provide(
  'position',
  computed(() => props.position)
)
provide(
  'item',
  computed(() => props.item)
)

const videoEl = $ref<HTMLVideoElement>()
const progressEl = $ref<HTMLDivElement>()
let state = reactive({
  loading: false,
  paused: false,
  isMuted: window.isMuted,
  status: props.isPlay ? SlideItemPlayStatus.Play : SlideItemPlayStatus.Pause,
  duration: 0,
  step: 0,
  currentTime: -1,
  playX: 0,
  start: { x: 0 },
  last: { x: 0, time: 0 },
  height: 0,
  width: 0,
  isMove: false,
  ignoreWaiting: false, //忽略waiting事件。因为改变进度会触发waiting事件，烦的一批
  test: [1, 2],
  localItem: props.item,
  progressBarRect: {
    height: 0,
    width: 0
  },
  videoScreenHeight: 0,
  commentVisible: false
})
const poster = $computed(() => {
  return _checkImgUrl(props.item.video.poster ?? props.item.video.cover.url_list[0])
})
const durationStyle = $computed(() => {
  return { width: state.playX + 'px' }
})
const isPlaying = $computed(() => {
  return state.status === SlideItemPlayStatus.Play
})
const progressClass = $computed(() => {
  if (state.isMove) {
    return 'move'
  } else {
    return isPlaying ? '' : 'stop'
  }
})

onMounted(() => {
  // console.log('video', this.localItem.aweme_id)
  // console.log(this.commentVisible)
  state.height = document.body.clientHeight
  state.width = document.body.clientWidth
  videoEl.currentTime = 0
  let fun = (e) => {
    state.currentTime = Math.ceil(e.target.currentTime)
    state.playX = (state.currentTime - 1) * state.step
  }
  videoEl.addEventListener('loadedmetadata', () => {
    state.videoScreenHeight = videoEl.videoHeight / (videoEl.videoWidth / state.width)
    state.duration = videoEl.duration
    state.progressBarRect = progressEl.getBoundingClientRect()
    state.step = state.progressBarRect.width / Math.floor(state.duration)
    videoEl.addEventListener('timeupdate', fun)
  })

  let eventTester = (e, t: string) => {
    videoEl.addEventListener(
      e,
      () => {
        // console.log('eventTester', e, state.item.aweme_id)
        if (e === 'playing') state.loading = false
        if (e === 'waiting') {
          if (!state.paused && !state.ignoreWaiting) {
            state.loading = true
          }
        }
        let s = false
        if (s) {
          console.log(e, t)
        }
      },
      false
    )
  }

  // eventTester("loadstart", '客户端开始请求数据'); //客户端开始请求数据
  // eventTester("abort", '客户端主动终止下载（不是因为错误引起）'); //客户端主动终止下载（不是因为错误引起）
  // eventTester("loadstart", '客户端开始请求数据'); //客户端开始请求数据
  // eventTester("progress", '客户端正在请求数据'); //客户端正在请求数据
  // // eventTester("suspend", '延迟下载'); //延迟下载
  // eventTester("abort", '客户端主动终止下载（不是因为错误引起），'); //客户端主动终止下载（不是因为错误引起），
  // eventTester("error", '请求数据时遇到错误'); //请求数据时遇到错误
  // eventTester("stalled", '网速失速'); //网速失速
  // eventTester("play", 'play()和autoplay开始播放时触发'); //play()和autoplay开始播放时触发
  // eventTester("pause", 'pause()触发'); //pause()触发
  // eventTester("loadedmetadata", '成功获取资源长度'); //成功获取资源长度
  // eventTester("loadeddata"); //
  eventTester('waiting', '等待数据，并非错误') //等待数据，并非错误
  eventTester('playing', '开始回放') //开始回放
  // eventTester("canplay", '/可以播放，但中途可能因为加载而暂停'); //可以播放，但中途可能因为加载而暂停
  // eventTester("canplaythrough", '可以播放，歌曲全部加载完毕'); //可以播放，歌曲全部加载完毕
  // eventTester("seeking", '寻找中'); //寻找中
  // eventTester("seeked", '寻找完毕'); //寻找完毕
  // // eventTester("timeupdate",'播放时间改变'); //播放时间改变
  // eventTester("ended", '播放结束'); //播放结束
  // eventTester("ratechange", '播放速率改变'); //播放速率改变
  // eventTester("durationchange", '资源长度改变'); //资源长度改变
  // eventTester("volumechange", '音量改变'); //音量改变

  // console.log('mounted')
  // bus.off('singleClickBroadcast')
  bus.on(EVENT_KEY.SINGLE_CLICK_BROADCAST, click)
  bus.on(EVENT_KEY.DIALOG_MOVE, onDialogMove)
  bus.on(EVENT_KEY.DIALOG_END, onDialogEnd)
  bus.on(EVENT_KEY.OPEN_COMMENTS, onOpenComments)
  bus.on(EVENT_KEY.CLOSE_COMMENTS, onCloseComments)
  bus.on(EVENT_KEY.OPEN_SUB_TYPE, onOpenSubType)
  bus.on(EVENT_KEY.CLOSE_SUB_TYPE, onCloseSubType)

  bus.on(EVENT_KEY.REMOVE_MUTED, removeMuted)
})

onUnmounted(() => {
  // console.log('unmounted')
  bus.off(EVENT_KEY.SINGLE_CLICK_BROADCAST, click)
  bus.off(EVENT_KEY.DIALOG_MOVE, onDialogMove)
  bus.off(EVENT_KEY.DIALOG_END, onDialogEnd)
  bus.off(EVENT_KEY.OPEN_COMMENTS, onOpenComments)
  bus.off(EVENT_KEY.CLOSE_COMMENTS, onCloseComments)
  bus.off(EVENT_KEY.OPEN_SUB_TYPE, onOpenSubType)
  bus.off(EVENT_KEY.CLOSE_SUB_TYPE, onCloseSubType)
  bus.off(EVENT_KEY.REMOVE_MUTED, removeMuted)
})

function removeMuted() {
  state.isMuted = false
}

function onOpenSubType() {
  state.commentVisible = true
}

function onCloseSubType() {
  state.commentVisible = false
}

function onDialogMove({ tag, e }) {
  if (state.commentVisible && tag === 'comment') {
    _css(videoEl, 'transition-duration', `0ms`)
    _css(videoEl, 'height', `calc(var(--vh, 1vh) * 30 + ${e}px)`)
  }
}

function onDialogEnd({ tag, isClose }) {
  if (state.commentVisible && tag === 'comment') {
    console.log('isClose', isClose)
    _css(videoEl, 'transition-duration', `300ms`)
    if (isClose) {
      state.commentVisible = false
      _css(videoEl, 'height', '100%')
    } else {
      _css(videoEl, 'height', 'calc(var(--vh, 1vh) * 30)')
    }
  }
}

function onOpenComments(id) {
  if (id === props.item.aweme_id) {
    _css(videoEl, 'transition-duration', `300ms`)
    _css(videoEl, 'height', 'calc(var(--vh, 1vh) * 30)')
    state.commentVisible = true
  }
}

function onCloseComments() {
  if (state.commentVisible) {
    _css(videoEl, 'transition-duration', `300ms`)
    _css(videoEl, 'height', '100%')
    state.commentVisible = false
  }
}

function click({ uniqueId, index, type }) {
  if (props.position.uniqueId === uniqueId && props.position.index === index) {
    if (type === EVENT_KEY.ITEM_TOGGLE) {
      if (props.isLive) {
        pause()
        bus.emit(EVENT_KEY.NAV, {
          path: '/home/live',
          query: { id: props.item.aweme_id }
        })
      } else {
        if (state.status === SlideItemPlayStatus.Play) {
          pause()
        } else {
          play()
        }
      }
    }
    if (type === EVENT_KEY.ITEM_STOP) {
      videoEl.currentTime = 0
      state.ignoreWaiting = true
      pause()
      setTimeout(() => (state.ignoreWaiting = false), 300)
    }
    if (type === EVENT_KEY.ITEM_PLAY) {
      videoEl.currentTime = 0
      state.ignoreWaiting = true
      play()
      setTimeout(() => (state.ignoreWaiting = false), 300)
    }
  }
}

function play() {
  state.status = SlideItemPlayStatus.Play
  videoEl.volume = 1
  videoEl.play()
}

function pause() {
  state.status = SlideItemPlayStatus.Pause
  videoEl.pause()
}

function touchstart(e) {
  _stopPropagation(e)
  state.start.x = e.touches[0].pageX
  state.last.x = state.playX
  state.last.time = state.currentTime
}

function touchmove(e) {
  // console.log('move',e)
  _stopPropagation(e)
  state.isMove = true
  pause()
  let dx = e.touches[0].pageX - state.start.x
  state.playX = state.last.x + dx
  state.currentTime = state.last.time + Math.ceil(Math.ceil(dx) / state.step)
  if (state.currentTime <= 0) state.currentTime = 0
  if (state.currentTime >= state.duration) state.currentTime = state.duration
}

function touchend(e) {
  // console.log('end', e)
  _stopPropagation(e)
  if (isPlaying) return
  setTimeout(() => (state.isMove = false), 1000)
  videoEl.currentTime = state.currentTime
  play()
}
</script>

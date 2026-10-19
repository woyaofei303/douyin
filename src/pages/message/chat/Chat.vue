<template>
  <div
    class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px] bg-[var(--color-message)]"
  >
    <div @touchstart="data.tooltipTop = -1">
      <div
        class="z-2 w-full box-border h-[var(--common-header-height)] flex justify-between items-center border-b-[1px] [border-bottom-style:solid] border-b-[var(--line-color)] px-2.5 py-0"
      >
        <div class="max-w-[60%] overflow-hidden flex items-center">
          <dy-back class="h-5 mx-2.5 my-0" @click="router.back"></dy-back>
          <div
            class="text-[12px] block text-white rounded-[10px] bg-[var(--second-btn-color)] mr-2.5 px-1.5 py-0.25"
          >
            12
          </div>
          <span>zzzz</span>
        </div>
        <div class="flex">
          <img
            class="h-5 mx-2.5 my-0"
            @click="bus.emit(EVENT_KEY.SHOW_AUDIO_CALL)"
            src="../../../assets/img/icon/message/chat/call.png"
            alt=""
          />
          <img
            class="h-5 mx-2.5 my-0"
            @click="_no"
            src="../../../assets/img/icon/message/chat/video-white.png"
            alt=""
          />
          <img
            class="h-5 mx-2.5 my-0"
            src="../../../assets/img/icon/menu-white.png"
            alt=""
            @click="nav('/message/chat/detail')"
          />
        </div>
      </div>
      <div
        class="overflow-auto"
        :class="[
          isExpand
            ? 'h-[calc(var(--vh,_1vh)_*_100_-_(125px_+_var(--vh,_1vh)_*_30))]'
            : 'h-[calc(var(--vh,_1vh)_*_100_-_125px)]'
        ]"
        ref="msgWrapper"
      >
        <ChatMessage
          @itemClick="clickItem"
          v-longpress="showTooltip"
          :message="item"
          :key="index"
          v-for="(item, index) in data.messages"
        ></ChatMessage>
      </div>
      <div class="px-0 py-2.5">
        <div
          class="box-border h-11 bg-[#393939] rounded-[20px] flex items-center mx-2.5 my-0 p-1.25"
          v-if="!data.recording"
        >
          <img
            class="w-3.5 rounded-[50%] ml-0 mr-1.25 bg-[#698ff4] p-1.25"
            src="../../../assets/img/icon/message/camera.png"
            alt=""
          />
          <input
            class="flex-[1] [outline:none] bg-[#393939] border-[0] border-current border-none"
            @click="data.typing = true"
            @blur="data.typing = false"
            type="text"
            placeholder="发送信息..."
          />
          <img
            class="w-6 rounded-[50%] ml-3.75"
            @click="handleClick"
            src="../../../assets/img/icon/message/voice-white.png"
            alt=""
          />
          <img
            class="w-6 rounded-[50%] ml-3.75"
            src="../../../assets/img/icon/message/emoji-white.png"
            alt=""
          />
          <img
            class="w-6 rounded-[50%] ml-3.75"
            @click="data.showOption = !data.showOption"
            src="../../../assets/img/icon/message/add-white.png"
            alt=""
          />
        </div>
        <div
          class="box-border h-11 bg-[#393939] rounded-[20px] flex items-center justify-center relative mx-2.5 my-0 px-1.25 py-2.5"
          v-else
        >
          <span>按住 说话</span>
          <img
            class="right-1.25 absolute w-6 rounded-[50%] ml-3.75"
            @click="data.recording = false"
            src="../../../assets/img/icon/message/keyboard.png"
            alt=""
          />
        </div>
        <div
          class="text-[14px] w-[100vw] h-[calc(var(--vh,_1vh)_*_30)] box-border p-3.75"
          v-if="data.showOption"
        >
          <div
            class="box-border text-[gray] grid [grid-template-columns:calc((100vw_-_30px)_/_4)_calc((100vw_-_30px)_/_4)_calc((100vw_-_30px)_/_4)_calc((100vw_-_30px)_/_4)]"
          >
            <div class="flex justify-center items-center flex-col mb-2.5">
              <img
                class="rounded-[4px] bg-[#393939] w-7.5 mb-2.5 p-2.5"
                src="../../../assets/img/icon/message/photo.png"
                alt=""
              />
              <span>照片</span>
            </div>
            <div class="flex justify-center items-center flex-col mb-2.5">
              <img
                class="rounded-[4px] bg-[#393939] w-7.5 mb-2.5 p-2.5"
                src="../../../assets/img/icon/message/camera2.png"
                alt=""
              />
              <span>拍摄</span>
            </div>
            <div class="flex justify-center items-center flex-col mb-2.5">
              <img
                class="rounded-[4px] bg-[#393939] w-7.5 mb-2.5 p-2.5"
                src="../../../assets/img/icon/message/redpack.png"
                alt=""
              />
              <span>红包</span>
            </div>
            <div class="flex justify-center items-center flex-col mb-2.5">
              <img
                class="rounded-[4px] bg-[#393939] w-7.5 mb-2.5 p-2.5"
                src="../../../assets/img/icon/message/video.png"
                alt=""
              />
              <span>视频通话</span>
            </div>
            <div class="flex justify-center items-center flex-col mb-2.5">
              <img
                class="rounded-[4px] bg-[#393939] w-7.5 mb-2.5 p-2.5"
                src="../../../assets/img/icon/message/audio.png"
                alt=""
              />
              <span>语音通话</span>
            </div>
            <div class="flex justify-center items-center flex-col mb-2.5">
              <img
                class="rounded-[4px] bg-[#393939] w-7.5 mb-2.5 p-2.5"
                src="../../../assets/img/icon/message/come-on.png"
                alt=""
              />
              <span>一起看视频</span>
            </div>
            <div class="flex justify-center items-center flex-col mb-2.5">
              <img
                class="rounded-[4px] bg-[#393939] w-7.5 mb-2.5 p-2.5"
                src="../../../assets/img/icon/message/come-chang.png"
                alt=""
              />
              <span>一起唱</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  长按工具栏  -->
    <transition
      enter-from-class=""
      enter-active-class=""
      enter-to-class=""
      leave-from-class=""
      leave-active-class=""
      leave-to-class=""
      move-class=""
    >
      <!--      TODO 定位也有问题-->
      <div
        class="z-9 left-[50%] ml-[-33%] fixed text-[12px] rounded-[6px] bg-[#373a43] flex"
        :style="{ top: data.tooltipTop + 'px' }"
        v-if="data.tooltipTop !== -1"
      >
        <div class="w-11.25 h-15 flex justify-center items-center flex-col">
          <img class="mb-1 w-4.5" src="../../../assets/img/icon/message/chat/like.png" alt="" />
          <span>点赞</span>
        </div>
        <div class="w-11.25 h-15 flex justify-center items-center flex-col">
          <img class="mb-1 w-4.5" src="../../../assets/img/icon/message/chat/copy.png" alt="" />
          <span>复制</span>
        </div>
        <div class="w-11.25 h-15 flex justify-center items-center flex-col">
          <img class="mb-1 w-4.5" src="../../../assets/img/icon/message/chat/send.png" alt="" />
          <span>转发</span>
        </div>
        <div class="w-11.25 h-15 flex justify-center items-center flex-col">
          <img class="mb-1 w-4.5" src="../../../assets/img/icon/message/chat/comment.png" alt="" />
          <span>回复</span>
        </div>
        <div class="w-11.25 h-15 flex justify-center items-center flex-col">
          <img class="mb-1 w-4.5" src="../../../assets/img/icon/message/chat/return.png" alt="" />
          <span>回复</span>
        </div>
        <div class="w-11.25 h-15 flex justify-center items-center flex-col">
          <img class="mb-1 w-4.5" src="../../../assets/img/icon/message/chat/del.png" alt="" />
          <span>删除</span>
        </div>
        <!--      TODO 官方的三角头会随着点击位置变动，先注释掉-->
        <!--      <div class="arrow" :class="tooltipTopLocation"></div>-->
      </div>
    </transition>

    <div class="fixed z-9 top-0 bg-black w-[100vw] h-[calc(var(--vh,_1vh)_*_100)]" v-if="false">
      <div class="fixed w-[100vw] box-border flex justify-between p-[var(--page-padding)]">
        <dy-back class="w-5.5!" mode="light" />
        <img class="w-5.5" src="../../../assets/img/icon/search-light.png" alt="" />
      </div>
      <img :src="data.previewImg" alt="" />
      <div></div>
    </div>

    <!--  红包  -->
    <transition
      enter-from-class="[transform:scale(0)]"
      enter-active-class="[transition:transform_0.2s_ease]"
      enter-to-class=""
      leave-from-class=""
      leave-active-class="[transition:transform_0.2s_ease]"
      leave-to-class="[transform:scale(0)]"
      move-class=""
    >
      <div
        class="z-9 top-0 fixed w-[100vw] h-[calc(var(--vh,_1vh)_*_100)] flex items-center justify-center"
        v-if="data.isShowOpenRedPacket"
      >
        <BaseMask @click="data.isShowOpenRedPacket = false" />
        <div class="w-[75vw] h-[55vh] z-10 fixed flex items-center flex-col">
          <template v-if="data.isOpened">
            <img
              class="z-9 absolute w-full h-full"
              src="../../../assets/img/icon/message/chat/bg-open.png"
              alt=""
            />
            <div
              class="w-full h-full box-border flex flex-col items-center justify-between text-[#fdd9b3] z-10 relative p-5"
            >
              <div class="flex flex-col items-center">
                <div class="text-[#c1874f] text-[40px] font-bold mt-3.75 mb-16.25">0.01元</div>
                <div class="text-[12px] mb-7.5">{{ store.userinfo.nickname }}的红包</div>
                <div class="text-[16px]">大吉大利</div>
              </div>
              <div class="mt-37.5 text-[12px]" @click="nav('/message/chat/red-packet-detail')">
                查看红包详情>
              </div>
            </div>
          </template>
          <template v-else>
            <img
              class="z-9 absolute w-full h-full"
              src="../../../assets/img/icon/message/chat/bg-close.png"
              alt=""
            />
            <div
              class="w-full h-full box-border flex flex-col items-center justify-between text-[#fdd9b3] z-10 relative p-5"
            >
              <div class="flex flex-col items-center">
                <img
                  class="mt-15 w-13.75 h-13.75 rounded-[50%] mb-5"
                  :src="_checkImgUrl(store.userinfo.cover_url[0].url_list[0])"
                  alt=""
                />
                <div class="text-[12px] mb-7.5">{{ store.userinfo.nickname }}的红包</div>
                <div class="text-[16px]">大吉大利</div>
              </div>

              <div
                class="text-[16px] rounded-[0.5px] mb-7.5 flex items-center justify-center text-[#78302d] w-[65vw] shadow-[0_0_1px] px-0 py-3"
                :class="[data.opening ? 'bg-[#e44d3a]' : 'bg-[#ffd984]']"
                @click="openRedPacket"
              >
                <template v-if="data.opening">
                  <img
                    :class="[
                      data.opening
                        ? 'w-4.5 mr-2.5 animate-[dy-animal-692c7a_0.8s_infinite_linear]'
                        : ''
                    ]"
                    src="../../../assets/img/icon/loading-white.png"
                    alt=""
                  />
                  正在打开
                </template>
                <span v-else>开红包</span>
              </div>
            </div>
          </template>
          <img
            class="bottom-[-8vh] absolute w-7.5"
            src="../../../assets/img/icon/message/chat/close.png"
            alt=""
            @click="data.isShowOpenRedPacket = false"
          />
        </div>
      </div>
    </transition>

    <Loading v-if="data.loading" />
  </div>
</template>
<script setup lang="ts">
import ChatMessage from '../components/ChatMessage.vue'
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import Loading from '@/components/Loading.vue'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _no, _sleep } from '@/utils'
import { useRouter } from 'vue-router'
import { useNav } from '@/utils/hooks/useNav'
import bus, { EVENT_KEY } from '@/utils/bus'

let CALL_STATE = {
  REJECT: 0,
  RESOLVE: 1,
  NONE: 2
}
let VIDEO_STATE = {
  VALID: 0,
  INVALID: 1
}
let AUDIO_STATE = {
  NORMAL: 0,
  SENDING: 1
}
let READ_STATE = {
  SENDING: 0,
  ARRIVED: 1,
  READ: 1
}
let MESSAGE_TYPE = {
  TEXT: 0,
  TIME: 1,
  VIDEO: 2,
  DOUYIN_VIDEO: 9,
  AUDIO: 3,
  IMAGE: 6,
  VIDEO_CALL: 4,
  AUDIO_CALL: 5,
  MEME: 7, //表情包
  RED_PACKET: 8 //红包
}
let RED_PACKET_MODE = {
  SINGLE: 1,
  MULTIPLE: 2
}

defineOptions({
  name: 'Chat'
})

const router = useRouter()
const nav = useNav()
const store = useBaseStore()
const msgWrapper = ref<HTMLDivElement>()
const data = reactive({
  previewImg: new URL('../../../assets/img/poster/3.jpg', import.meta.url).href,
  videoCall: [],
  MESSAGE_TYPE,
  messages: [
    {
      type: MESSAGE_TYPE.TIME,
      data: '',
      time: '2021-01-02 21:21',
      user: {
        id: '2739632844317827',
        avatar: '../../assets/img/icon/head-image.jpg'
      }
    },

    {
      type: MESSAGE_TYPE.MEME,
      state: AUDIO_STATE.NORMAL,
      data: new URL('../../../assets/img/poster/1.jpg', import.meta.url).href,
      time: '2021-01-02 21:21',
      user: {
        id: '2739632844317827',
        avatar: '../../assets/img/icon/head-image.jpg'
      },
      loved: [
        {
          id: 2,
          avatar: '../../assets/img/icon/head-image.jpg'
        },
        {
          id: 2,
          avatar: '../../assets/img/icon/head-image.jpg'
        }
      ]
    },
    {
      type: MESSAGE_TYPE.IMAGE,
      state: AUDIO_STATE.NORMAL,
      data: new URL('../../../assets/img/poster/1.jpg', import.meta.url).href,
      time: '2021-01-02 21:21',
      user: {
        id: 1,
        avatar: '../../assets/img/icon/head-image.jpg'
      }
    },
    {
      type: MESSAGE_TYPE.IMAGE,
      state: AUDIO_STATE.NORMAL,
      data: new URL('../../../assets/img/poster/1.jpg', import.meta.url).href,
      time: '2021-01-02 21:21',
      user: {
        id: '2739632844317827',
        avatar: '../../assets/img/icon/head-image.jpg'
      },
      readState: READ_STATE.ARRIVED
    },
    {
      type: MESSAGE_TYPE.VIDEO_CALL,
      state: CALL_STATE.REJECT,
      data: '2021-01-02 21:44',
      time: '2021-01-02 21:21',
      user: {
        id: '2739632844317827',
        avatar: '../../assets/img/icon/head-image.jpg'
      }
    },
    {
      type: MESSAGE_TYPE.VIDEO_CALL,
      state: CALL_STATE.RESOLVE,
      data: '2021-01-02 21:44',
      time: '2021-01-02 21:21',
      user: {
        id: '2739632844317827',
        avatar: '../../assets/img/icon/head-image.jpg'
      }
    },
    {
      type: MESSAGE_TYPE.VIDEO_CALL,
      state: CALL_STATE.NONE,
      data: '2021-01-02 21:44',
      time: '2021-01-02 21:21',
      user: {
        id: '2739632844317827',
        avatar: '../../assets/img/icon/head-image.jpg'
      }
    },
    {
      type: MESSAGE_TYPE.AUDIO_CALL,
      state: CALL_STATE.REJECT,
      data: '2021-01-02 21:44',
      time: '2021-01-02 21:21',
      user: {
        id: '2739632844317827',
        avatar: '../../assets/img/icon/head-image.jpg'
      }
    },
    {
      type: MESSAGE_TYPE.AUDIO_CALL,
      state: CALL_STATE.RESOLVE,
      data: '2021-01-02 21:44',
      time: '2021-01-02 21:21',
      user: {
        id: '2739632844317827',
        avatar: '../../assets/img/icon/head-image.jpg'
      }
    },
    {
      type: MESSAGE_TYPE.AUDIO_CALL,
      state: CALL_STATE.NONE,
      data: '2021-01-02 21:44',
      time: '2021-01-02 21:21',
      user: {
        id: '2739632844317827',
        avatar: '../../assets/img/icon/head-image.jpg'
      }
    },
    {
      type: MESSAGE_TYPE.AUDIO,
      state: AUDIO_STATE.NORMAL,
      data: {
        duration: 5,
        src: ''
      },
      time: '2021-01-02 21:21',
      user: {
        id: '1',
        avatar: '../../assets/img/icon/head-image.jpg'
      }
    },
    {
      type: MESSAGE_TYPE.AUDIO,
      state: AUDIO_STATE.NORMAL,
      data: {
        duration: 10,
        src: ''
      },
      time: '2021-01-02 21:21',
      user: {
        id: '2739632844317827',
        avatar: '../../assets/img/icon/head-image.jpg'
      }
    },
    {
      type: MESSAGE_TYPE.TEXT,
      data: '又在刷抖音',
      time: '2021-01-02 21:21',
      user: {
        id: '2739632844317827',
        avatar: '../../assets/img/icon/head-image.jpg'
      }
    },
    {
      type: MESSAGE_TYPE.TEXT,
      data: '我昨天@你那个视频发给我下',
      time: '2021-01-02 21:21',
      user: {
        id: '2739632844317827',
        avatar: '../../assets/img/icon/head-image.jpg'
      }
    },
    {
      type: MESSAGE_TYPE.TEXT,
      data: '我找不到了',
      time: '2021-01-02 21:21',
      user: {
        id: '1',
        avatar: '../../assets/img/icon/head-image.jpg'
      }
    },
    {
      type: MESSAGE_TYPE.TEXT,
      data: '我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了',
      time: '2021-01-02 21:21',
      user: {
        id: '2739632844317827',
        avatar: '../../assets/img/icon/head-image.jpg'
      }
    },
    {
      type: MESSAGE_TYPE.DOUYIN_VIDEO,
      state: VIDEO_STATE.VALID,
      data: {
        poster: new URL('../../../assets/img/poster/3.jpg', import.meta.url).href,
        author: {
          name: 'safasdfassafasdfassafasdfassafasdfas',
          avatar: new URL('../../../assets/img/icon/head-image.jpeg', import.meta.url).href
        },
        title: '服了asd'
      },
      time: '2021-01-02 21:21',
      user: {
        id: '1',
        avatar: '../../../assets/img/icon/head-image.jpg'
      }
    },
    {
      type: MESSAGE_TYPE.VIDEO,
      state: VIDEO_STATE.VALID,
      data: {
        poster: new URL('../../../assets/img/poster/3.jpg', import.meta.url).href
      },
      time: '2021-01-02 21:21',
      user: {
        id: '2739632844317827',
        avatar: '../../../assets/img/icon/head-image.jpg'
      }
    },
    {
      type: MESSAGE_TYPE.RED_PACKET,
      state: AUDIO_STATE.NORMAL,
      mode: RED_PACKET_MODE.MULTIPLE,
      data: {
        money: 5.11,
        title: '大吉大利',
        state: '未领取'
      },
      time: '2021-01-02 21:21',
      user: {
        id: '2739632844317827',
        avatar: '../../assets/img/icon/head-image.jpg'
      }
    },
    {
      type: MESSAGE_TYPE.RED_PACKET,
      state: AUDIO_STATE.NORMAL,
      mode: RED_PACKET_MODE.SINGLE,
      data: {
        money: 5.11,
        title: '大吉大利',
        state: '已过期'
      },
      time: '2021-01-02 21:21',
      user: {
        id: 1,
        avatar: '../../assets/img/icon/head-image.jpg'
      }
    }
  ],
  typing: false,
  loading: false,
  opening: false,
  isOpened: false,
  recording: false,
  showOption: false,
  isShowOpenRedPacket: false,
  tooltipTop: -1,
  tooltipTopLocation: ''
})

onMounted(() => {
  msgWrapper.value
    .querySelectorAll('img')
    .forEach((item) => item.addEventListener('load', scrollBottom))
  scrollBottom()
})

onUnmounted(() => {
  msgWrapper.value
    .querySelectorAll('img')
    .forEach((item) => item.removeEventListener('load', scrollBottom))
})

const isExpand = computed(() => {
  return data.showOption
})

function handleClick() {
  data.recording = true
  data.showOption = false
}

function scrollBottom() {
  nextTick(() => {
    let wrapper = msgWrapper.value
    // console.log('wrapper.clientHeight', wrapper.clientHeight)
    // console.log('wrapper.scrollHeight', wrapper.scrollHeight)
    wrapper.scrollTo({ top: wrapper.scrollHeight - wrapper.clientHeight })
  })
}

function openRedPacket() {
  data.opening = true
  setTimeout(() => {
    data.opening = false
    nav('/message/chat/red-packet-detail')
  }, 1000)
}

async function clickItem(e) {
  if (e.type === data.MESSAGE_TYPE.RED_PACKET) {
    data.loading = true
    await _sleep(500)
    data.loading = false
    data.isOpened = e.data.state === '已过期'
    data.isShowOpenRedPacket = true
  }
}

function showTooltip(e) {
  console.log(e)
  const wrapper = e.target instanceof Element ? e.target.closest('[data-chat-message]') : null
  if (wrapper) {
    // console.log(wrapper.getBoundingClientRect())
    if (wrapper.getBoundingClientRect().y - 61 > 70) {
      data.tooltipTopLocation = 'top'
      data.tooltipTop = wrapper.getBoundingClientRect().y - 70
    } else {
      data.tooltipTopLocation = 'bottom'
      data.tooltipTop =
        wrapper.getBoundingClientRect().y + wrapper.getBoundingClientRect().height + 10
    }
  }
}
</script>

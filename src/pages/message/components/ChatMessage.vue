<template>
  <div
    class="flex px-2.5 py-0"
    :class="[
      [!isMe ? 'justify-start' : isMe ? 'justify-end' : ''],
      message.type === MESSAGE_TYPE.TIME ? 'mb-0' : 'mb-5'
    ]"
  >
    <div
      class="w-full text-[color:var(--second-text-color)] text-center h-10 leading-[40px] text-[12px]"
      v-if="message.type === MESSAGE_TYPE.TIME"
    >
      {{ message.time }}
    </div>
    <template v-else>
      <img
        :class="[
          isMe ? 'ml-2.5' : '',
          !isMe ? 'h-9 rounded-[50%]' : isMe ? 'h-9 rounded-[50%]' : '',
          !isMe ? 'mr-2.5' : ''
        ]"
        v-if="!isMe"
        src="../../../assets/img/icon/avatar/3.png"
        alt=""
      />
      <div data-chat-message="" @click="$emit('itemClick', message)">
        <div
          class="rounded-[10px] max-w-[60vw] flex items-center text-[14px] p-2.5"
          :class="[!isMe ? 'bg-[#3b3b43]' : isMe ? 'bg-[#4874e6]' : '']"
          v-if="message.type === MESSAGE_TYPE.TEXT"
        >
          {{ message.data }}
        </div>

        <div class="relative" v-if="message.type === MESSAGE_TYPE.DOUYIN_VIDEO">
          <img class="rounded-[10px] w-[40vw]" :src="message.data.poster" alt="" />
          <div
            class="absolute text-[16px] bottom-8.75 w-[calc(100%_-_20px)] [word-break:break-word] [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden text-ellipsis left-2.5"
          >
            {{ message.data.title }}
          </div>
          <img
            class="absolute top-[50%] left-[50%] [transform:translateY(-50%)_translateX(-50%)] w-6"
            src="../../../assets/img/icon/play-white.png"
          />
          <div class="w-[calc(100%_-_20px)] left-2.5 absolute bottom-2.5 flex items-center">
            <img class="mr-1.25 h-4 rounded-[50%]" :src="message.data.author.avatar" alt="" />
            <span class="w-[80%] text-ellipsis overflow-hidden">{{
              message.data.author.name
            }}</span>
          </div>
        </div>

        <div class="relative" v-if="message.type === MESSAGE_TYPE.VIDEO">
          <img class="rounded-[10px] w-[40vw]" :src="message.data.poster" alt="" />
          <img
            class="absolute top-[50%] left-[50%] [transform:translateY(-50%)_translateX(-50%)] w-6"
            src="../../../assets/img/icon/play-white.png"
          />
        </div>

        <div
          class="max-w-[60vw] pr-3.75 pl-2.5 rounded-[10px] flex items-center justify-between text-[14px] py-2.5"
          :class="[!isMe ? 'bg-[#3b3b43]' : isMe ? 'bg-[#4874e6]' : '']"
          v-if="message.type === MESSAGE_TYPE.AUDIO"
        >
          <template v-if="isMe">
            <div>{{ message.data.duration }}'</div>
            <img
              class="w-3.75 h-3.75"
              :class="[isMe ? 'ml-12.5' : '', !isMe ? 'mr-12.5' : '']"
              src="../../../assets/img/icon/message/chat/rss2.png"
              alt=""
            />
          </template>
          <template v-else>
            <img
              class="w-3.75 h-3.75"
              :class="[isMe ? 'ml-12.5' : '', !isMe ? 'mr-12.5' : '']"
              src="../../../assets/img/icon/message/chat/rss.png"
              alt=""
            />
            <div>{{ message.data.duration }}'</div>
          </template>
        </div>

        <div
          class="rounded-[10px] flex items-center text-[14px] p-2.5"
          :class="[!isMe ? 'bg-[#3b3b43]' : isMe ? 'bg-[#4874e6]' : '']"
          v-if="
            message.type === MESSAGE_TYPE.VIDEO_CALL || message.type === MESSAGE_TYPE.AUDIO_CALL
          "
        >
          <div class="flex items-center" v-if="message.state === CALL_STATE.RESOLVE">
            <img class="mr-2.5 w-5" src="../../../assets/img/icon/message/chat/video.png" alt="" />
            <span>通话时长 05:32</span>
          </div>
          <div
            class="flex items-center"
            v-if="message.state === CALL_STATE.REJECT || message.state === CALL_STATE.NONE"
          >
            <img
              class="rounded-[50%] bg-[rgba(27,_100,_172,_0.8)] mr-2.5 w-4.5 p-1.5"
              src="../../../assets/img/icon/message/chat/video.png"
              alt=""
            />
            <div class="text-[13px] flex flex-col text-[#dedede]">
              <span class="mb-0.5 text-[15px] text-white" v-if="message.state === CALL_STATE.REJECT"
                >对方已拒绝</span
              >
              <span class="mb-0.5 text-[15px] text-white" v-if="message.state === CALL_STATE.NONE"
                >对方未接通</span
              >
              <span>点击呼叫</span>
            </div>
          </div>
        </div>

        <div v-if="message.type === MESSAGE_TYPE.IMAGE">
          <img class="rounded-[10px] max-w-[40vw]" :src="message.data" alt="" />
        </div>

        <div v-if="message.type === MESSAGE_TYPE.MEME">
          <img class="rounded-[10px] max-w-[40vw]" :src="message.data" alt="" />
        </div>

        <div
          class="rounded-[10px] w-[60vw] flex flex-col text-[#ffe7ce]"
          :class="[
            message.data.state !== '未领取' ? 'bg-[rgba(253,_92,_72,_0.8)]' : 'bg-[#fd5c48]'
          ]"
          v-if="message.type === MESSAGE_TYPE.RED_PACKET"
        >
          <div
            class="flex items-center border-b-[1px] [border-bottom-style:solid] border-b-[#fd7c51] p-2.5"
          >
            <img
              class="rounded-[3px] h-9.5 mr-2.5"
              src="../../../assets/img/icon/message/chat/redpack-logo.webp"
              alt=""
            />
            <div>
              <div class="text-[14px]">{{ message.data.title }}</div>
              <div
                class="text-[12px] text-[rgba(255,_231,_206,_0.8)]"
                v-if="message.data.state !== '未领取'"
              >
                {{ message.data.state }}
              </div>
            </div>
          </div>
          <span class="text-[12px] pt-1.25 pb-2.5 px-2.5">抖音红包</span>
        </div>

        <div class="mt-2.5" v-if="message.loved?.length">
          <img
            class="w-4 h-4 rounded-[50%] mr-1.25"
            src="../../../assets/img/icon/loved.svg"
            alt=""
          />
          <img
            class="w-4 h-4 rounded-[50%] mr-1.25"
            :key="user"
            v-for="user in message.loved"
            src="../../../assets/img/icon/head-image.jpeg"
            alt=""
          />
        </div>
      </div>
      <img
        :class="[
          isMe ? 'ml-2.5' : '',
          !isMe ? 'h-9 rounded-[50%]' : isMe ? 'h-9 rounded-[50%]' : '',
          !isMe ? 'mr-2.5' : ''
        ]"
        v-if="isMe"
        src="../../../assets/img/icon/avatar/2.png"
        alt=""
      />
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useBaseStore } from '@/store/pinia'

let CALL_STATE = {
  REJECT: 0,
  RESOLVE: 1,
  NONE: 2
}
// eslint-disable-next-line
let VIDEO_STATE = {
  VALID: 0,
  INVALID: 1
}
// eslint-disable-next-line
let AUDIO_STATE = {
  NORMAL: 0,
  SENDING: 1
}
// eslint-disable-next-line
let READ_STATE = {
  SENDING: 0,
  ARRIVED: 1,
  READ: 1
}
let RED_PACKET_MODE = {
  SINGLE: 1,
  MULTIPLE: 2
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
export default {
  name: 'ChatMessage',
  props: {
    message: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      MESSAGE_TYPE,
      CALL_STATE,
      RED_PACKET_MODE
    }
  },
  computed: {
    ...mapState(useBaseStore, ['userinfo']),
    isMe() {
      return this.userinfo.uid === this.message.user.id
    }
  },
  created() {},
  methods: {}
}
</script>

<template>
  <div
    class="[transition-property:all] z-9 w-17.5 h-22.5 fixed top-[20vh] left-[var(--page-padding)] bg-white flex items-center rounded-[6px] justify-center flex-col text-[#14bf5f] text-[12px]"
    v-if="state.isSmall"
    :style="callFloatStyle"
    @touchmove="touchmove"
    @touchend="touchend"
    @click="state.isSmall = false"
  >
    <img class="w-7.5 mb-0.5" src="@/assets/img/icon/message/chat/call-float.png" alt="" />
    <span>呼叫中</span>
  </div>

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
      class="text-white z-8 [background:linear-gradient(to_bottom,_#262626,_black)] [transition:all_0.3s] text-[12px]"
      :class="[
        [
          state.isSmall
            ? 'fixed top-[20vh] left-[var(--page-padding)] w-17.5 h-22.5'
            : 'fixed top-0 left-0 w-[100vw] h-[calc(var(--vh,_1vh)_*_100)]',
          state.isSmall ? 'rounded-[6px]' : ''
        ],
        !state.isSmall ? 'z-10' : ''
      ]"
      :style="state.isSmall ? callFloatStyle : {}"
      v-if="state.isShowAudioCall"
    >
      <div
        class="[transition:all_0.3s] absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between"
      >
        <div
          class="[transition:all_0.3s] w-full box-border flex items-start justify-between"
          :class="[state.isSmall ? 'p-0' : 'p-[var(--page-padding)]']"
        >
          <div class="w-[12%]">
            <img
              class="w-[50%] max-w-6 max-h-6"
              @click="state.isSmall = true"
              src="@/assets/img/icon/message/chat/narrow.png"
              alt=""
            />
          </div>
          <span
            class="[transition:all_0.3s] w-[50%] overflow-hidden text-center [word-break:keep-all] text-[14px]"
            :class="[state.isSmall ? '[transform:scale(0.2)]' : '']"
            >等待对方接听...</span
          >
          <div class="w-[12%] max-w-10 flex flex-col">
            <div class="mb-[55%] flex items-center flex-col overflow-hidden">
              <img
                class="w-[50%] max-w-6 max-h-6"
                v-show="!state.isOpenCamera"
                @click="state.isOpenCamera = !state.isOpenCamera"
                src="@/assets/img/icon/message/chat/disabled-camera.png"
                alt=""
              />
              <img
                class="w-[50%] max-w-6 max-h-6"
                v-show="state.isOpenCamera"
                @click="state.isOpenCamera = !state.isOpenCamera"
                src="@/assets/img/icon/message/chat/able-camera.png"
                alt=""
              />
              <span
                class="[transition:all_0.3s] [word-break:keep-all] mt-[20%] text-[12px]"
                :class="[state.isSmall ? '[transform:scale(0.2)]' : '']"
                >摄像头</span
              >
            </div>
            <div class="mb-[55%] flex items-center flex-col overflow-hidden" v-if="state.isExpand">
              <img
                class="w-[50%] max-w-6 max-h-6"
                v-show="!state.isOpenAudio"
                @click="state.isOpenAudio = !state.isOpenAudio"
                src="@/assets/img/icon/message/chat/disabled-volume.png"
                alt=""
              />
              <img
                class="w-[50%] max-w-6 max-h-6"
                v-show="state.isOpenAudio"
                @click="state.isOpenAudio = !state.isOpenAudio"
                src="@/assets/img/icon/message/chat/able-volume.png"
                alt=""
              />
              <span
                class="[transition:all_0.3s] [word-break:keep-all] mt-[20%] text-[12px]"
                :class="[state.isSmall ? '[transform:scale(0.2)]' : '']"
                >免提</span
              >
            </div>
            <div class="mb-[55%] flex items-center flex-col overflow-hidden">
              <dy-back
                class="w-[50%]! max-w-6! max-h-6 [transform:rotate(90deg)_scale(0.6)]"
                mode="light"
                @click="state.isExpand = !state.isExpand"
                img="back"
              />
              <!--              <img src="@/assets/img/icon/message/chat/narrow.png" alt="">-->
            </div>
          </div>
        </div>
        <img
          class="absolute left-[50%] top-[50%] [transform:translate3d(-50%,_-50%,_0)] w-[25%] max-w-25 rounded-[50%]"
          src="@/assets/img/icon/avatar/2.png"
          alt=""
        />
        <div class="w-full flex flex-col items-center text-[12px] mb-[10%]">
          <img
            class="w-[15%] max-w-12.5 mb-[1%]"
            @click="state.isShowAudioCall = false"
            src="@/assets/img/icon/message/chat/call-end.png"
          />
          <span
            class="[transition:all_0.3s]"
            :class="[state.isSmall ? '[transform:scale(0.2)]' : '']"
            >挂断</span
          >
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import bus, { EVENT_KEY } from '@/utils/bus'

defineOptions({
  name: 'Call'
})
defineProps({
  modelValue: {
    type: Boolean,
    default() {
      return false
    }
  }
})

const state = reactive({
  callFloatTransitionTime: 300,
  callFloatLeft: 15,
  callFloatTop: 100,
  isOpenCamera: false,
  isOpenAudio: true,
  isExpand: true,
  isSmall: false,
  isShowAudioCall: false,
  height: 0,
  width: 0
})

const callFloatStyle = $computed(() => {
  return {
    'transition-duration': state.callFloatTransitionTime + 'ms',
    left: state.callFloatLeft + 'px',
    top: state.callFloatTop + 'px'
  }
})

watch(
  () => state.isShowAudioCall,
  (newVal) => {
    if (!newVal) {
      state.isOpenCamera = false
      state.isOpenAudio = true
    }
  }
)

onMounted(() => {
  bus.on(EVENT_KEY.SHOW_AUDIO_CALL, () => {
    if (state.isShowAudioCall) {
      state.isSmall = false
    } else {
      state.isShowAudioCall = true
    }
  })
  state.height = document.body.clientHeight
  state.width = document.body.clientWidth
})

function touchmove(e) {
  state.callFloatTransitionTime = 0
  state.callFloatLeft = e.touches[0].pageX - 35
  state.callFloatTop = e.touches[0].pageY - 40
}

function touchend() {
  state.callFloatTransitionTime = 300
  if (state.callFloatLeft < state.width / 2) {
    state.callFloatLeft = 15
  } else {
    state.callFloatLeft = state.width - 15 - 70
  }
}
</script>

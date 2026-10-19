<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-black text-[14px] bg-white">
    <BaseHeader mode="light" backMode="dark" backImg="close">
      <template v-slot:right>
        <span class="text-[14px]" @click="nav('/login/help')">帮助与设置</span>
      </template>
    </BaseHeader>
    <Loading v-if="data.loading.getPhone" />
    <div class="px-7.5 py-15" v-else>
      <div class="mb-15 mt-30 flex items-center flex-col">
        <div class="mb-5">登录看朋友内容</div>
        <div class="tracking-[3px] text-[30px] mb-2.5">138****8000</div>
        <div class="text-[12px] text-[color:var(--second-text-color)]">认证服务由中国移动提供</div>
      </div>

      <dy-button
        class="w-full! mb-1.25!"
        type="primary"
        :loading="data.loading.login"
        :active="false"
        :loadingWithText="true"
        @click="login"
      >
        {{ data.loading.login ? '登录中' : '一键登录' }}
      </dy-button>
      <dy-button class="w-full! mb-1.25!" :active="false" type="white" @click="nav('/login/other')"
        >其他手机号码登录
      </dy-button>

      <div
        class="relative text-[gray] mt-5 text-[12px] flex"
        :class="[data.showAnim ? 'animate-[dy-bounce-5d1ad3_0.1s_ease-in-out_5_alternate]' : '']"
      >
        <Tooltip class="top-[-100%]! -left-2.5!" v-model="data.showTooltip" />
        <div class="pt-0.25 mr-1.25">
          <Check v-model="data.isAgree" />
        </div>
        <div>
          我已阅读并同意
          <span
            class="text-[#126495]"
            @click="nav('/service-protocol', { type: '“抖音”用户服务协议' })"
            >用户协议</span
          >
          和
          <span class="text-[#126495]" @click="nav('/service-protocol', { type: '“抖音”隐私政策' })"
            >隐私政策</span
          >
          <div>
            以及
            <span
              class="text-[#126495]"
              @click="nav('/service-protocol', { type: '中国移动认证服务协议' })"
              >《中国移动认证服务条款》</span
            >
            ，同时登录并使用抖音火山版（原“火山小视频”）和抖音
          </div>
        </div>
      </div>

      <div
        class="absolute bottom-10 text-[12px] flex justify-center w-[calc(100vw_-_60px)] [transform:translateX(-50%)] left-[50%]"
      >
        <transition
          enter-from-class="opacity-0"
          enter-active-class="[transition:opacity_0.3s_ease]"
          enter-to-class=""
          leave-from-class=""
          leave-active-class="[transition:opacity_0.3s_ease]"
          leave-to-class="opacity-0"
          move-class=""
        >
          <div v-if="data.isOtherLogin">
            <img
              class="w-10 mr-3.75 last:mr-0"
              @click="_no"
              src="../../assets/img/icon/login/toutiao-round.png"
              alt=""
            />
            <img
              class="w-10 mr-3.75 last:mr-0"
              @click="_no"
              src="../../assets/img/icon/login/qq-round.webp"
              alt=""
            />
            <img
              class="w-10 mr-3.75 last:mr-0"
              @click="_no"
              src="../../assets/img/icon/login/wechat-round.png"
              alt=""
            />
            <img
              class="w-10 mr-3.75 last:mr-0"
              @click="_no"
              src="../../assets/img/icon/login/weibo-round.webp"
              alt=""
            />
          </div>
        </transition>
      </div>
      <transition
        enter-from-class="opacity-0"
        enter-active-class="[transition:opacity_0.3s_ease]"
        enter-to-class=""
        leave-from-class=""
        leave-active-class="[transition:opacity_0.3s_ease]"
        leave-to-class="opacity-0"
        move-class=""
      >
        <span
          class="text-[#126495] absolute bottom-13.75 text-[12px] [transform:translateX(-50%)] left-[50%]"
          v-if="!data.isOtherLogin"
          @click="data.isOtherLogin = !data.isOtherLogin"
          >其他方式登录</span
        >
      </transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import Check from '../../components/Check.vue'
import Tooltip from './components/Tooltip.vue'
import Loading from '../../components/Loading.vue'
import { onMounted, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav'
import { _no, _sleep } from '@/utils'

defineOptions({
  name: 'login'
})

const nav = useNav()
const data = reactive({
  isAgree: false,
  isOtherLogin: false,
  showAnim: false,
  showTooltip: false,
  loading: {
    login: false,
    getPhone: false
  }
})

onMounted(() => {
  getPhone()
})

async function getPhone() {
  data.loading.getPhone = true
  await _sleep(1000)
  data.loading.getPhone = false
}

function login() {
  if (data.isAgree) {
    data.loading.login = true
  } else {
    if (!data.showAnim && !data.showTooltip) {
      data.showAnim = true
      setTimeout(() => {
        data.showAnim = false
        data.showTooltip = true
      }, 500)
      setTimeout(() => {
        data.showTooltip = false
      }, 3000)
    }
  }
}
</script>

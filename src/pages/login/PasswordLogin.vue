<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-black text-[14px] bg-white">
    <BaseHeader mode="light" backMode="dark" backImg="back">
      <template v-slot:right>
        <span class="text-[14px]" @click="$router.push('/login/help')">帮助与设置</span>
      </template>
    </BaseHeader>
    <div class="px-7.5 py-15">
      <div class="mb-15 mt-30 flex items-center flex-col">
        <div class="font-bold text-[20px] mb-5">手机号密码登录</div>
      </div>

      <LoginInput autofocus type="phone" v-model="phone" placeholder="请输入手机号" />
      <LoginInput
        class="mt-2.5!"
        autofocus
        type="password"
        v-model="password"
        placeholder="请输入密码"
      />

      <div
        class="relative text-[gray] mt-5 mb-0.5 text-[12px] flex"
        :class="[showAnim ? 'animate-[dy-bounce-5d1ad3_0.1s_ease-in-out_5_alternate]' : '']"
      >
        <Tooltip class="top-[-150%]! -left-2.5!" v-model="showTooltip" />
        <div class="pt-0.25 mr-1.25">
          <Check v-model="isAgree" />
        </div>
        <div>
          已阅读并同意
          <span
            class="text-[#126495]"
            @click="$router.push('/service-protocol', { type: '“抖音”用户服务协议' })"
            >用户协议</span
          >
          和
          <span
            class="text-[#126495]"
            @click="$router.push('/service-protocol', { type: '“抖音”隐私政策' })"
            >隐私政策</span
          >
          ，同时登录并使用抖音火山版（原“火山小视频”）和抖音
        </div>
      </div>

      <div class="mt-0.25 text-[1.3px] text-[color:var(--primary-btn-color)]" v-if="notice">
        {{ notice }}
      </div>

      <dy-button
        class="mb-1.25! w-full!"
        type="primary"
        :loading="loading"
        :active="false"
        :disabled="disabled"
        @click="login"
      >
        {{ loading ? '登录中' : '登录' }}
      </dy-button>

      <div class="text-[14px] mt-0.5 flex justify-between relative">
        <span>
          忘记了？<span class="text-[#126495]" @click="$router.push('/login/retrieve-password')"
            >找回密码</span
          >
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import Check from '../../components/Check'
import LoginInput from './components/LoginInput'
import Tooltip from './components/Tooltip'
import Base from './Base'

export default {
  name: 'PasswordLogin',
  extends: Base,
  components: {
    Check,
    Tooltip,
    LoginInput
  },
  data() {
    return {
      phone: '',
      password: '',
      code: '',
      notice: ''
    }
  },
  computed: {
    disabled() {
      return !(this.phone && this.password)
    }
  },
  created() {},
  methods: {
    async login() {
      let res = await this.check()
      if (res) {
        this.loading = true
      }
    }
  }
}
</script>

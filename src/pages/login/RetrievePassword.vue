<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-black text-[14px] bg-white">
    <BaseHeader mode="light" backMode="dark" backImg="back" />
    <div class="px-7.5 py-15">
      <div class="mb-15 mt-30 flex items-center flex-col">
        <div class="font-bold text-[20px] mb-5">找回密码</div>
        <div class="text-[12px] text-[color:var(--second-text-color)]">
          验证码已通过短信发送到+86 13800138000。 密码为8 - 20位，至少包含字母、数字、符号2种组合
        </div>
      </div>

      <LoginInput
        autofocus
        type="code"
        v-model="code"
        placeholder="请输入验证码"
        v-model:isSendVerificationCode="isSendVerificationCode"
        @send="sendCode"
      />
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
        :loadingWithText="true"
        :disabled="disabled"
        @click="login"
      >
        完成
      </dy-button>

      <div class="text-[14px] mt-0.5 flex justify-between relative" v-if="showVoiceCode">
        <span>
          收不到短信？<span class="text-[#126495]" @click="getVoiceCode">获取语音验证码</span>
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
import { _hideLoading, _showConfirmDialog, _showLoading, _showNoticeDialog, _sleep } from '@/utils'

export default {
  name: 'RetrievePassword',
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
      notice: '',
      isSendVerificationCode: true,
      showVoiceCode: false
    }
  },
  computed: {
    disabled() {
      return !(this.code && this.password)
    }
  },
  created() {
    setTimeout(() => {
      this.showVoiceCode = true
    }, 3000)
  },
  methods: {
    getVoiceCode() {
      return _showNoticeDialog(
        '语音验证码',
        '我们将以电话的方式告知你验证码，请注意接听',
        '',
        () => {
          setTimeout(() => {
            _showConfirmDialog(
              '',
              '您的手机可能由于空号/欠费/停机无法收到验证码，请恢复手机号状态，如果' +
                '您因为换号无法收到验证码，可以尝试找回账号',
              '',
              () => {},
              null,
              '找回账号',
              '返回',
              ''
            )
          }, 2000)
        },
        '知道了'
      )
    },
    //TODO loading样式不对
    async sendCode() {
      _showLoading()
      await _sleep(500)
      _hideLoading()
      this.isSendVerificationCode = true
    },
    async login() {
      let res = await this.check()
      if (res) {
        this.loading = true
      }
    }
  }
}
</script>

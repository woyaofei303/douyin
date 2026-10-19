<template>
  <div
    class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-black text-[14px] bg-white"
    id="other-login"
  >
    <BaseHeader mode="light" backMode="dark" backImg="back">
      <template v-slot:right>
        <span class="text-[14px]" @click="$router.push('/login/help')">帮助与设置</span>
      </template>
    </BaseHeader>
    <div class="px-7.5 py-15">
      <div class="mb-15 mt-30 flex items-center flex-col">
        <div class="font-bold text-[20px] mb-5">登录看朋友内容</div>
        <div class="text-[12px] text-[color:var(--second-text-color)]">
          未注册的手机号验证通过后将自动注册
        </div>
      </div>

      <LoginInput autofocus type="phone" v-model="phone" placeholder="请输入手机号" />

      <div class="mt-0.25 text-[1.3px] text-[color:var(--primary-btn-color)]" v-if="notice">
        {{ notice }}
      </div>

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

      <dy-button
        class="mb-1.25! w-full!"
        type="primary"
        :loading="loading"
        :active="false"
        :disabled="phone.length < 10"
        @click="getCode"
      >
        获取短信验证码
      </dy-button>

      <div class="text-[14px] mt-0.5 flex justify-between relative">
        <span class="text-[#126495]" @click="$router.push('/login/password')">密码登录</span>
        <span class="text-[#126495]" @click="otherLogin">其他方式登录</span>
      </div>

      <from-bottom-dialog
        page-id="other-login"
        v-model="isOtherLogin"
        :show-heng-gang="false"
        height="270rem"
        mode="white"
      >
        <div class="text-black">
          <div
            class="h-12.5 flex justify-center items-center border-t-[1px] [border-top-style:solid] border-t-[gainsboro] last:border-t-[0] last:[border-top-style:none] last:border-t-[currentColor]"
            @click="_no"
          >
            <img class="h-6.25 mr-2.5" src="../../assets/img/icon/login/toutiao-round.png" alt="" />
            <span>今日头条登录</span>
          </div>
          <div
            class="h-12.5 flex justify-center items-center border-t-[1px] [border-top-style:solid] border-t-[gainsboro] last:border-t-[0] last:[border-top-style:none] last:border-t-[currentColor]"
            @click="_no"
          >
            <img class="h-6.25 mr-2.5" src="../../assets/img/icon/login/qq.webp" alt="" />
            <span>QQ登录</span>
          </div>
          <div
            class="h-12.5 flex justify-center items-center border-t-[1px] [border-top-style:solid] border-t-[gainsboro] last:border-t-[0] last:[border-top-style:none] last:border-t-[currentColor]"
            @click="_no"
          >
            <img class="h-6.25 mr-2.5" src="../../assets/img/icon/login/wechat.webp" alt="" />
            <span>微信登录</span>
          </div>
          <div
            class="h-12.5 flex justify-center items-center border-t-[1px] [border-top-style:solid] border-t-[gainsboro] last:border-t-[0] last:[border-top-style:none] last:border-t-[currentColor]"
            @click="_no"
          >
            <img class="h-6.25 mr-2.5" src="../../assets/img/icon/login/weibo.webp" alt="" />
            <span>微博登录</span>
          </div>
          <div class="h-2.5 bg-[whitesmoke]"></div>
          <div
            class="h-12.5 flex justify-center items-center border-t-[1px] [border-top-style:solid] border-t-[gainsboro] last:border-t-[0] last:[border-top-style:none] last:border-t-[currentColor]"
            @click="isOtherLogin = false"
          >
            取消
          </div>
        </div>
      </from-bottom-dialog>
    </div>
  </div>
</template>
<script>
import Check from '../../components/Check'
import Tooltip from './components/Tooltip'
import LoginInput from './components/LoginInput'
import Base from './Base.js'
import FromBottomDialog from '../../components/dialog/FromBottomDialog'
import { _no } from '@/utils'

export default {
  name: 'OtherLogin',
  extends: Base,
  components: {
    Check,
    Tooltip,
    LoginInput,
    FromBottomDialog
  },
  data() {
    return {
      phone: '',
      notice: ''
    }
  },
  computed: {},
  created() {},
  methods: {
    _no,
    async getCode() {
      let res = await this.check()
      if (res) {
        this.loading = true
        setTimeout(() => {
          this.$router.push('/login/verification-code')
        }, 2000)
      }
    },
    async otherLogin() {
      let res = await this.check()
      if (res) {
        this.isOtherLogin = true
      }
    }
  }
}
</script>

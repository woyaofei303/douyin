<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-black text-[14px] bg-white">
    <BaseHeader mode="light" backMode="dark" backImg="back">
      <template v-slot:right>
        <span class="text-[14px]" @click="nav('/login/help')">帮助与设置</span>
      </template>
    </BaseHeader>
    <div class="px-7.5 py-15">
      <div class="mb-15 mt-30 flex items-center flex-col">
        <div class="font-bold text-[20px] mb-5">请输入验证码</div>
        <div class="text-[12px] text-[color:var(--second-text-color)]">
          验证码已通过短信发送到+86 13800138000
        </div>
      </div>

      <LoginInput
        autofocus
        type="code"
        v-model="data.code"
        placeholder="请输入验证码"
        v-model:isSendVerificationCode="data.isSendVerificationCode"
        @send="sendCode"
      />
      <div class="text-[14px] mt-2.5 flex justify-between relative" v-if="data.showVoiceCode">
        <span>
          收不到短信？<span class="text-[#126495]" @click="getVoiceCode">获取语音验证码</span>
        </span>
      </div>

      <dy-button
        class="mb-1.25! w-full! mt-5!"
        type="primary"
        :loading="data.loading"
        :active="false"
        :disabled="data.code.length < 4"
        @click="login"
      >
        {{ data.loading ? '登录中' : '登录' }}
      </dy-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import LoginInput from './components/LoginInput.vue'
import { onMounted, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav'
import { _hideLoading, _showConfirmDialog, _showLoading, _showNoticeDialog, _sleep } from '@/utils'

defineOptions({
  name: 'VerificationCode'
})

const nav = useNav()
const data = reactive({
  showAnim: false,
  showTooltip: false,
  loading: false,
  phone: '',
  password: '',
  code: '',
  isSendVerificationCode: true,
  showVoiceCode: false
})

onMounted(() => {
  setTimeout(() => {
    data.showVoiceCode = true
  }, 3000)
})

function getVoiceCode() {
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
}

//TODO loading样式不对
async function sendCode() {
  _showLoading()
  await _sleep(500)
  _hideLoading()
  data.isSendVerificationCode = true
}

function login() {
  data.loading = true
  setTimeout(() => {
    data.isSendVerificationCode = true
    data.loading = false
  }, 1000)
}
</script>

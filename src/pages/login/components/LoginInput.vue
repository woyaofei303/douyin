<template>
  <div>
    <div class="flex bg-[whitesmoke] text-[14px] px-2.5 py-3.75" v-if="type === 'phone'">
      <div
        class="flex items-center mr-2.5 pr-2.5 relative before:content-['_'] before:absolute before:w-0.25 before:h-2 before:top-1 before:right-0 before:bg-[gainsboro]"
      >
        <span>+86</span>
        <div
          class="mt-1 ml-1.25 w-0 h-0 border-t-[5px] border-t-[black] border-r-[4px] border-r-[transparent] border-b-[4px] border-b-[transparent] border-l-[4px] border-l-[transparent] border-solid"
        ></div>
      </div>
      <div class="relative flex-[1]">
        <input
          class="w-[90%] [outline:none] bg-[whitesmoke] [caret-color:red] border-[0] border-current border-none"
          @click="isTyping = true"
          @blur="delaySetTypingFalse"
          :autofocus="autofocus"
          v-model="value"
          type="text"
          :placeholder="placeholder"
        />
        <img
          class="top-[50%] [transform:translateY(-50%)] right-2.5 absolute h-3.75"
          v-if="value && isTyping"
          src="../../../assets/img/icon/login/close-full-gray.png"
          alt=""
          @click="value = ''"
        />
      </div>
    </div>
    <div class="flex bg-[whitesmoke] text-[14px] px-2.5 py-3.75" v-if="type === 'password'">
      <div class="relative flex-[1]">
        <input
          class="w-[90%] [outline:none] bg-[whitesmoke] [caret-color:red] border-[0] border-current border-none"
          @click="isTyping = true"
          @blur="delaySetTypingFalse"
          :autofocus="autofocus"
          v-model="value"
          type="password"
          autocomplete="new-password"
          :placeholder="placeholder"
        />
        <img
          class="top-[50%] [transform:translateY(-50%)] right-2.5 absolute h-3.75"
          v-if="value && isTyping"
          src="../../../assets/img/icon/login/close-full-gray.png"
          alt=""
          @click="value = ''"
        />
      </div>
    </div>
    <div class="flex bg-[whitesmoke] text-[14px] px-2.5 py-3.75" v-if="type === 'code'">
      <div
        class="flex items-center mr-0 pr-0 relative flex-[1] before:content-[''] before:hidden before:absolute before:w-0.25 before:h-2 before:top-1 before:right-0 before:bg-[gainsboro]"
      >
        <input
          class="w-[90%] [outline:none] bg-[whitesmoke] [caret-color:red] border-[0] border-current border-none"
          @click="isTyping = true"
          @blur="delaySetTypingFalse"
          :autofocus="autofocus"
          v-model="value"
          type="text"
          :placeholder="placeholder"
        />
        <img
          class="top-[50%] [transform:translateY(-50%)] right-2.5 absolute h-3.75"
          v-if="value && isTyping"
          src="../../../assets/img/icon/login/close-full-gray.png"
          alt=""
          @click="value = ''"
        />
      </div>
      <div class="relative" @click="send">
        <span :class="[isSendVerificationCode ? 'text-[color:var(--second-text-color)]' : '']">{{
          verificationCodeBtnText
        }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginInput',
  props: {
    modelValue: {
      type: String,
      default() {
        return ''
      }
    },
    placeholder: {
      type: String,
      default() {
        return ''
      }
    },
    type: {
      type: String,
      default: 'phone'
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    isSendVerificationCode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isTyping: false,
      verificationCodeBtnText: 60
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(e) {
        this.$emit('update:modelValue', e)
      }
    }
  },
  watch: {
    isSendVerificationCode: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.verificationCodeBtnText = 60
          let ticker = setInterval(() => {
            if (this.verificationCodeBtnText > 0) {
              this.verificationCodeBtnText--
            } else {
              this.verificationCodeBtnText = '重新发送'
              this.$emit('update:isSendVerificationCode', false)
              clearInterval(ticker)
            }
          }, 1000)
        }
      }
    }
  },
  methods: {
    delaySetTypingFalse() {
      setTimeout(() => {
        this.isTyping = false
      })
    },
    send() {
      if (!this.isSendVerificationCode) {
        this.$emit('send')
      }
    }
  }
}
</script>

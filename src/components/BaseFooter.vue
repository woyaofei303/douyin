<template>
  <div
    class="text-[14px] fixed w-full h-[var(--footer-height)] z-2 top-[calc(var(--vh,_1vh)_*_100_-_var(--footer-height))] flex"
    :class="[isWhite ? 'bg-white text-[#000]' : 'bg-[var(--footer-color)] text-white']"
    v-if="visible"
  >
    <div class="w-[20%] flex justify-center items-center relative text-[16px]" @click="refresh(1)">
      <span
        class="cursor-pointer font-bold"
        :class="[currentTab === 1 ? 'opacity-100' : 'opacity-70']"
        v-if="!isRefresh1"
        >首页</span
      >
      <img
        class="w-[25%] animate-[dy-rotate-f69abb_0.5s_linear_infinite]"
        v-if="isRefresh1"
        src="../assets/img/icon/refresh1.png"
        alt=""
      />
    </div>
    <div class="w-[20%] flex justify-center items-center relative text-[16px]" @click="refresh(2)">
      <span
        class="cursor-pointer font-bold"
        :class="[currentTab === 2 ? 'opacity-100' : 'opacity-70']"
        v-if="!isRefresh2"
        >商城</span
      >
      <img
        class="w-[25%] animate-[dy-rotate-f69abb_0.5s_linear_infinite]"
        v-if="isRefresh2"
        src="../assets/img/icon/refresh1.png"
        alt=""
      />
    </div>
    <div class="w-[20%] flex justify-center items-center relative text-[16px]" @click="tab(3)">
      <div
        class="cursor-pointer h-6.75 w-9 rounded-[6px] box-border bg-black flex items-center justify-center px-0.5 py-0 border-[3px] border-white border-solid"
      >
        <img class="w-5" src="../assets/img/icon/add-light.png" alt="" />
      </div>
    </div>
    <div class="w-[20%] flex justify-center items-center relative text-[16px]" @click="tab(4)">
      <span
        class="cursor-pointer font-bold"
        :class="[currentTab === 4 ? 'opacity-100' : 'opacity-70']"
        >消息</span
      >
      <div
        class="text-[12px] block text-white rounded-[10px] bg-[var(--primary-btn-color)] right-3.5 top-3 absolute px-1.5 py-0.25"
      >
        2
      </div>
    </div>
    <div class="w-[20%] flex justify-center items-center relative text-[16px]" @click="tab(5)">
      <span
        class="cursor-pointer font-bold"
        :class="[currentTab === 5 ? 'opacity-100' : 'opacity-70']"
        >我</span
      >
    </div>
  </div>
</template>

<script>
import bus, { EVENT_KEY } from '../utils/bus'

export default {
  name: 'BaseFooter',
  props: ['initTab', 'isWhite'],
  data() {
    return {
      isRefresh1: false,
      isRefresh2: false,
      currentTab: this.initTab,
      visible: true
    }
  },
  created() {
    bus.on('setFooterVisible', (e) => (this.visible = e))
    bus.on(EVENT_KEY.ENTER_FULLSCREEN, () => (this.visible = false))
    bus.on(EVENT_KEY.EXIT_FULLSCREEN, () => (this.visible = true))
  },
  unmounted() {
    bus.off(EVENT_KEY.ENTER_FULLSCREEN)
    bus.off(EVENT_KEY.EXIT_FULLSCREEN)
  },
  methods: {
    $nav(path) {
      this.$router.push(path)
    },
    tab(index) {
      switch (index) {
        case 1:
          this.$nav('/')
          break
        case 2:
          this.$nav('/shop')
          break
        case 3:
          this.$nav('/publish')
          break
        case 4:
          this.$nav('/message')
          break
        case 5:
          this.$nav('/me')
          break
      }
    },
    refresh(index) {
      if (this.currentTab === index) {
        this['isRefresh' + index] = !this['isRefresh' + index]
        setTimeout(() => {
          this['isRefresh' + index] = !this['isRefresh' + index]
        }, 2000)
      } else {
        this.tab(index)
      }
    }
  }
}
</script>

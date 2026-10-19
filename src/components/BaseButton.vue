<template>
  <div
    class="leading-[40px] flex justify-center items-center relative"
    :class="buttonClasses"
    :style="{ 'border-radius': radius + 'rem' }"
    @click.capture.stop="check"
  >
    <img
      class="h-4 mr-1.25 animate-[dy-animal-692c7a_0.8s_infinite_linear]"
      v-show="loading"
      src="../assets/img/icon/loading-white.png"
      alt=""
    />
    <slot name="prefix"></slot>
    <slot v-if="showText"></slot>
    <slot name="suffix"></slot>
    <div
      class="rounded-[3px] absolute left-0 top-0 h-full w-0 bg-[rgba(80,_80,_80,_0.1)]"
      :style="{ width: progress + '%' }"
      v-if="$props.progress"
    ></div>
  </div>
</template>
<script>
export default {
  name: 'BaseButton',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number,
      default: null
    },
    loadingWithText: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'normal'
      //small
    },
    radius: {
      type: String,
      default: '6'
    }
  },
  data() {
    return {}
  },
  computed: {
    buttonClasses() {
      const themes = {
        primary: 'bg-[var(--primary-btn-color)] text-white',
        dark: 'bg-[var(--second-btn-color)] text-[color:var(--second-text-color)]',
        dark2: 'bg-[#333333] text-white',
        green: 'bg-[#09b85b] text-white',
        qqzone: 'bg-[#f0b302] text-white',
        qq: 'bg-[#1bb1e4] text-white',
        webo: 'bg-[#f25f43] text-white',
        white: 'bg-white text-black',
        info: 'bg-[rgba(161,139,129,0.3)] text-white'
      }
      const pressed = {
        primary: this.disabled
          ? 'active:bg-[gainsboro]'
          : this.active
            ? 'active:bg-[var(--disable-primary-btn-color)]'
            : 'active:bg-[var(--primary-btn-color)]',
        dark: this.active
          ? 'active:bg-[var(--second-btn-color-tran)]'
          : 'active:bg-[var(--second-btn-color)]',
        green: this.active ? 'active:opacity-80' : 'active:opacity-80 active:bg-[#09b85b]',
        qqzone: this.active ? 'active:opacity-80' : 'active:opacity-80 active:bg-[#1bb1e4]',
        qq: this.active ? 'active:opacity-80' : 'active:opacity-80 active:bg-[#1bb1e4]',
        webo: 'active:opacity-80'
      }
      const appearance =
        this.type === 'white'
          ? themes.white
          : this.disabled && this.type === 'primary'
            ? 'bg-[gainsboro] text-white'
            : !this.border
              ? this.type === 'dark'
                ? 'bg-[rgba(212,212,212,0.36)] text-[color:var(--second-text-color)]'
                : 'bg-[rgba(212,212,212,0.36)] text-white'
              : themes[this.type] || 'text-white'
      return [
        this.size === 'small' ? 'h-6.5 w-15.5 text-[12px]' : 'h-10 text-[14px]',
        appearance,
        pressed[this.type],
        !this.border
          ? 'border-0 border-none'
          : this.type === 'white'
            ? 'border border-solid border-[gainsboro]'
            : ''
      ]
    },
    showText() {
      if (this.loading) {
        return this.loadingWithText
      }
      return true
    }
  },
  created() {},
  methods: {
    check() {
      if (this.disabled) return
      if (this.loading) return
      return this.$emit('click')
    }
  }
}
</script>

<template>
  <transition
    enter-from-class="opacity-0"
    enter-active-class="[transition:opacity_0.3s_ease]"
    enter-to-class=""
    leave-from-class=""
    leave-active-class="[transition:opacity_0.3s_ease]"
    leave-to-class="opacity-0"
    move-class=""
  >
    <div class="z-2 absolute text-[12px] text-white rounded-[8px] bg-black p-2.5" v-if="modelValue">
      <div
        class="w-0 h-0 border-t-[black] border-r-[transparent] border-b-[transparent] border-l-[transparent] absolute left-2.5 -bottom-3.5 border-[7px] border-solid"
      ></div>
      <span>请先勾选同意后再进行登录</span>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Popover',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

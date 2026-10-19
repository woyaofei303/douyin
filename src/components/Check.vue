<template>
  <div class="w-3.5 h-3.5" @click.stop="change">
    <img
      class="w-full h-full"
      v-show="!modelValue"
      src="../assets/img/icon/components/check/round-gray.png"
      alt=""
    />
    <img
      class="w-full h-full"
      v-show="modelValue && mode === 'gray'"
      src="../assets/img/icon/components/check/check-gray.png"
      alt=""
    />
    <img
      class="w-full h-full"
      v-show="modelValue && mode === 'red'"
      src="../assets/img/icon/components/check/check-red.png"
      alt=""
    />
  </div>
</template>
<script>
export default {
  name: 'Check',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'gray' //red
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    change() {
      this.$emit('update:modelValue', !this.modelValue)
      this.$emit('change', !this.modelValue)
    }
  }
}
</script>

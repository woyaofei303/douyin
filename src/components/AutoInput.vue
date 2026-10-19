<template>
  <div
    class="text-[14px] w-full max-h-17.5 overflow-y-scroll [outline:none] px-1.25 py-0 [&::-webkit-scrollbar]:w-0 empty:before:content-[attr(placeholder)] empty:before:text-[#999999] focus:before:content-[none]"
    ref="input"
    :placeholder="placeholder"
    contenteditable
    @input="changeText"
  >
    {{ modelValue }}
  </div>
</template>

<script lang="ts">
export default {
  name: 'AutoInput',
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: '留下你的精彩评论吧'
    }
  },
  mounted() {
    // this.$refs.input.setAttribute("placeholder", "改变")
  },
  computed: {},
  data: function () {
    return {}
  },
  methods: {
    changeText() {
      this.$emit('update:modelValue', this.$el.innerText)
    }
  }
}
</script>

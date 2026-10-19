<template>
  <!--  TODO 背景色不对-->
  <div class="flex items-center">
    <div
      class="text-[14px] flex-[1] relative h-9 rounded-[2px] flex items-center p-0"
      :class="[
        mode === 'light'
          ? 'bg-[whitesmoke]'
          : mode === 'dark'
            ? 'bg-[var(--second-btn-color-tran)]'
            : ''
      ]"
    >
      <img
        class="h-5.5 w-5.5 ml-1.75"
        v-if="isShowSearchIcon"
        src="../assets/img/icon/search-gray.png"
        alt=""
      />
      <input
        class="h-[50%] w-full [outline:none] pr-0 pl-1.75 bg-transparent py-0 border-[0] border-current border-none placeholder:text-[color:var(--second-text-color)]"
        :class="[mode === 'light' ? 'text-black' : 'text-white']"
        type="text"
        :placeholder="placeholder"
        v-model="value"
      />
      <div class="flex items-center absolute right-3.75">
        <slot v-if="$slots.default"></slot>
        <img
          class="w-3.75"
          v-if="value.length && !$slots.default"
          src="../assets/img/icon/components/gray-close-full3.png"
          @click.stop="clear"
        />
      </div>
    </div>
    <div
      class="ml-3.75 text-[14px]"
      v-if="isShowRightText"
      :style="{ color: rightTextColor }"
      @click.stop="$emit('notice')"
    >
      {{ rightText }}
    </div>
  </div>
</template>

<script>
//TODO 背景颜色不对
export default {
  name: 'Search',
  props: {
    placeholder: {
      type: String,
      default: '搜索'
    },
    modelValue: {
      type: String,
      default: ''
    },
    rightTextColor: {
      type: String,
      default: 'red'
    },
    isShowRightText: {
      type: Boolean,
      default: false
    },
    isShowSearchIcon: {
      type: Boolean,
      default: true
    },
    rightText: {
      type: String,
      default: '搜索'
    },
    mode: {
      type: String,
      default: 'dark'
    }
  },
  methods: {
    clear() {
      this.value = ''
    }
  },
  mounted() {},
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
        if (!val) {
          this.$emit('clear')
        }
      }
    }
  }
}
</script>

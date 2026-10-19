<template>
  <label class="inline-block relative">
    <span class="block text-[10px] mb-1.25" v-if="shouldShowLabel">
      <span :class="[typeBold ? 'inline-block pb-1.75' : '']" v-if="label" v-text="label"></span>
      <span
        :class="[typeBold ? 'inline-block pb-1.75' : '']"
        v-if="!label && modelValue"
        v-text="textEnabled"
      ></span>
      <span
        :class="[typeBold ? 'inline-block pb-1.75' : '']"
        v-if="!label && !modelValue"
        v-text="textDisabled"
      ></span>
    </span>

    <input
      class="h-full opacity-0 absolute w-full z-1"
      :class="[disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
      type="checkbox"
      :disabled="disabled"
      @change="trigger"
      :checked="modelValue"
    />

    <div
      class="items-center rounded-[30px] cursor-pointer flex relative [transition:linear_0.2s,_background-color_linear_0.2s] after:rounded-[100px] after:shadow-[0_1px_5px_0_rgba(0,_0,_0,_0.1)] after:content-[''] after:cursor-pointer after:block after:h-5 after:absolute after:[transition:linear_0.15s,_background-color_linear_0.15s] after:w-5"
      :class="[
        typeBold
          ? 'h-6.5 w-12.75 -top-2 after:-ml-6 after:top-0.75'
          : 'h-3.75 w-9 after:-ml-4.5 after:-top-0.75',
        modelValue
          ? 'justify-start after:left-full'
          : typeBold
            ? 'justify-end after:left-7'
            : 'justify-end after:left-3.75',
        disabled ? 'opacity-30' : '',
        themeClasses
      ]"
    ></div>
  </label>
</template>

<script>
const switchThemes = {
  default: {
    default: ['bg-[#b7b7b7] after:bg-[#9d9d9d]', 'bg-[#aaaaaa] after:bg-[#c4c4c4]'],
    blue: ['bg-[#77b0c8] after:bg-[#539bb9]', 'bg-[#c0dae5] after:bg-[#77b0c8]'],
    red: ['bg-[#c87777] after:bg-[#b95353]', 'bg-[#e5c0c0] after:bg-[#c87777]'],
    yellow: ['bg-[#c9c377] after:bg-[#bab353]', 'bg-[#e6e3c0] after:bg-[#c9c377]'],
    orange: ['bg-[#c89577] after:bg-[#b97953]', 'bg-[#e5cec0] after:bg-[#c89577]'],
    green: ['bg-[#77c88d] after:bg-[#53b96e]', 'bg-[#c0e5ca] after:bg-[#77c88d]']
  },
  bulma: {
    default: ['bg-[#dcdcdc] after:bg-[#f5f5f5]', 'bg-[#e8e8e8] after:bg-[#f5f5f5]'],
    primary: ['bg-[#05ffda] after:bg-[#00d1b2]', 'bg-[#6bffe9] after:bg-[#05ffda]'],
    blue: ['bg-[#5e91e3] after:bg-[#3273dc]', 'bg-[#b5ccf2] after:bg-[#5e91e3]'],
    red: ['bg-[#ff6b89] after:bg-[#ff3860]', 'bg-[#ffd1da] after:bg-[#ff6b89]'],
    yellow: ['bg-[#ffe78a] after:bg-[#ffdd57]', 'bg-[#fffcf0] after:bg-[#ffe78a]'],
    green: ['bg-[#3dde75] after:bg-[#22c65b]', 'bg-[#94edb3] after:bg-[#3dde75]']
  },
  bootstrap: {
    default: ['bg-[#e6e6e6] after:bg-[#f0f0f0]', 'bg-[#f5f5f5] after:bg-[#f0f0f0]'],
    primary: ['bg-[#4f93ce] after:bg-[#337ab7]', 'bg-[#9fc4e4] after:bg-[#4f93ce]'],
    success: ['bg-[#80c780] after:bg-[#5cb85c]', 'bg-[#c7e6c7] after:bg-[#80c780]'],
    info: ['bg-[#85d0e7] after:bg-[#5bc0de]', 'bg-[#daf1f8] after:bg-[#85d0e7]'],
    warning: ['bg-[#f4c37d] after:bg-[#f0ad4e]', 'bg-[#fceedb] after:bg-[#f4c37d]'],
    danger: ['bg-[#d9534f] after:bg-[#c9302c]', 'bg-[#eba5a3] after:bg-[#d9534f]']
  }
}

export default {
  name: 'switches',

  props: {
    typeBold: {
      default: false
    },
    modelValue: {
      default: false
    },

    disabled: {
      default: false
    },

    label: {
      default: ''
    },

    textEnabled: {
      default: ''
    },

    textDisabled: {
      default: ''
    },

    color: {
      default: 'default'
    },

    theme: {
      default: 'default'
    },

    emitOnMount: {
      default: true
    }
  },

  mounted() {
    if (this.emitOnMount) {
      this.$emit('update:modelValue', this.modelValue)
    }
  },

  methods: {
    trigger(e) {
      this.$emit('update:modelValue', e.target.checked)
    }
  },

  computed: {
    themeClasses() {
      return switchThemes[this.theme]?.[this.color]?.[this.modelValue ? 0 : 1] || ''
    },

    shouldShowLabel() {
      return this.label !== '' || this.textEnabled !== '' || this.textDisabled !== ''
    }
  }
}
</script>

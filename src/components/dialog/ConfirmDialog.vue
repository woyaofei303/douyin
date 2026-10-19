<template>
  <div
    class="z-10 absolute top-0 bottom-0 left-0 right-0 bg-[#000000bb] flex justify-center items-center text-black"
    @click="onDismiss"
    v-if="visible"
  >
    <div class="bg-white w-[70%] rounded-[2px] box-border text-[15px] text-center">
      <slot name="header"></slot>
      <div class="p-6.25">
        <div class="text-[15px] font-bold" v-if="title">{{ title }}</div>
        <div
          class="mt-2.5 text-[13px]"
          :class="[subtitleColor === 'gray' ? 'text-[color:var(--second-text-color)]' : '']"
          v-if="subtitle"
        >
          {{ subtitle }}
        </div>
        <slot></slot>
      </div>
      <div
        class="h-11.5 flex border-t-[1px] [border-top-style:solid] border-t-[whitesmoke] text-[14px]"
      >
        <div
          class="flex items-center justify-center w-[49%] border-r-[1px] [border-right-style:solid] border-r-[whitesmoke]"
          :class="[cancelTextColor === 'gray' ? 'text-[color:var(--second-text-color)]' : '']"
          @click.stop="onCancel"
        >
          {{ cancelText }}
        </div>
        <div class="flex items-center justify-center w-[49%] font-bold" @click.stop="onOk">
          {{ okText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ConfirmDialog' })

interface Props {
  title?: string
  subtitle?: string
  subtitleColor?: string
  okText?: string
  cancelText?: string
  cancelTextColor?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  subtitleColor: 'gray',
  okText: '确定',
  cancelText: '取消',
  cancelTextColor: 'gray'
})

const emit = defineEmits<{
  (ev: 'ok'): void
  (ev: 'cancel'): void
  (ev: 'dismiss'): void
}>()

const visible = defineModel<boolean>('visible', { type: Boolean, default: true })

const onOk = () => {
  visible.value = false
  emit('ok')
}

const onCancel = () => {
  visible.value = false
  emit('cancel')
}

const onDismiss = () => {
  emit('dismiss')
}
</script>

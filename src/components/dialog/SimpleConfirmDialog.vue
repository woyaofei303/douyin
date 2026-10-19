<template>
  <div
    class="z-10 absolute top-0 bottom-0 left-0 right-0 bg-[#000000bb] flex justify-center items-center text-black"
    @click="onDismiss"
  >
    <div class="bg-white w-[80%] rounded-[2px] box-border text-[15px] px-5 py-3.75">
      <div>{{ title }}</div>
      <div class="mt-5 flex justify-end">
        <div class="mr-6.25" @click.stop="onCancel">{{ cancelText }}</div>
        <div @click.stop="onOk">{{ okText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SimpleConfirmDialog' })

interface Props {
  title?: string
  okText?: string
  cancelText?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  okText: '确定',
  cancelText: '取消'
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

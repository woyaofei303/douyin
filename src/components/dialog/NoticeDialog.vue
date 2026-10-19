<template>
  <div
    class="z-10 absolute top-0 bottom-0 left-0 right-0 bg-[#000000bb] flex justify-center items-center text-black"
    @click="onDismiss"
  >
    <div class="bg-white w-[70%] rounded-[2px] box-border text-[15px] text-center">
      <div class="p-6.25">
        <div class="text-[15px] font-bold">{{ title }}</div>
        <div
          class="mt-2.5 text-[13px]"
          :class="[subtitleColor === 'gray' ? 'text-[color:var(--second-text-color)]' : '']"
          v-if="subtitle"
        >
          {{ subtitle }}
        </div>
      </div>
      <div
        class="h-11.5 flex justify-center items-center border-t-[1px] [border-top-style:solid] border-t-[whitesmoke] text-[14px]"
      >
        <div class="font-bold" @click.stop="onCancel">{{ cancelText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'NoticeDialog' })

interface Props {
  title?: string
  subtitle?: string
  subtitleColor?: string
  cancelText?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  subtitleColor: 'gray',
  cancelText: '取消'
})

const emit = defineEmits<{
  (ev: 'ok'): void
  (ev: 'cancel'): void
  (ev: 'dismiss'): void
}>()

const visible = defineModel<boolean>('visible', { type: Boolean, default: true })

const onCancel = () => {
  visible.value = false
  emit('cancel')
}

const onDismiss = () => {
  emit('dismiss')
}
</script>

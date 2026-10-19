<template>
  <div
    class="z-10 absolute top-0 bottom-0 left-0 right-0 bg-[#000000bb] flex justify-center items-center"
    @click="onCancel"
  >
    <div class="bg-white w-[80%] rounded-[2px] box-border px-0 py-1.25">
      <div
        class="text-[15px] [transition:all_0.2s] px-5 py-3.75 active:bg-[darkgray]"
        :key="i"
        v-for="(item, i) in list"
        @click.stop="onOk(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
defineOptions({ name: 'SelectDialog' })

type Item = { name: string } & T

interface Props {
  visible?: boolean
  list?: Item[]
}

withDefaults(defineProps<Props>(), {
  visible: false,
  list: () => []
})

const emit = defineEmits<{
  (ev: 'ok', item: Item): void
  (ev: 'cancel'): void
}>()

const onOk = (item: Item) => {
  emit('ok', item)
}

const onCancel = () => {
  emit('cancel')
}
</script>

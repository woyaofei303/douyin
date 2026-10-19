<template>
  <div class="flex justify-center w-11.25 h-11.25 relative">
    <div
      class="h-full flex justify-center items-center animate-[unset] cursor-pointer absolute z-1 right-0 bg-white text-black [transition:all_0.5s] overflow-hidden"
      :class="[showMutedNotice ? 'rounded-[50px] w-25' : 'rounded-[50%] w-full']"
      v-click="() => bus.emit(EVENT_KEY.REMOVE_MUTED)"
      v-if="isMuted"
    >
      <div class="w-25 absolute left-0 flex items-center justify-center">
        <Icon class="text-[22px]" icon="flowbite:volume-mute-solid" />
        <span
          :class="['', showMutedNotice ? 'opacity-100' : 'opacity-0']"
          class="ml-1.25 text-[13px] [word-break:keep-all] [transition:all_0.5s]"
          >取消静音</span
        >
      </div>
    </div>
    <img
      class="rounded-[50%] w-full h-full flex justify-center items-center animate-[dy-animations-4c87fc_5s_linear_forwards_infinite]"
      :src="item.music?.cover_thumb.url_list[0]"
      :style="style"
      v-click="
        () =>
          bus.emit(EVENT_KEY.NAV, {
            path: '/home/music',
            query: { id: item.aweme_id }
          })
      "
    />
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted } from 'vue'
import bus, { EVENT_KEY } from '@/utils/bus'
import { Icon } from '@iconify/vue'
import { useClick } from '@/utils/hooks/useClick'

const isPlaying = inject<boolean>('isPlaying')
const isMuted = inject('isMuted')
const item = inject<any>('item')
const vClick = useClick()
let showMutedNotice = $ref(window.showMutedNotice)

const style = $computed(() => {
  return { webkitAnimationPlayState: isPlaying.value ? 'running' : 'paused' }
})
onMounted(() => {
  bus.on(EVENT_KEY.HIDE_MUTED_NOTICE, () => {
    showMutedNotice = false
  })
})
</script>

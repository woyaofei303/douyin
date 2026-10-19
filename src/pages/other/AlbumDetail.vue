<template>
  <div
    class="bg-[var(--color-message)] text-white text-[14px] h-full relative opacity-0"
    @dragstart="(e) => _stopPropagation(e)"
  >
    <header class="fixed left-0 top-0 w-full z-9 flex justify-between box-border p-3.75">
      <Icon
        class="text-[20px] bg-[rgba(176,_176,_176,_0.4)] text-white rounded-[50%] p-1.25"
        @click="close"
        icon="material-symbols-light:arrow-back-ios-new"
      />
      <div @click="nav('/home/search')">
        <Icon
          class="text-[20px] bg-[rgba(176,_176,_176,_0.4)] text-white rounded-[50%] p-1.25"
          icon="jam:search"
        />
      </div>
    </header>

    <div class="h-[100vh] overflow-auto" ref="scrollEl">
      <div class="relative h-[70vh]">
        <SlideHorizontal v-model:index="state.index">
          <SlideItem
            data-slide-item=""
            :key="i"
            v-for="(item, i) in props.detail.note_card?.image_list"
          >
            <img
              class="h-full w-full object-cover"
              :src="_checkImgUrl(item.info_list?.[0]?.url)"
              alt=""
            />
          </SlideItem>
        </SlideHorizontal>

        <div
          class="absolute bottom-1.25 left-[3vw] w-[94%] flex gap-1.25"
          v-if="props.detail.note_card?.image_list?.length > 1"
        >
          <div
            class="h-0.75 flex-[1] rounded-[2px]"
            :class="[
              i <= state.index + 1
                ? 'bg-[rgba(250,_246,_246,_0.58)]'
                : 'bg-[rgba(162,_160,_160,_0.5)]'
            ]"
            :key="j"
            v-for="(i, j) in props.detail.note_card?.image_list?.length"
          ></div>
        </div>
      </div>

      <div class="pt-3.75 pb-[10vh] rounded-[16px_16px_0_0] px-3.75">
        <div>
          <header class="flex items-center gap-2.5">
            <img
              class="w-9 h-9 rounded-[50%]"
              :src="_checkImgUrl(props.detail.note_card?.user?.avatar)"
            />
            <div class="flex-[1] flex justify-between items-center">
              <div class="text-[16px]">
                {{ props.detail.note_card.user.nick_name }}
              </div>
              <div
                class="rounded-[4px] bg-[var(--primary-btn-color)] text-[12px] text-white px-4 py-1.5"
              >
                关注
              </div>
            </div>
          </header>
          <div class="mt-2.5">
            {{ props.detail.note_card?.display_title }}
          </div>
          <div class="text-[12px] mt-2.5 text-[gray]">{{ props.detail.note_card.createTime }}</div>
        </div>

        <div class="mt-3.75 rounded-[10px] bg-black px-3.75 py-2.5">
          <header class="mb-4 flex justify-between items-center">
            <span class="text-[15px]">评论 {{ props.detail.note_card.comment_list.length }}</span>
            <div class="text-[gray] text-[12px] flex items-center">
              <span>查看全部</span>
              <Icon class="text-[16px]" icon="mingcute:right-line" />
            </div>
          </header>
          <div
            class="mb-4 flex items-center gap-1.25 last:mb-0"
            :key="j"
            v-for="(i, j) in props.detail.note_card.comment_list.slice(0, 2)"
          >
            <img class="rounded-[50%] w-5 h-5" src="https://cdn.seovx.com/?mom=302" alt="" />
            <span
              class="inline-block whitespace-nowrap flex-[1] [word-break:break-all] overflow-hidden text-ellipsis"
            >
              {{ i.name }}：{{ i.text }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="fixed bottom-0 w-[100vw] left-0 bg-[var(--color-message)] border-t-[1px] [border-top-style:solid] border-t-[rgba(255,_255,_255,_0.1)] flex items-center pr-0 pl-2.5 box-border gap-1.5 py-2"
    >
      <div
        class="w-27.5 pl-3.75 h-8.5 rounded-[30px] bg-[var(--second-btn-color-tran)] text-[gray] flex items-center"
      >
        说点什么...
      </div>
      <div class="flex-[1] flex">
        <div class="flex-[1] flex justify-center items-center flex-col text-[13px] text-white">
          <Icon class="text-[24px]" icon="solar:heart-linear" />
          <div>
            {{ props.detail.note_card?.interact_info?.liked_count }}
          </div>
        </div>
        <div class="flex-[1] flex justify-center items-center flex-col text-[13px] text-white">
          <Icon class="text-[24px]" icon="mage:message-dots-round" />
          <div>
            {{ props.detail.note_card.comment_list.length }}
          </div>
        </div>
        <div class="flex-[1] flex justify-center items-center flex-col text-[13px] text-white">
          <Icon class="text-[24px]" icon="mage:star" />
          <div>
            {{ props.detail.note_card?.interact_info?.collect_count }}
          </div>
        </div>
        <div class="flex-[1] flex justify-center items-center flex-col text-[13px] text-white">
          <Icon class="text-[24px]" icon="ph:share-fat-light" />
          <div>
            {{ props.detail.note_card?.interact_info?.share_count }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SlideHorizontal from '@/components/slide/SlideHorizontal.vue'
import SlideItem from '@/components/slide/SlideItem.vue'
import { reactive, ref } from 'vue'
import { useNav } from '@/utils/hooks/useNav'
import { Icon } from '@iconify/vue'
import { _checkImgUrl, _stopPropagation } from '@/utils'

const nav = useNav()

defineOptions({
  name: 'Album-Detail'
})

const props = defineProps({
  detail: {
    type: Object,
    default() {
      return {}
    }
  }
})

const emit = defineEmits({
  close: []
})

const scrollEl = ref()
const state = reactive({
  index: 0
})

function close() {
  emit('close')
  setTimeout(() => {
    state.index = 0
    scrollEl.value.scrollTop = 0
  }, 500)
}
</script>

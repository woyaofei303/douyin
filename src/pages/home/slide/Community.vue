<template>
  <div
    class="text-[14px] text-white pt-[var(--home-header-height)] bg-[#151724]"
    id="Community"
    @dragstart="(e) => _stopPropagation(e)"
  >
    <ScrollList
      class="h-[calc(var(--vh,_1vh)_*_100_-_var(--home-header-height)_-_var(--footer-height))]!"
      v-if="state.show"
      :api="recommendedPost"
    >
      <template v-slot="{ list }">
        <div
          class="ml-[2%] w-[96%] box-border flex justify-between items-center text-[16px] mb-2.5 rounded-[8px] p-2.5 border border-[#646464] border-solid"
          @click="nav('/home/search')"
        >
          <div class="flex items-center gap-1.25 text-[gray]">
            <Icon class="text-[16px]" icon="ion:search" @click.stop="_no" />
            <span>壁纸</span>
          </div>
          <div>搜索</div>
        </div>
        <WaterfallList class="ml-[2%]! w-[96%]!" :list="list">
          <template v-slot="{ item }">
            <div
              class="rounded-[4px] overflow-hidden bg-[var(--main-bg)]"
              @click="(e) => showDetail(e, item)"
            >
              <img
                class="block w-full object-cover"
                v-lazy="_checkImgUrl(item.note_card?.cover?.url_default)"
              />
              <div class="text-[gainsboro] pt-2.5 pb-3.75 px-2.5">
                <div class="text-[14px] mb-2">
                  {{ item.note_card?.display_title }}
                </div>
                <div class="flex justify-between items-center">
                  <div class="flex text-[12px]">
                    <img
                      class="w-3.75 rounded-[50%] mr-1.25"
                      :src="_checkImgUrl(item.note_card?.user?.avatar)"
                    />
                    <div>{{ item.note_card?.user?.nickname }}</div>
                  </div>
                  <div class="flex items-center gap-0.75">
                    <Icon class="text-[15px]" icon="solar:heart-linear" />
                    <div class="text-[12px]">
                      {{ item.note_card?.interact_info?.liked_count }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </WaterfallList>
      </template>
    </ScrollList>

    <teleport to="body">
      <div
        data-community-shadow=""
        class="bg-[var(--color-message)] absolute left-0 top-[-200vh] w-full [transition:all_0.3s] overflow-hidden -z-100"
      >
        <div data-community-wrap="" class="absolute z-9999"></div>
        <AlbumDetail data-community-goods-detail="" :detail="state.current" @close="close" />
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { _checkImgUrl, _no, _stopPropagation, cloneDeep } from '@/utils'
import { recommendedPost } from '@/api/user'
import { useNav } from '@/utils/hooks/useNav'
import { Icon } from '@iconify/vue'
import WaterfallList from '@/components/WaterfallList.vue'
import ScrollList from '@/components/ScrollList.vue'
import { useBaseStore } from '@/store/pinia'
import AlbumDetail from '@/pages/other/AlbumDetail.vue'
import Mock from 'mockjs'
import { _css } from '@/utils/dom'

const nav = useNav()
const baseStore = useBaseStore()
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const state = reactive({
  show: false,
  current: {
    id: '',
    note_card: {
      interact_info: {},
      cover: {},
      image_list: [],
      display_title: '',
      user: {},
      comment_list: [],
      createTime: ''
    }
  },
  d: false
})
let rect = ref({})

watch(
  () => props.active,
  (n) => {
    if (n && !state.show) {
      state.show = true
    }
  },
  { immediate: true }
)

function close() {
  let s = document.querySelector('[data-community-shadow]')
  let domRect = rect.value
  let t = '.3'
  _css(s, 'transition', `all ${t}s`)
  _css(s, 'top', domRect.top)
  _css(s, 'left', domRect.left)
  _css(s, 'width', domRect.width)
  _css(s, 'height', domRect.height)

  let a = document.querySelector('[data-community-goods-detail]')
  _css(a, 'transition', `all ${t}s`)
  _css(a, 'opacity', '0')
  _css(a, 'width', '100vw')
  _css(a, 'height', '100vh')
  _css(a, 'transform', `scale(${domRect.sw},${domRect.sh})`)
  _css(a, 'transform-origin', `0 0`)

  let d = document.querySelector('[data-community-shadow] [data-community-wrap]')
  _css(d, 'transition', `all ${t}s`)
  _css(d, 'opacity', '1')

  // state.d = false
  setTimeout(() => {
    _css(s, 'z-index', '-100')
    _css(s, 'transition', 'all 0s')
    _css(s, 'top', '-200vh')
  }, 300)
}

function showDetail(e, item) {
  let data = Mock.mock({
    'comment_list|3-50': [
      {
        name: '@cname',
        text: '@cparagraph(3)'
      }
    ]
  })
  item.note_card.comment_list = data.comment_list
  item.note_card.createTime = Mock.Random.date('MM-dd')
  item.note_card.interact_info.collect_count = Mock.Random.integer(60, 3000)
  item.note_card.interact_info.share_count = Mock.Random.integer(60, 3000)
  state.current = cloneDeep(item)
  // console.log(state.current)

  state.d = true

  let domRect = e.currentTarget.getBoundingClientRect()
  // // console.log('e', domRect)

  let s = document.querySelector('[data-community-shadow]')

  _css(s, 'z-index', '1')
  _css(s, 'transition', 'all 0s')
  _css(s, 'top', domRect.top)
  _css(s, 'left', domRect.left)
  _css(s, 'width', domRect.width)
  _css(s, 'height', domRect.height)

  let t = '.3'
  let d = document.querySelector('[data-community-shadow] [data-community-wrap]')
  d.innerHTML = ''
  d.append(e.currentTarget.cloneNode(true))
  _css(d, 'display', 'block')
  _css(d, 'transition', `all ${t}s`)
  _css(d, 'opacity', '1')

  let sw = domRect.width / baseStore.bodyWidth
  let sh = domRect.height / baseStore.bodyHeight
  domRect.sw = sw
  domRect.sh = sh

  let a = document.querySelector('[data-community-goods-detail]')
  _css(a, 'opacity', '0')
  _css(a, 'width', '100vw')
  _css(a, 'height', '100vh')
  _css(a, 'transform', `scale(${domRect.sw},${domRect.sh})`)
  _css(a, 'transform-origin', `0 0`)

  rect.value = domRect
  setTimeout(() => {
    _css(s, 'transition', `all ${t}s`)
    _css(s, 'top', 0)
    _css(s, 'left', 0)
    _css(s, 'width', '100vw')
    _css(s, 'height', '100vh')

    _css(d, 'opacity', '0')
    _css(d, 'z-index', '-1')

    _css(a, 'transition', `all ${t}s`)
    _css(a, 'opacity', '1')
    _css(a, 'transform', `scale(1,1)`)
    _css(a, 'transform-origin', `0 0`)
  })
}
</script>

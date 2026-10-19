<template>
  <div
    class="touch-pan-y fixed bg-[var(--color-user)] h-full w-full overflow-auto text-[14px]"
    id="UserPanel"
    @scroll="scroll"
    @dragstart="(e) => _stopPropagation(e)"
    ref="page"
  >
    <div
      class="fixed box-border w-full z-2 flex justify-between items-center h-13 [transition:all_0.2s] px-3.75 py-0"
      :class="[state.floatFixed ? 'bg-[var(--main-bg)]' : 'bg-transparent']"
      ref="float"
    >
      <div class="flex items-center">
        <Icon
          class="text-white rounded-[50%] bg-[rgba(82,_80,_80,_0.5)] text-[18px] p-1.5"
          @click="emit('back')"
          icon="eva:arrow-ios-back-fill"
        />
        <transition
          enter-from-class="opacity-0"
          enter-active-class="[transition:opacity_0.3s_ease]"
          enter-to-class=""
          leave-from-class=""
          leave-active-class="[transition:opacity_0.3s_ease]"
          leave-to-class="opacity-0"
          move-class=""
        >
          <div
            class="inline-flex ml-5.5 text-white text-[12px] items-center bg-[var(--second-btn-color-tran)] h-5.5 rounded-[40px] pr-2.5 pl-0.25 py-0.25"
            v-if="state.floatFixed"
          >
            <img
              class="w-5 rounded-[50%] mr-1.25"
              :class="[state.floatFixed ? 'bg-[var(--main-bg)]' : '']"
              v-lazy="_checkImgUrl(props.currentItem.author.avatar_168x168.url_list[0])"
            />
            <img
              class="w-3 mr-0.5"
              :class="[state.floatFixed ? 'bg-[var(--main-bg)]' : '']"
              v-if="!props.currentItem.author.follow_status"
              src="@/assets/img/icon/add-light.png"
              alt=""
            />
            <span @click="followButton">{{
              props.currentItem.author.follow_status ? '私信' : '关注'
            }}</span>
          </div>
        </transition>
      </div>
      <div class="flex text-white items-center relative gap-3.75">
        <transition
          enter-from-class="opacity-0"
          enter-active-class="[transition:opacity_0.3s_ease]"
          enter-to-class=""
          leave-from-class=""
          leave-active-class="[transition:opacity_0.3s_ease]"
          leave-to-class="opacity-0"
          move-class=""
        >
          <div
            class="text-[12px] h-6.5 flex pr-3.25 pl-1.25 items-center rounded-[20px] bg-[rgba(82,_80,_80,_0.5)]"
            v-if="!state.floatFixed && props.currentItem.author.is_follow"
          >
            <img
              class="w-4.5 p-1.5"
              :class="[state.floatFixed ? 'bg-[var(--main-bg)]' : '']"
              @click="$nav('/me/request-update')"
              src="@/assets/img/icon/me/finger-right.png"
              alt=""
            />
            <span>求更新</span>
          </div>
        </transition>
        <Icon
          class="text-white rounded-[50%] bg-[rgba(82,_80,_80,_0.5)] text-[18px] p-1.5"
          icon="ion:search"
          @click.stop="_no"
        />
        <Icon
          class="text-white rounded-[50%] bg-[rgba(82,_80,_80,_0.5)] text-[18px] p-1.5"
          icon="ri:more-line"
          @click.stop="emit('showFollowSetting')"
        />
      </div>
    </div>
    <div ref="main" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <!--   src="@/assets/img/header-bg.png"   -->
      <header class="relative text-white">
        <img
          :class="[
            '',
            props.currentItem.author.cover_url[0].url_list.length ? 'opacity-100' : 'opacity-0'
          ]"
          class="h-55 object-cover w-full"
          ref="cover"
          :src="_checkImgUrl(props.currentItem.author.cover_url[0].url_list[0])"
          @click="
            state.previewImg = _checkImgUrl(props.currentItem.author.cover_url[0].url_list[0])
          "
          alt=""
        />
        <div class="flex items-center box-border absolute bottom-8.75 left-5">
          <img
            class="bg-white rounded-[50%] w-25 h-25 p-[2.5px]"
            v-lazy="_checkImgUrl(props.currentItem.author.avatar_168x168.url_list[0])"
            @click="
              state.previewImg = _checkImgUrl(props.currentItem.author.avatar_300x300.url_list[0])
            "
          />
          <div class="text-[12px] text-white ml-3.75">
            <div class="text-[22px]">{{ props.currentItem.author.nickname }}</div>
            <div class="flex items-center" v-if="props.currentItem.author.certification">
              <img class="w-3.5 mx-1.25" src="@/assets/img/icon/me/certification.webp" />
              {{ props.currentItem.author.certification }}
            </div>
            <div class="flex items-center text-[color:var(--second-text-color)]" v-else>
              <span>抖音号：{{ _getUserDouyinId(props.currentItem) }}</span>
              <img
                class="w-3 ml-1.25"
                src="@/assets/img/icon/me/copy.png"
                alt=""
                @click.stop="_copy(_getUserDouyinId(props.currentItem))"
              />
            </div>
          </div>
        </div>
      </header>
      <div class="relative z-1 bg-[var(--main-bg)] rounded-[10px_10px_0_0] -mt-5 px-5 py-0">
        <div class="text-[color:var(--second-text-color)] flex items-center px-0 py-3.75">
          <div class="text-[12px] mr-4.5 flex items-center">
            <span class="text-white text-[16px] font-bold mr-1.25">{{
              _formatNumber(props.currentItem.author.total_favorited)
            }}</span>
            <span>获赞</span>
          </div>
          <div class="text-[12px] mr-4.5 flex items-center">
            <span class="text-white text-[16px] font-bold mr-1.25">{{
              _formatNumber(props.currentItem.author.following_count)
            }}</span>
            <span>关注</span>
          </div>
          <div class="text-[12px] mr-4.5 flex items-center">
            <span class="text-white text-[16px] font-bold mr-1.25">{{
              _formatNumber(props.currentItem.author.mplatform_followers_count)
            }}</span>
            <span>粉丝</span>
          </div>
        </div>

        <div
          class="text-[12px] text-white flex items-center mb-1.25"
          v-if="props.currentItem.author.signature"
        >
          <div class="[white-space:pre-wrap]" v-html="props.currentItem.author.signature"></div>
        </div>
        <div class="mt-2.5 mb-5 text-[color:var(--second-text-color)] flex">
          <div
            class="rounded-[2px] bg-[var(--second-btn-color-tran)] text-[10px] flex items-center mr-1.25 px-1.25 py-0.5"
            v-if="props.currentItem.author.user_age !== -1"
          >
            <img
              class="h-2.5 mr-0.5"
              v-if="props.currentItem.author.gender == 1"
              src="@/assets/img/icon/me/man.png"
              alt=""
            />
            <img
              class="h-2.5 mr-0.5"
              v-if="props.currentItem.author.gender == 2"
              src="@/assets/img/icon/me/woman.png"
              alt=""
            />
            <span>{{ props.currentItem.author.user_age }}岁</span>
          </div>
          <div
            class="rounded-[2px] bg-[var(--second-btn-color-tran)] text-[10px] flex items-center mr-1.25 px-1.25 py-0.5"
            v-if="props.currentItem.author.ip_location"
          >
            {{ props.currentItem.author.ip_location }}
          </div>
          <div
            class="rounded-[2px] bg-[var(--second-btn-color-tran)] text-[10px] flex items-center mr-1.25 px-1.25 py-0.5"
            v-if="props.currentItem.author.province || props.currentItem.author.city"
          >
            {{ props.currentItem.author.province }}
            <template v-if="props.currentItem.author.province && props.currentItem.author.city">
              ·
            </template>
            {{ props.currentItem.author.city }}
          </div>
          <div
            class="rounded-[2px] bg-[var(--second-btn-color-tran)] text-[10px] flex items-center mr-1.25 px-1.25 py-0.5"
            v-if="props.currentItem.author.school?.name"
          >
            {{ props.currentItem.author.school?.name }}
          </div>
        </div>
      </div>
      <div class="flex mb-5 overflow-hidden">
        <div class="pl-5 flex overflow-x-scroll" @touchmove="stop">
          <div
            class="mr-6.25 flex shrink-0"
            :key="i"
            v-for="(item, i) in props.currentItem.author.card_entries"
          >
            <img
              class="mr-2 rounded-[4px] h-10"
              :src="_checkImgUrl(item.icon_dark.url_list[0])"
              alt=""
            />
            <div class="flex justify-between flex-col">
              <div class="text-white text-[14px]">{{ item.title }}</div>
              <div class="text-[color:var(--second-text-color)] text-[12px]">
                {{ item.sub_title }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-hidden flex justify-end items-center gap-1.5 m-5">
        <div class="flex-[1] overflow-hidden">
          <div
            class="w-[200%] flex flex-nowrap [transition:all_0.3s_ease]"
            :class="[
              props.currentItem.author.follow_status ? '[transform:translate3d(-50%,_0,_0)]' : ''
            ]"
          >
            <!-- eslint-disable vue/no-mutating-props -->
            <div
              class="w-[calc(100%_-_5px)] text-white rounded-[4px] bg-[var(--primary-btn-color)] h-9 flex items-center justify-center box-border"
              @click="props.currentItem.author.follow_status = 1"
            >
              <img class="w-3.5 h-3.5" src="@/assets/img/icon/add-white.png" alt="" />
              <span class="ml-0.5">关注</span>
            </div>
            <!-- eslint-enable vue/no-mutating-props -->
            <div class="w-full flex justify-around items-center gap-1.5">
              <div
                class="text-white rounded-[5px] bg-[var(--second-btn-color)] h-9 w-[50%] box-border flex items-center justify-center gap-1.5"
                @click="emit('showFollowSetting2')"
              >
                <span>已关注</span>
                <Icon class="[transition:transform_0.3s_ease] text-[13px]" icon="bxs:down-arrow" />
              </div>
              <div
                class="text-white rounded-[5px] bg-[var(--second-btn-color)] h-9 w-[50%] box-border flex items-center justify-center gap-1.5"
                @click="$nav('/message/chat')"
              >
                <span>私信</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="relative w-9 h-9 text-[12px] flex items-center justify-center rounded-[4px] bg-[var(--second-btn-color)] text-white"
          @click="state.isShowRecommend = !state.isShowRecommend"
        >
          <img
            class="w-3 h-3 animate-[dy-rotate-ecb9ff_0.6s_linear_infinite]"
            v-if="state.loadings.showRecommend"
            src="@/assets/img/icon/loading-gray.png"
            alt=""
          />
          <Icon
            class="[transition:transform_0.3s_ease] text-[13px]"
            :class="[state.isShowRecommend ? '[transform:rotate(180deg)]!' : '']"
            icon="bxs:down-arrow"
            v-else
          />
        </div>
      </div>

      <div
        class="[transition:all_0.3s_ease] overflow-hidden"
        :class="[!state.isShowRecommend ? 'h-0' : 'h-62.5']"
      >
        <div class="pl-5 text-[12px] text-[color:var(--second-text-color)] flex items-center">
          <span>你可能感兴趣</span>
          <img class="ml-0.75 w-3.25 h-3.25" src="@/assets/img/icon/about-gray.png" />
        </div>
        <div class="pl-5 mt-2.5 flex overflow-x-scroll mb-5" @touchmove="stop">
          <div
            class="relative bg-[var(--second-btn-color-tran)] mr-2.5 flex flex-col items-center rounded-[10px] p-2.5"
            :key="i"
            v-for="(item, i) in baseStore.friends.all"
          >
            <img
              :class="['', item.select ? 'opacity-50' : '']"
              class="rounded-[50%] w-25 h-25"
              :src="_checkImgUrl(item.avatar)"
              alt=""
            />
            <span class="mt-2.5 text-[12px] text-white">{{ item.name }}</span>
            <span class="mt-1.25 text-[12px] text-[color:var(--second-text-color)]"
              >可能感兴趣的人</span
            >
            <dy-button class="mt-2.5! w-37.5! h-6.5! text-[12px]!" type="primary">关注</dy-button>
            <div class="absolute top-0.5 right-0.5">
              <dy-back class="absolute top-0.5 right-0.5" img="close" scale=".6"></dy-back>
            </div>
          </div>
          <div @click="$nav('/people/find-acquaintance')">
            <div
              class="text-[12px] h-full text-[color:var(--second-text-color)] flex justify-center items-center w-25 flex-col"
            >
              <div>点击查看</div>
              <div>更多好友</div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-[var(--main-bg)] text-white flex items-center pt-0 pb-3.75 sticky top-13 z-2 px-5"
        ref="total"
      >
        作品 {{ props.currentItem.author.aweme_count }}
        <img
          class="[transform:rotate(180deg)] ml-1.25 w-3 h-3"
          src="@/assets/img/icon/arrow-up-white.png"
          alt=""
        />
      </div>
      <div>
        <Posters
          v-if="props.currentItem.aweme_list.length"
          :list="props.currentItem.aweme_list"
        ></Posters>
        <Loading :isFullScreen="false" v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import {
  _checkImgUrl,
  _copy,
  _formatNumber,
  _getUserDouyinId,
  _no,
  _stopPropagation
} from '@/utils'
import { useNav } from '@/utils/hooks/useNav'
import Posters from '@/components/Posters.vue'
import { DefaultUser } from '@/utils/const_var'
import Loading from '@/components/Loading.vue'
import { useBaseStore } from '@/store/pinia'
import { userVideoList } from '@/api/user'

const $nav = useNav()
const baseStore = useBaseStore()
const emit = defineEmits<{
  'update:currentItem': [val: any]
  back: []
  showFollowSetting: []
  showFollowSetting2: []
}>()

const props = defineProps({
  currentItem: {
    type: Object,
    default() {
      return {
        author: DefaultUser,
        aweme_list: []
      }
    }
  },
  active: {
    type: Boolean,
    default() {
      return false
    }
  }
})
const main = ref(null)
const page = ref(null)
const cover = ref(null)
const total = ref(null)

const state = reactive({
  isShowRecommend: false, //是否显示推荐
  previewImg: '',
  floatFixed: false,
  showFollowSetting: false,
  floatHeight: 52,
  loadings: {
    showRecommend: false
  },
  acceleration: 1.2,
  start: { x: 0, y: 0, time: 0 },
  move: { x: 0, y: 0 },
  isTop: false,
  coverHeight: 220,
  //能移动的高度
  canMoveMaxHeight: document.body.clientHeight / 4,
  //是否自动放大Cover
  isAutoScaleCover: false,
  uid: null
})

watch(
  () => props.active,
  async (newVal) => {
    if (newVal && !props.currentItem.aweme_list.length) {
      // console.log('props.currentItem',props.currentItem)
      let id = _getUserDouyinId(props.currentItem)
      let r: any = await userVideoList({ id })
      if (r.success) {
        setTimeout(() => {
          r.data = r.data.map((a) => {
            a.author = props.currentItem.author
            return a
          })
          emit('update:currentItem', Object.assign(props.currentItem, { aweme_list: r.data }))
        }, 300)
      }
    }
  }
)

watch(
  () => props.currentItem.author.uid,
  async () => {
    if (props.currentItem.author.uid !== state.uid) {
      state.uid = props.currentItem.author.uid
      emit('update:currentItem', Object.assign(props.currentItem, { aweme_list: [] }))
    }
  }
)

function stop(e) {
  e.stopPropagation()
}

function followButton() {}

function cancelFollow() {}

defineExpose({ cancelFollow })

function scroll() {
  // console.log('scroll', page.value.scrollTop)
  let scrollTop = page.value.scrollTop
  let totalY = total.value.getBoundingClientRect().y
  state.floatFixed = totalY <= state.floatHeight
  let isTop = scrollTop === 0
  if (isTop && state.isAutoScaleCover) {
    cover.value.style.transition = 'all .1s'
    cover.value.style.height = `calc(${state.coverHeight}rem + ${state.canMoveMaxHeight}px)`
    setTimeout(() => {
      cover.value.style.transition = 'all .4s'
      cover.value.style.height = `calc(${state.coverHeight}rem)`
      state.isAutoScaleCover = false
    }, 200)
  }
}

function touchStart(e: TouchEvent) {
  state.start.x = e.touches[0].pageX
  state.start.y = e.touches[0].pageY
  state.start.time = Date.now()
  state.isTop = page.value.scrollTop === 0
  if (state.isTop) {
    cover.value.style.transition = 'none'
  }
  // console.log('touchStart', page.value.scrollTop)
}

function touchMove(e: TouchEvent) {
  state.move.x = e.touches[0].pageX - state.start.x
  state.move.y = e.touches[0].pageY - state.start.y
  let isNext = state.move.y < 0

  // console.log('touchMove', page.value.scrollTop)
  //todo 有空了加个，越滑越紧的效果
  if (state.isTop && !isNext && document.body.clientHeight / 4 > state.move.y) {
    // if (state.isTop && !isNext) {
    let scrollHeight = state.move.y
    cover.value.style.height = `calc(${state.coverHeight}rem + ${scrollHeight}px)`
  }
}

function touchEnd() {
  if (state.isTop) {
    state.isTop = false
    cover.value.style.transition = 'all .3s'
    cover.value.style.height = `calc(${state.coverHeight}rem)`
  }
  let endTime = Date.now()
  state.isAutoScaleCover = endTime - state.start.time < 100
  // console.log('touchEnd')
}
</script>

<template>
  <div class="text-[14px] w-full h-full bg-black overflow-hidden" id="home-index">
    <SlideHorizontal name="first" v-model:index="state.baseIndex">
      <SlideItem
        data-slide-item=""
        class="h-[calc(var(--vh,_1vh)_*_100)]! w-[80%]! touch-pan-y overflow-auto bg-[#161616] pt-2.5 pb-5 box-border px-2.5"
      >
        <div class="text-[16px] flex text-white justify-between items-center">
          <div>下午好</div>
          <div
            class="rounded-[20px] bg-[#242424] flex items-center text-[14px] gap-2.5 px-3.75 py-2"
            @click="nav('/home/live')"
          >
            <Icon class="text-[18px]" icon="iconamoon:scanner" />
            <span>扫一扫</span>
          </div>
        </div>
        <div class="mt-2.5 rounded-[12px] bg-[#1d1d1d] p-3.75">
          <div class="mb-2 text-[14px] flex text-white justify-between items-center">
            <div>常用小程序</div>
            <div class="flex items-center text-[12px] gap-1 text-[gray]">
              <span>全部</span>
              <Icon class="text-[16px]" icon="icon-park-outline:right" />
            </div>
          </div>
          <div class="text-white grid [grid-template-columns:1fr_1fr_1fr]">
            <div
              class="min-h-[20vw] flex flex-col justify-center items-center text-[14px] gap-2"
              @click="_no"
            >
              <img
                class="rounded-[12px] w-12.5 h-12.5"
                src="https://lf3-static.bytednsdoc.com/obj/eden-cn/pipieh7nupabozups/toutiao_web_pc/tt-icon.png"
                alt=""
              />
              <span>今日头条</span>
            </div>
            <div
              class="min-h-[20vw] flex flex-col justify-center items-center text-[14px] gap-2"
              @click="_no"
            >
              <img
                class="rounded-[12px] w-12.5 h-12.5"
                src="https://gd-hbimg.huaban.com/65130a3e6a139530bb03bd118e21a2603af7df4e1303b-OOzcBu_fw658webp"
                alt=""
              />
              <span>西瓜视频</span>
            </div>
          </div>
        </div>

        <div class="mt-2.5 rounded-[12px] bg-[#1d1d1d] p-3.75">
          <div class="mb-2 text-[14px] flex text-white justify-between items-center">
            <div>最近常看</div>
            <div class="flex items-center text-[12px] gap-1 text-[gray]">
              <span>全部</span>
              <Icon class="text-[16px]" icon="icon-park-outline:right" />
            </div>
          </div>
          <div class="text-white grid [grid-template-columns:1fr_1fr_1fr]">
            <div
              class="min-h-[20vw] flex flex-col justify-center items-center text-[14px] gap-2 h-[25vw]"
              @click="_no"
              :key="i"
              v-for="i in 6"
            >
              <img
                class="rounded-[50%] w-12.5"
                src="https://img.tol.vip/avatar/WEIXIN/3aSuTGYTzjHvcHy0y0tH1eiShKRk9Sgd.jpg?_upt=de4a5c251709635127"
              />
              <span>随机名字</span>
            </div>
          </div>
        </div>

        <div class="mt-2.5 rounded-[12px] bg-[#1d1d1d] p-3.75">
          <div class="mb-2 text-[14px] flex text-white justify-between items-center">
            <div>常用功能</div>
            <div class="flex items-center text-[12px] gap-1 text-[gray]"></div>
          </div>
          <div class="text-white grid [grid-template-columns:1fr_1fr_1fr]">
            <div
              class="min-h-[20vw] flex flex-col justify-center items-center text-[14px] gap-2"
              @click="_no"
            >
              <Icon class="text-[28px]" icon="ion:wallet-outline" />
              <span>我的钱包</span>
            </div>
            <div
              class="min-h-[20vw] flex flex-col justify-center items-center text-[14px] gap-2"
              @click="_no"
            >
              <Icon class="text-[28px]" icon="mingcute:coupon-line" />
              <span>券包</span>
            </div>
            <div
              class="min-h-[20vw] flex flex-col justify-center items-center text-[14px] gap-2"
              @click="_no"
            >
              <Icon class="text-[28px]" icon="icon-park-outline:bytedance-applets" />
              <span>小程序</span>
            </div>
            <div
              class="min-h-[20vw] flex flex-col justify-center items-center text-[14px] gap-2"
              @click="_no"
            >
              <Icon class="text-[28px]" icon="solar:history-linear" />
              <span>观看历史</span>
            </div>
            <div
              class="min-h-[20vw] flex flex-col justify-center items-center text-[14px] gap-2"
              @click="_no"
            >
              <Icon class="text-[28px]" icon="fluent:content-settings-24-regular" />
              <span>内容偏好</span>
            </div>
            <div
              class="min-h-[20vw] flex flex-col justify-center items-center text-[14px] gap-2"
              @click="_no"
            >
              <Icon class="text-[28px]" icon="iconoir:cloud-download" />
              <span>离线模式</span>
            </div>
            <div
              class="min-h-[20vw] flex flex-col justify-center items-center text-[14px] gap-2"
              @click="_no"
            >
              <Icon class="text-[28px]" icon="ep:setting" />
              <span>设置</span>
            </div>
            <div
              class="min-h-[20vw] flex flex-col justify-center items-center text-[14px] gap-2"
              @click="_no"
            >
              <Icon class="text-[28px]" icon="icon-park-outline:baggage-delay" />
              <span>稍后再看</span>
            </div>
          </div>
        </div>
      </SlideItem>
      <SlideItem data-slide-item="">
        <IndicatorHome
          v-if="!state.fullScreen"
          :loading="baseStore.loading"
          name="second"
          @showSlidebar="state.baseIndex = 0"
          v-model:index="state.navIndex"
        />
        <SlideHorizontal
          class="h-[calc(var(--vh,_1vh)_*_100_-_var(--footer-height))]! rounded-[10px]!"
          name="second"
          :change-active-index-use-anim="false"
          v-model:index="state.navIndex"
        >
          <!--          <SlideItem></SlideItem>-->
          <Slide0
            data-slide-item=""
            class="*:last:z-1 *:last:[transition:all_0.3s]"
            :active="state.navIndex === 0 && state.baseIndex === 1"
          />
          <SlideItem data-slide-item="">
            <LongVideo :active="state.navIndex === 1 && state.baseIndex === 1" />
          </SlideItem>
          <!--          <SlideItem></SlideItem>-->
          <Slide2
            data-slide-item=""
            class="*:last:z-1 *:last:[transition:all_0.3s]"
            :active="state.navIndex === 2 && state.baseIndex === 1"
          />
          <SlideItem data-slide-item="">
            <Community :active="state.navIndex === 3 && state.baseIndex === 1" />
          </SlideItem>
          <Slide4
            data-slide-item=""
            class="*:last:z-1 *:last:[transition:all_0.3s]"
            :active="state.navIndex === 4 && state.baseIndex === 1"
          />
        </SlideHorizontal>

        <BaseFooter v-bind:init-tab="1" />
        <BaseMask
          class="absolute!"
          v-if="state.baseIndex === 0"
          @click="state.baseIndex = 1"
          mode="white"
        />
      </SlideItem>
      <SlideItem data-slide-item="">
        <UserPanel
          ref="uploader"
          v-model:currentItem="state.currentItem"
          :active="state.baseIndex === 2"
          @toggleCanMove="(e) => (state.canMove = e)"
          @back="state.baseIndex = 1"
          @showFollowSetting="state.showFollowSetting = true"
          @showFollowSetting2="state.showFollowSetting2 = true"
        />
      </SlideItem>
    </SlideHorizontal>

    <Comment
      page-id="home-index"
      :video-id="state.currentItem.aweme_id"
      v-model="state.commentVisible"
      @close="closeComments"
    />

    <Share
      v-model="state.isSharing"
      ref="share"
      page-id="home-index"
      @dislike="dislike"
      :item="state.currentItem"
      :videoId="state.recommendList[state.itemIndex]?.id"
      :canDownload="state.recommendList[state.itemIndex]?.canDownload"
      @play-feedback="state.showPlayFeedback = true"
      @shareToFriend="delayShowDialog(() => (state.shareToFriend = true))"
      @showDouyinCode="state.showDouyinCode = true"
      @download="state.shareType = 9"
    />

    <PlayFeedback v-model="state.showPlayFeedback" />

    <DouyinCode :item="state.currentItem" v-model="state.showDouyinCode" />

    <ShareTo
      v-model:type="state.shareType"
      :videoId="state.recommendList[state.itemIndex]?.id"
      :canDownload="state.recommendList[state.itemIndex]?.canDownload"
    />

    <FollowSetting
      v-model:currentItem="state.currentItem"
      @showChangeNote="delayShowDialog((e) => (state.showChangeNote = true))"
      @showBlockDialog="delayShowDialog((e) => (state.showBlockDialog = true))"
      @showShare="delayShowDialog((e) => (state.isSharing = true))"
      v-model="state.showFollowSetting"
    />

    <FollowSetting2
      v-model:currentItem="state.currentItem"
      @cancelFollow="uploader.cancelFollow()"
      v-model="state.showFollowSetting2"
    />

    <BlockDialog v-model="state.showBlockDialog" />

    <ConfirmDialog title="设置备注名" ok-text="确认" v-model:visible="state.showChangeNote">
      <Search mode="light" v-model="state.test" :isShowSearchIcon="false" />
    </ConfirmDialog>

    <ShareToFriend v-model="state.shareToFriend" />

    <BaseMask v-if="!isMobile" @click="isMobile = true" />
    <div
      class="text-white z-999 bg-[var(--active-main-bg)] fixed left-[50%] top-[50%] [transform:translate(-50%,_-50%)] rounded-[16px] overflow-hidden text-center"
      v-if="!isMobile"
    >
      <Icon class="mt-2.5 text-[40px] text-[red]" icon="mynaui:danger-triangle" />
      <Icon
        class="cursor-pointer text-[18px] text-white absolute right-3.75 top-3.75"
        icon="simple-line-icons:close"
        @click="isMobile = true"
      />
      <div class="text-left px-6 py-0">
        <h2>切换至手机模式获取最佳体验</h2>
        <h3>1. 按 F12 调出控制台</h3>
        <h3>2. 按 Ctrl+Shift+M，或点击下面图标</h3>
      </div>
      <img class="block w-87.5" src="@/assets/img/guide.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="tsx">
import SlideHorizontal from '@/components/slide/SlideHorizontal.vue'
import SlideItem from '@/components/slide/SlideItem.vue'
import Comment from '../../components/Comment.vue'
import Share from '../../components/Share.vue'
import IndicatorHome from './components/IndicatorHome.vue'
import { onActivated, onDeactivated, onMounted, onUnmounted, reactive, ref } from 'vue'
import bus, { EVENT_KEY } from '../../utils/bus'
import { useNav } from '@/utils/hooks/useNav'
import PlayFeedback from '@/pages/home/components/PlayFeedback.vue'
import ShareTo from '@/pages/home/components/ShareTo.vue'
import DouyinCode from '../../components/DouyinCode.vue'
import FollowSetting from '@/pages/home/components/FollowSetting.vue'
import BlockDialog from '../message/components/BlockDialog.vue'
import Search from '../../components/Search.vue'
import ConfirmDialog from '../../components/dialog/ConfirmDialog.vue'
import FollowSetting2 from '@/pages/home/components/FollowSetting2.vue'
import ShareToFriend from '@/pages/home/components/ShareToFriend.vue'
import UserPanel from '@/components/UserPanel.vue'
import Community from '@/pages/home/slide/Community.vue'
import Slide0 from '@/pages/home/slide/Slide0.vue'
import Slide2 from '@/pages/home/slide/Slide2.vue'
import Slide4 from '@/pages/home/slide/Slide4.vue'
import { DefaultUser } from '@/utils/const_var'
import { _no } from '@/utils'
import LongVideo from '@/pages/home/slide/LongVideo.vue'
import { useBaseStore } from '@/store/pinia'
import BaseMask from '@/components/BaseMask.vue'

const nav = useNav()
const baseStore = useBaseStore()
const uploader = ref()
const isMobile = ref(/Mobi|Android|iPhone/i.test(navigator.userAgent))

const state = reactive({
  active: true,
  baseIndex: 1,
  navIndex: 4,
  itemIndex: 0,
  test: '',
  recommendList: [],
  isSharing: false,
  canMove: true,
  shareType: -1,
  showPlayFeedback: false,
  showShareDuoshan: false,
  showShareDialog: false,
  showShare2WeChatZone: false,
  showDouyinCode: false,
  showFollowSetting: false,
  showFollowSetting2: false,
  showBlockDialog: false,
  showChangeNote: false,
  shareToFriend: false,

  commentVisible: false,
  fullScreen: false,
  currentItem: {
    aweme_id: '',
    author: DefaultUser,
    isRequest: false,
    aweme_list: []
  }
})

function delayShowDialog(cb: Function) {
  setTimeout(cb, 400)
}

function setCurrentItem(item) {
  if (!state.active) return
  // console.log('sss',item,state.baseIndex)
  if (state.baseIndex !== 1) return
  if (state.currentItem.author?.uid !== item.author?.uid) {
    state.currentItem = {
      ...item,
      isRequest: false,
      aweme_list: []
    }
  }
  // console.log('item', item)
}

onMounted(() => {
  bus.on(EVENT_KEY.ENTER_FULLSCREEN, () => {
    if (!state.active) return
    state.fullScreen = true
  })
  bus.on(EVENT_KEY.EXIT_FULLSCREEN, () => {
    if (!state.active) return
    state.fullScreen = false
  })
  bus.on(EVENT_KEY.OPEN_COMMENTS, () => {
    if (!state.active) return
    bus.emit(EVENT_KEY.ENTER_FULLSCREEN)
    state.commentVisible = true
  })
  bus.on(EVENT_KEY.CLOSE_COMMENTS, () => {
    if (!state.active) return
    bus.emit(EVENT_KEY.EXIT_FULLSCREEN)
    state.commentVisible = false
  })
  bus.on(EVENT_KEY.SHOW_SHARE, () => {
    if (!state.active) return
    state.isSharing = true
  })
  bus.on(EVENT_KEY.NAV, ({ path, query }) => {
    if (!state.active) return
    nav(path, query)
  })
  bus.on(EVENT_KEY.GO_USERINFO, () => {
    if (!state.active) return
    state.baseIndex = 2
  })
  bus.on(EVENT_KEY.CURRENT_ITEM, setCurrentItem)
})

onUnmounted(() => {
  bus.offAll()
})

onActivated(() => {
  state.active = true
  bus.emit(EVENT_KEY.TOGGLE_CURRENT_VIDEO)
})

onDeactivated(() => {
  state.active = false
  bus.emit(EVENT_KEY.TOGGLE_CURRENT_VIDEO)
})

function closeComments() {
  bus.emit(EVENT_KEY.CLOSE_COMMENTS)
}

function dislike() {
  // listRef.value.dislike(state.list[1])
  // state.list[state.index] = state.list[1]
  // _notice('操作成功，将减少此类视频的推荐')
}
</script>

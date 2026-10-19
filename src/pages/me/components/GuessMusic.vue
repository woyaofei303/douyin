<template>
  <div
    class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]"
    id="GuessMusic"
  >
    <SlideVertical
      :changeActiveIndexUseAnim="false"
      v-model:index="guessSlideIndex"
      :canMove="slideCanMove"
    >
      <SlideItemMusic
        :ref="setItemRef"
        @showList="isShowList = true"
        @showShare="isSharing = true"
        @previous="previous"
        @next="next"
        @slideCanMove="(e) => (this.slideCanMove = e)"
        :model-value="list[index]"
        v-model:isLoop="isLoop"
        :key="index"
        v-for="(item, index) in list"
      />
    </SlideVertical>
    <from-bottom-dialog
      mask-mode="lightgray"
      page-id="GuessMusic"
      border-radius="15rem 15rem 0 0"
      :show-heng-gang="false"
      height="70vh"
      v-model="isShowList"
    >
      <div class="h-[70vh] bg-[#1e1d1d]">
        <div
          class="fixed w-full bg-[#1e1d1d] box-border border-b-[1px] [border-bottom-style:solid] border-b-[#2a2828] flex justify-between items-center h-12.5 rounded-[15px_15px_0_0] z-9 px-[var(--page-padding)] py-0"
        >
          <div class="text-[16px]">待播清单</div>
          <div class="flex items-center text-[12px]" @click="isLoop = !isLoop">
            <img class="w-5 mr-1.25" v-show="isLoop" src="@/assets/img/icon/me/loop.png" alt="" />
            <img
              class="w-5 mr-1.25"
              v-show="!isLoop"
              src="@/assets/img/icon/me/play-normal.png"
              alt=""
            />
            <span>{{ isLoop ? '单曲循环' : '顺序播放' }}</span>
          </div>
        </div>
        <div class="pt-12.5">
          <div
            class="bg-[#1e1d1d] h-12.5 flex justify-between items-center px-[var(--page-padding)] py-0"
            :class="[guessSlideIndex === index ? 'text-[color:var(--primary-btn-color)]' : '']"
            @click="play(index)"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="flex items-center">
              <img
                class="w-3.75 mr-2.5"
                v-if="guessSlideIndex === index"
                src="@/assets/img/icon/me/pinlv.gif"
                alt=""
              />
              <div>{{ item.name }}</div>
              <div
                class="text-[12px] text-[color:var(--second-text-color)] ml-5 relative flex items-center after:content-[''] after:w-1.5 after:h-[0.5px] after:bg-[var(--second-text-color)] after:absolute after:-left-3"
              >
                {{ item.author }}
              </div>
            </div>
            <dy-back class="w-3.75!" mode="gray" img="close" />
          </div>
        </div>
        <div
          class="bg-[#1e1d1d] border-t-[1px] [border-top-style:solid] border-t-[#2a2828] h-15 flex items-center justify-center"
          @click="isShowList = false"
        >
          取消
        </div>
      </div>
    </from-bottom-dialog>

    <Share
      v-model="isSharing"
      mode="my-music"
      ref="share"
      pageId="GuessMusic"
      @ShareToFriend="delayShowDialog((e) => (this.isShowShareToFriend = true))"
    />

    <ShareToFriend pageId="GuessMusic" v-model="isShowShareToFriend" />
  </div>
</template>
<script>
import FromBottomDialog from '../../../components/dialog/FromBottomDialog'
import SlideItemMusic from './SlideItemMusic'
import Share from '../../../components/Share'
import ShareToFriend from '../../home/components/ShareToFriend'
import SlideVertical from '@/components/slide/SlideVertical.vue'

export default {
  name: 'GuessMusic',
  components: {
    SlideVertical,
    FromBottomDialog,
    SlideItemMusic,
    Share,
    ShareToFriend
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      slideCanMove: true,
      isShowShareToFriend: false,
      isShowList: false,
      isSharing: false,
      isLoop: false,
      guessSlideIndex: 0,
      isShowCollectDialog: false,
      itemRefs: []
    }
  },
  watch: {
    guessSlideIndex(newVal) {
      console.log(2)
      this.itemRefs.map((ref) => {
        ref.togglePlay(false)
      })
      this.itemRefs[newVal].togglePlay(true, true)
    }
  },
  computed: {},
  created() {},
  methods: {
    previous() {
      if (this.guessSlideIndex > 0) {
        this.play(this.guessSlideIndex - 1)
      }
    },
    next() {
      if (this.guessSlideIndex < this.list.length - 1) {
        this.play(this.guessSlideIndex + 1)
      }
    },
    delayShowDialog(cb) {
      setTimeout(() => {
        cb()
      }, 100)
    },
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el)
      }
    },
    play(index) {
      this.guessSlideIndex = index
      this.itemRefs.map((ref) => {
        ref.togglePlay(false)
      })
      this.itemRefs[index].togglePlay(true, true)
    }
  }
}
</script>

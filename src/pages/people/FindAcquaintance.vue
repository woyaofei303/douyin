<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 text-white text-[14px]" id="FindAcquaintance">
    <div
      class="h-15 text-[14px] flex justify-between items-center border-b-[1px] [border-bottom-style:solid] border-b-[var(--line-color)] px-5 py-0"
    >
      <dy-back class="h-5" mode="light" @click="back"></dy-back>
      <Indicator
        class="w-[50%]!"
        tabStyleWidth="40%"
        :tabTexts="['发现朋友', '熟人列表']"
        v-model:active-index="data.currentSlideItemIndex"
      >
      </Indicator>
      <img
        class="h-5"
        src="../../assets/img/icon/menu-gray.png"
        alt=""
        @click="data.moreOptionDialog = true"
      />
    </div>
    <SlideHorizontal v-model:index="data.currentSlideItemIndex">
      <SlideItem data-slide-item="" class="overflow-auto">
        <div class="mt-2.5 mx-5">
          <Search
            v-if="!data.isShowRightText"
            placeholder="搜索用户名字/抖音号"
            :is-show-right-text="false"
            @click="data.isShowRightText = true"
          >
            <img
              class="w-2.5 [transform:scale(1.5)]"
              src="../../assets/img/icon/scan-gray.png"
              @click.stop="nav('/scan')"
            />
          </Search>
          <Search
            v-else
            v-model="data.searchKey"
            :is-show-right-text="true"
            @notice="search"
            @clear="data.isSearch = false"
          ></Search>
        </div>
        <div class="p-5" v-if="!data.isShowRightText">
          <div
            class="mt-0 mb-5 flex justify-between items-center mx-0"
            @click="data.findAddressListDialog = true"
          >
            <img
              class="bg-[var(--second-btn-color-tran)] rounded-[50%] w-5.5 mr-3.75 p-3"
              src="../../assets/img/icon/people/address-book.png"
              alt=""
            />
            <div class="flex-[1] flex justify-between items-center">
              <div>
                <div class="text-[14px] mb-1.25">查看通讯录朋友</div>
                <div class="text-[12px] text-[color:var(--second-text-color)]">看看有谁在抖音</div>
              </div>
              <dy-back class="w-3.5!" direction="right"></dy-back>
            </div>
          </div>
          <div class="h-0.25 bg-[var(--line-color2)] w-full"></div>
          <div
            class="flex items-center mt-5 mb-2.5 text-[color:var(--second-text-color)] text-[12px]"
          >
            朋友推荐
            <img class="w-2.5 ml-0.5" src="../../assets/img/icon/about-gray.png" />
          </div>
          <People
            :key="i"
            v-for="(item, i) in store.friends.all"
            :people="item"
            mode="recommend"
          ></People>
        </div>
        <div class="pt-0 pb-5 px-5" v-else>
          <div
            class="text-[12px] mt-5 flex items-center text-[color:var(--second-text-color)]"
            v-if="data.searchKey && !data.isSearch"
          >
            <img class="mr-2.5 w-2.5" src="../../assets/img/icon/close.svg" />
            搜索用户名字/抖音号：<span class="text-[yellow]">{{ data.searchKey }}</span>
          </div>
          <!--          TODO -->
          <template v-if="data.isSearch">
            <People
              :key="i"
              v-for="(item, i) in store.friends.all"
              :people="item"
              mode="recommend"
            ></People>
          </template>
        </div>
      </SlideItem>
      <SlideItem data-slide-item="" class="box-border overflow-auto p-5">
        <Search placeholder="搜索用户备注或名字"></Search>
        <div
          class="mt-[var(--page-padding)] mb-2.5 text-[color:var(--second-text-color)] text-[12px]"
        >
          {{ store.friends.all.length }} 位朋友
        </div>
        <People
          :key="i"
          v-for="(item, i) in store.friends.all"
          :people="item"
          mode="friend"
        ></People>
        <NoMore class="mb-12.5!" />
      </SlideItem>
    </SlideHorizontal>

    <transition
      enter-from-class="opacity-0"
      enter-active-class="[transition:opacity_0.3s_ease]"
      enter-to-class=""
      leave-from-class=""
      leave-active-class="[transition:opacity_0.3s_ease]"
      leave-to-class="opacity-0"
      move-class=""
    >
      <BaseMask v-if="maskDialog" @click="maskDialog = false" />
    </transition>

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
        class="z-4 fixed left-[50%] top-[50%] [transform:translate3d(-50%,_-50%,_0)] w-[70vw] text-black bg-white box-border rounded-[3px] flex flex-col items-center"
        v-if="data.findAddressListDialog"
        @click="data.findAddressListDialog = false"
      >
        <div class="flex flex-col items-center p-5">
          <div>
            <img class="h-15 mb-5" src="../../assets/img/icon/head-image.jpeg" alt="" />
          </div>
          <span class="text-[16px] font-bold mb-2.5">发现通讯录好友</span>
          <span class="text-[10px] text-[gray]">
            <span>授权通讯录，看看哪些好友在使用抖音。具体使用场景及撤回授权方式详见</span>
            <span
              class="text-[#126495]"
              @click="nav('/service-protocol', { type: '“抖音”用户服务协议' })"
              >《隐私政策》</span
            >
          </span>
        </div>
        <div
          class="w-full flex h-10 border-t-[1px] [border-top-style:solid] border-t-[#eaeaf1] text-[14px]"
        >
          <div
            class="flex items-center justify-center w-[49%] text-center border-r-[1px] [border-right-style:solid] border-r-[#eaeaf1] opacity-50 last:border-r-[0] last:[border-right-style:none] last:border-r-[currentColor] last:opacity-100"
            @click="data.findAddressListDialog = false"
          >
            暂时不要
          </div>
          <div
            class="flex items-center justify-center w-[49%] text-center border-r-[1px] [border-right-style:solid] border-r-[#eaeaf1] opacity-50 last:border-r-[0] last:[border-right-style:none] last:border-r-[currentColor] last:opacity-100"
            @click="nav('/address-list')"
          >
            发现好友
          </div>
        </div>
      </div>
    </transition>

    <from-bottom-dialog
      page-id="FindAcquaintance"
      v-model="data.moreOptionDialog"
      :show-heng-gang="false"
      height="210rem"
      mode="white"
    >
      <div class="text-[14px]">
        <div
          class="flex justify-center items-center min-h-12.5 text-[14px] h-12.5 text-black bg-white box-border w-full border-b-[1px] [border-bottom-style:solid] border-b-[gainsboro] px-[var(--page-padding)] py-0"
          @click="handleClick"
        >
          <span>站外好友口令</span>
        </div>
        <div
          class="flex justify-center items-center min-h-12.5 text-[14px] h-12.5 text-black bg-white box-border w-full border-b-[1px] [border-bottom-style:solid] border-b-[gainsboro] px-[var(--page-padding)] py-0"
          @click="nav('/scan')"
        >
          <span>扫一扫加好友</span>
        </div>
        <div
          class="flex justify-center items-center min-h-12.5 text-[14px] h-12.5 text-black bg-white box-border w-full border-b-[0] [border-bottom-style:none] border-b-[currentColor] px-[var(--page-padding)] py-0"
          @click="nav('/face-to-face')"
        >
          <span>面对面加好友</span>
        </div>
        <div class="h-2.5 bg-[whitesmoke]"></div>
        <div
          class="flex justify-center items-center min-h-12.5 text-[14px] h-12.5 text-black bg-white box-border w-full border-b-[1px] [border-bottom-style:solid] border-b-[gainsboro] px-[var(--page-padding)] py-0"
          @click="data.moreOptionDialog = false"
        >
          取消
        </div>
      </div>
    </from-bottom-dialog>

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
        class="z-4 fixed left-[50%] top-[50%] [transform:translate3d(-50%,_-50%,_0)] w-[80%] text-black bg-white box-border rounded-[3px] flex flex-col items-center p-5"
        v-if="data.outWebImgAccountDialog"
      >
        <img src="../../assets/img/icon/head-image.jpeg" alt="" />
        <img
          class="top-2.5 right-2.5 absolute bg-[var(--second-btn-color-tran)] w-2.5 rounded-[50%] p-1"
          src="../../assets/img/icon/close-white.png"
          alt=""
          @click="data.outWebImgAccountDialog = false"
        />
        <div class="mt-5 text-center">
          <div>这是你的图片口令</div>
          <div>你可以通过此口令添加站外好友</div>
        </div>
        <div class="mt-5 flex items-center text-[color:var(--second-text-color)]">
          <img class="mr-2.5 w-2.5" src="../../assets/img/icon/close.svg" alt="" />
          <span>图片口令已保存到相册</span>
        </div>
        <div
          class="w-full h-10 rounded-[3px] mt-5 flex justify-center items-center text-white bg-[#3eae38] last:mt-2.5"
          @click="data.outWebImgAccountDialog = false"
        >
          <img class="mr-2.5 w-2.5" src="../../assets/img/icon/close.svg" alt="" />
          <span>发给微信好友</span>
        </div>
        <div
          class="w-full h-10 rounded-[3px] mt-5 flex justify-center items-center text-white bg-[#18b7ee] last:mt-2.5"
          @click="data.outWebImgAccountDialog = false"
        >
          <img class="mr-2.5 w-2.5" src="../../assets/img/icon/close.svg" alt="" />
          <span>发给QQ好友</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import People from './components/People.vue'
import Search from '../../components/Search.vue'
import Indicator from '../../components/slide/Indicator.vue'
import FromBottomDialog from '../../components/dialog/FromBottomDialog.vue'
import { useBaseStore } from '@/store/pinia'
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useNav } from '@/utils/hooks/useNav'
import { _hideLoading, _showLoading, _sleep } from '@/utils'

defineOptions({
  name: 'FindAcquaintance'
})

const router = useRouter()
const nav = useNav()
const store = useBaseStore()
const data = reactive({
  findAddressListDialog: false,
  moreOptionDialog: false,
  outWebImgAccountDialog: false,
  indicatorFixed: false,
  isShowRightText: false,
  isSearch: false,
  searchKey: '',

  currentSlideItemIndex: 0,
  list: [
    {
      type: 1
    },
    {
      type: 2
    },
    {
      type: 3
    },
    {
      type: 4
    },
    {
      type: 5
    }
  ]
})

onMounted(() => {})

const maskDialog = computed({
  get() {
    return data.findAddressListDialog || data.outWebImgAccountDialog
  },
  set() {
    data.findAddressListDialog = data.outWebImgAccountDialog = false
  }
})

async function search() {
  _showLoading()
  await _sleep(500)
  _hideLoading()
  data.isSearch = true
}

function back() {
  if (data.isShowRightText) {
    data.isShowRightText = false
  } else {
    router.back()
  }
}

function handleClick() {
  data.outWebImgAccountDialog = true
  data.moreOptionDialog = false
}
</script>

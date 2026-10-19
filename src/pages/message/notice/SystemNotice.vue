<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 text-white text-[14px]" id="SystemNotice">
    <BaseHeader :isFixed="false">
      <template v-slot:center>
        <span class="text-[16px]">系统通知</span>
      </template>
      <template v-slot:right>
        <span class="text-[14px]" @click="nav('/message/notice-setting', { type: 'SYSTEM' })"
          >通知设置</span
        >
      </template>
    </BaseHeader>
    <Loading v-if="data.loading" />
    <div
      class="h-[calc(var(--vh,_1vh)_*_100_-_var(--common-header-height))] pt-0 pb-[var(--page-padding)] box-border px-[var(--page-padding)]"
      v-else
    >
      <Scroll
        class="h-[calc(var(--vh,_1vh)_*_100_-_var(--common-header-height)_-_var(--common-header-height))]!"
        ref="mainScroll"
      >
        <div>
          <NoMore />
          <!--TODO 超过3行显示全文-->
          <div
            class="bg-[var(--msg-subpage-card-bg)] rounded-[5px] mb-5 p-[var(--page-padding)]"
            :key="i"
            v-for="(item, i) in data.list"
            @click="goDetail(item)"
          >
            <div class="flex items-center text-[16px] mb-2.5">
              {{ item.title }}
              <div
                class="ml-2.5 w-1.75 h-1.75 rounded-[50%] bg-[var(--primary-btn-color)]"
                v-if="!item.read"
              ></div>
            </div>
            <div class="text-[12px] text-[color:var(--second-text-color)] mb-5">
              {{ item.time }}
            </div>
            <div class="mb-7.5">{{ item.content }}</div>
            <div
              class="border-t-[1px] [border-top-style:solid] border-t-[var(--line-color2)] pt-[var(--page-padding)] text-[color:var(--second-text-color)] flex justify-between items-center"
              v-if="item.detail"
            >
              <span>查看详情</span>
              <dy-back direction="right" scale=".6" />
            </div>
          </div>
        </div>
      </Scroll>

      <!--TODO 子页面未做-->
      <div
        class="z-9 fixed bottom-20 rounded-[6px] bg-[rgba(0,_0,_0,_0.9)] text-[12px] left-0"
        v-if="data.isShowLeftHover"
      >
        <div
          class="w-0 h-0 border-t-[rgba(0,_0,_0,_0.9)] border-r-[transparent] border-b-[transparent] border-l-[transparent] absolute right-12.5 -bottom-3.5 border-[7px] border-solid"
        ></div>
        <div
          class="w-30 h-10 flex items-center justify-center text-center border-[0] border-current border-none"
          @click="_no"
        >
          登录设备管理
        </div>
        <div
          class="w-30 h-10 flex items-center justify-center border-t-[1px] [border-top-style:solid] border-t-[#2c2c2c] text-center"
          @click="_no"
        >
          账号锁定
        </div>
        <div
          class="w-30 h-10 flex items-center justify-center border-t-[1px] [border-top-style:solid] border-t-[#2c2c2c] text-center"
          @click="_no"
        >
          账号解锁
        </div>
      </div>

      <div
        class="z-9 fixed bottom-20 rounded-[6px] bg-[rgba(0,_0,_0,_0.9)] text-[12px] right-0"
        v-if="data.isShowRightHover"
      >
        <div
          class="w-0 h-0 border-t-[rgba(0,_0,_0,_0.9)] border-r-[transparent] border-b-[transparent] border-l-[transparent] absolute right-12.5 -bottom-3.5 border-[7px] border-solid"
        ></div>
        <div
          class="w-30 h-10 flex items-center justify-center text-center border-[0] border-current border-none"
          @click="_no"
        >
          常见问题
        </div>
        <div
          class="w-30 h-10 flex items-center justify-center border-t-[1px] [border-top-style:solid] border-t-[#2c2c2c] text-center"
          @click="_no"
        >
          安全课堂
        </div>
      </div>

      <BaseMask mode="white" v-if="data.isShowMask" @click="data.isShowMask = false" />

      <div
        class="border-t-[1px] [border-top-style:solid] border-t-[var(--line-color)] h-15 flex items-center"
      >
        <div
          class="w-[33%] flex items-center justify-center border-r-[1px] [border-right-style:solid] border-r-[var(--line-color)] last:border-[0] last:border-current last:border-none"
          @click="data.isShowLeftHover = !data.isShowLeftHover"
        >
          <img
            class="w-2.5 h-3.75 mr-1"
            src="../../../assets/img/icon/message/menu-thin.png"
            alt=""
          />
          <span>自助工具</span>
        </div>
        <div
          class="w-[33%] flex items-center justify-center border-r-[1px] [border-right-style:solid] border-r-[var(--line-color)] last:border-[0] last:border-current last:border-none"
          @click="_no"
        >
          <span>规则中心</span>
        </div>
        <div
          class="w-[33%] flex items-center justify-center border-r-[1px] [border-right-style:solid] border-r-[var(--line-color)] last:border-[0] last:border-current last:border-none"
          @click="data.isShowRightHover = !data.isShowRightHover"
        >
          <img
            class="w-2.5 h-3.75 mr-1"
            src="../../../assets/img/icon/message/menu-thin.png"
            alt=""
          />
          <span>更多帮助</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, reactive, watch } from 'vue'
import Scroll from '@/components/Scroll.vue'
import { useNav } from '@/utils/hooks/useNav.js'
import { _no, _sleep } from '@/utils'
import { useScroll } from '@/utils/hooks/useScroll'

defineOptions({
  name: 'SystemNotice'
})

const mainScroll = useScroll()
const nav = useNav()
const data = reactive({
  loading: false,
  isShowMask: false,
  isShowLeftHover: false,
  isShowRightHover: false,
  list: [
    {
      read: false,
      title: '账号登录提醒',
      detail: 'xxx',
      time: '2021-10-12 12:12',
      content:
        '您的抖音号4533452342于2021-02-09 07:45:23进行了登录操作。如非本人操作，账号可能被盗。建议立即修改密码，或在[设置-账号与安全-登录设备管理]中删除异常设备。参考设备：iPhone X参考地点：上海市'
    },
    {
      read: false,
      title: '账号登录提醒',
      detail: 'xxx',
      time: '2021-10-12 12:12',
      content:
        '您的抖音号4533452342于2021-02-09 07:45:23进行了登录操作。如非本人操作，账号可能被盗。建议立即修改密码，或在[设置-账号与安全-登录设备管理]中删除异常设备。参考设备：iPhone X参考地点：上海市'
    },
    {
      read: false,
      title: '协议修订通知',
      detail: '',
      time: '2021-10-12 12:12',
      content:
        '你好，根据业务开展的实际情况，抖音近期更新了《抖音用户服务协议》《抖音隐私政策》及《儿童/青少年使用须知》中的相关内容。你可以在“我”-“设置”页面中，查看更新后的协议全文。'
    },
    {
      read: false,
      title: '协议修订通知',
      detail: '',
      time: '2021-10-12 12:12',
      content:
        '你好，根据业务开展的实际情况，抖音近期更新了《抖音用户服务协议》部分条款的表述。你可以在“我”-“设置”页面中，查看更新后的协议全文。'
    }
  ]
})

onMounted(() => {
  getData()
})

watch(
  () => data.isShowLeftHover,
  (newVal) => {
    if (newVal) {
      data.isShowMask = true
    }
  }
)

watch(
  () => data.isShowRightHover,
  (newVal) => {
    if (newVal) {
      data.isShowMask = true
    }
  }
)

watch(
  () => data.isShowMask,
  (newVal) => {
    if (!newVal) {
      data.isShowLeftHover = false
      data.isShowRightHover = false
    }
  }
)

async function getData() {
  data.loading = true
  await _sleep(700)
  data.loading = false
  await nextTick()
  // data.$refs.mainScroll.scrollBottom()
}

function goDetail(item) {
  item.read = true
  if (item.detail) {
    _no()
  }
}
</script>

<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 text-white text-[14px]" id="MoneyNotice">
    <BaseHeader :isFixed="false">
      <template v-slot:center>
        <span class="text-[16px]">钱包通知</span>
      </template>
      <template v-slot:right>
        <span class="text-[14px]" @click="nav('/message/notice-setting', { type: 'MONEY' })"
          >通知设置</span
        >
      </template>
    </BaseHeader>
    <Loading v-if="data.loading" />
    <div class="h-[calc(var(--vh,_1vh)_*_100_-_var(--common-header-height))]" v-else>
      <Scroll
        class="h-[calc(var(--vh,_1vh)_*_100_-_var(--common-header-height))]!"
        ref="mainScroll"
      >
        <div class="pt-0 pb-[var(--page-padding)] box-border px-[var(--page-padding)]">
          <NoMore />
          <!--TODO 超过3行显示全文-->
          <div
            class="bg-[var(--msg-subpage-card-bg)] rounded-[5px] mb-5 p-[var(--page-padding)]"
            :key="i"
            v-for="(item, i) in data.list"
            @click="_no"
          >
            <div
              class="flex items-center pb-[var(--page-padding)] mb-[var(--page-padding)] border-b-[1px] [border-bottom-style:solid] border-b-[var(--line-color2)]"
            >
              <div class="flex items-center">
                <img class="w-6.25" src="@/assets/img/icon/msg-icon9.webp" alt="" />
              </div>
              <div class="ml-2.5 flex-[1] flex items-center justify-between">
                <template v-if="item.type === 1">
                  <span>零钱任务</span>
                </template>
                <template v-if="item.type === 2">
                  <span>钱包任务</span>
                </template>
                <img
                  class="w-5"
                  @click.stop="data.isShowSetting = true"
                  src="@/assets/img/icon/menu-gray.png"
                  alt=""
                />
              </div>
            </div>
            <div class="flex items-center text-[16px] mb-2.5">{{ item.title }}</div>
            <div class="text-[12px] text-[color:var(--second-text-color)] mb-5">
              {{ item.time }}
            </div>
            <template v-if="item.type === 1">
              <div class="mb-0.75">退款金额：￥{{ item.money }}</div>
              <div class="mb-0.75">退回方式：{{ item.toAccountType }}</div>
              <div class="mb-0.75">退款原因：{{ item.desc }}</div>
              <div class="mb-0.75">预计到账时间：{{ item.toAccountTime }}</div>
            </template>
            <template v-if="item.type === 2">
              <div class="mb-0.75">{{ item.desc }}</div>
            </template>

            <div
              class="mt-7.5 border-t-[1px] [border-top-style:solid] border-t-[var(--line-color2)] pt-[var(--page-padding)] text-[color:var(--second-text-color)] flex justify-between items-center"
            >
              <span>查看详情</span>
              <dy-back direction="right" scale=".6" />
            </div>
          </div>
        </div>
      </Scroll>
    </div>

    <from-bottom-dialog
      page-id="MoneyNotice"
      mode="white"
      mask-mode="dark"
      :show-heng-gang="false"
      v-model="data.isShowSetting"
      height="160rem"
    >
      <div>
        <div
          class="flex justify-center items-center min-h-12.5 text-[12px] text-black h-12.5 border-t-[1px] [border-top-style:solid] border-t-[gainsboro] opacity-50 px-[var(--page-padding)] py-0 last:border-t-[0] last:[border-top-style:none] last:border-t-[currentColor]"
        >
          钱包任务
        </div>
        <div
          class="flex justify-center items-center min-h-12.5 text-[14px] text-black h-12.5 border-t-[1px] [border-top-style:solid] border-t-[gainsboro] px-[var(--page-padding)] py-0 last:border-t-[0] last:[border-top-style:none] last:border-t-[currentColor]"
          @click="handleClick"
        >
          {{ data.openNotice ? '关闭' : '开启' }}消息免打扰
        </div>
        <div class="h-2.5 bg-[whitesmoke]"></div>
        <div
          class="flex justify-center items-center min-h-12.5 text-[14px] text-black h-12.5 border-t-[1px] [border-top-style:solid] border-t-[gainsboro] px-[var(--page-padding)] py-0 last:border-t-[0] last:[border-top-style:none] last:border-t-[currentColor]"
          @click="data.isShowSetting = false"
        >
          取消
        </div>
      </div>
    </from-bottom-dialog>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, reactive } from 'vue'
import FromBottomDialog from '@/components/dialog/FromBottomDialog.vue'
import Scroll from '@/components/Scroll.vue'
import { useNav } from '@/utils/hooks/useNav'
import { _sleep } from '@/utils'

defineOptions({
  name: 'MoneyNotice'
})

const nav = useNav()
const data = reactive({
  loading: false,
  isShowSetting: false,
  openNotice: false,
  list: [
    {
      type: 1,
      toAccountType: '退回银行卡(工商银行3333)',
      title: '红色退款发起通知',
      time: '2021-10-12 12:12',
      money: 0.01,
      desc: '抖音红包超过24小时未被领取',
      toAccountTime: '2021-10-15 12:12'
    },
    {
      type: 2,
      toAccountType: '退回银行卡(工商银行3333)',
      title: '卡券发放提醒',
      time: '2021-10-12 12:12',
      money: 0.01,
      desc: '尊敬的用户，您获得1张DUO+满赠优惠券 到期时间:2021-08-26 23:23:23',
      toAccountTime: '2021-10-15 12:12'
    }
  ]
})

onMounted(() => {
  getData()
})

function handleClick() {
  data.openNotice = !data.openNotice
  data.isShowSetting = false
}

async function getData() {
  data.loading = true
  await _sleep(700)
  data.loading = false
  await nextTick()
  // data.$refs.mainScroll.scrollBottom()
}
</script>

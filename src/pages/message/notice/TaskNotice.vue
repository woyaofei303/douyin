<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 text-white text-[14px]" id="TaskNotice">
    <BaseHeader :isFixed="false">
      <template v-slot:center>
        <span class="text-[16px]">任务通知</span>
      </template>
      <template v-slot:right>
        <span class="text-[14px]" @click="nav('/message/notice-setting', { type: 'TASK' })"
          >通知设置</span
        >
      </template>
    </BaseHeader>
    <Loading v-if="data.loading" />
    <div class="h-[calc(var(--vh,_1vh)_*_100_-_var(--common-header-height))]" v-else>
      <Scroll
        class="h-[calc(var(--vh,_1vh)_*_100_-_var(--common-header-height)_-_var(--common-header-height))]!"
        ref="mainScroll"
      >
        <div class="pt-0 pb-[var(--page-padding)] box-border px-[var(--page-padding)]">
          <NoMore />
          <!--TODO 超过3行显示全文-->
          <div
            class="bg-[var(--msg-subpage-card-bg)] rounded-[5px] mb-5 p-[var(--page-padding)]"
            :key="i"
            v-for="(item, i) in data.list"
            @click="goDetail(item)"
          >
            <div
              class="flex items-center pb-[var(--page-padding)] mb-[var(--page-padding)] border-b-[1px] [border-bottom-style:solid] border-b-[var(--line-color2)]"
            >
              <div class="flex items-center">
                <img class="w-6.25" src="../../../assets/img/icon/message/task.webp" alt="" />
              </div>
              <div class="ml-2.5 flex-[1] flex items-center justify-between">
                <span>成长任务</span>
                <img
                  class="w-5"
                  @click.stop="data.isShowSetting = true"
                  src="../../../assets/img/icon/menu-gray.png"
                  alt=""
                />
              </div>
            </div>
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
      <div
        class="border-t-[1px] [border-top-style:solid] border-t-[var(--line-color)] h-[var(--common-header-height)] flex box-border items-center justify-center"
        @click="_no"
      >
        查看更多任务
      </div>
    </div>

    <from-bottom-dialog
      page-id="TaskNotice"
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
          成长任务
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
import { _no, _sleep } from '@/utils'

defineOptions({
  name: 'TaskNotice'
})

const nav = useNav()
const data = reactive({
  loading: false,
  isShowSetting: false,
  openNotice: false,
  list: [
    {
      type: 1,
      title: '发作品得流量',
      detail: 'xxx',
      time: '2021-10-12 12:12',
      content: '4.24-4.28，公开发布1个道具作品，即得50-100的额外流量。快来发布视频，获得更多关注'
    },
    {
      type: 1,
      title: '发作品得流量',
      detail: 'xxx',
      time: '2021-10-12 12:12',
      content: '4.24-4.28，公开发布1个道具作品，即得50-100的额外流量。快来发布视频，获得更多关注'
    },
    {
      type: 1,
      title: '发作品得流量',
      detail: 'xxx',
      time: '2021-10-12 12:12',
      content: '4.24-4.28，公开发布1个道具作品，即得50-100的额外流量。快来发布视频，获得更多关注'
    },
    {
      type: 1,
      title: '发作品得流量',
      detail: 'xxx',
      time: '2021-10-12 12:12',
      content: '4.24-4.28，公开发布1个道具作品，即得50-100的额外流量。快来发布视频，获得更多关注'
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

function goDetail(item: any) {
  item.read = true
  if (item.detail) {
    _no()
  }
}
</script>

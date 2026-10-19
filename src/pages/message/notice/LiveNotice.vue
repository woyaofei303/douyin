<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 text-white text-[14px]" id="TaskNotice">
    <BaseHeader :isFixed="false">
      <template v-slot:center>
        <span class="text-[16px]">直播通知</span>
      </template>
      <template v-slot:right>
        <span class="text-[14px]" @click="nav('/message/notice-setting', { type: 'LIVE' })"
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
          <div
            class="bg-[var(--msg-subpage-card-bg)] rounded-[5px] mb-5 p-[var(--page-padding)]"
            :key="i"
            v-for="(item, i) in data.list"
            @click="goDetail(item)"
          >
            <div class="flex items-center text-[16px] mb-2.5">{{ item.title }}</div>
            <div class="text-[12px] text-[color:var(--second-text-color)] mb-5">
              {{ item.time }}
            </div>
            <div class="mb-5">{{ item.content }}</div>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, reactive } from 'vue'
import Scroll from '@/components/Scroll.vue'
import { useNav } from '@/utils/hooks/useNav'
import { _no, _sleep } from '@/utils'

defineOptions({
  name: 'LiveNotice'
})

const nav = useNav()
const data = reactive({
  loading: false,
  list: [
    {
      title: '直播举报反馈',
      time: '2021-10-12 12:12',
      content: '你已提交对用户五五开直播内容的举报，我们会在12小时内进行处理，感谢你的监督'
    },
    {
      title: '举报结果通知',
      time: '2021-10-12 12:12',
      content:
        '你举报的【五五开】的直播内容，我们将对主播进行重点观察，并进一步判定，若发现违规立刻处理，感谢你的监督'
    }
  ]
})

onMounted(() => {
  getData()
})

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

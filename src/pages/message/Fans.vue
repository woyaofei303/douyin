<template>
  <div
    class="fixed left-0 right-0 bottom-0 top-0 overflow-auto bg-[var(--color-message)] text-white text-[14px]"
    id="Fans"
  >
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">粉丝</span>
      </template>
    </BaseHeader>
    <div class="pt-[var(--common-header-height)] pb-0 px-[var(--page-padding)]">
      <Loading v-if="data.loading" />
      <Scroll
        class="h-[calc(var(--vh,_1vh)_*_100_-_var(--common-header-height))]!"
        ref="mainScroll"
        @pulldown="loadData"
        v-else
      >
        <Peoples v-model:list="data.fans" :loading="data.loadingMore" mode="fans" />
        <div class="mt-3.75 mb-2.5 text-[12px] flex items-center">
          <span>朋友推荐</span>
          <img class="ml-1.25 w-3.25" src="../../assets/img/icon/about-gray.png" alt="" />
        </div>
        <Peoples v-model:list="data.recommend" :loading="data.loadingMore" mode="recommend" />
        <Loading :is-full-screen="false" v-if="data.loadingMore" />
      </Scroll>
    </div>
  </div>
</template>
<script setup>
import Scroll from '@/components/Scroll.vue'
import Peoples from '@/pages/people/components/Peoples.vue'
import { onMounted, reactive } from 'vue'
import { useBaseStore } from '@/store/pinia'
import { _sleep, cloneDeep } from '@/utils'

defineOptions({
  name: 'Fans'
})
const baseStore = useBaseStore()
const data = reactive({
  loading: false,
  loadingMore: false,
  recommend: [],
  fans: []
})

async function getData() {
  data.loading = true
  await _sleep(500)
  data.loading = false

  data.recommend = cloneDeep(baseStore.friends.all)
  data.fans = cloneDeep(baseStore.friends.all)
  data.recommend.map((v) => {
    v.type = -1
  })
}

async function loadData() {
  if (data.loadingMore) return
  data.loadingMore = true
  await _sleep(500)
  data.loadingMore = false
  let temp = cloneDeep(baseStore.friends.all)
  temp.map((v) => {
    v.type = -1
  })
  data.recommend = data.recommend.concat(temp)
}

onMounted(getData)
</script>

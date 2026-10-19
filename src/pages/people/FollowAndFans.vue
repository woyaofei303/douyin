<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 text-white text-[14px]" id="FollowAndFans">
    <BaseHeader backMode="light">
      <template v-slot:center>
        <span class="text-[14px]">{{ store.userinfo.nickname }}</span>
      </template>
      <template v-slot:right>
        <div>
          <img
            class="w-0.5"
            src="../../assets/img/icon/people/add-user.png"
            @click="nav('/people/find-acquaintance')"
          />
        </div>
      </template>
    </BaseHeader>
    <div class="pt-[var(--common-header-height)]">
      <div class="px-[var(--page-padding)] py-0">
        <Indicator
          tabStyleWidth="50%"
          :tabTexts="['关注', '粉丝']"
          v-model:active-index="data.slideIndex"
        >
        </Indicator>
      </div>
      <SlideHorizontal
        class="h-[calc(var(--vh,_1vh)_*_100_-_111px)]!"
        v-model:index="data.slideIndex"
      >
        <SlideItem
          data-slide-item=""
          class="overflow-auto box-border px-[var(--page-padding)] py-0"
        >
          <Search
            class="z-9! left-0! bg-[var(--main-bg)]! fixed! w-[100vw]! box-border! pt-2.5! pb-0! px-[var(--page-padding)]!"
            v-model="data.searchKey"
            placeholder="搜索用户备注或名字"
            :is-show-right-text="false"
          />
          <div class="pt-12.5" v-if="data.searchKey">
            <div v-if="data.searchFriends.length">
              <People :key="i" v-for="(item, i) in data.searchFriends" :people="item"></People>
            </div>
            <div class="flex flex-col items-center" v-else>
              <img class="mt-37.5 h-37.5" src="../../assets/img/icon/no-result.png" alt="" />
              <span class="mt-10 text-[16px]">搜索结果为空</span>
              <span class="mt-5 text-[12px] text-[color:var(--second-text-color)]"
                >没有搜索到相关内容</span
              >
            </div>
          </div>
          <div class="pt-15" v-else>
            <div class="flex items-center mb-2.5 text-[color:var(--second-text-color)] text-[12px]">
              我的关注
            </div>
            <People :key="i" v-for="(item, i) in store.friends.all" :people="item"></People>
          </div>
        </SlideItem>
        <SlideItem
          data-slide-item=""
          class="overflow-auto box-border px-[var(--page-padding)] py-0"
        >
          <People :key="i" v-for="(item, i) in store.friends.all" :people="item"></People>
          <NoMore />
        </SlideItem>
      </SlideHorizontal>
    </div>
  </div>
</template>
<script setup lang="ts">
import People from './components/People.vue'
import Search from '../../components/Search.vue'
import Indicator from '../../components/slide/Indicator.vue'
import { useBaseStore } from '@/store/pinia'
import { onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNav } from '@/utils/hooks/useNav'

defineOptions({
  name: 'FindAcquaintance'
})

const route = useRoute()
const nav = useNav()
const store = useBaseStore()
const data = reactive({
  isSearch: false,
  searchKey: '',

  slideIndex: 0,
  searchFriends: []
})

onMounted(() => {
  data.slideIndex = ~~route.query.type
})

watch(
  () => data.searchKey,
  (newVal) => {
    if (newVal) {
      //TODO 搜索时仅仅判断是否包含了对应字符串，抖音做了拼音判断的
      data.searchFriends = store.friends.all.filter((v) => {
        if (v.name.includes(newVal)) return true
        return v.account.includes(newVal)
      })
    } else {
      data.searchFriends = []
    }
  }
)
</script>

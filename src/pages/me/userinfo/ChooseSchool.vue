<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 text-white overflow-auto">
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">添加学校</span>
      </template>
      <template v-slot:right>
        <span class="text-[14px]" @click="nav('/me/declare-school', { type: 1 })">没有找到?</span>
      </template>
      <template v-slot:bottom>
        <Search
          class="mx-5! my-2.5!"
          placeholder="搜索大学名称"
          v-model="data.schoolName"
          @clear="data.isSearch = false"
          :is-show-right-text="true"
          @notice="search"
        ></Search>
      </template>
    </BaseHeader>
    <div class="pt-30">
      <div v-if="!data.isSearch">
        <div class="px-5 py-2.5">
          <img class="w-2.5 h-2.5 mr-0.5" src="../../../assets/img/icon/location.svg" alt="" />
          <span>离我最近</span>
        </div>
        <template v-if="data.nearby.length">
          <div
            class="text-[14px] h-12.5 flex justify-between items-center [transition:all_0.1s] bg-[var(--main-bg)] px-5 py-0 active:bg-[var(--active-main-bg)] active:text-[color:var(--second-text-color)]"
            :key="i"
            v-for="(item, i) in data.nearby"
            @click="setSchool(item)"
          >
            {{ item }}
          </div>
        </template>
        <div
          class="text-[14px] h-12.5 flex justify-between items-center [transition:all_0.1s] bg-[var(--main-bg)] px-5 py-0 active:bg-[var(--active-main-bg)] active:text-[color:var(--second-text-color)]"
          v-else
        >
          无法获取
        </div>
      </div>
      <div class="h-0.25 bg-[var(--line-color2)] w-[calc(100%_-_40px)] ml-5"></div>
      <div v-if="!data.isSearch">
        <div
          class="text-[14px] h-12.5 flex justify-between items-center [transition:all_0.1s] bg-[var(--main-bg)] px-5 py-0 active:bg-[var(--active-main-bg)] active:text-[color:var(--second-text-color)]"
          :key="i"
          v-for="(item, i) in data.schools"
          @click="setSchool(item)"
        >
          {{ item }}
        </div>
      </div>
      <div v-if="data.isSearch">
        <template v-if="data.searchSchools.length">
          <div
            class="text-[14px] h-12.5 flex justify-between items-center [transition:all_0.1s] bg-[var(--main-bg)] px-5 py-0 active:bg-[var(--active-main-bg)] active:text-[color:var(--second-text-color)]"
            :key="i"
            v-for="(item, i) in data.searchSchools"
            @click="setSchool(item)"
          >
            <span v-if="item.indexOf(data.schoolName) > -1">
              {{ item.substr(0, item.indexOf(data.schoolName)) }}
              <span class="text-[#f50]">{{ data.schoolName }}</span>
              {{ item.substr(item.indexOf(data.schoolName) + data.schoolName.length) }}
            </span>
            <span v-else>{{ item }}</span>
          </div>
        </template>
        <div class="text-center" v-else>
          <img
            class="mt-15 h-25 rounded-[50%]"
            src="../../../assets/img/icon/head-image.jpeg"
            alt=""
          />
          <div class="mt-15 text-[18px]">搜索结果为空</div>
          <div class="text-[color:var(--second-text-color)] mt-5 text-[14px]">
            没有搜索到相关的内容
          </div>
          <div
            class="mt-37.5 inline-block bg-[var(--second-btn-color)] rounded-[2px] px-10 py-3.75"
            @click="nav('/me/declare-school')"
          >
            没有学校信息？去申报
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from '../../../components/Search.vue'
import { onMounted, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav.js'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'ChooseSchool'
})

const router = useRouter()
const nav = useNav()
const data = reactive({
  isSearch: false,
  nearby: [],
  schools: [],
  searchSchools: [],
  schoolName: ''
})

onMounted(() => {
  for (let i = 0; i < 20; i++) {
    data.nearby.push('附近大学' + i)
    data.schools.push('所有大学' + i)
  }
})

function setSchool(val) {
  localStorage.setItem('changeSchool', val)
  router.back()
}

function search() {
  if (!data.schoolName.length) return (data.isSearch = false)
  data.isSearch = true
  let all = data.nearby.concat(data.schools)
  data.searchSchools = all.filter((v) => v.includes(data.schoolName))
}
</script>

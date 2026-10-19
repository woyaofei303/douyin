<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 text-white overflow-auto">
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">选择院系</span>
      </template>
      <template v-slot:right>
        <span class="text-[14px]" @click="nav('/me/declare-school', { type: 2 })">没有找到?</span>
      </template>
    </BaseHeader>
    <div class="pt-15">
      <div>
        <div
          class="text-[14px] h-12.5 flex justify-between items-center [transition:all_0.1s] bg-[var(--main-bg)] px-5 py-0 active:bg-[var(--active-main-bg)] active:text-[color:var(--second-text-color)]"
          :key="i"
          v-for="(item, i) in data.departments"
          @click="setDepartment(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav.js'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'ChooseDepartment'
})

const router = useRouter()
const nav = useNav()
const data = reactive({
  departments: [],
  schoolName: ''
})

onMounted(() => {
  for (let i = 0; i < 5; i++) {
    data.departments.push('院系' + i)
  }
})

function setDepartment(val) {
  localStorage.setItem('changeDepartment', val)
  router.back()
}
</script>

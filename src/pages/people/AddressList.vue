<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white">
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">手机通讯录</span>
      </template>
    </BaseHeader>
    <div class="pt-15">
      <div>
        <div class="pt-5 pb-2.5 flex justify-between items-center px-5">
          <div class="text-[color:var(--second-text-color)]">已有20+位朋友加入抖音</div>
        </div>
        <div>
          <People :key="i" v-for="(item, i) in data.list" :people="item"></People>
        </div>
      </div>
      <div class="text-center leading-[60px] h-15 text-[color:var(--second-text-color)]">
        为尊重用户选择，仅展示已授权用户
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import People from './components/People.vue'
import { reactive } from 'vue'

defineOptions({
  name: 'AddressList'
})

const data = reactive({
  list: [
    {
      type: 5
    }
  ]
})
</script>

<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 text-white overflow-auto">
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">成都</span>
      </template>
    </BaseHeader>
    <div class="pt-15">
      <div>
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] h-12.5 [transition:all_0.1s] bg-[var(--main-bg)] px-3.75 py-0 active:bg-[var(--active-main-bg)] active:text-[color:var(--second-text-color)]"
          @click="save()"
          :key="i"
          v-for="(item, i) in list"
        >
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { _hideLoading, _showLoading, _sleep } from '@/utils'
import { useBaseStore } from '@/store/pinia'

defineOptions({
  name: 'ChooseCity'
})

const store = useBaseStore()
const list = ref([
  '河北',
  '山西',
  '辽宁',
  '吉林',
  '黑龙江',
  '江苏',
  '浙江',
  '安徽',
  '福建',
  '江西',
  '山东',
  '河南',
  '湖北',
  '湖南',
  '广东',
  '海南',
  '四川',
  '贵州',
  '云南',
  '陕西',
  '甘肃',
  '青海',
  '台湾',
  '内蒙古',
  '广西',
  '西藏',
  '宁夏',
  '新疆',
  '北京',
  '天津',
  '上海',
  '重庆',
  '香港',
  '澳门'
])

async function save() {
  _showLoading()
  store.userinfo = { ...store.userinfo, ...{ location: '中国-四川-成都' } }
  await _sleep(500)
  _hideLoading()
  history.go(-3)
}
</script>

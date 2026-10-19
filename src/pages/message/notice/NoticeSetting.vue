<template>
  <div
    class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]"
    id="SystemNotice"
  >
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">通知设置</span>
      </template>
    </BaseHeader>
    <div class="pt-15">
      <div class="p-[var(--page-padding)]">消息免打扰</div>
      <div
        class="mb-2.5 text-[color:var(--second-text-color)] text-[12px] px-[var(--page-padding)] py-0"
      >
        开启后，新通知将用黄点展示，不再展示未读数字
      </div>
      <template v-if="data.type === 'SYSTEM'">
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        >
          <div class="flex justify-between items-center text-white">系统通知</div>
          <switches v-model="data.option" theme="bootstrap" color="success"></switches>
        </div>
      </template>

      <template v-if="data.type === 'TASK'">
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        >
          <div class="flex justify-between items-center text-white">运营任务</div>
          <switches v-model="data.option1" theme="bootstrap" color="success"></switches>
        </div>
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        >
          <div class="flex justify-between items-center text-white">星图(任务)</div>
          <switches v-model="data.option2" theme="bootstrap" color="success"></switches>
        </div>
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        >
          <div class="flex justify-between items-center text-white">成长任务</div>
          <switches v-model="data.option3" theme="bootstrap" color="success"></switches>
        </div>
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        >
          <div class="flex justify-between items-center text-white">DUO来评审团</div>
          <switches v-model="data.option4" theme="bootstrap" color="success"></switches>
        </div>
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        >
          <div class="flex justify-between items-center text-white">任务中心</div>
          <switches v-model="data.option5" theme="bootstrap" color="success"></switches>
        </div>
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        >
          <div class="flex justify-between items-center text-white">中视频伙伴任务</div>
          <switches v-model="data.option6" theme="bootstrap" color="success"></switches>
        </div>
      </template>
      <template v-if="data.type === 'LIVE'">
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        >
          <div class="flex justify-between items-center text-white">直播</div>
          <switches v-model="data.option7" theme="bootstrap" color="success"></switches>
        </div>
      </template>
      <template v-if="data.type === 'MONEY'">
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        >
          <div class="flex justify-between items-center text-white">钱包服务</div>
          <switches v-model="data.option8" theme="bootstrap" color="success"></switches>
        </div>
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        >
          <div class="flex justify-between items-center text-white">收入服务</div>
          <switches v-model="data.option9" theme="bootstrap" color="success"></switches>
        </div>
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        >
          <div class="flex justify-between items-center text-white">零钱服务</div>
          <switches v-model="data.option10" theme="bootstrap" color="success"></switches>
        </div>
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        >
          <div class="flex justify-between items-center text-white">抖币服务</div>
          <switches v-model="data.option11" theme="bootstrap" color="success"></switches>
        </div>
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        >
          <div class="flex justify-between items-center text-white">卡券服务</div>
          <switches v-model="data.option12" theme="bootstrap" color="success"></switches>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import Switches from '../components/swtich/switches.vue'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'NoticeSetting'
})

defineProps({
  modelValue: {
    type: Boolean,
    default() {
      return false
    }
  }
})
const route = useRoute()
const data = reactive({
  option: true,
  option1: false,
  option2: false,
  option3: true,
  option4: false,
  option5: false,
  option6: false,
  option7: true,
  option8: true,
  option9: false,
  option10: false,
  option11: false,
  option12: false,
  type: 'TASK'
})

onMounted(() => {
  data.type = route.query.type
})
</script>

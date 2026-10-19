<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 text-white">
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">触发时间</span>
      </template>
    </BaseHeader>
    <div class="pt-15">
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="setTriggerTime(enums.TRIGGER_TIME.TIME40)"
      >
        <div class="flex justify-between items-center text-white">40分钟</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
          v-if="data.triggerTime === enums.TRIGGER_TIME.TIME40"
        >
          <img class="ml-1.25 w-5" src="../../../../assets/img/icon/ok-red.png" alt="" />
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="setTriggerTime(enums.TRIGGER_TIME.TIME60)"
      >
        <div class="flex justify-between items-center text-white">60分钟</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
          v-if="data.triggerTime === enums.TRIGGER_TIME.TIME60"
        >
          <img class="ml-1.25 w-5" src="../../../../assets/img/icon/ok-red.png" alt="" />
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="setTriggerTime(enums.TRIGGER_TIME.TIME90)"
      >
        <div class="flex justify-between items-center text-white">90分钟</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
          v-if="data.triggerTime === enums.TRIGGER_TIME.TIME90"
        >
          <img class="ml-1.25 w-5" src="../../../../assets/img/icon/ok-red.png" alt="" />
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="setTriggerTime(enums.TRIGGER_TIME.TIME120)"
      >
        <div class="flex justify-between items-center text-white">120分钟</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
          v-if="data.triggerTime === enums.TRIGGER_TIME.TIME120"
        >
          <img class="ml-1.25 w-5" src="../../../../assets/img/icon/ok-red.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import enums from '../../../../utils/enums'

import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'ChooseSchool'
})

const route = useRoute()
const data = reactive({
  triggerTime: enums.TRIGGER_TIME.TIME60
})

onMounted(() => {
  data.triggerTime = ~~route.query.triggerTime
})

function setTriggerTime(type) {
  data.triggerTime = type
  localStorage.setItem('changeTriggerTime', type)
}
</script>

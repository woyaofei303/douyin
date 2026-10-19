<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 text-white">
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">展示范围</span>
      </template>
    </BaseHeader>
    <div class="pt-15">
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="setDisplayType(enums.DISPLAY_TYPE.ALL)"
      >
        <div class="flex justify-between items-center text-white">公开可见</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
          v-if="data.displayType === enums.DISPLAY_TYPE.ALL"
        >
          <img class="ml-1.25 w-5" src="../../../assets/img/icon/ok-red.png" alt="" />
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="setDisplayType(enums.DISPLAY_TYPE.SCHOOL)"
      >
        <div class="flex justify-between items-center text-white">校友可见</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
          v-if="data.displayType === enums.DISPLAY_TYPE.SCHOOL"
        >
          <img class="ml-1.25 w-5" src="../../../assets/img/icon/ok-red.png" alt="" />
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="setDisplayType(enums.DISPLAY_TYPE.ME)"
      >
        <div class="flex justify-between items-center text-white">仅自己可见</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
          v-if="data.displayType === enums.DISPLAY_TYPE.ME"
        >
          <img class="ml-1.25 w-5" src="../../../assets/img/icon/ok-red.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import enums from '../../../utils/enums'

import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'DisplayType'
})

const router = useRouter()
const route = useRoute()
const data = reactive({
  displayType: enums.DISPLAY_TYPE.ALL
})

onMounted(() => {
  data.displayType = ~~route.query.displayType
})

function setDisplayType(type) {
  data.displayType = type
  localStorage.setItem('changeDisplayType', type)
  router.back()
}
</script>

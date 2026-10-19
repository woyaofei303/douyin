<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]">
    <BaseHeader />
    <div class="pt-[var(--common-header-height)]" v-if="data.type === 0">
      <div
        class="flex justify-center items-center flex-col text-[16px] text-[color:var(--second-text-color)] mx-0 my-15"
      >
        <img class="w-3.75 mb-3.75" src="@/assets/img/icon/newicon/left_menu/lock.png" alt="" />
        <span>时间锁已关闭</span>
      </div>
      <div
        class="mt-2.5 flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0 active:bg-[var(--main-bg)]"
      >
        <div class="flex justify-between items-center text-white">
          <img
            class="mr-2.5 w-3.75"
            src="@/assets/img/icon/newicon/left_menu/hourglass.png"
            alt=""
          />
          <span>可为时间锁设置一个触发时间</span>
        </div>
      </div>
      <div
        class="mt-2.5 flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0 active:bg-[var(--main-bg)]"
      >
        <div class="flex justify-between items-center text-white">
          <img class="mr-2.5 w-3.75" src="@/assets/img/icon/newicon/left_menu/clock.png" alt="" />
          <span>开启时间锁后，单日使用时长超过触发时间，需输入密码才能继续使用</span>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] my-2.5 px-[var(--page-padding)] py-0 active:bg-[var(--main-bg)]"
      >
        <div class="flex justify-between items-center text-white">
          <img class="mr-2.5 w-3.75" src="@/assets/img/icon/newicon/left_menu/lock.png" alt="" />
          <span>开启时间锁，需先设置独立密码；忘记密码后可通过申诉重置密码</span>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] my-2.5 px-[var(--page-padding)] py-0"
        @click="nav('trigger-time', { triggerTime: data.triggerTime })"
      >
        <div class="flex justify-between items-center text-white">
          <span>触发时间</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <span>{{ data.triggerTime }}分钟</span>
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div class="fixed bottom-3.75 left-2.5 right-2.5">
        <div>开启时间锁</div>
      </div>
    </div>
    <div class="pt-[var(--common-header-height)]" v-if="data.type === 1">
      <img class="mt-10 w-full" src="@/assets/img/icon/newicon/left_menu/qingshaonian.png" alt="" />
      <div class="fixed bottom-3.75 left-2.5 right-2.5">
        <div class="text-[13px] mb-3.75">
          <span>更多信息可阅读</span>
          <span
            class="text-[yellow]"
            @click="nav('/service-protocol', { type: '儿童/青少年使用须知' })"
            >《儿童/青少年使用须知》</span
          >
        </div>
        <div>开启青少年模式</div>
      </div>
    </div>
    <div class="pt-[var(--common-header-height)]" v-if="data.type === 2">
      <img class="mt-10 w-full" src="@/assets/img/icon/newicon/left_menu/img-type3.png" alt="" />
      <div class="fixed bottom-3.75 left-2.5 right-2.5">
        <div class="text-[13px] mb-3.75">
          <!--          TODO  有个勾选没做-->
          <span>我已阅读并接受</span>
          <span
            class="text-[yellow]"
            @click="nav('/service-protocol', { type: '抖音亲子平台服务协议' })"
          >
            《抖音亲子平台服务协议》
          </span>
        </div>
        <BaseButton type="primary">立即绑定</BaseButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import enums from '@/utils/enums'

import { onMounted, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav.js'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'

defineOptions({
  name: 'DetailSetting'
})

const route = useRoute()
const nav = useNav()
const data = reactive({
  type: 0,
  triggerTime: enums.TRIGGER_TIME.TIME60
})

onMounted(() => {
  data.type = ~~route.query.type
  let triggerTime = localStorage.getItem('changeTriggerTime')
  if (triggerTime !== null) data.triggerTime = Number(triggerTime)
})
</script>

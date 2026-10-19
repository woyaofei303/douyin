<template>
  <div
    class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px] flex flex-col"
    id="RequestUpdate"
  >
    <BaseHeader :is-fixed="false">
      <template v-slot:center>
        <span class="text-[16px]">求更新</span>
      </template>
      <template v-slot:right>
        <div>
          <img
            class="w-5"
            src="../../assets/img/icon/menu-gray.png"
            @click="data.isShowOption = true"
          />
        </div>
      </template>
    </BaseHeader>
    <Loading v-if="data.loading" />
    <div class="flex-[1] overflow-auto pt-3.75 pb-15 px-3.75" v-else>
      <div class="flex flex-col items-center" v-if="false">
        <img class="mt-25 h-30" src="../../assets/img/icon/none-bg1.webp" alt="" />
        <div class="mt-2.5 text-[16px]">暂时还没有粉丝点击“求更新”</div>
        <div class="mt-2.5 text-[14px] text-[color:var(--second-text-color)]">
          当粉丝期待你的新作品时，会点击“求更新”提醒你
        </div>
      </div>
      <div>
        <!--        <div class="title">近7天收到1次求更新</div>-->
        <!--        <div class="subtitle f12">上次发布作品：2020-08-01 上次开播：昨天23:12</div>-->
        <div class="text-[12px] mt-2.5 text-[color:var(--second-text-color)]">
          历史求更新（粉丝送礼后7天未开播则退还礼物）
        </div>
        <div class="mt-[var(--page-padding)]">
          <div
            class="flex justify-between items-center px-0 py-2.5"
            :key="i"
            v-for="(item, i) in store.friends.all"
          >
            <div class="flex items-center">
              <img class="w-10.5 h-10.5 rounded-[50%] mr-2.5" :src="_checkImgUrl(item.avatar)" />
              <span>{{ item.name }}</span>
            </div>
            <span class="text-[12px] text-[color:var(--second-text-color)]">{{
              _dateFormat(item.lastLoginTime, 'D')
            }}</span>
          </div>
        </div>
        <no-more>最多展示100位粉丝的历史求更新记录</no-more>
      </div>
    </div>
    <div
      class="fixed pt-0 pb-3.75 bottom-0 left-0 right-0 flex items-center bg-[var(--main-bg)] px-3.75"
    >
      <dy-button
        class="flex-[1]! nth-[1]:mr-1.25! nth-[2]:ml-1.25!"
        type="white"
        :border="false"
        :active="false"
        @click="nav('/publish')"
        >发布作品
      </dy-button>
      <dy-button
        class="flex-[1]! nth-[1]:mr-1.25! nth-[2]:ml-1.25!"
        type="primary"
        :active="false"
        @click="_no"
        >去直播</dy-button
      >
    </div>

    <from-bottom-dialog
      page-id="RequestUpdate"
      height="160rem"
      :show-heng-gang="false"
      mode="white"
      v-model="data.isShowOption"
    >
      <div
        class="text-black text-center p-3.75 nth-[2]:border-b-[1px] nth-[2]:[border-bottom-style:solid] nth-[2]:border-b-[gainsboro]"
        @click="toggleRequestUpdate"
      >
        {{ data.openRequestUpdate ? '关闭' : '开启' }}求更新提醒
      </div>
      <div
        class="text-black text-center p-3.75 nth-[2]:border-b-[1px] nth-[2]:[border-bottom-style:solid] nth-[2]:border-b-[gainsboro]"
        @click="nav('/me/my-request-update')"
      >
        我的求更新提醒
      </div>
      <div class="h-2.5 bg-[whitesmoke]"></div>
      <div
        class="text-black text-center p-3.75 nth-[2]:border-b-[1px] nth-[2]:[border-bottom-style:solid] nth-[2]:border-b-[gainsboro]"
        @click="data.isShowOption = false"
      >
        取消
      </div>
    </from-bottom-dialog>
  </div>
</template>
<script setup lang="ts">
import FromBottomDialog from '../../components/dialog/FromBottomDialog.vue'
import { useBaseStore } from '@/store/pinia'
import { onMounted, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav'
import { _checkImgUrl, _dateFormat, _notice, _sleep } from '@/utils'

defineOptions({
  name: 'RequestUpdate'
})

const nav = useNav()
const store = useBaseStore()
const data = reactive({
  isShowOption: false,
  loading: false,
  openRequestUpdate: true
})

onMounted(() => {
  getData()
})

async function getData() {
  data.loading = true
  await _sleep(700)
  data.loading = false
}

function toggleRequestUpdate() {
  data.openRequestUpdate = !data.openRequestUpdate
  data.isShowOption = false
  if (data.openRequestUpdate) {
    _notice('提醒已开启，再次点击可关闭')
  } else {
    _notice('提醒已关闭，再次点击可开启')
  }
}
</script>

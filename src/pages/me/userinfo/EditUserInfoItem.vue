<template>
  <div class="fixed left-0 right-0 bottom-0 top-0">
    <BaseHeader @back="back">
      <template v-slot:center>
        <span class="text-[16px]" v-if="data.type === 1">修改名字</span>
        <span class="text-[16px]" v-if="data.type === 2">修改抖音号</span>
        <span class="text-[16px]" v-if="data.type === 3">修改简介</span>
      </template>
      <template v-slot:right>
        <div>
          <span
            class="text-[16px]"
            :class="[
              !isChanged
                ? 'text-[color:var(--disable-primary-btn-color)]'
                : isChanged
                  ? 'text-[color:var(--primary-btn-color)]'
                  : ''
            ]"
            @click="save"
            >保存</span
          >
        </div>
      </template>
    </BaseHeader>

    <div class="pt-17.5 pb-5 px-5">
      <div v-if="data.type === 1">
        <div class="text-[12px] text-[color:var(--second-text-color)]">我的名字</div>
        <div
          class="relative border-b-[1px] [border-bottom-style:solid] border-b-[var(--line-color)] flex items-center mb-0.25"
        >
          <input
            class="text-white h-7.5 w-full [outline:none] bg-transparent mx-0 my-1.25 border-[0] border-current border-none placeholder:text-[color:var(--second-text-color)]"
            type="text"
            v-model="data.localUserinfo.nickname"
            placeholder="记得填写名字哦"
          />
          <img
            class="absolute right-0 top-3.75 w-2.5 [transform:scale(2)]"
            v-if="data.localUserinfo.nickname"
            src="../../../assets/img/icon/newicon/close-and-bg.png"
            alt=""
            @click="data.localUserinfo.nickname = ''"
          />
        </div>
        <div class="text-[12px] text-[color:var(--second-text-color)]">
          {{ data.localUserinfo.nickname.length }}/20
        </div>
      </div>
      <div v-if="data.type === 2">
        <div class="text-[12px] text-[color:var(--second-text-color)]">我的抖音号</div>
        <div
          class="relative border-b-[1px] [border-bottom-style:solid] border-b-[var(--line-color)] flex items-center mb-2.5"
        >
          <input
            class="text-white h-7.5 w-full [outline:none] bg-transparent mx-0 my-1.25 border-[0] border-current border-none placeholder:text-[color:var(--second-text-color)]"
            type="text"
            v-model="data.localUserinfo.unique_id"
          />
          <img
            class="absolute right-0 top-3.75 w-2.5 [transform:scale(2)]"
            v-if="data.localUserinfo.unique_id"
            src="../../../assets/img/icon/newicon/close-and-bg.png"
            alt=""
            @click="data.localUserinfo.unique_id = ''"
          />
        </div>
        <div class="text-[12px] text-[color:var(--second-text-color)]">
          最多16个字，只允许包含字母、数字、下划线和点，30天内仅能修改一次
        </div>
      </div>
      <div v-if="data.type === 3">
        <div class="text-[12px] text-[color:var(--second-text-color)]">个人简介</div>
        <div class="w-full bg-[var(--active-main-bg)] box-border mt-2.5 rounded-[2px] p-3.75">
          <textarea
            class="[font-family:'Microsoft_YaHei_UI'] [outline:none] w-full bg-transparent text-white border-[0] border-current border-none placeholder:text-[color:var(--second-text-color)]"
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="data.localUserinfo.signature"
            placeholder="你可以填写兴趣爱好、心情愿望，有趣的介绍能让被关注的概率变高噢！"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//TODO 1、数据变了后，保存按钮变亮；2、数据变了，点返回，弹窗是否确认

import { useBaseStore } from '@/store/pinia'
import {
  _hideLoading,
  _notice,
  _showLoading,
  _showSimpleConfirmDialog,
  _sleep,
  cloneDeep
} from '@/utils'
import { computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'EditUserInfo'
})
const store = useBaseStore()
const router = useRouter()
const route = useRoute()
const data = reactive({
  type: 1,
  localUserinfo: {
    nickname: '',
    signature: '',
    unique_id: '',
    desc: ''
  }
})
const isChanged = computed(() => {
  if (data.type === 1) if (!data.localUserinfo.nickname) return false
  if (data.type === 2) if (!data.localUserinfo.desc) return false
  if (store.userinfo.nickname !== data.localUserinfo.nickname) return true
  if (store.userinfo.desc !== data.localUserinfo.desc) return true
  return store.userinfo.unique_id !== data.localUserinfo.unique_id
})

onMounted(() => {
  data.localUserinfo = cloneDeep(store.userinfo)
  data.type = Number(route.query.type)
})

function back() {
  if (isChanged.value) {
    _showSimpleConfirmDialog('是否保存修改', save, router.back)
  } else {
    router.back()
  }
}

async function save() {
  if (!isChanged.value) return
  if (data.type === 1) {
    if (!data.localUserinfo.nickname) return _notice('名字不能为空')
  }
  _showLoading()
  store.setUserinfo(data.localUserinfo)
  await _sleep(500)
  _hideLoading()
  router.back()
  if (data.type === 3) return _notice('新签名保存成功')
}
</script>

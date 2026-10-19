<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-[14px]">
    <BaseHeader>
      <template v-slot:center>
        <div class="flex flex-col items-center">
          <span class="text-[16px]">编辑资料</span>
          <span class="text-[10px] text-[color:var(--second-text-color)]">已完成85%</span>
        </div>
      </template>
    </BaseHeader>
    <div class="pt-15 text-white">
      <div class="flex justify-center items-center flex-col mx-0 my-7.5">
        <div
          class="relative flex justify-center items-center mb-2.5 w-20 h-20"
          @click="showAvatarDialog"
        >
          <img
            class="opacity-50 absolute w-20 h-20 rounded-[50%]"
            :src="_checkImgUrl(store.userinfo.cover_url[0].url_list[0])"
            alt=""
          />
          <img class="w-7 z-9 relative" src="../../../assets/img/icon/me/camera-light.png" alt="" />
        </div>
        <span>点击更换头像</span>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="nav('/me/edit-userinfo-item', { type: 1 })"
      >
        <div class="flex justify-between items-center text-white">名字</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <span>{{ isEmpty(store.userinfo.nickname) }}</span>
          <dy-back class="ml-1.25" scale=".8" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="nav('/me/edit-userinfo-item', { type: 2 })"
      >
        <div class="flex justify-between items-center text-white">抖音号</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <span>{{ isEmpty(_getUserDouyinId({ author: store.userinfo })) }}</span>
          <dy-back class="ml-1.25" scale=".8" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="nav('/me/edit-userinfo-item', { type: 3 })"
      >
        <div class="flex justify-between items-center text-white">简介</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <span>{{ isEmpty(store.userinfo.signature) }}</span>
          <dy-back class="ml-1.25" scale=".8" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="showSexDialog"
      >
        <div class="flex justify-between items-center text-white">性别</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <span>{{ sex }}</span>
          <dy-back class="ml-1.25" scale=".8" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="showBirthdayDialog"
      >
        <div class="flex justify-between items-center text-white">生日</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <span>{{ isEmpty(store.userinfo.user_age) }}</span>
          <div v-show="false" id="trigger1"></div>
          <dy-back class="ml-1.25" scale=".8" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="nav('/me/choose-location')"
      >
        <div class="flex justify-between items-center text-white">所在地</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <span v-if="store.userinfo.province || store.userinfo.city">
            {{ store.userinfo.province }}
            <template v-if="store.userinfo.province && store.userinfo.city"> - </template>
            {{ store.userinfo.city }}
          </span>
          <dy-back class="ml-1.25" scale=".8" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        @click="nav('/me/add-school')"
      >
        <div class="flex justify-between items-center text-white">学校</div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <span>{{ isEmpty(store.userinfo.school?.name) }}</span>
          <dy-back class="ml-1.25" scale=".8" direction="right"></dy-back>
        </div>
      </div>
    </div>
    <transition
      enter-from-class="opacity-0"
      enter-active-class="[transition:opacity_0.3s_ease]"
      enter-to-class=""
      leave-from-class=""
      leave-active-class="[transition:opacity_0.3s_ease]"
      leave-to-class="opacity-0"
      move-class=""
    >
      <div
        class="z-9 fixed left-0 right-0 bottom-0 top-0 bg-black flex items-center justify-center"
        v-if="data.previewImg"
        @click="data.previewImg = ''"
      >
        <img class="w-full max-h-[%]" :src="data.previewImg" alt="" />
        <img
          class="absolute bottom-5 right-5 bg-[var(--second-btn-color-tran)] w-5 p-0.75"
          src="../../../assets/img/icon/components/video/download.png"
          alt=""
          @click.stop="_no"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import MobileSelect from '../../../components/mobile-select/mobile-select'
import { useBaseStore } from '@/store/pinia'
import {
  _checkImgUrl,
  _getUserDouyinId,
  _hideLoading,
  _no,
  _showLoading,
  _showSelectDialog,
  _sleep
} from '@/utils'
import { computed, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav'

defineOptions({
  name: 'EditUserInfo'
})
const store = useBaseStore()
const nav = useNav()
const data = reactive({
  sexList: [
    { id: 1, name: '男' },
    { id: 2, name: '女' },
    { id: 3, name: '不展示' }
  ],
  avatarList: [
    { id: 1, name: '拍一张' },
    { id: 2, name: '从相册选择' },
    { id: 3, name: '查看大图' },
    { id: 4, name: '取消' }
  ],
  previewImg: ''
})

const sex = computed(() => {
  switch (Number(store.userinfo.gender)) {
    case 1:
      return '男'
    case 2:
      return '女'
    default:
      return ''
  }
})

function isEmpty(val) {
  if (val && val !== -1) return val
  return '点击设置'
}

function showSexDialog() {
  _showSelectDialog(data.sexList, async (e) => {
    _showLoading()
    await _sleep(500)
    store.setUserinfo({ ...store.userinfo, gender: e.id })
    _hideLoading()
  })
}

function showAvatarDialog() {
  _showSelectDialog(data.avatarList, (e) => {
    switch (e.id) {
      case 1:
      case 2:
        return _no()
      case 3:
        data.previewImg = _checkImgUrl(store.userinfo.cover_url[0].url_list[0])
        break
    }
  })
}

function showBirthdayDialog() {
  new MobileSelect({
    trigger: '#trigger1',
    title: '生日',
    connector: '生日',
    wheels: [
      {
        data: Array.apply(null, { length: 100 }).map((v, i) => new Date().getFullYear() - i)
      },
      {
        data: Array.apply(null, { length: 12 }).map((v, i) => 12 - i)
      },
      {
        data: Array.apply(null, { length: 31 }).map((v, i) => 31 - i)
      }
    ],
    callback: async (indexArr, data) => {
      _showLoading()
      await _sleep(500)
      store.setUserinfo({
        ...store.userinfo,
        birthday: data.join('-')
      })
      _hideLoading()
    }
  }).show()
}
</script>

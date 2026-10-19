<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]">
    <BaseHeader class="z-7!" backMode="light" backImg="back">
      <template v-slot:center>
        <span class="text-[16px]">已加入的群聊</span>
      </template>
      <template v-slot:right>
        <div>
          <span
            class="text-[16px]"
            :class="[
              !data.selectFriends.length
                ? 'text-[color:var(--disable-primary-btn-color)]'
                : data.selectFriends.length
                  ? 'text-[color:var(--primary-btn-color)]'
                  : ''
            ]"
            @click="save"
          >
            完成{{ data.selectFriends.length ? `(${data.selectFriends.length})` : '' }}
          </span>
        </div>
      </template>
    </BaseHeader>
    <div class="pt-15">
      <div>
        <div
          class="flex items-center px-5 py-2.5 active:bg-[#23293a]"
          :key="i"
          v-for="(item, i) of data.friends.all"
          @click="toggleSelect(item)"
        >
          <Check class="h-5.5! w-5.5! mr-3.75" mode="red" v-model="item.select" />
          <img
            class="h-11.25 w-11.25 rounded-[50%] mr-3.75"
            :src="_checkImgUrl(item.avatar)"
            alt=""
          />
          <div>
            <span>{{ item.name.length > 20 ? item.name.substr(0, 20) + '...' : item.name }}</span>
            <span class="ml-1.25 text-[color:var(--second-text-color)]">(3)</span>
          </div>
        </div>
      </div>
      <NoMore></NoMore>
    </div>
  </div>
</template>
<script setup lang="ts">
import Check from '../../components/Check.vue'
import { friends } from '@/api/user'

import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { _checkImgUrl } from '@/utils'

defineOptions({
  name: 'JoinedGroupChat'
})

const router = useRouter()
const data = reactive({
  friends: {
    all: {},
    recent: [],
    eachOther: []
  },
  selectFriends: []
})

onMounted(() => {
  getFriends()
})

function save() {
  if (!data.selectFriends.length) return
  router.back()
}

function toggleSelect(item) {
  let resIndex = data.selectFriends.findIndex((v) => v.name === item.name)
  if (resIndex !== -1) {
    item.select = false
    data.selectFriends.splice(resIndex, 1)
  } else {
    item.select = true
    data.selectFriends.push(item)
  }
}

async function getFriends() {
  let res = await friends()
  if (res.success) {
    data.friends = res.data
    data.friends.all = data.friends.all.sort((a, b) => {
      if (a.pinyin < b.pinyin) return -1
      if (a.pinyin > b.pinyin) return 1
      return 0
    })
  }
}
</script>

<template>
  <div
    class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]"
    id="RequestUpdate"
  >
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">我的求更新记录</span>
      </template>
    </BaseHeader>
    <div class="px-3.75 py-15">
      <div>
        <div>
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
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _dateFormat } from '../../utils'

const store = useBaseStore()

defineOptions({
  name: 'MyRequestUpdate'
})
</script>

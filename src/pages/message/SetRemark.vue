<template>
  <div class="fixed left-0 right-0 bottom-0 top-0">
    <BaseHeader @back="back">
      <template v-slot:center>
        <span class="text-[16px]">修改备注名</span>
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
      <div class="text-[12px] text-[color:var(--second-text-color)]">备注名</div>
      <div
        class="relative border-b-[1px] [border-bottom-style:solid] border-b-[var(--line-color)] flex items-center mb-0.25"
      >
        <input
          class="text-white h-7.5 w-full [outline:none] bg-transparent mx-0 my-1.25 border-[0] border-current border-none placeholder:text-[color:var(--second-text-color)]"
          type="text"
          v-model="data.remark"
          placeholder="请输入备注名"
        />
        <img
          class="absolute right-0 top-3.75 w-2.5"
          v-if="data.remark.length"
          src="../../assets/img/icon/close.svg"
          alt=""
          @click="data.remark = ''"
        />
      </div>
      <div class="text-[12px] text-[color:var(--second-text-color)]">
        {{ data.remark.length }}/20
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { _hideLoading, _showLoading, _showSimpleConfirmDialog, _sleep } from '@/utils'

defineOptions({
  name: 'SetRemark'
})

const router = useRouter()
const data = reactive({
  remark: '',
  oldRemark: ''
})

const isChanged = computed(() => {
  return data.remark !== data.oldRemark
})
onMounted(() => {})

function back() {
  if (isChanged.value) {
    _showSimpleConfirmDialog('是否保存修改', save, router.back)
  } else {
    router.back()
  }
}

async function save() {
  if (!isChanged.value) return
  _showLoading()
  await _sleep(500)
  _hideLoading()
  router.back()
}
</script>

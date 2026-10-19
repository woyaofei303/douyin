<template>
  <div class="fixed top-0 bottom-0 right-0 left-0">
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">申报学校信息</span>
      </template>
    </BaseHeader>
    <div class="pt-17.5 pb-0 px-5">
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="text-white text-[16px] mr-7.5">学校全称</div>
        <input
          class="flex-[1] h-10 bg-transparent [outline:none] border-t-[0] [border-top-style:none] border-t-[currentColor] border-r-[0] [border-right-style:none] border-r-[currentColor] border-l-[0] [border-left-style:none] border-l-[currentColor] border-b-[1px] [border-bottom-style:solid] border-b-[var(--line-color)] text-white"
          type="text"
          placeholder="请输入学校全称(必填)"
          v-model="data.form.name"
        />
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
        v-if="data.type === 1"
      >
        <div class="text-white text-[16px] mr-7.5">所在城市</div>
        <input
          class="flex-[1] h-10 bg-transparent [outline:none] border-t-[0] [border-top-style:none] border-t-[currentColor] border-r-[0] [border-right-style:none] border-r-[currentColor] border-l-[0] [border-left-style:none] border-l-[currentColor] border-b-[1px] [border-bottom-style:solid] border-b-[var(--line-color)] text-white"
          type="text"
          placeholder="请输入学校所在城市(必填)"
          v-model="data.form.location"
        />
      </div>
      <div class="flex items-center justify-between" v-if="data.type === 2">
        <div class="text-white text-[16px] mr-7.5">信息问题</div>
        <div class="flex items-center text-[color:var(--second-text-color)] px-0 py-3">
          <span>点击选择(必选)</span>
          <img class="ml-1.25 w-3" src="../../../assets/img/icon/back.png" alt="" />
        </div>
      </div>
      <div class="mt-5 text-[color:var(--second-text-color)]">感谢你的反馈，我们将尽快核对信息</div>
      <div
        class="fixed bottom-5 left-5 right-5 text-white text-[16px] bg-[var(--primary-btn-color)] text-center rounded-[2px] px-0 py-2.5"
        @click="submit"
      >
        提交
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { _notice } from '@/utils'

defineOptions({
  name: 'DeclareSchool'
})

const router = useRouter()
const route = useRoute()
const data = reactive({
  form: {
    name: '',
    location: '',
    departmentInfoType: ''
  },
  type: 1
})

//TODO 院系点击那个弹窗没做
onMounted(() => {
  data.type = Number(route.query.type)
})

function submit() {
  if (!data.form.name) return _notice('请输入学校全称')
  if (data.type === 1 && !data.form.location) return _notice('请输入学校所在城市')
  if (data.type === 2 && !data.form.departmentInfoType) return _notice('请选择信息问题')
  _notice('申报成功')
  setTimeout(router.back, 1000)
}
</script>

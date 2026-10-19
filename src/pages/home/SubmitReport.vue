<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]">
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">
          <template v-if="data.mode === 'video'">视频</template>
          <template v-if="data.mode === 'music'">音乐</template>
          <template v-if="data.mode === 'chat'">私信</template>举报</span
        >
      </template>
    </BaseHeader>
    <div class="pt-15">
      <div
        class="text-[12px] text-[color:var(--second-text-color)] border-b-[1px] [border-bottom-style:solid] border-b-[#cccccc11] px-3.75 py-2.5"
      >
        <span
          >你的举报将在12小时内受理，若举报成功会第一时间告知处理结果，请尽量提交完整的举报描述及材料</span
        >
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <span> 举报理由：{{ data.type }} </span>
      </div>
      <div class="px-3.75 py-0">
        <div>举报描述(选填)</div>
        <div class="w-full bg-[var(--active-main-bg)] box-border mt-2.5 rounded-[2px] p-3.75">
          <textarea
            class="[font-family:'Microsoft_YaHei_UI'] [outline:none] w-full bg-transparent text-white border-[0] border-current border-none placeholder:text-[color:var(--second-text-color)]"
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="data.desc"
            placeholder="详细描述举报理由"
          ></textarea>
        </div>
        <div class="mt-1.25 text-[10px] text-[color:var(--second-text-color)] text-right">
          {{ data.desc.length }}/200
        </div>
      </div>
      <div class="mt-1.25 flex px-3.75 py-0">
        <div
          class="w-[calc((100vw_-_3vw_-_30px)_/_4)] h-[calc((100vw_-_3vw_-_30px)_/_4)] relative mr-[1vw]"
          :key="index"
          v-for="(item, index) in data.photos"
        >
          <img class="object-cover absolute w-full h-full" :src="item" alt="" />
          <img
            class="absolute right-0 top-0 bg-[var(--second-btn-color)] w-2.5 h-2.5 p-0.75"
            src="../../assets/img/icon/components/light-close.png"
            alt=""
            @click="data.photos.pop()"
          />
        </div>
        <div
          class="w-[calc((100vw_-_3vw_-_30px)_/_4)] h-[calc((100vw_-_3vw_-_30px)_/_4)] flex flex-col justify-center text-[color:var(--second-text-color)] text-[12px] items-center bg-[var(--second-btn-color-tran)]"
          @click="upload"
          v-if="data.photos.length !== 4"
        >
          <img class="w-8.75 h-8.75" src="../../assets/img/icon/home/camera-gray.png" alt="" />
          <span>{{ data.photos.length }}/4</span>
        </div>
      </div>

      <dy-button class="absolute! left-3.75! right-3.75! bottom-3.75!" type="primary" @click="_no"
        >提交</dy-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { _hideLoading, _no, _showLoading, _sleep } from '@/utils'

defineOptions({
  name: 'SubmitReport'
})

const route = useRoute()
const data = reactive({
  type: '色情低俗',
  mode: 'video',
  desc: '',
  photos: []
})

onMounted(() => {
  data.type = route.query.type
  data.mode = route.query.mode
})

async function upload() {
  _showLoading()
  await _sleep(500)
  _hideLoading()
  data.photos.push(
    new URL(`../../assets/img/poster/${data.photos.length}.jpg`, import.meta.url).href
  )
}
</script>

<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white bg-black">
    <video class="w-full h-[calc(100%_-_60px)]" id="video" autoplay></video>
    <div class="text-[15px] font-bold text-[color:var(--second-text-color)]">
      <SlideHorizontal class="h-15!" v-model:index="activeIndex">
        <SlideItem data-slide-item="" class="w-[20vw]!"></SlideItem>
        <SlideItem data-slide-item="" class="w-[20vw]!"></SlideItem>
        <SlideItem data-slide-item="" class="w-[25vw]!" @click="activeIndex = 0">
          <span :class="[activeIndex + 2 === 2 ? 'text-white' : '']">分段拍</span>
        </SlideItem>
        <SlideItem data-slide-item="" class="w-[20vw]!" @click="activeIndex = 1">
          <span :class="[activeIndex + 2 === 3 ? 'text-white' : '']">快拍</span>
        </SlideItem>
        <SlideItem data-slide-item="" class="w-[20vw]!" @click="activeIndex = 2">
          <span :class="[activeIndex + 2 === 4 ? 'text-white' : '']">影集</span>
        </SlideItem>
        <SlideItem data-slide-item="" class="w-[20vw]!" @click="activeIndex = 3">
          <span :class="[activeIndex + 2 === 5 ? 'text-white' : '']">开直播</span>
        </SlideItem>
      </SlideHorizontal>
    </div>
    <div class="fixed left-0 right-0 top-0 h-[calc(100%_-_60px)]">
      <Icon
        class="text-[28px] absolute left-5 top-5"
        icon="mingcute:close-line"
        @click="router.back()"
      />
      <div
        class="absolute left-[50%] top-5 [transform:translateX(-50%)] rounded-[20px] bg-[#333333] flex items-center text-[14px] px-3.75 py-1.25"
      >
        <Icon class="text-[30px] mr-1.25 w-3 h-3" icon="vaadin:music" />
        <span>选择音乐</span>
      </div>
      <div class="absolute top-5 right-2.5">
        <div
          class="flex flex-col items-center mb-5 text-[26px]"
          @click.stop="$emit('showComments')"
        >
          <Icon icon="tabler:refresh" />
        </div>
        <div
          class="flex flex-col items-center mb-5 text-[26px]"
          @click.stop="$emit('showComments')"
        >
          <Icon icon="pepicons-pop:electricity-off" />
        </div>
        <div
          class="flex flex-col items-center mb-5 text-[26px]"
          @click.stop="$emit('showComments')"
        >
          <Icon icon="lets-icons:setting-fill" />
        </div>
        <div
          class="flex flex-col items-center mb-5 text-[26px]"
          @click.stop="$emit('showComments')"
        >
          <Icon icon="bxs:alarm" />
        </div>
        <div
          class="flex flex-col items-center mb-5 text-[26px]"
          @click.stop="$emit('showComments')"
        >
          <Icon icon="fluent:pen-sparkle-16-filled" />
        </div>
        <div
          class="flex flex-col items-center mb-5 text-[26px]"
          @click.stop="$emit('showComments')"
        >
          <Icon icon="ri:color-filter-fill" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'Publish'
})
const router = useRouter()
const videoEl = ref(null)
const activeIndex = ref(1)

//访问用户媒体设备的兼容方法
function getUserMedia(constrains, success, error) {
  if (navigator.mediaDevices.getUserMedia) {
    //最新标准API
    navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error)
  } else if (navigator.webkitGetUserMedia) {
    //webkit内核浏览器
    navigator.webkitGetUserMedia(constrains).then(success).catch(error)
  } else if (navigator.mozGetUserMedia) {
    //Firefox浏览器
    // eslint-disable-next-line no-undef
    navigator.mozGetUserMedia(constrains).then(success).catch(error)
  } else if (navigator.getUserMedia) {
    //旧版API
    navigator.getUserMedia(constrains).then(success).catch(error)
  }
}

function getMedia() {
  // let constraints = {video: {width: this.bodyWidth, height: this.bodyHeight - 60}, audio: false};
  // let constraints = {video:{width:480,height:320}, audio: false};
  let constraints = { video: true, audio: false }
  try {
    getUserMedia(
      constraints,
      (MediaStream) => {
        videoEl.value.srcObject = MediaStream
        videoEl.value.play()
      },
      function (PermissionDeniedError) {
        console.log(PermissionDeniedError)
      }
    )
  } catch (e) {
    console.log('e', e)
  }
}

onMounted(() => {
  videoEl.value = document.getElementById('video')
  getMedia()
})
</script>

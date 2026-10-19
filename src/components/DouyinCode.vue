<template>
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
      class="fixed left-0 right-0 bottom-0 top-0 flex flex-col items-center justify-end bg-transparent"
      v-if="modelValue"
    >
      <div class="bg-white w-[70vw] mb-10 relative rounded-[10px] overflow-hidden">
        <div class="w-[70vw] h-[70vw] overflow-hidden">
          <img
            class="w-full h-full object-cover"
            :src="_checkImgUrl(item.video.cover.url_list[0])"
          />
        </div>
        <div class="flex gap-5 p-2.5">
          <div class="text-[18px]">
            <div>@{{ item.author.nickname }}</div>
            <div
              class="mt-2.5 text-[14px] text-[color:var(--second-text-color)] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1]"
            >
              {{ item.desc }}
            </div>
          </div>
          <img class="w-15" src="../assets/img/icon/components/video/douyin-code.jpg" alt="" />
        </div>
      </div>
      <div class="w-[100vw] bg-black rounded-[10px_10px_0_0] text-white">
        <div class="text-[12px] text-center p-3.5">分享到</div>
        <div class="flex mb-4.5 gap-5 pl-5">
          <div @click="_no">
            <img
              class="w-11.25 h-11.25 rounded-[50%] mb-1.25"
              src="../assets/img/icon/components/video/toqq.webp"
              alt=""
            />
            <span class="text-[color:var(--second-text-color)] text-[10px] block text-center"
              >QQ好友</span
            >
          </div>
          <div @click="_no">
            <img
              class="w-11.25 h-11.25 rounded-[50%] mb-1.25"
              src="../assets/img/icon/components/video/tozone.webp"
              alt=""
            />
            <span class="text-[color:var(--second-text-color)] text-[10px] block text-center"
              >QQ空间</span
            >
          </div>
          <div @click="_no">
            <img
              class="w-11.25 h-11.25 rounded-[50%] mb-1.25"
              src="../assets/img/icon/components/video/towechatchat.webp"
              alt=""
            />
            <span class="text-[color:var(--second-text-color)] text-[10px] block text-center"
              >微信好友</span
            >
          </div>
          <div @click="_no">
            <img
              class="w-11.25 h-11.25 rounded-[50%] mb-1.25"
              src="../assets/img/icon/components/video/towechat.webp"
              alt=""
            />
            <span class="text-[color:var(--second-text-color)] text-[10px] block text-center"
              >朋友圈</span
            >
          </div>
          <div @click="_no">
            <img
              class="w-11.25 h-11.25 rounded-[50%] mb-1.25"
              src="../assets/img/icon/components/video/todownload.webp"
              alt=""
            />
            <span class="text-[color:var(--second-text-color)] text-[10px] block text-center"
              >保存到相册</span
            >
          </div>
        </div>
        <div
          class="text-[16px] bg-[#262626] text-[rgba(255,_255,_255,_0.8)] text-center p-3.75"
          @click="cancel"
        >
          取消
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { _checkImgUrl, _no } from '@/utils'

export default {
  name: 'DouyinCode',
  props: {
    item: {},
    modelValue: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    _no,
    _checkImgUrl,
    cancel() {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

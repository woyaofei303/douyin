<template>
  <from-bottom-dialog
    :page-id="pageId"
    :modelValue="modelValue"
    @update:modelValue="(e) => $emit('update:modelValue', e)"
    @cancel="closeShare"
    :show-heng-gang="false"
    :touch-moved="false"
    maskMode="light"
    height="320rem"
    mode="dark"
  >
    <div
      class="w-full h-full bg-[var(--color-share-bg)] rounded-[10px_10px_0_0] text-white box-border flex flex-col"
    >
      <div class="text-[14px] pt-2.5 pb-7.5 relative flex items-center justify-between px-5">
        <span>分享给朋友</span>
        <dy-back
          class="w-3.5! h-3.5 rounded-[50%] bg-[var(--second-btn-color-tran)] p-1.5"
          mode="light"
          img="close"
          direction="right"
          @click.stop="closeShare"
        ></dy-back>
      </div>
      <div class="flex-[1] flex flex-col gap-2.5">
        <div class="overflow-x-scroll flex gap-5.5 px-5 py-0">
          <div
            class="w-14.5 relative text-[10px] flex flex-col items-center"
            :key="i"
            v-for="(item, i) in store.friends.all"
            @click.stop="toggleCall(item)"
          >
            <img
              :class="['', item.select ? 'opacity-50' : '']"
              class="w-14.5 h-14.5 rounded-[50%]"
              :src="_checkImgUrl(item.avatar)"
              alt=""
            />
            <span class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis">{{
              item.name
            }}</span>
            <img
              class="absolute top-[56.5px] -right-0.5 w-5 h-5 rounded-[50%]"
              v-if="item.select"
              src="../assets/img/icon/components/check/check-red-share.png"
            />
          </div>
          <div
            class="w-14.5 relative text-[10px] flex flex-col items-center"
            @click.stop="closeShare($router.push('/message/share-to-friend'))"
          >
            <dy-back
              class="rounded-[50%] bg-[#333333] p-4.75"
              mode="light"
              direction="right"
            ></dy-back>
            <span class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
              >更多朋友</span
            >
          </div>
        </div>
        <div class="flex-[1] flex justify-center items-center">
          <div
            class="pt-0 pb-5 box-border w-full h-full flex flex-col justify-between px-5"
            v-if="store.selectFriends.length"
          >
            <div class="h-0.25 bg-[var(--line-color2)] w-full"></div>
            <div class="flex flex-[1] mt-3.75">
              <textarea
                class="flex-[1] text-[14px] [outline:none] bg-transparent text-[#fff] border-[0] border-current border-none"
                v-model="store.message"
                placeholder="有什么想和好友说的..."
              ></textarea>
              <img
                class="ml-5 h-15 w-15 object-cover rounded-[4px]"
                src="../assets/img/poster/1.jpg"
                alt=""
              />
            </div>
            <div class="flex gap-2.5 items-center justify-between">
              <dy-button
                class="flex-[1]!"
                type="dark2"
                radius="7"
                v-if="store.selectFriends.length > 1"
                @click="_no"
                >建群并发送
              </dy-button>
              <dy-button class="flex-[1]!" type="primary" radius="7" @click="shared"
                >{{ store.selectFriends.length > 1 ? '分别发送' : '发送' }}
              </dy-button>
            </div>
          </div>

          <div class="overflow-x-scroll flex gap-5.5 px-5 py-0" v-else>
            <template v-if="mode === 'video'">
              <div
                class="w-14.5 relative text-[10px] flex flex-col items-center"
                @click.stop="closeShare($emit('ShareToFriend'))"
              >
                <img
                  class="w-14.5 h-14.5 rounded-[50%]"
                  src="../assets/img/icon/components/video/torichang.png"
                  alt=""
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >转发</span
                >
              </div>
              <div
                class="w-14.5 relative text-[10px] flex flex-col items-center"
                @click.stop="closeShare($emit('ShareToFriend'))"
              >
                <Icon
                  class="w-[unset] rounded-[50%] bg-[#333333] text-[26px] text-[#cdcdcd] p-4"
                  icon="icon-park-solid:good-two"
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >推荐给朋友</span
                >
              </div>
              <div
                class="w-14.5 relative text-[10px] flex flex-col items-center"
                @click.stop="copyLink"
              >
                <Icon
                  class="w-[unset] rounded-[50%] bg-[#333333] text-[26px] text-[#cdcdcd] p-4"
                  icon="humbleicons:link"
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >复制链接</span
                >
              </div>
              <div class="w-14.5 relative text-[10px] flex flex-col items-center" @click.stop="_no">
                <img
                  class="w-7.5 h-7.5 rounded-[50%] bg-[#333333] p-3.5"
                  src="../assets/img/icon/components/video/comeonplay.png"
                  alt=""
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >合拍</span
                >
              </div>
              <div class="w-14.5 relative text-[10px] flex flex-col items-center" @click.stop="_no">
                <img
                  class="w-7.5 h-7.5 rounded-[50%] bg-[#333333] p-3.5"
                  src="../assets/img/icon/components/video/dou.webp"
                  alt=""
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >帮上热门</span
                >
              </div>
              <div
                class="w-14.5 relative text-[10px] flex flex-col items-center"
                @click.stop="$router.push('/home/report', { mode: this.mode })"
              >
                <img
                  class="w-7.5 h-7.5 rounded-[50%] bg-[#333333] p-3.5"
                  src="../assets/img/icon/components/video/warring.png"
                  alt=""
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >举报</span
                >
              </div>
              <div
                class="w-14.5 relative text-[10px] flex flex-col items-center"
                @click.stop="closeShare($emit('ShareToFriend'))"
              >
                <Icon
                  class="w-[unset] rounded-[50%] bg-[#333333] text-[26px] text-[#cdcdcd] p-4"
                  icon="ion:paper-plane"
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >私信朋友</span
                >
              </div>
              <div
                class="w-14.5 relative text-[10px] flex flex-col items-center"
                v-if="canDownload"
                @click.stop="closeShare($emit('download'))"
              >
                <Icon
                  class="w-[unset] rounded-[50%] bg-[#333333] text-[26px] text-[#cdcdcd] p-4"
                  icon="mingcute:download-fill"
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >保存本地</span
                >
              </div>
              <div class="w-14.5 relative text-[10px] flex flex-col items-center" @click.stop="_no">
                <!--TODO icon不对            -->
                <img
                  class="w-7.5 h-7.5 rounded-[50%] bg-[#333333] p-3.5"
                  src="../assets/img/icon/components/video/feedback.webp"
                  alt=""
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >建群分享</span
                >
              </div>
              <div class="w-14.5 relative text-[10px] flex flex-col items-center" @click.stop="_no">
                <img
                  class="w-7.5 h-7.5 rounded-[50%] bg-[#333333] p-3.5"
                  src="../assets/img/icon/components/video/comeonlook.webp"
                  alt=""
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >一起看视频</span
                >
              </div>
              <div
                class="w-14.5 relative text-[10px] flex flex-col items-center"
                @click.stop="closeShare($emit('dislike'))"
              >
                <img
                  class="w-7.5 h-7.5 rounded-[50%] bg-[#333333] p-3.5"
                  src="../assets/img/icon/components/video/dislike.png"
                  alt=""
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >不感兴趣</span
                >
              </div>
              <div
                class="w-14.5 relative text-[10px] flex flex-col items-center"
                @click.stop="closeShare($emit('showDouyinCode'))"
              >
                <Icon
                  class="w-[unset] rounded-[50%] bg-[#333333] text-[26px] text-[#cdcdcd] p-4"
                  icon="tabler:photo"
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >生成图片</span
                >
              </div>
              <div class="w-14.5 relative text-[10px] flex flex-col items-center" @click.stop="_no">
                <img
                  class="w-7.5 h-7.5 rounded-[50%] bg-[#333333] p-3.5"
                  src="../assets/img/icon/components/video/bizhi.webp"
                  alt=""
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >动态壁纸</span
                >
              </div>
              <div
                class="w-14.5 relative text-[10px] flex flex-col items-center"
                @click.stop="closeShare($emit('play-feedback'))"
              >
                <img
                  class="w-7.5 h-7.5 rounded-[50%] bg-[#333333] p-3.5"
                  src="../assets/img/icon/components/video/feedback.webp"
                  alt=""
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >播放反馈</span
                >
              </div>
            </template>
            <template v-if="mode === 'music'">
              <div
                class="w-14.5 relative text-[10px] flex flex-col items-center"
                @click.stop="closeShare($emit('ShareToFriend'))"
              >
                <img
                  class="w-7.5 h-7.5 rounded-[50%] bg-[#333333] p-3.5"
                  src="../assets/img/icon/components/video/tofriend.webp"
                  alt=""
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >私信朋友</span
                >
              </div>
              <div
                class="w-14.5 relative text-[10px] flex flex-col items-center"
                @click.stop="$router.push('/home/report', { mode: this.mode })"
              >
                <img
                  class="w-7.5 h-7.5 rounded-[50%] bg-[#333333] p-3.5"
                  src="../assets/img/icon/components/video/warring.png"
                  alt=""
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >举报音乐</span
                >
              </div>
            </template>
            <template v-if="mode === 'my-music'">
              <div class="w-14.5 relative text-[10px] flex flex-col items-center" @click.stop="_no">
                <img
                  class="w-7.5 h-7.5 rounded-[50%] bg-[#333333] p-3.5"
                  src="../assets/img/icon/components/video/torichang.png"
                  alt=""
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >转发到日常</span
                >
              </div>
              <div
                class="w-14.5 relative text-[10px] flex flex-col items-center"
                @click.stop="closeShare($emit('ShareToFriend'))"
              >
                <img
                  class="w-7.5 h-7.5 rounded-[50%] bg-[#333333] p-3.5"
                  src="../assets/img/icon/components/video/tofriend.webp"
                  alt=""
                />
                <span
                  class="mt-2 text-center w-14.5 whitespace-nowrap overflow-hidden text-ellipsis"
                  >私信朋友</span
                >
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </from-bottom-dialog>
</template>

<script setup>
import FromBottomDialog from './dialog/FromBottomDialog'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _copy, _hideLoading, _no, _notice, _showLoading, _sleep } from '@/utils'

defineOptions({
  name: 'Share'
})

const props = defineProps({
  modelValue: {
    type: Boolean,
    default() {
      return false
    }
  },
  item: {},
  videoId: {
    type: String,
    default() {
      return null
    }
  },
  pageId: {
    type: String,
    default() {
      return 'home-index'
    }
  },
  canDownload: {
    type: Boolean,
    default() {
      return true
    }
  },
  mode: {
    type: String,
    default() {
      return 'video'
      //music
      //qrcode
    }
  }
})

const store = useBaseStore()
const emit = defineEmits(['update:item'])

async function copyLink() {
  closeShare()
  _showLoading()
  await _sleep(500)
  _hideLoading()
  _copy(props.item.share_info.share_link_desc + props.item.share_info.share_url)
  //TODO 抖音样式改了
  _notice('复制成功')
}

function toggleCall(item) {
  item.select = !item.select
}

function closeShare() {
  store.friends.all = store.friends.all.map((v) => {
    v.select = false
    return v
  })
  emit('update:modelValue', false)
}
function shared() {
  _notice('分享成功！')
  store.message = ''
  closeShare()
}
</script>

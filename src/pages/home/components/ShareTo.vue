<template>
  <from-bottom-dialog
    page-id="home-index"
    v-model="showShareDialog"
    @cancel="cancel"
    maskMode="light"
    height="50vh"
    mode="white"
  >
    <div>
      <div class="px-3.75 py-0">
        <dy-button class="mb-2.5!" v-if="downloading" :border="false" :progress="progress">
          <img
            class="h-5.5 mr-1.25"
            src="../../../assets/img/icon/components/video/download-gray.png"
            alt=""
          />
          <span class="text-[color:var(--second-text-color)]">下载中 9.2MB/{{ progress }}%</span>
        </dy-button>

        <template v-if="canDownload">
          <dy-button type="green" v-if="showShare2WeChatZone" @click="_no">
            <template v-slot:prefix>
              <img
                class="h-5.5 mr-1.25"
                src="../../../assets/img/icon/components/video/wechatzone-white.webp"
                alt=""
              />
            </template>
            发送视频到朋友圈
          </dy-button>
          <dy-button type="green" v-if="showShare2WeChat" @click="_no">
            <template v-slot:prefix>
              <img
                class="h-5.5 mr-1.25"
                src="../../../assets/img/icon/components/video/wechat-white.webp"
                alt=""
              />
            </template>
            发送视频到微信
          </dy-button>
          <dy-button type="qqzone" v-if="showShare2QQZone" @click="_no">
            <template v-slot:prefix>
              <img
                class="h-5.5 mr-1.25"
                src="../../../assets/img/icon/components/video/qqzone-white.png"
                alt=""
              />
            </template>
            发送视频到QQ空间
          </dy-button>
          <dy-button type="qq" v-if="showShare2QQ" @click="_no">
            <template v-slot:prefix>
              <img
                class="h-5.5 mr-1.25"
                src="../../../assets/img/icon/components/video/qq-white.webp"
                alt=""
              />
            </template>
            发送视频到QQ
          </dy-button>
          <dy-button type="webo" v-if="showShare2Webo" @click="_no">
            <template v-slot:prefix>
              <img
                class="h-5.5 mr-1.25"
                src="../../../assets/img/icon/components/video/webo-white.webp"
                alt=""
              />
            </template>
            发送视频到微博
          </dy-button>
          <dy-button class="mt-2.5!" v-if="!showDownload" type="white" @click="_no"
            >复制口令发给好友
          </dy-button>
        </template>

        <template v-else>
          <dy-button type="green" v-if="showShare2WeChatZone" @click="_no">
            <template v-slot:prefix>
              <img
                class="h-5.5 mr-1.25"
                src="../../../assets/img/icon/components/video/wechatzone-white.webp"
                alt=""
              />
            </template>
            复制口令发给好友
          </dy-button>
          <dy-button type="green" v-if="showShare2WeChat" @click="_no">
            <template v-slot:prefix>
              <img
                class="h-5.5 mr-1.25"
                src="../../../assets/img/icon/components/video/wechat-white.webp"
                alt=""
              />
            </template>
            复制口令发给好友
          </dy-button>
          <dy-button type="qqzone" v-if="showShare2QQZone" @click="_no">
            <template v-slot:prefix>
              <img
                class="h-5.5 mr-1.25"
                src="../../../assets/img/icon/components/video/qqzone-white.png"
                alt=""
              />
            </template>
            复制口令发给好友
          </dy-button>
          <dy-button type="qq" v-if="showShare2QQ" @click="_no">
            <template v-slot:prefix>
              <img
                class="h-5.5 mr-1.25"
                src="../../../assets/img/icon/components/video/qq-white.webp"
                alt=""
              />
            </template>
            复制口令发给好友
          </dy-button>
          <dy-button type="webo" v-if="showShare2Webo" @click="_no">
            <template v-slot:prefix>
              <img
                class="h-5.5 mr-1.25"
                src="../../../assets/img/icon/components/video/webo-white.webp"
                alt=""
              />
            </template>
            复制口令发给好友
          </dy-button>
        </template>

        <template v-if="showDownload">
          <dy-button type="primary" @click="_no">
            已保存，请去相册查看
            <dy-back class="h-5.5 mr-1.25" scale="0.7" mode="light" direction="right"></dy-back>
          </dy-button>

          <dy-button class="mt-2.5!" type="white" @click="_no">
            <img
              class="h-5.5 mr-1.25"
              src="../../../assets/img/icon/components/video/wechat.webp"
              alt=""
            />
            发送视频到微信
          </dy-button>
        </template>
      </div>
      <div
        class="text-black mt-2.5 mb-0 w-[calc(100%_-_20px)] bg-white rounded-[6px_6px_0_0] mx-2.5"
      >
        <div
          class="box-border w-full flex items-center border-b-[1px] [border-bottom-style:solid] border-b-[#efefef] p-2"
          :key="i"
          v-for="(item, i) in localFriends.all"
          @click="share(item)"
        >
          <img class="rounded-[50%] w-9.5 h-9.5" :src="_checkImgUrl(item.avatar)" alt="" />
          <div class="mr-1.25 ml-3.75 text-[14px] w-full flex items-center justify-between my-0">
            <span>{{ item.name }}</span>
            <div
              class="text-[13px] text-white h-6.25 w-15 flex items-center justify-center bg-[var(--primary-btn-color)] rounded-[2px]"
              v-if="!item.select"
            >
              分享
            </div>
            <div
              class="text-[13px] text-[color:var(--second-text-color)] h-6.25 w-15 flex items-center justify-center bg-[lightgray] rounded-[2px]"
              v-else
            >
              已私信
            </div>
          </div>
        </div>
        <div
          class="box-border h-13.75 w-full flex items-center border-b-[1px] [border-bottom-style:solid] border-b-[#efefef] text-[14px] mb-3.75"
          @click="cancel($router.push('/message/share-to-friend'))"
        >
          <img
            class="rounded-[50%] w-5 h-5 mr-5.5 ml-3.75 my-0"
            src="../../../assets/img/icon/components/video/more-dark.png"
          />
          <div>
            <span>更多好友</span>
          </div>
        </div>
      </div>
    </div>
  </from-bottom-dialog>
</template>
<script>
import FromBottomDialog from '../../../components/dialog/FromBottomDialog'
import { mapState } from 'pinia'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _no, _notice, _storageGet, _storageSet, cloneDeep } from '@/utils'
/*
 * 分享到各种工具
 * */
export default {
  name: 'ShareTo',
  components: {
    FromBottomDialog
  },
  props: {
    type: {
      type: Number,
      default: -1
    },
    videoId: {
      type: String,
      default: null
    },
    canDownload: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    type(newVal) {
      this.change(newVal)
    },
    showShareDialog() {
      this.localFriends = cloneDeep(this.friends)
    }
  },
  data() {
    return {
      progress: 0,
      downloading: false,

      showShareDialog: false,
      showDownload: false,
      showShare2WeChatZone: false,
      showShare2WeChat: false,
      showShare2QQZone: false,
      showShare2QQ: false,
      showShare2Webo: false,
      localFriends: []
    }
  },
  computed: {
    ...mapState(useBaseStore, ['friends'])
  },
  created() {},
  methods: {
    _checkImgUrl,
    _no,
    async change(newVal) {
      if (newVal === -1) return
      this.showShareDialog = true
      if (this.canDownload) {
        let downloadedVideo = _storageGet('downloadedVideo', [])
        if (!downloadedVideo.find((v) => v === this.videoId) && !this.downloading) {
          await this.downloadVideo()
        }
      }
      switch (newVal) {
        case 2:
          return (this.showShare2WeChatZone = true)
        case 3:
          return (this.showShare2WeChat = true)
        case 4:
          return (this.showShare2QQZone = true)
        case 5:
          return (this.showShare2QQ = true)
        case 8:
          return (this.showShare2Webo = true)
        case 9:
          return (this.showDownload = true)
      }
    },
    cancel() {
      this.showShareDialog = false
      this.showDownload = false
      this.showShare2WeChatZone = false
      this.showShare2WeChat = false
      this.showShare2QQZone = false
      this.showShare2QQ = false
      this.showShare2Webo = false
      this.$emit('update:type', -1)
    },
    downloadVideo() {
      return new Promise((resolve) => {
        this.progress = 0
        this.downloading = true
        let time = setInterval(() => {
          if (this.progress >= 100) {
            let downloadedVideo = _storageGet('downloadedVideo', [])
            downloadedVideo.push(this.videoId)
            _storageSet('downloadedVideo', downloadedVideo)
            clearInterval(time)
            this.downloading = false
            resolve()
          } else {
            this.progress++
          }
        }, 5)
      })
    },
    share(item) {
      if (item.select) {
        _notice('已分享给朋友')
      }
      item.select = true
    }
  }
}
</script>

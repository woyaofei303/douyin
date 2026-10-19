<template>
  <from-bottom-dialog
    :page-id="pageId"
    :modelValue="modelValue"
    @update:modelValue="(e) => $emit('update:modelValue', e)"
    @cancel="closeShare1"
    :touch-moved="false"
    maskMode="light"
    height="60vh"
    mode="light"
  >
    <div class="h-[60vh] w-full rounded-[10px_10px_0_0] text-white box-border">
      <div class="overflow-x-scroll flex pr-7.5">
        <to-share
          item-type="weChat"
          :need-down="true"
          :can-download="canDownload"
          @copy="copyLink"
          @click="closeShare"
        />
        <to-share
          item-type="weChatZone"
          :need-down="true"
          :can-download="canDownload"
          @copy="copyLink"
          @click="closeShare"
        />
        <to-share
          item-type="qq"
          :need-down="true"
          :can-download="canDownload"
          @copy="copyLink"
          @click="closeShare"
        />
        <to-share
          item-type="download"
          :need-down="true"
          :can-download="canDownload"
          @click="closeShare()"
        />
        <to-share item-type="report" @click="$router.push('/home/report', { mode: this.mode })" />
        <to-share item-type="copyPassword" @click="copyLink" />
        <to-share :item-type="isCollect ? 'collectYellow' : 'collect'" @click="toggleCollect" />
        <to-share item-type="comeon" @click="_no" />
        <to-share item-type="dou" @click="_no" />
        <to-share item-type="copyLink" @click="copyLink" />
        <template v-if="isShowMore">
          <to-share item-type="duoshan" @click="isShowMore = true" />
          <to-share item-type="totoutiao" @click="isShowMore = true" />
        </template>
        <to-share v-else item-type="share" @click="isShowMore = true" />
        <to-share item-type="dislike" @click="isShowMore = true" />
        <to-share item-type="bizhi" @click="_no" />
        <to-share item-type="code" @click="_no" />
      </div>
      <div class="rounded-[10px] text-[14px] bg-white m-2.5 px-[var(--page-padding)] py-0">
        <div
          class="h-13.75 text-black flex items-center border-b-[1px] [border-bottom-style:solid] border-b-[#f3f3f3]"
          :key="i"
          v-for="(item, i) in friends.all"
        >
          <img
            class="w-9.5 h-9.5 rounded-[50%] mr-3.75"
            v-lazy="_checkImgUrl(item.avatar)"
            alt=""
          />
          <div class="text-[14px] flex-[1] flex items-center justify-between">
            <span>{{ item.name }}</span>
            <dy-button
              size="small"
              :type="item.shared ? 'dark' : 'primary'"
              @click="item.shared = true"
            >
              {{ item.shared ? '已' : '' }}分享
            </dy-button>
          </div>
        </div>
        <div
          class="h-13.75 text-black bg-white flex items-center border-b-[1px] [border-bottom-style:solid] border-b-[#f3f3f3]"
          @click="closeShare($router.push('/message/share-to-friend'))"
        >
          <img
            class="w-5 h-5 rounded-[50%] ml-2.5 mr-5"
            src="../../../assets/img/icon/components/video/more-dark.png"
          />
          <span>更多朋友</span>
        </div>
      </div>
    </div>
  </from-bottom-dialog>
</template>

<script lang="jsx">
import { mapState } from 'pinia'
import FromBottomDialog from '../../../components/dialog/FromBottomDialog'
import LoadingCircle from './LoadingCircle'
import { useBaseStore } from '@/store/pinia'
import {
  _checkImgUrl,
  _hideLoading,
  _no,
  _notice,
  _showLoading,
  _sleep,
  _stopPropagation
} from '@/utils'
// import DouyinCode from "./DouyinCode";

export default {
  name: 'Share',
  components: {
    FromBottomDialog,
    // DouyinCode,
    ToShare: {
      components: {
        LoadingCircle
      },
      props: {
        itemType: {
          type: String,
          default: 'weChat'
        },
        needDown: {
          type: Boolean,
          default: false
        },
        canDownload: {
          type: Boolean,
          default: true
        }
      },
      data() {
        return {
          progress: 0,
          loading: false,
          text: {
            weChat: '微信',
            weChatZone: '朋友圈',
            qq: 'QQ',
            download: '保存本地',
            report: '举报',
            copyPassword: '复制口令',
            copyLink: '复制链接',
            collect: '收藏',
            collectYellow: '取消收藏',
            comeon: '一起看',
            dou: '帮上热门',
            share: '更多分享',
            duoshan: '多闪',
            totoutiao: '今日头条',
            dislike: '不感兴趣',
            bizhi: '动态壁纸',
            code: '抖音码'
          }
        }
      },
      computed: {
        styleCanDownload() {
          if (!this.canDownload) {
            return this.itemType !== 'download'
          }
          return true
        }
      },
      methods: {
        displayText() {
          if (this.loading) {
            return this.progress !== 100 ? '下载中' : this.text[this.itemType]
          }
          return this.text[this.itemType]
        },
        click(e) {
          if (!this.canDownload) {
            if (this.itemType === 'download') {
              _stopPropagation(e)
            } else {
              _notice('作者已关闭下载功能')
              this.$emit('copy')
            }
            return
          }
          if (this.needDown) _stopPropagation(e)
          else return
          if (this.progress === 100) {
            _notice('未实现分享跳转到其他App')
          } else {
            this.loading = true
            let interval = setInterval(() => {
              if (this.progress < 100) {
                this.progress++
              } else {
                clearInterval(interval)
                this.loading = false
                this.$emit('click')
                this.$emit('click')
                _notice('未实现分享跳转到其他App')
              }
            }, 10)
          }
        }
      },
      render() {
        return (
          <div
            class="data-[download-available=false]:opacity-50 ml-3.75 mb-3.75"
            onClick={this.click}
            data-download-available={this.styleCanDownload}
          >
            <div class="box-border bg-white w-14.5 h-14.5 rounded-[15px] flex items-center justify-center p-3">
              {this.loading ? (
                <div class="w-[80%] h-[80%]">
                  <LoadingCircle v-model={this.progress} />
                </div>
              ) : (
                <img
                  class="w-full"
                  src={`/src/assets/img/icon/components/share/${this.itemType}.png`}
                  alt=""
                />
              )}
            </div>
            <span class="mt-1.75 text-black text-[10px] block text-center">
              {this.displayText()}
            </span>
          </div>
        )
      }
    }
  },
  props: {
    modelValue: {
      type: Boolean,
      default() {
        return false
      }
    },
    videoId: {
      type: String,
      default: null
    },
    pageId: {
      type: String,
      default: 'home-index'
    },
    canDownload: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(useBaseStore, ['friends'])
  },
  watch: {
    modelValue(newVal) {
      if (!newVal) {
        this.loading = {
          weChat: false,
          weChatZone: false
        }
        this.progress = 0
        this.isShowMore = false
      }
    }
  },
  data() {
    return {
      isCollect: false,
      isShowMore: false,
      loading: {
        weChat: false,
        weChatZone: false
      },
      text: {
        weChat: '微信',
        weChatZone: '朋友圈'
      },
      progress: 0
    }
  },
  methods: {
    _checkImgUrl,
    _no,
    displayText(type) {
      if (this.loading[type]) {
        return this.progress !== 100 ? '下载中' : this.text[type]
      }
      return this.text[type]
    },
    async copyLink() {
      this.closeShare()
      _showLoading()
      await _sleep(500)
      _hideLoading()
      _notice('复制成功')
    },
    toggleCollect() {
      this.closeShare()
      if (this.isCollect) {
        _notice('取消收藏成功')
      } else {
        _notice('收藏成功')
      }
      this.isCollect = !this.isCollect
    },
    toggleCall(item) {
      item.select = !item.select
    },
    closeShare() {
      this.$emit('update:modelValue', false)
    },
    closeShare1() {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

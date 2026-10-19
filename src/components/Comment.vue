<template>
  <from-bottom-dialog
    :page-id="pageId"
    :modelValue="modelValue"
    @update:modelValue="(e) => $emit('update:modelValue', e)"
    @cancel="cancel"
    :show-heng-gang="false"
    maskMode="light"
    :height="height"
    tag="comment"
    mode="white"
  >
    <template v-slot:header>
      <div
        class="box-border w-full h-10 bg-white flex items-center justify-between rounded-[10px_10px_0_0] px-3.75 py-0"
      >
        <dy-back class="opacity-0" mode="dark" img="close" direction="right" />
        <div class="w-full absolute text-[12px] font-bold text-center">
          {{ _formatNumber(comments.length) }}条评论
        </div>
        <div class="flex gap-3 relative z-9">
          <Icon
            class="text-[#000] bg-[#f2f2f2] text-[16px] rounded-[50%] p-1"
            icon="prime:arrow-up-right-and-arrow-down-left-from-center"
            @click.stop="_no"
          />
          <Icon
            class="text-[#000] bg-[#f2f2f2] text-[16px] rounded-[50%] p-1"
            icon="ic:round-close"
            v-click="cancel"
          />
        </div>
      </div>
    </template>
    <div class="text-[#000] w-full bg-[#fff] z-5">
      <div class="w-full relative pb-15" v-if="comments.length">
        <div class="w-full">
          <div class="w-full mb-3.75" :key="i" v-for="(item, i) in comments">
            <!--            v-longpress="(e) => showOptions(item)"-->
            <div class="w-full flex px-0 py-1.25 active:bg-[#53535321]">
              <div class="w-full flex text-[14px]">
                <img
                  class="ml-3.75 mr-2.5 w-9.25 h-9.25 rounded-[50%]"
                  :src="_checkImgUrl(item.avatar)"
                  alt=""
                />
                <div class="flex-[1] mr-5">
                  <div class="text-[color:var(--second-text-color)] mb-1.25 flex items-center">
                    {{ item.nickname }}
                  </div>
                  <div
                    class="mb-1.25"
                    :class="[item.user_buried ? 'text-[color:var(--second-text-color)]' : '']"
                  >
                    {{ item.user_buried ? '该评论已折叠' : item.content }}
                  </div>
                  <div class="flex items-center justify-between text-[13px]">
                    <div class="flex">
                      <div class="text-[#c4c3c3] mr-2.5">
                        {{ _time(item.create_time)
                        }}{{ item.ip_location && ` · ${item.ip_location}` }}
                      </div>
                      <div class="text-[color:var(--second-text-color)]">回复</div>
                    </div>
                    <div class="flex gap-2.5">
                      <div
                        class="flex items-center"
                        :class="[item.user_digged ? 'text-[#e73a57]' : 'text-[gray]']"
                        @click="loved(item)"
                      >
                        <Icon
                          class="text-[17px] mr-1"
                          icon="icon-park-solid:like"
                          v-show="item.user_digged"
                        />
                        <Icon
                          class="text-[17px] mr-1"
                          icon="icon-park-outline:like"
                          v-show="!item.user_digged"
                        />
                        <span class="[word-break:keep-all]" v-if="item.digg_count">{{
                          _formatNumber(item.digg_count)
                        }}</span>
                      </div>
                      <div
                        class="text-[gray] flex items-center"
                        @click="item.user_buried = !item.user_buried"
                      >
                        <Icon
                          class="text-[17px] mr-1"
                          v-if="item.user_buried"
                          icon="icon-park-solid:dislike-two"
                        />
                        <Icon class="text-[17px] mr-1" v-else icon="icon-park-outline:dislike" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pl-13.75" v-if="Number(item.sub_comment_count)">
              <template v-if="item.showChildren">
                <div
                  class="pr-0 pl-1.25 flex py-1.25 active:bg-[#53535321]"
                  :key="i"
                  v-for="(child, i) in item.children"
                >
                  <!--                 v-longpress="e => showOptions(child)"-->
                  <div class="w-full flex text-[14px]">
                    <img
                      class="mr-2.5 w-5 h-5 rounded-[50%]"
                      :src="_checkImgUrl(child.avatar)"
                      alt=""
                    />
                    <div class="flex-[1] mr-5">
                      <div class="text-[color:var(--second-text-color)] mb-1.25 flex items-center">
                        {{ child.nickname }}
                        <div
                          class="ml-1.25 w-0 h-0 border-t-[5px] border-t-[transparent] border-r-[5px] border-r-[transparent] border-b-[5px] border-b-[transparent] border-l-[6px] border-l-[gray] border-solid"
                          v-if="child.replay"
                        ></div>
                        {{ child.replay }}
                      </div>
                      <div class="mb-1.25">{{ child.content }}</div>
                      <div class="flex items-center justify-between text-[13px]">
                        <div class="flex">
                          <div class="text-[#c4c3c3] mr-2.5">
                            {{ _time(child.create_time)
                            }}{{ child.ip_location && ` · ${item.ip_location}` }}
                          </div>
                          <div class="text-[color:var(--second-text-color)]">回复</div>
                        </div>
                        <div
                          class="flex items-center"
                          :class="[child.user_digged ? 'text-[#e73a57]' : 'text-[gray]']"
                          @click="loved(item)"
                        >
                          <Icon
                            class="text-[17px] mr-1"
                            icon="icon-park-solid:like"
                            v-show="child.user_digged"
                          />
                          <Icon
                            class="text-[17px] mr-1"
                            icon="icon-park-outline:like"
                            v-show="!child.user_digged"
                          />
                          <span class="[word-break:keep-all]">{{
                            _formatNumber(child.digg_count)
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <Loading
                v-if="loadChildren && loadChildrenItemCId === item.comment_id"
                :type="'small'"
                :is-full-screen="false"
              />
              <div
                class="text-[13px] flex items-center text-[gray] m-1.25"
                v-else
                @click="handShowChildren(item)"
              >
                <div class="bg-[#d5d5d5] w-5 mr-2.5 h-0.25"></div>
                <span class="mr-1.25"
                  >展开{{ item.showChildren ? '更多' : `${item.sub_comment_count}条` }}回复</span
                >
                <Icon class="text-[10px]" icon="ep:arrow-down-bold" />
              </div>
            </div>
          </div>
        </div>
        <no-more />
      </div>
      <Loading class="absolute!" v-else />
      <transition
        enter-from-class="opacity-0"
        enter-active-class="[transition:opacity_0.3s_ease]"
        enter-to-class=""
        leave-from-class=""
        leave-active-class="[transition:opacity_0.3s_ease]"
        leave-to-class="opacity-0"
        move-class=""
      >
        <BaseMask v-if="isCall" mode="lightgray" @click="isCall = false" />
      </transition>
      <div class="rounded-[10px_10px_0_0] bg-white fixed w-full bottom-0 z-3">
        <transition
          enter-from-class="opacity-0"
          enter-active-class="[transition:opacity_0.3s_ease]"
          enter-to-class=""
          leave-from-class=""
          leave-active-class="[transition:opacity_0.3s_ease]"
          leave-to-class="opacity-0"
          move-class=""
        >
          <div class="pt-7.5 overflow-x-scroll flex pr-4.5" v-if="isCall">
            <div
              class="w-12 relative ml-4.5 mb-4.5 text-[10px] flex flex-col items-center"
              :key="i"
              v-for="(item, i) in friends.all"
              @click="toggleCall(item)"
            >
              <img
                :class="['', item.select ? 'opacity-50' : '']"
                class="w-12 h-12 rounded-[50%]"
                :src="_checkImgUrl(item.avatar)"
                alt=""
              />
              <span
                class="mt-1.25 text-center w-12 whitespace-nowrap overflow-hidden text-ellipsis"
                >{{ item.name }}</span
              >
              <img
                class="absolute top-[46.5px] -right-0.5 w-5 h-5 rounded-[50%]"
                v-if="item.select"
                src="../assets/img/icon/components/check/check-red-share.png"
              />
            </div>
          </div>
        </transition>

        <div
          class="flex items-center border-t-[1px] [border-top-style:solid] border-t-[#e2e1e1] px-3.75 py-2.5"
        >
          <div
            class="flex-[1] flex items-center justify-between box-border bg-[#eee] rounded-[20px] px-2.5 py-1.25"
          >
            <AutoInput
              class="w-[calc(100%_-_160px)]!"
              v-model="comment"
              placeholder="善语结善缘，恶言伤人心"
            ></AutoInput>
            <div class="flex items-center">
              <img
                class="w-6.25 h-6.25 rounded-[50%] ml-3.75"
                src="../assets/img/icon/message/call.png"
                @click="isCall = !isCall"
              />
              <img
                class="w-6.25 h-6.25 rounded-[50%] ml-3.75"
                src="../assets/img/icon/message/emoji-black.png"
                @click="_no"
              />
            </div>
          </div>
          <img
            class="w-6.25 h-6.25 rounded-[50%] ml-3.75"
            v-if="comment"
            src="../assets/img/icon/message/up.png"
            @click="send"
          />
        </div>
      </div>
      <ConfirmDialog title="私信给" ok-text="发送" v-model:visible="showPrivateChat">
        <Search mode="light" v-model="test" :isShowSearchIcon="false" />
      </ConfirmDialog>
    </div>
  </from-bottom-dialog>
</template>

<script lang="ts">
import AutoInput from './AutoInput.vue'
import ConfirmDialog from './dialog/ConfirmDialog.vue'
import { mapState } from 'pinia'
import FromBottomDialog from './dialog/FromBottomDialog.vue'
import Loading from './Loading.vue'
import Search from './Search.vue'
import {
  _checkImgUrl,
  _formatNumber,
  _no,
  _showSelectDialog,
  _sleep,
  _time,
  sampleSize
} from '@/utils'
import { useBaseStore } from '@/store/pinia'
import { videoComments } from '@/api/videos'

export default {
  name: 'Comment',
  components: {
    AutoInput,
    ConfirmDialog,
    FromBottomDialog,
    Loading,
    Search
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
    height: {
      type: String,
      default: 'calc(var(--vh, 1vh) * 70)'
    }
  },
  computed: {
    ...mapState(useBaseStore, ['friends'])
  },
  watch: {
    modelValue(newVale) {
      if (newVale) {
        this.getData()
      } else {
        this.comments = []
      }
    }
  },
  data() {
    return {
      comment: '',
      test: '',
      comments: [],
      options: [
        { id: 1, name: '私信回复' },
        { id: 2, name: '复制' },
        { id: 3, name: '搜一搜' },
        { id: 4, name: '举报' }
      ],
      selectRow: {},
      showPrivateChat: false,
      isInput: false,
      isCall: false,
      loadChildren: false,
      loadChildrenItemCId: -1
    }
  },
  mounted() {},
  methods: {
    _no,
    _time,
    _formatNumber,
    _checkImgUrl,
    // 评论发送成功后调用此方法
    resetSelectStatus() {
      this.friends.all.forEach((item) => {
        item.select = false // 重置选中状态
      })
    },
    async handShowChildren(item) {
      this.loadChildrenItemCId = item.comment_id
      this.loadChildren = true
      await _sleep(500)
      this.loadChildren = false
      if (item.showChildren) {
        item.children = item.children.concat(sampleSize(this.comments, 10))
      } else {
        item.children = sampleSize(this.comments, 3)
        item.showChildren = true
      }
    },
    send() {
      if (!this.comment.trim()) {
        return // 如果评论内容为空，直接返回
      }
      const baseStore = useBaseStore()
      const commentData = {
        ip_location: baseStore.userinfo.ip_location,
        aweme_id: this.videoId,
        content: this.comment,
        create_time: Date.now(),
        uid: String(baseStore.userinfo.uid),
        short_id: String(baseStore.userinfo.short_id),
        unique_id: baseStore.userinfo.unique_id,
        signature: baseStore.userinfo.signature,
        nickname: baseStore.userinfo.nickname,
        avatar: baseStore.userinfo.avatar_168x168['url_list'][0]
        // 其他必要的字段可以根据你的需求添加
      }
      // this.$props.item.statistics.comment_count++
      // _updateItem(this.$props, 'isLoved', !props.item.isLoved)
      this.comments.unshift(commentData)
      this.comment = ''
      this.isCall = false
      this.resetSelectStatus()
    },
    async getData() {
      let res: any = await videoComments({ id: this.videoId })
      if (res.success) {
        res.data.map((v) => {
          v.showChildren = false
          v.digg_count = Number(v.digg_count)
        })
        this.comments = res.data
      }
    },
    cancel() {
      this.$emit('update:modelValue', false)
      this.$emit('close')
    },
    toggleCall(item) {
      item.select = !item.select
      let name = item.name
      if (this.comment.includes('@' + name)) {
        this.comment = this.comment.replace(`@${name} `, '')
      } else {
        this.comment += `@${name} `
      }
    },
    loved(row) {
      if (row.isLoved) {
        row.digg_count--
      } else {
        row.digg_count++
      }
      row.user_digged = !row.user_digged
    },
    showOptions(row) {
      _showSelectDialog(this.options, (e) => {
        if (e.id === 1) {
          this.selectRow = row
          this.showPrivateChat = true
        }
      })
    }
  }
}
</script>

<template>
  <from-bottom-dialog
    :page-id="pageId"
    :modelValue="modelValue"
    @update:modelValue="(e) => $emit('update:modelValue', e)"
    @cancel="cancel"
    maskMode="light"
    :height="height"
  >
    <div class="text-white" :style="{ minHeight: height }">
      <div class="pb-10 bg-[var(--main-bg)]" v-show="!showJoinedChat">
        <Search
          class="px-3.75! py-0!"
          :isShowRightText="isShowRightText"
          @click="handleClick"
          @notice="onNotice"
          rightText="取消"
          rightTextColor="gray"
          placeholder="搜索"
          v-model="searchKey"
        />
        <template v-if="searchKey">
          <div class="px-3.75 py-0" v-if="searchResult.length">
            <div
              class="mb-5 flex items-center nth-[1]:mt-2.5"
              :key="i"
              v-for="(item, i) in searchResult"
              @click="handleClick2(item)"
            >
              <img
                class="w-9.5 h-9.5 rounded-[50%] mr-3.75"
                v-lazy="_checkImgUrl(item.avatar)"
                alt=""
              />
              <div class="text-[14px] flex-[1] flex items-center justify-between">
                <div>
                  <span>
                    <span v-if="item.name.indexOf(searchKey) > -1">
                      {{ item.name.substr(0, item.name.indexOf(searchKey))
                      }}<span class="text-[#fc2f56]">{{ searchKey }}</span
                      >{{ item.name.substr(item.name.indexOf(searchKey) + searchKey.length) }}
                    </span>
                    <span v-else>{{ item.name }}</span>
                  </span>
                </div>
                <dy-button
                  class="w-16! h-6.5!"
                  :type="item.shared ? 'dark' : 'primary'"
                  @click="item.shared = true"
                >
                  {{ item.shared ? '已' : '' }}分享
                </dy-button>
              </div>
            </div>
          </div>
          <div class="h-[50vh] flex items-center justify-center flex-col" v-else>
            <div class="text-[16px]">搜索结果为空</div>
            <div class="mt-2.5 text-[14px] text-[color:var(--second-text-color)]">
              没有搜索到相关的联系人
            </div>
          </div>
        </template>
        <template v-else>
          <div
            class="border-b-[1px] [border-bottom-style:solid] border-b-[var(--line-color)] h-12.5 flex items-center px-3.75 py-0"
            @click="showJoinedChat = true"
          >
            <img class="w-5.5 h-5.5 mr-2.5" src="../../../assets/img/icon/people-gray.png" alt="" />
            <div class="text-[14px] flex-[1] flex items-center justify-between">
              <span>已加入的群聊</span>
              <dy-back direction="right" mode="gray" scale=".7" />
            </div>
          </div>
          <div class="px-3.75 py-0">
            <div class="text-[color:var(--second-text-color)] h-15 leading-[60px] text-[13px]">
              所有朋友
            </div>
            <div
              class="mb-5 flex items-center nth-[1]:mt-2.5"
              :key="i"
              v-for="(item, i) in localFriends"
            >
              <img
                class="w-9.5 h-9.5 rounded-[50%] mr-3.75"
                v-lazy="_checkImgUrl(item.avatar)"
                alt=""
              />
              <div class="text-[14px] flex-[1] flex items-center justify-between">
                <span>{{ item.name }}</span>
                <dy-button
                  class="w-16! h-6.5!"
                  :type="item.shared ? 'dark' : 'primary'"
                  @click="item.shared = true"
                >
                  {{ item.shared ? '已' : '' }}分享
                </dy-button>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="bg-[var(--main-bg)]" v-show="showJoinedChat">
        <div class="text-[16px] flex justify-between p-3.75">
          <dy-back @click="showJoinedChat = false" mode="light" scale="1"></dy-back>
          <span>已加入的群聊</span>
          <span>&nbsp;</span>
        </div>

        <div class="px-3.75 py-0">
          <div
            class="mb-5 flex items-center relative overflow-hidden last:mb-0 nth-[1]:mt-2.5"
            :key="i"
            v-for="(item, i) in localFriends"
          >
            <img
              class="w-9.5 h-9.5 rounded-[50%] mr-3.75"
              v-lazy="_checkImgUrl(item.avatar)"
              alt=""
            />
            <div class="text-[14px] flex-[1] flex items-center justify-between">
              <div class="w-[55vw] overflow-hidden box-border flex items-center">
                <div class="whitespace-nowrap text-ellipsis overflow-hidden">{{ text }}</div>
                <div class="ml-1.25 text-[color:var(--second-text-color)]">(3)</div>
              </div>
              <dy-button
                class="w-16! h-6.5!"
                :type="item.shared ? 'dark' : 'primary'"
                @click="item.shared = true"
              >
                {{ item.shared ? '已' : '' }}分享
              </dy-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </from-bottom-dialog>
</template>
<script>
import FromBottomDialog from '../../../components/dialog/FromBottomDialog'
import { mapState } from 'pinia'
import Search from '../../../components/Search'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, cloneDeep } from '@/utils'
/*
分享给朋友
* */
export default {
  name: 'ShareTo',
  components: {
    FromBottomDialog,
    Search
  },
  props: {
    modelValue: {
      type: Boolean,
      default() {
        return false
      }
    },
    pageId: {
      type: String,
      default: 'home-index'
    }
  },
  data() {
    return {
      height: '70vh',
      showJoinedChat: false,
      isShowRightText: false,
      text: 'AAAAAAA、BBBBBBBB、CCCCCCCCCCCCC',
      localFriends: [],
      searchResult: [],
      searchKey: ''
    }
  },
  watch: {
    searchKey(newVal) {
      if (newVal) {
        let temp = cloneDeep(this.localFriends)
        this.searchResult = temp.filter((v) => {
          // return v.name.includes(newVal) || v.account.includes(newVal);
          return v.name.includes(newVal)
        })
      } else {
        this.searchResult = []
      }
    },
    modelValue(newVal) {
      if (newVal) {
        this.localFriends = cloneDeep(this.friends.all)
        this.localFriends.map((v) => (v.shared = false))
      } else {
        this.searchKey = ''
        this.height = '70vh'
        this.isShowRightText = false
        this.showJoinedChat = false
      }
    }
  },
  computed: {
    ...mapState(useBaseStore, ['friends']),
    selectFriends() {
      return this.localFriends.filter((v) => v.shared)
    }
  },
  created() {},
  methods: {
    _checkImgUrl,
    handleClick() {
      this.isShowRightText = true
      this.height = 'calc(var(--vh, 1vh) * 100)'
    },
    handleClick2(item) {
      item.select = !item.select
      this.searchKey = ''
    },
    onNotice() {
      this.isShowRightText = false
      this.searchKey = ''
      this.height = '70vh'
    },
    cancel() {
      this.height = '70vh'
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

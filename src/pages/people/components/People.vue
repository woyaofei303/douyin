<template>
  <div class="[transition:all_0.3s_ease] w-full h-17.5 flex items-center relative">
    <img
      class="float-left mr-3.75 w-11.25 h-11.25 rounded-[50%]"
      :src="_checkImgUrl(people.avatar)"
      alt=""
    />
    <div class="flex-[1] flex justify-between px-0 py-3.75">
      <template v-if="mode === 'normal'">
        <div>
          <div class="text-[14px] mb-0.5 text-[color:var(--person-name-color,white)]">
            {{ people.name }}
          </div>
        </div>
      </template>
      <template v-if="mode === 'normal-add-button'">
        <div>
          <div class="text-[14px] mb-0.5 text-[color:var(--person-name-color,white)]">
            {{ people.name }}
          </div>
        </div>
        <div class="flex items-center">
          <!--   他关注我   -->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_ME">
            <div
              class="ml-2 rounded-[2px] bg-[var(--primary-btn-color)] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('follow')"
            >
              回关
            </div>
          </template>
          <!--   我关注他   -->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_HE">
            <div
              class="ml-2 rounded-[2px] bg-[#3a3a43] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('unfollow')"
            >
              已关注
            </div>
          </template>
          <!--          相互关注-->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_EACH_OTHER">
            <div
              class="ml-2 rounded-[2px] bg-[#3a3a43] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('unfollow')"
            >
              互相关注
            </div>
          </template>
          <!--         关注请求-->
          <template v-if="people.type === RELATE_ENUM.REQUEST_FOLLOW">
            <div
              class="ml-2 rounded-[2px] bg-[#3a3a43] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('ignore')"
            >
              忽略
            </div>
            <div
              class="ml-2 rounded-[2px] bg-[var(--primary-btn-color)] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('agree')"
            >
              通过
            </div>
          </template>
        </div>
      </template>

      <template v-if="mode === 'search'">
        <div>
          <div class="text-[14px] mb-0.5 text-[color:var(--person-name-color,white)]">
            <span v-if="people.name.indexOf(searchKey) > -1"
              >{{ people.name.substr(0, people.name.indexOf(searchKey))
              }}<span class="text-[yellow]">{{ searchKey }}</span
              >{{ people.name.substr(people.name.indexOf(searchKey) + searchKey.length) }}</span
            >
            <span v-else>{{ people.name }}</span>
          </div>
          <div class="text-[12px] mb-0.5 text-[color:var(--person-name-color,white)]">
            抖音id:

            <span v-if="people.account.indexOf(searchKey) > -1"
              >{{ people.account.substr(0, people.account.indexOf(searchKey))
              }}<span class="text-[yellow]">{{ searchKey }}</span
              >{{
                people.account.substr(people.account.indexOf(searchKey) + searchKey.length)
              }}</span
            >
            <span v-else>{{ people.account }}</span>
          </div>
        </div>
      </template>

      <template v-if="mode === 'fans'">
        <div>
          <div class="text-[14px] mb-0.5 text-[color:var(--person-name-color,white)]">
            {{ people.name }}
          </div>
          <div class="text-[14px] mb-0.5 text-[color:var(--person-name-color,white)]">
            <template v-if="people.type === RELATE_ENUM.REQUEST_FOLLOW">
              发来一个关注请求
            </template>
            <template v-else> 关注了你</template>
          </div>
          <div class="text-[color:var(--second-text-color)] text-[12px] mt-1">07-23</div>
        </div>
        <div class="flex items-center">
          <!--   他关注我   -->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_ME">
            <div
              class="ml-2 rounded-[2px] bg-[var(--primary-btn-color)] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('follow')"
            >
              回关
            </div>
          </template>
          <!--   我关注他   -->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_HE">
            <div
              class="ml-2 rounded-[2px] bg-[#3a3a43] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('unfollow')"
            >
              已关注
            </div>
          </template>
          <!--          相互关注-->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_EACH_OTHER">
            <div
              class="ml-2 rounded-[2px] bg-[#3a3a43] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('unfollow')"
            >
              互相关注
            </div>
          </template>
          <!--         关注请求-->
          <template v-if="people.type === RELATE_ENUM.REQUEST_FOLLOW">
            <div
              class="ml-2 rounded-[2px] bg-[#3a3a43] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('ignore')"
            >
              忽略
            </div>
            <div
              class="ml-2 rounded-[2px] bg-[var(--primary-btn-color)] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('agree')"
            >
              通过
            </div>
          </template>
        </div>
      </template>

      <template v-if="mode === 'recommend'">
        <div>
          <div class="text-[14px] mb-0.5 text-[color:var(--person-name-color,white)]">
            {{ people.name }}
          </div>
          <div class="text-[color:var(--second-text-color)] text-[12px] mt-1">可能认识的人</div>
        </div>
        <div class="flex items-center">
          <template v-if="people.type === RELATE_ENUM.RECOMMEND_NO_REMOVE">
            <div
              class="ml-2 rounded-[2px] bg-[var(--primary-btn-color)] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('follow')"
            >
              关注
            </div>
          </template>
          <template v-if="people.type === RELATE_ENUM.RECOMMEND">
            <div
              class="ml-2 rounded-[2px] bg-[#3a3a43] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('remove')"
            >
              移除
            </div>
            <div
              class="ml-2 rounded-[2px] bg-[var(--primary-btn-color)] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('follow')"
            >
              关注
            </div>
          </template>
          <!--   我关注他   -->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_HE">
            <div
              class="ml-2 rounded-[2px] bg-[#3a3a43] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('unfollow')"
            >
              已关注
            </div>
          </template>
        </div>
      </template>

      <template v-if="mode === 'friend'">
        <div>
          <div class="text-[14px] mb-0.5 text-[color:var(--person-name-color,white)]">
            {{ people.name }}
          </div>
          <div class="text-[color:var(--second-text-color)] text-[12px] mt-1">4小时之内在线</div>
        </div>
        <div class="flex items-center">
          <div
            class="ml-2 rounded-[2px] bg-[#3a3a43] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
          >
            发私信
          </div>
          <img
            class="h-4.5 ml-5"
            src="../../../assets/img/icon/menu-white.png"
            alt=""
            @click.stop="showPopover = !showPopover"
          />
        </div>
      </template>

      <template v-if="mode === 'visitor'">
        <div>
          <div class="text-[14px] mb-0.5 text-[color:var(--person-name-color,white)]">
            {{ people.name }}
          </div>
        </div>
        <div class="flex items-center">
          <!--   他关注我   -->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_ME">
            <div
              class="ml-2 rounded-[2px] bg-[var(--primary-btn-color)] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('follow')"
            >
              关注
            </div>
          </template>
          <!--   我关注他   -->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_HE">
            <div
              class="ml-2 rounded-[2px] bg-[#3a3a43] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('unfollow')"
            >
              已关注
            </div>
          </template>
          <!--          相互关注-->
          <template v-if="people.type === RELATE_ENUM.FOLLOW_EACH_OTHER">
            <div
              class="ml-2 rounded-[2px] bg-[#3a3a43] text-[12px] flex items-center justify-center w-14.5 px-0 py-1.25 only:w-17.5"
              @click.stop="$emit('unfollow')"
            >
              互相关注
            </div>
          </template>
        </div>
      </template>
    </div>
    <!--   TODO 点了不消失，内容也变了 -->
    <transition
      enter-from-class="opacity-0"
      enter-active-class="[transition:all_0.3s_ease]"
      enter-to-class=""
      leave-from-class=""
      leave-active-class="[transition:all_0.3s_ease]"
      leave-to-class="opacity-0"
      move-class=""
    >
      <div
        class="z-9 absolute bottom-[-100%] right-2.5 rounded-[8px] bg-[var(--second-btn-color)]"
        v-if="people.type === 4 && showPopover"
      >
        <div
          class="w-0 h-0 border-t-[transparent] border-r-[transparent] border-b-[var(--second-btn-color)] border-l-[transparent] absolute right-2.5 -top-3.5 border-[7px] border-solid"
        ></div>
        <div
          class="text-[14px] pr-10 pl-2.5 flex h-10 items-center border-b-[1px] [border-bottom-style:solid] border-b-[var(--line-color)] py-0 last:border-b-[0] last:[border-bottom-style:none] last:border-b-[currentColor] last:text-[color:var(--primary-btn-color)]"
        >
          <img class="mr-2.5 h-5" src="../../../assets/img/icon/feedback-white.png" alt="" />
          <span>设置备注名</span>
        </div>
        <div
          class="text-[14px] pr-10 pl-2.5 flex h-10 items-center border-b-[1px] [border-bottom-style:solid] border-b-[var(--line-color)] py-0 last:border-b-[0] last:[border-bottom-style:none] last:border-b-[currentColor] last:text-[color:var(--primary-btn-color)]"
        >
          <img class="mr-2.5 h-5" src="../../../assets/img/icon/people-red.png" alt="" />
          <span>从朋友中移除</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { _checkImgUrl } from '@/utils'

export default {
  name: 'People',
  props: {
    people: {
      type: Object,
      default() {
        return {}
      }
    },
    mode: {
      type: String,
      default: 'normal'
    },
    searchKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showPopover: false
    }
  },
  computed: {},
  created() {},
  methods: { _checkImgUrl }
}
</script>

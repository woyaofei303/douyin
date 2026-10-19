<template>
  <div id="Peoples">
    <transition-group
      class="relative"
      :enter-from-class="loading ? '' : 'opacity-0'"
      :enter-active-class="loading ? '' : ''"
      :enter-to-class="loading ? '' : ''"
      :leave-from-class="loading ? '' : ''"
      :leave-active-class="loading ? '' : 'absolute'"
      :leave-to-class="loading ? '' : 'opacity-0'"
      :move-class="loading ? '' : ''"
      tag="div"
    >
      <People
        v-for="(item, index) in localList"
        :key="item.id"
        :people="item"
        @remove="remove(index)"
        @follow="follow(index)"
        @unfollow="unfollow(index)"
        @agree="agree(index)"
        @ignore="ignore(index)"
        :mode="mode"
      />
    </transition-group>
    <from-bottom-dialog
      page-id="Fans"
      v-model="isShowUnfollow"
      mode="white"
      mask-mode="dark"
      :show-heng-gang="false"
    >
      <div class="text-black">
        <div
          class="text-[color:var(--second-text-color)] text-[12px] h-10 flex justify-center items-center"
        >
          确认取消关注?
        </div>
        <div
          class="flex justify-center items-center min-h-12.5 text-[14px] h-12.5 border-t-[1px] [border-top-style:solid] border-t-[#f1f1f1] px-[var(--page-padding)] py-0 last:border-t-[0] last:[border-top-style:none] last:border-t-[currentColor]"
          @click="noLook"
        >
          不看TA
        </div>
        <div
          class="flex justify-center items-center min-h-12.5 text-[14px] h-12.5 border-t-[1px] [border-top-style:solid] border-t-[#f1f1f1] text-[color:var(--primary-btn-color)] px-[var(--page-padding)] py-0 last:border-t-[0] last:[border-top-style:none] last:border-t-[currentColor]"
          @click="confirmUnfollow"
        >
          取消关注
        </div>
        <div class="h-2.5 bg-[whitesmoke]"></div>
        <div
          class="flex justify-center items-center min-h-12.5 text-[14px] h-12.5 border-t-[1px] [border-top-style:solid] border-t-[#f1f1f1] px-[var(--page-padding)] py-0 last:border-t-[0] last:[border-top-style:none] last:border-t-[currentColor]"
          @click="cancel"
        >
          取消
        </div>
      </div>
    </from-bottom-dialog>
  </div>
</template>
<script>
import People from './People'
import FromBottomDialog from '../../../components/dialog/FromBottomDialog'
import { _notice, _showConfirmDialog } from '@/utils'

export default {
  name: 'Peoples',
  components: {
    FromBottomDialog,
    People
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    mode: {
      type: String,
      default: 'fans'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowUnfollow: false,
      currentIndex: -1
    }
  },
  computed: {
    localList: {
      get() {
        return this.list
      },
      set(newVal) {
        this.$emit('update:list', newVal)
      }
    }
  },
  created() {},
  methods: {
    remove(index) {
      _notice('将不会再为你推荐该用户')
      this.localList.splice(index, 1)
    },
    follow(index) {
      if (this.mode === 'visitor') {
        this.localList[index].type = this.RELATE_ENUM.FOLLOW_HE
      }
      if (this.mode === 'recommend') {
        this.localList[index].type = this.RELATE_ENUM.FOLLOW_HE
      }
      if (this.mode === 'fans') {
        if (this.localList[index].type === this.RELATE_ENUM.FOLLOW_ME) {
          this.localList[index].type = this.RELATE_ENUM.FOLLOW_EACH_OTHER
        }
      }
    },
    unfollow(index) {
      if (this.mode === 'visitor') {
        this.localList[index].type = this.RELATE_ENUM.FOLLOW_ME
      }
      if (this.mode === 'recommend') {
        this.localList[index].type = this.RELATE_ENUM.RECOMMEND
      }

      if (this.mode === 'fans') {
        this.isShowUnfollow = true
        this.currentIndex = index
      }
    },
    agree(index) {
      this.localList[index].type = this.RELATE_ENUM.FOLLOW_ME
    },
    ignore(index) {
      this.localList.splice(index, 1)
    },
    confirmUnfollow() {
      this.localList[this.currentIndex].type = this.RELATE_ENUM.FOLLOW_ME
      this.cancel()
    },
    cancel() {
      this.isShowUnfollow = false
      this.currentIndex = -1
    },
    noLook() {
      this.isShowUnfollow = false
      _showConfirmDialog(
        '确认不看 TA?',
        '确认后，将不再为你推荐对方的作品，你可以在对方主页随时恢复。',
        'gray',
        () => {
          _notice('设置成功')
        },
        () => {},
        '不看 TA'
      )
    }
  }
}
</script>

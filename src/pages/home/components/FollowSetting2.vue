<template>
  <from-bottom-dialog
    page-id="home-index"
    :modelValue="modelValue"
    @update:modelValue="(e) => $emit('update:modelValue', e)"
    :show-heng-gang="false"
    maskMode="dark"
    @cancel="cancel()"
    height="330rem"
    mode="light"
  >
    <div class="text-[14px] p-3.75">
      <div class="text-[#515159] text-[14px] relative flex items-start justify-between">
        <div class="flex flex-col">
          <span class="text-[18px]">{{ currentItem.author.nickname }}</span>
          <span class="mt-1.25 text-[color:var(--second-text-color)] text-[13px]"
            >抖音号：{{ _getUserDouyinId(currentItem) }}</span
          >
        </div>
        <dy-back
          class="w-3.5! h-3.5 rounded-[50%] bg-[rgba(187,_187,_194,_0.4)] p-1.5"
          mode="dark"
          img="close"
          direction="right"
          @click="cancel()"
        ></dy-back>
      </div>
      <div class="mt-5">
        <div
          class="h-11.25 bg-white flex items-center justify-between border-b-[1px] [border-bottom-style:solid] border-b-[rgba(222,_222,_222,_0.42)] px-5 py-0 nth-[1]:rounded-[10px_10px_0_0] nth-[3]:border-b-[0] nth-[3]:[border-bottom-style:none] nth-[3]:border-b-[currentColor] nth-[3]:rounded-[0_0_10px_10px]"
        >
          <div>不让TA看</div>
          <div>
            <switches v-model="switches1" theme="bootstrap" color="success"></switches>
          </div>
        </div>
        <div
          class="h-11.25 bg-white flex items-center justify-between border-b-[1px] [border-bottom-style:solid] border-b-[rgba(222,_222,_222,_0.42)] px-5 py-0 nth-[1]:rounded-[10px_10px_0_0] nth-[3]:border-b-[0] nth-[3]:[border-bottom-style:none] nth-[3]:border-b-[currentColor] nth-[3]:rounded-[0_0_10px_10px]"
        >
          <div>在关注列表中置顶</div>
          <div>
            <switches v-model="switches1" theme="bootstrap" color="success"></switches>
          </div>
        </div>
        <div
          class="h-11.25 bg-white flex items-center justify-between border-b-[1px] [border-bottom-style:solid] border-b-[rgba(222,_222,_222,_0.42)] px-5 py-0 nth-[1]:rounded-[10px_10px_0_0] nth-[3]:border-b-[0] nth-[3]:[border-bottom-style:none] nth-[3]:border-b-[currentColor] nth-[3]:rounded-[0_0_10px_10px]"
          @click="cancel((e) => $emit('cancelFollow'))"
        >
          <div>取消关注</div>
          <div>
            <img
              class="w-5 h-5"
              src="../../../assets/img/icon/components/follow/reduce.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </from-bottom-dialog>
</template>
<script>
import FromBottomDialog from '../../../components/dialog/FromBottomDialog'
import Switches from '../../message/components/swtich/switches'
import { DefaultUser } from '@/utils/const_var'
import { _getUserDouyinId } from '@/utils'

export default {
  name: 'FollowSetting',
  components: {
    FromBottomDialog,
    Switches
  },
  props: {
    currentItem: {
      type: Object,
      default() {
        return {
          user: DefaultUser,
          isRequest: false,
          post: []
        }
      }
    },
    modelValue: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      switches1: false,
      switches2: false
    }
  },
  computed: {},
  created() {},
  methods: {
    _getUserDouyinId,
    cancel(cb) {
      this.$emit('update:modelValue', false)
      cb && cb()
    }
  }
}
</script>

<template>
  <from-bottom-dialog
    page-id="ChatDetail"
    :modelValue="modelValue"
    @update:modelValue="(e) => $emit('update:modelValue', e)"
    :show-heng-gang="false"
    height="20rem"
    @cancel="cancel"
    mode="white"
  >
    <div class="text-black">
      <div
        class="text-[color:var(--second-text-color)] text-[12px] h-10 flex justify-center items-center"
      >
        拉黑后，对方将无法搜索到你，也不能再给你发私信
      </div>
      <div
        class="flex justify-center items-center min-h-12.5 text-[14px] h-12.5 border-t-[1px] [border-top-style:solid] border-t-[gainsboro] text-[color:var(--primary-btn-color)] px-[var(--page-padding)] py-0 last:border-t-[0] last:[border-top-style:none] last:border-t-[currentColor]"
      >
        确认拉黑
      </div>
      <div
        class="flex justify-center items-center min-h-12.5 text-[14px] h-12.5 border-t-[1px] [border-top-style:solid] border-t-[gainsboro] px-[var(--page-padding)] py-0 last:border-t-[0] last:[border-top-style:none] last:border-t-[currentColor]"
      >
        不让 TA 看
      </div>
      <div class="h-2.5 bg-[whitesmoke]"></div>
      <div
        class="flex justify-center items-center min-h-12.5 text-[14px] h-12.5 border-t-[1px] [border-top-style:solid] border-t-[gainsboro] px-[var(--page-padding)] py-0 last:border-t-[0] last:[border-top-style:none] last:border-t-[currentColor]"
        @click="cancel"
      >
        取消
      </div>
    </div>
  </from-bottom-dialog>
</template>
<script>
import FromBottomDialog from '../../../components/dialog/FromBottomDialog'

export default {
  name: 'BlockDialog',
  components: {
    FromBottomDialog
  },
  props: {
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
    cancel() {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

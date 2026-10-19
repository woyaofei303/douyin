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
      class="max-h-122.5 overflow-auto bg-[#fff] text-black fixed bottom-12.5 left-0 right-0"
      v-if="modelValue"
    >
      <div
        class="fixed left-0 right-0 bg-white h-7.5 flex justify-between items-start font-bold text-[18px] p-3.75"
      >
        <span>&nbsp;</span>
        <div>播放反馈</div>
        <dy-back mode="dark" img="close" @click="cancel"></dy-back>
      </div>
      <div class="pt-15 pb-3.75 px-3.75">
        <div class="text-[12px] text-[color:var(--second-text-color)]">请选择要反馈的问题</div>
        <div
          class="flex items-center min-h-12.5 text-[14px] border-b-[1px] [border-bottom-style:solid] border-b-[#f1f1f1]"
          @click="
            falseOther(() => {
              this.type1 = true
            })
          "
        >
          <Check
            class="w-5! h-5! mr-2.5"
            mode="red"
            :modelValue="type1"
            @change="
              falseOther(() => {
                this.type1 = true
              })
            "
          />
          <span>网络正常无法播放视频</span>
        </div>
        <div
          class="flex items-center min-h-12.5 text-[14px] border-b-[1px] [border-bottom-style:solid] border-b-[#f1f1f1]"
          @click="
            falseOther(() => {
              this.type2 = true
            })
          "
        >
          <Check
            class="w-5! h-5! mr-2.5"
            mode="red"
            :modelValue="type2"
            @change="
              falseOther(() => {
                this.type2 = true
              })
            "
          />
          <span>视频画面正常没声音</span>
        </div>
        <div
          class="flex items-center min-h-12.5 text-[14px] border-b-[1px] [border-bottom-style:solid] border-b-[#f1f1f1]"
          @click="
            falseOther(() => {
              this.type3 = true
            })
          "
        >
          <Check
            class="w-5! h-5! mr-2.5"
            mode="red"
            :modelValue="type3"
            @change="
              falseOther(() => {
                this.type3 = true
              })
            "
          />
          <span>播放几秒/中途卡信</span>
        </div>
        <div
          class="flex items-center min-h-12.5 text-[14px] border-b-[1px] [border-bottom-style:solid] border-b-[#f1f1f1]"
          @click="
            falseOther(() => {
              this.type4 = true
            })
          "
        >
          <Check
            class="w-5! h-5! mr-2.5"
            mode="red"
            :modelValue="type4"
            @change="
              falseOther(() => {
                this.type4 = true
              })
            "
          />
          <span>画面内容不全</span>
        </div>
        <div
          class="flex items-center min-h-12.5 text-[14px] border-b-[1px] [border-bottom-style:solid] border-b-[#f1f1f1]"
          @click="
            falseOther(() => {
              this.type5 = true
            })
          "
        >
          <Check
            class="w-5! h-5! mr-2.5"
            mode="red"
            :modelValue="type5"
            @change="
              falseOther(() => {
                this.type5 = true
              })
            "
          />
          <span>播放过程中闪退回桌面</span>
        </div>
        <div
          class="flex items-center min-h-12.5 text-[14px] border-b-[1px] [border-bottom-style:solid] border-b-[#f1f1f1]"
          @click="
            falseOther(() => {
              this.type6 = true
            })
          "
        >
          <Check
            class="w-5! h-5! mr-2.5"
            mode="red"
            :modelValue="type6"
            @change="
              falseOther(() => {
                this.type6 = true
              })
            "
          />
          <span>画面模糊不清晰</span>
        </div>
        <div
          class="flex items-center min-h-12.5 text-[14px] border-b-[1px] [border-bottom-style:solid] border-b-[#f1f1f1]"
          @click="
            falseOther(() => {
              this.type7 = true
            })
          "
        >
          <Check
            class="w-5! h-5! mr-2.5"
            mode="red"
            :modelValue="type7"
            @change="
              falseOther(() => {
                this.type7 = true
              })
            "
          />
          <span>视频播放其他问题或建议</span>
        </div>
        <div v-if="type7">
          <div class="w-full bg-[#eae8e8] box-border mt-2.5 rounded-[2px] p-3.75">
            <textarea
              class="[font-family:'Microsoft_YaHei_UI'] [outline:none] w-full bg-transparent text-black border-[0] border-current border-none placeholder:text-[color:var(--second-text-color)]"
              name=""
              id=""
              cols="30"
              rows="10"
              v-model="desc"
              placeholder="详输入内容"
            ></textarea>
          </div>
          <div class="text-[10px] text-[color:var(--second-text-color)] text-right my-2">
            {{ desc.length }}/300
          </div>
        </div>
        <dy-button type="primary" :disabled="!disabled" @click="submit">提交</dy-button>
      </div>
    </div>
  </transition>
</template>
<script>
import Check from '../../../components/Check'
import { _hideLoading, _notice, _showLoading, _sleep } from '@/utils'

export default {
  name: 'Test',
  props: {
    modelValue: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  components: {
    Check
  },
  watch: {
    modelValue() {
      this.type1 = false
      this.type2 = false
      this.type3 = false
      this.type4 = false
      this.type5 = false
      this.type6 = false
      this.type7 = false
      this.desc = ''
    }
  },
  data() {
    return {
      type1: false,
      type2: false,
      type3: false,
      type4: false,
      type5: false,
      type6: false,
      type7: false,
      desc: ''
    }
  },
  computed: {
    disabled() {
      if (this.type7 && this.desc) return true
      return this.type1 || this.type2 || this.type3 || this.type4 || this.type5 || this.type6
    }
  },
  created() {},
  methods: {
    falseOther(cb) {
      this.type1 = false
      this.type2 = false
      this.type3 = false
      this.type4 = false
      this.type5 = false
      this.type6 = false
      this.type7 = false
      cb()
    },
    cancel() {
      this.$emit('update:modelValue', false)
    },
    async submit() {
      this.cancel()
      _showLoading()
      await _sleep(1000)
      _hideLoading()
      _notice('感谢你的反馈，我们会尽快答复！')
    }
  }
}
</script>

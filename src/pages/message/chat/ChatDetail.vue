<template>
  <div
    class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]"
    id="ChatDetail"
  >
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">聊天详情</span>
      </template>
    </BaseHeader>
    <div class="pt-15">
      <div class="px-5 py-0">
        <People
          class="border-b-[1px]! [border-bottom-style:solid]! border-b-[var(--second-btn-color-tran)]!"
          @follow="follow(index)"
          @unfollow="unfollow(index)"
          mode="normal-add-button"
          :key="index"
          v-for="(item, index) in data.list"
          :people="item"
        />
        <div
          class="[transition:all_0.3s_ease] w-full h-17.5 flex items-center relative border-b-[1px] [border-bottom-style:solid] border-b-[var(--second-btn-color-tran)]"
          @click="nav('/message/share-to-friend')"
        >
          <img
            class="mr-3.75 w-11.25 h-11.25 rounded-[50%]"
            src="../../../assets/img/icon/message/chat/add.png"
            alt=""
          />
          <div>多人聊天</div>
        </div>
      </div>
      <div>
        <div class="flex justify-between items-center min-h-12.5 text-[14px] h-10 px-5 py-0">
          <div class="flex justify-between items-center text-white">消息免打扰</div>
          <div
            class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
          >
            <switches v-model="data.noMessage" theme="bootstrap" color="success"></switches>
          </div>
        </div>
        <div class="flex justify-between items-center min-h-12.5 text-[14px] h-10 px-5 py-0">
          <div class="flex justify-between items-center text-white">置顶聊天</div>
          <div
            class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
          >
            <switches v-model="data.top" theme="bootstrap" color="success"></switches>
          </div>
        </div>
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] h-10 px-5 py-0"
          @click="nav('/set-remark')"
        >
          <div class="flex justify-between items-center text-white">设备备注</div>
          <div
            class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
          >
            <dy-back class="ml-1.25 h-5" direction="right" scale=".7"></dy-back>
          </div>
        </div>
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] h-10 px-5 py-0"
          @click="nav('/home/report', { mode: 'chat' })"
        >
          <div class="flex justify-between items-center text-white">举报</div>
          <div
            class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
          >
            <dy-back class="ml-1.25 h-5" direction="right" scale=".7"></dy-back>
          </div>
        </div>
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] h-10 px-5 py-0"
          @click="data.blockDialog = true"
        >
          <div class="flex justify-between items-center text-white">拉黑</div>
          <div
            class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
          >
            <dy-back class="ml-1.25 h-5" direction="right" scale=".7"></dy-back>
          </div>
        </div>
      </div>
    </div>
    <BlockDialog v-model="data.blockDialog" />
  </div>
</template>
<script setup lang="ts">
import Switches from '../components/swtich/switches.vue'
import People from '../../people/components/People.vue'
import BlockDialog from '../components/BlockDialog.vue'
import CONST_VAR from '../../../utils/const_var'
import { onMounted, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav'
import { _showConfirmDialog } from '@/utils'

defineOptions({
  name: 'ChatDetail'
})

const nav = useNav()
const data = reactive({
  noMessage: false,
  top: false,
  blockDialog: false,
  list: [
    {
      id: '224e9a00-ffa0-4bc1-bb07-c318c7b02fa5',
      avatar: new URL('../../../assets/img/icon/avatar/1.png', import.meta.url).href,
      name: '何以为家',
      sex: '',
      age: null,
      idCard: null,
      phone: '',
      address: null,
      wechat: '',
      password: null,
      lastLoginTime: '1629993515',
      createTime: '1630035089',
      isDelete: 0,
      account: '234',
      pinyin: 'M',
      select: false,
      type: CONST_VAR.RELATE_ENUM.FOLLOW_EACH_OTHER
    }
  ]
})

onMounted(() => {})

function follow(index) {
  if (data.list[index].type === CONST_VAR.RELATE_ENUM.FOLLOW_ME) {
    data.list[index].type = CONST_VAR.RELATE_ENUM.FOLLOW_EACH_OTHER
  }
}

function unfollow(index) {
  _showConfirmDialog(
    '正在与对方相互关注，是否不再关注该用户',
    null,
    'gray',
    () => {
      data.list[index].type = CONST_VAR.RELATE_ENUM.FOLLOW_ME
    },
    () => {},
    '取消关注',
    '返回'
  )
}
</script>

<script setup lang="ts">
import BaseMusic from '../BaseMusic.vue'
import { _formatNumber, cloneDeep } from '@/utils'
import bus, { EVENT_KEY } from '@/utils/bus'
import { Icon } from '@iconify/vue'
import { useClick } from '@/utils/hooks/useClick'
import { inject } from 'vue'

const props = defineProps({
  isMy: {
    type: Boolean,
    default: () => {
      return false
    }
  },
  item: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const position = inject<any>('position')

const emit = defineEmits(['update:item', 'goUserInfo', 'showComments', 'showShare', 'goMusic'])

function _updateItem(props, key, val) {
  const old = cloneDeep(props.item)
  old[key] = val
  emit('update:item', old)
  bus.emit(EVENT_KEY.UPDATE_ITEM, { position: position.value, item: old })
}

function loved() {
  setTimeout(() => {
    _updateItem(props, 'isLoved', !props.item.isLoved)
  }, 100)
  if (!props.item.isLoved) {
    // eslint-disable-next-line vue/no-mutating-props
    props.item.statistics.digg_count++
  } else {
    // eslint-disable-next-line vue/no-mutating-props
    props.item.statistics.digg_count--
  }
}

function collected() {
  setTimeout(() => {
    _updateItem(props, 'isCollect', !props.item.isCollect)
  }, 100)
  if (!props.item.isCollect) {
    // eslint-disable-next-line vue/no-mutating-props
    props.item.statistics.collect_count++
  } else {
    // eslint-disable-next-line vue/no-mutating-props
    props.item.statistics.collect_count--
  }
}

function attention(e) {
  e.currentTarget.dataset.following = 'true'
  setTimeout(() => {
    _updateItem(props, 'isAttention', true)
  }, 1000)
}

function showComments() {
  bus.emit(EVENT_KEY.OPEN_COMMENTS, props.item.aweme_id)
}

const vClick = useClick()
</script>

<template>
  <div class="mb-2.5 absolute bottom-0 right-2.5 text-[#fff] flex flex-col items-center">
    <div class="mb-5 relative">
      <img
        class="w-11.25 h-11.25 rounded-[50%] border-[3px] border-white border-solid"
        :src="item.author?.avatar_168x168?.url_list?.[0]"
        alt=""
        v-click="() => bus.emit(EVENT_KEY.GO_USERINFO)"
      />
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
          class="group/options absolute rounded-[50%] left-0 right-0 -bottom-1.25 bg-[red] w-4.5 h-4.5 flex justify-center items-center [transition:all_1s] m-auto data-[following=true]:bg-white"
          v-if="!item.isAttention"
          v-click="attention"
        >
          <img
            class="absolute w-3.5 h-3.5 [transition:all_1s] group-data-[following=true]/options:opacity-0 group-data-[following=true]/options:[transform:rotate(180deg)]"
            src="../../assets/img/icon/add-light.png"
            alt=""
          />
          <img
            class="absolute w-3.5 h-3.5 [transition:all_1s] opacity-0 [transform:rotate(-180deg)] group-data-[following=true]/options:opacity-100 group-data-[following=true]/options:[transform:rotate(0deg)]"
            src="../../assets/img/icon/ok-red.png"
            alt=""
          />
        </div>
      </transition>
    </div>
    <div class="mb-5 flex flex-col justify-center items-center" v-click="loved">
      <div>
        <img class="w-8.75 h-8.75" src="../../assets/img/icon/love.svg" v-if="!item.isLoved" />
        <img class="w-8.75 h-8.75" src="../../assets/img/icon/loved.svg" v-if="item.isLoved" />
      </div>
      <span class="text-[12px]">{{ _formatNumber(item.statistics.digg_count) }}</span>
    </div>
    <div class="mb-5 flex flex-col justify-center items-center" v-click="showComments">
      <Icon class="text-[40px] text-white" icon="mage:message-dots-round-fill" />
      <span class="text-[12px]">{{ _formatNumber(item.statistics.comment_count) }}</span>
    </div>
    <!--TODO     -->
    <div class="mb-5 flex flex-col justify-center items-center" v-click="collected">
      <Icon
        class="text-[40px] text-[rgb(252,_179,_3)]"
        v-if="item.isCollect"
        icon="ic:round-star"
      />
      <Icon class="text-[40px] text-white" v-else icon="ic:round-star" />
      <span class="text-[12px]">{{ _formatNumber(item.statistics.collect_count) }}</span>
    </div>
    <div
      class="mb-5 flex flex-col justify-center items-center"
      v-if="!props.isMy"
      v-click="() => bus.emit(EVENT_KEY.SHOW_SHARE)"
    >
      <img class="w-8.75 h-8.75" src="../../assets/img/icon/share-white-full.png" alt="" />
      <span class="text-[12px]">{{ _formatNumber(item.statistics.share_count) }}</span>
    </div>
    <div
      class="mb-5 flex flex-col justify-center items-center"
      v-else
      v-click="() => bus.emit(EVENT_KEY.SHOW_SHARE)"
    >
      <img class="w-8.75 h-8.75" src="../../assets/img/icon/menu-white.png" alt="" />
    </div>
    <!--    <BaseMusic-->
    <!--        :cover="item.music.cover"-->
    <!--        v-click="$router.push('/home/music')"-->
    <!--    /> -->
    <BaseMusic />
  </div>
</template>

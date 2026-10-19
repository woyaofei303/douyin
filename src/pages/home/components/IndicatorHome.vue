<template>
  <div
    class="absolute text-[16px] top-0 left-0 z-2 w-full text-white h-[var(--home-header-height)] [transition:all_0.3s] font-bold"
  >
    <div
      class="opacity-0 top-0 absolute w-[100vw] h-full flex justify-center items-center"
      :style="noticeStyle"
    >
      <span>下拉刷新内容</span>
    </div>
    <div
      class="z-2 relative text-white w-full h-full box-border flex justify-between items-center px-3.75 py-0"
      ref="toolbar"
      :style="toolbarStyle"
    >
      <Icon
        class="text-white text-[24px] [transform:rotateY(180deg)]"
        icon="tabler:menu-deep"
        @click="$emit('showSlidebar')"
      />
      <div class="w-[80%] relative">
        <div class="flex justify-between" ref="tabs">
          <div
            class="[transition:color_0.3s] relative text-[17px] cursor-pointer"
            :class="[index === 0 ? 'text-white' : 'text-[rgba(255,_255,_255,_0.7)]']"
            @click.stop="change(0)"
          >
            <span>热点</span>
          </div>
          <div
            class="[transition:color_0.3s] relative text-[17px] cursor-pointer"
            :class="[index === 1 ? 'text-white' : 'text-[rgba(255,_255,_255,_0.7)]']"
            @click.stop="change(1)"
          >
            <span>长视频</span>
          </div>
          <div
            class="[transition:color_0.3s] relative text-[17px] cursor-pointer"
            :class="[index === 2 ? 'text-white' : 'text-[rgba(255,_255,_255,_0.7)]']"
            @click.stop="change(2)"
          >
            <span>关注</span>
            <img
              class="absolute h-3.75 left-6 -top-1.25"
              src="../../../assets/img/icon/live.webp"
            />
          </div>
          <div
            class="[transition:color_0.3s] relative text-[17px] cursor-pointer"
            :class="[index === 3 ? 'text-white' : 'text-[rgba(255,_255,_255,_0.7)]']"
            @click.stop="change(3)"
          >
            <span>经验</span>
          </div>
          <div
            class="[transition:color_0.3s] relative text-[17px] cursor-pointer"
            :class="[index === 4 ? 'text-white' : 'text-[rgba(255,_255,_255,_0.7)]']"
            @click.stop="change(4)"
          >
            <span>推荐</span>
          </div>
        </div>
        <div
          class="absolute -bottom-1.5 h-[2.6px] w-6.5 bg-[#fff] rounded-[5px]"
          ref="indicator"
        ></div>
      </div>
      <Icon
        class="text-white text-[24px]"
        v-hide="loading"
        icon="ion:search"
        @click="$router.push('/home/search')"
      />
    </div>
    <Loading
      class="opacity-0 top-1.75! right-1.75! absolute! w-10!"
      :style="loadingStyle"
      :is-full-screen="false"
    />
  </div>
</template>
<script>
import Loading from '../../../components/Loading.vue'
import bus from '../../../utils/bus'
import { mapState } from 'pinia'
import { useBaseStore } from '@/store/pinia'
import { _css } from '@/utils/dom'

export default {
  name: 'IndicatorHome',
  components: {
    Loading
  },
  props: {
    loading: {
      type: Boolean,
      default() {
        return false
      }
    },
    //用于和slidList绑定，因为一个页面可能有多个slidList，但只有一个indicator组件
    name: {
      type: String,
      default: () => ''
    },
    index: {
      type: Number,
      default: () => 0
    },
    isLight: {
      type: Boolean,
      default: () => false
    }
  },
  setup() {
    const baseStore = useBaseStore()
    return { baseStore }
  },
  data() {
    return {
      indicatorRef: null,
      lefts: [],
      indicatorSpace: 0,
      type: 1,
      moveY: 0
    }
  },
  computed: {
    ...mapState(useBaseStore, ['judgeValue', 'homeRefresh']),
    transform() {
      return `translate3d(0, ${this.moveY - this.judgeValue > this.homeRefresh ? this.homeRefresh : this.moveY - this.judgeValue}px, 0)`
    },
    toolbarStyle() {
      if (this.loading) {
        return {
          opacity: 1,
          'transition-duration': '300ms',
          transform: `translate3d(0, 0, 0)`
        }
      }
      if (this.moveY) {
        return {
          opacity: 1 - (this.moveY - this.judgeValue) / (this.homeRefresh / 2),
          transform: this.transform
        }
      }
      return {
        opacity: 1,
        'transition-duration': '300ms',
        transform: `translate3d(0, 0, 0)`
      }
    },
    noticeStyle() {
      if (this.loading) {
        return { opacity: 0 }
      }
      if (this.moveY) {
        return {
          opacity: (this.moveY - this.judgeValue) / (this.homeRefresh / 2) - 0.5,
          transform: this.transform
        }
      }
      return { opacity: 0 }
    },
    loadingStyle() {
      if (this.loading) {
        return { opacity: 1, 'transition-duration': '300ms' }
      }
      if (this.moveY) {
        return {
          opacity: (this.moveY - this.judgeValue) / (this.homeRefresh / 2) - 0.5,
          transform: this.transform
        }
      }
      return {}
    }
  },
  created() {},
  mounted() {
    this.initTabs()
    bus.on(this.name + '-moveX', this.move)
    bus.on(this.name + '-moveY', (e) => {
      this.moveY = e
    })
    bus.on(this.name + '-end', this.end)
  },
  unmounted() {
    bus.off(this.name + '-moveX', this.move)
    bus.off(this.name + '-moveY')
    bus.off(this.name + '-end', this.end)
  },

  methods: {
    change(index) {
      this.$emit('update:index', index)
      _css(this.indicatorRef, 'transition-duration', `300ms`)
      _css(this.indicatorRef, 'left', this.lefts[index] + 'px')
    },
    initTabs() {
      let tabs = this.$refs.tabs
      this.indicatorRef = this.$refs.indicator
      let indicatorWidth = _css(this.indicatorRef, 'width')
      for (let i = 0; i < tabs.children.length; i++) {
        let item = tabs.children[i]
        let tabWidth = _css(item, 'width')
        this.lefts.push(
          item.getBoundingClientRect().x -
            tabs.children[0].getBoundingClientRect().x +
            (tabWidth * 0.5 - indicatorWidth / 2)
        )
      }
      this.indicatorSpace = this.lefts[1] - this.lefts[0]
      _css(this.indicatorRef, 'transition-duration', `300ms`)
      _css(this.indicatorRef, 'left', this.lefts[this.index] + 'px')
    },
    move(e) {
      _css(this.indicatorRef, 'transition-duration', `0ms`)
      _css(
        this.indicatorRef,
        'left',
        this.lefts[this.index] - e / (this.baseStore.bodyWidth / this.indicatorSpace) + 'px'
      )
    },
    end(index) {
      this.moveY = 0
      _css(this.indicatorRef, 'transition-duration', `300ms`)
      _css(this.indicatorRef, 'left', this.lefts[index] + 'px')
      setTimeout(() => {
        _css(this.indicatorRef, 'transition-duration', `0ms`)
      }, 300)
    }
  }
}
</script>

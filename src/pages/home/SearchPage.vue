<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]">
    <div
      class="z-4 bg-[var(--main-bg)] h-15 text-[14px] flex justify-between items-center border-b-[1px] [border-bottom-style:solid] border-b-[var(--line-color)] fixed w-full box-border top-0 px-[var(--page-padding)] py-0"
    >
      <dy-back class="mr-2.5" mode="light" @click="router.back"></dy-back>
      <Search
        class="flex-[1]!"
        placeholder="搜索用户名字/抖音号"
        :isShowRightText="true"
        @notice="_no"
      ></Search>
    </div>
    <div class="pt-15">
      <div>
        <div
          class="flex justify-between items-center min-h-10 text-[14px] px-[var(--page-padding)] py-0"
          :key="index"
          v-for="(item, index) in lHistory"
        >
          <div class="flex justify-between items-center text-white">
            <img class="mr-2.5 w-3.75" src="../../assets/img/icon/home/time-white.png" alt="" />
            <span> {{ item }}</span>
          </div>
          <dy-back
            img="close"
            mode="gray"
            @click="data.history.splice(index, 1)"
            scale=".7"
          ></dy-back>
        </div>
        <div
          class="text-center text-[color:var(--second-text-color)] p-2.5"
          v-if="data.history.length > 2"
          @click="toggle"
        >
          {{ data.isExpand ? '清除全部搜索记录' : '展开全部' }}
        </div>
      </div>
      <div class="px-[var(--page-padding)] py-0">
        <div
          class="text-[14px] flex items-center justify-between text-[color:var(--second-text-color)] px-0 py-2.5"
        >
          <div>猜你想搜</div>
          <div class="flex items-center" @click.stop="refresh">
            <img class="mr-1.25 w-3.25 h-3.25" src="../../assets/img/icon/home/refresh-gray.png" />
            <span>换一换</span>
          </div>
        </div>
        <div class="text-[16px] flex flex-wrap">
          <div
            class="box-border w-[49%] flex items-center px-0 py-2"
            :key="index"
            v-for="(item, index) in data.randomGuess"
          >
            <span class="max-w-[80%] whitespace-nowrap text-ellipsis overflow-hidden">{{
              item.name
            }}</span>
            <img
              class="flex items-center justify-center h-4 w-4 text-[12px] ml-1.25 rounded-[2px]"
              v-if="item.type === 1"
              src="../../assets/img/icon/home/new.webp"
              alt=""
            />
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center text-[14px] p-3.75">
          <div
            class="mr-5"
            :class="[
              data.slideIndex === 0
                ? '[transform:scale(1.2)] font-bold bg-[linear-gradient(to_right,_#ffa547,_#da4d73)] bg-clip-text text-transparent'
                : 'text-[color:var(--second-text-color)]'
            ]"
            @click="data.slideIndex = 0"
          >
            抖音热榜
          </div>
          <div
            class="mr-5"
            :class="[
              data.slideIndex === 1 ? 'text-white' : 'text-[color:var(--second-text-color)]',
              data.slideIndex === 1 ? '[transform:scale(1.2)]' : ''
            ]"
            @click="data.slideIndex = 1"
          >
            直播榜
          </div>
          <div
            class="mr-5"
            :class="[
              data.slideIndex === 2 ? 'text-white' : 'text-[color:var(--second-text-color)]',
              data.slideIndex === 2 ? '[transform:scale(1.2)]' : ''
            ]"
            @click="data.slideIndex = 2"
          >
            音乐榜
          </div>
          <div
            class="mr-5"
            :class="[
              data.slideIndex === 3 ? 'text-white' : 'text-[color:var(--second-text-color)]',
              data.slideIndex === 3 ? '[transform:scale(1.2)]' : ''
            ]"
            @click="data.slideIndex = 3"
          >
            品牌榜
          </div>
        </div>
        <!--        TODO 滚动到下面的时候，应该禁止slide-move，因为每个slideitem的高度不一样，高的切到矮的，会闪屏-->
        <SlideHorizontal v-model:index="data.slideIndex" :style="slideListHeight">
          <SlideItem data-slide-item="">
            <div
              data-search-slide="0"
              class="box-border mt-0 mb-12.5 [background:linear-gradient(to_right,_#201d24,_#321d26)] rounded-[10px] mx-[var(--page-padding)] p-[var(--page-padding)]"
              ref="slide0"
            >
              <div class="text-[14px] flex mb-4 items-center text-[color:var(--second-text-color)]">
                <div class="flex items-center">
                  <img
                    class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75"
                    src="../../assets/img/icon/home/to-top-yellow.png"
                  />
                </div>
                <div class="flex-[1] flex items-center justify-between min-w-0">
                  <div
                    class="w-[calc(100%_-_140px)] box-border flex items-center text-[14px] text-white"
                  >
                    <div
                      class="max-w-[85%] text-[14px] whitespace-nowrap text-ellipsis overflow-hidden"
                    >
                      专题：嘻嘻嘻哈哈瞄瞄嘻嘻嘻
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="text-[14px] flex mb-4 items-center text-[color:var(--second-text-color)]"
                :key="index"
                v-for="(item, index) in data.hotRankList"
              >
                <div class="flex items-center">
                  <img
                    class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75"
                    v-if="index === 0"
                    src="../../assets/img/icon/home/hot1.webp"
                    alt=""
                  />
                  <img
                    class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75"
                    v-else-if="index === 1"
                    src="../../assets/img/icon/home/hot2.webp"
                    alt=""
                  />
                  <img
                    class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75"
                    v-else-if="index === 2"
                    src="../../assets/img/icon/home/hot3.webp"
                    alt=""
                  />
                  <div class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75" v-else>
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="flex-[1] flex items-center justify-between min-w-0">
                  <div
                    class="w-[calc(100%_-_140px)] box-border flex items-center text-[14px] text-white"
                  >
                    <div
                      class="max-w-[85%] text-[14px] whitespace-nowrap text-ellipsis overflow-hidden"
                    >
                      {{ item.name }}
                    </div>
                    <img
                      class="flex items-center justify-center h-4 w-4 text-[12px] ml-1.25 rounded-[2px]"
                      v-if="item.type === 1"
                      src="../../assets/img/icon/home/new.webp"
                      alt=""
                    />
                    <img
                      class="flex items-center justify-center h-4 w-4 text-[12px] ml-1.25 rounded-[2px]"
                      v-if="item.type === 0"
                      src="../../assets/img/icon/home/hot.webp"
                      alt=""
                    />
                  </div>
                  <div class="text-[12px]">999w</div>
                </div>
              </div>
              <div
                class="mb-5 text-[12px] pt-2.5 pb-0 text-center text-[yellow] px-2.5"
                @click="_no"
              >
                查看完整热点榜 >
              </div>
            </div>
          </SlideItem>
          <SlideItem data-slide-item="">
            <div
              data-search-slide="1"
              class="box-border mt-0 mb-12.5 bg-[#141622] rounded-[10px] mx-[var(--page-padding)] p-[var(--page-padding)] border border-[rgba(31,_34,_52,_0.5)] border-solid"
              ref="slide1"
            >
              <div
                class="text-[14px] flex mb-2.5 items-center text-[color:var(--second-text-color)] active:opacity-50"
                :key="index"
                v-for="(item, index) in data.liveRankList"
              >
                <div class="flex items-center">
                  <div
                    class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75"
                    :class="[index < 3 ? 'text-[yellow]' : '']"
                  >
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="flex-[1] flex items-center justify-between">
                  <div
                    class="w-[calc(100%_-_160px)] box-border flex items-center text-[14px] text-white"
                  >
                    <div
                      class="mr-2.5 flex items-center justify-center w-8.75 h-8.75 rounded-[50%] bg-[var(--primary-btn-color)]"
                    >
                      <img
                        class="w-[34.7px] rounded-[50%] bg-black p-0.25"
                        src="../../assets/img/icon/avatar/1.png"
                        alt=""
                      />
                    </div>
                    <div
                      class="max-w-[55%] text-[14px] whitespace-nowrap text-ellipsis overflow-hidden"
                    >
                      {{ item.name }}
                    </div>
                    <div
                      class="h-5.5 flex items-center justify-center shrink-0 text-[10px] text-[color:var(--second-text-color)] ml-1.25 rounded-[2px] bg-[var(--second-btn-color-tran)] px-1.25 py-0"
                      v-if="item.type === 0"
                    >
                      <img class="mr-0.5 w-3.75 h-2.5" src="../../assets/img/icon/home/pk.webp" />
                      <span>PK</span>
                    </div>
                    <div
                      class="h-5.5 flex items-center justify-center shrink-0 text-[10px] text-[color:var(--second-text-color)] ml-1.25 rounded-[2px] bg-[var(--second-btn-color-tran)] px-1.25 py-0"
                      v-if="item.type === 1"
                    >
                      <img
                        class="mr-0.5 w-2.5 h-2.5"
                        src="../../assets/img/icon/home/redpack.png"
                      />
                      <span>红包</span>
                    </div>
                  </div>
                  <div class="text-[12px]">999w人气</div>
                </div>
              </div>
              <div
                class="mb-5 text-[12px] pt-2.5 pb-0 text-center text-[yellow] px-2.5"
                @click="_no"
              >
                查看完整直播榜 >
              </div>
            </div>
          </SlideItem>
          <SlideItem data-slide-item="">
            <div
              data-search-slide="2"
              class="box-border mt-0 mb-12.5 bg-[#141622] rounded-[10px] mx-[var(--page-padding)] p-[var(--page-padding)] border border-[rgba(31,_34,_52,_0.5)] border-solid"
              ref="slide2"
            >
              <div
                class="text-[14px] flex mb-2.5 items-center text-[color:var(--second-text-color)] active:opacity-50"
                :key="index"
                v-for="(item, index) in data.musicRankList"
                @click="nav('/home/music-rank-list')"
              >
                <div class="flex items-center">
                  <div
                    class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75"
                    :class="[index < 3 ? 'text-[yellow]' : '']"
                  >
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="flex-[1] flex items-center justify-between">
                  <div
                    class="w-[calc(100%_-_150px)] box-border flex items-center text-[14px] text-white"
                  >
                    <div class="mr-2.5">
                      <img
                        class="w-7.5 h-7.5 rounded-[2px]"
                        v-lazy="_checkImgUrl(item.cover)"
                        alt=""
                      />
                    </div>
                    <div
                      class="max-w-[95%] text-[14px] whitespace-nowrap text-ellipsis overflow-hidden"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                  <div class="flex items-center text-[12px]">
                    <img
                      class="mr-0.5 w-3.75 h-3.75"
                      src="../../assets/img/icon/home/hot-gray.png"
                      alt=""
                    />
                    <span>{{ _formatNumber(item.use_count) }}</span>
                  </div>
                </div>
              </div>
              <div
                class="mb-5 text-[12px] pt-2.5 pb-0 text-center text-[yellow] px-2.5"
                @click="nav('/home/music-rank-list')"
              >
                查看完整音乐榜 >
              </div>
            </div>
          </SlideItem>
          <SlideItem data-slide-item="">
            <div
              data-search-slide="3"
              class="box-border mt-0 mb-12.5 rounded-[10px] mx-[var(--page-padding)]"
              ref="slide3"
            >
              <div class="px-[var(--page-padding)] py-1.25">
                <div class="text-[color:var(--second-text-color)] text-[12px] mb-3.75 flex">
                  <div
                    class="rounded-[2px] mr-2.5 px-2.5 py-1.25"
                    :class="[
                      key === data.selectBrandKey
                        ? 'bg-[var(--second-btn-color)]'
                        : 'bg-[var(--second-btn-color-tran)]',
                      key === data.selectBrandKey ? 'text-white' : ''
                    ]"
                    @click="toggleKey(key, i)"
                    :key="i"
                    v-for="(key, i) in Object.keys(data.brandRankList)"
                  >
                    {{ key }}
                  </div>
                </div>
                <div
                  class="text-[14px] flex mb-2.5 items-center text-[color:var(--second-text-color)] active:opacity-50"
                  :key="index"
                  v-for="(item, index) in selectBrandList"
                >
                  <div class="flex items-center">
                    <div
                      class="w-4.5 h-4.5 leading-[18px] text-center mr-3.75"
                      :class="[index < 3 ? 'text-[yellow]' : '']"
                    >
                      {{ index + 1 }}
                    </div>
                  </div>
                  <div class="flex-[1] flex items-center justify-between">
                    <div
                      class="w-[calc(100%_-_150px)] box-border flex items-center text-[14px] text-white"
                    >
                      <div
                        class="mr-2.5"
                        :class="[
                          item.living
                            ? 'relative flex items-center justify-center w-8.75 h-8.75 rounded-[50%] bg-[var(--primary-btn-color)]'
                            : ''
                        ]"
                      >
                        <div
                          :class="[
                            item.living
                              ? 'w-8.75 h-8.75 absolute bg-transparent rounded-[50%] animate-[dy-avatar-out-line-eee6d4_1s_infinite] border-[2px] border-[var(--primary-btn-color)] border-solid'
                              : ''
                          ]"
                        ></div>
                        <img
                          class="relative z-2 w-[34.7px] h-[34.7px] rounded-[50%] bg-black box-border"
                          :class="[
                            item.living
                              ? 'animate-[dy-avatar-51f1a0_1s_infinite_alternate] p-0.25'
                              : ''
                          ]"
                          v-lazy="_checkImgUrl(item.logo)"
                          alt=""
                        />
                      </div>
                      <div
                        class="max-w-[95%] text-[14px] whitespace-nowrap text-ellipsis overflow-hidden"
                      >
                        {{ item.name }}
                      </div>
                    </div>
                    <div class="flex items-center text-[12px]">
                      <img
                        class="mr-0.5 w-3.75 h-3.75"
                        src="../../assets/img/icon/home/hot-gray.png"
                        alt=""
                      />
                      <span>{{ _formatNumber(item.hot_count) }}</span>
                    </div>
                  </div>
                </div>
                <div
                  class="mb-5 text-[12px] pt-2.5 pb-0 text-center text-[yellow] px-2.5"
                  @click="_no"
                >
                  查看完整品牌榜 >
                </div>
              </div>

              <SlideHorizontal v-model:index="data.adIndex" :autoplay="true" indicator>
                <SlideItem data-slide-item="">
                  <div
                    class="bg-[var(--second-btn-color-tran)] flex items-center justify-center h-25"
                  >
                    AD1
                  </div>
                </SlideItem>
                <SlideItem data-slide-item="">
                  <div
                    class="bg-[var(--second-btn-color-tran)] flex items-center justify-center h-25"
                  >
                    AD2
                  </div>
                </SlideItem>
                <SlideItem data-slide-item="">
                  <div
                    class="bg-[var(--second-btn-color-tran)] flex items-center justify-center h-25"
                  >
                    AD3
                  </div>
                </SlideItem>
                <SlideItem data-slide-item="">
                  <div
                    class="bg-[var(--second-btn-color-tran)] flex items-center justify-center h-25"
                  >
                    AD4
                  </div>
                </SlideItem>
                <SlideItem data-slide-item="">
                  <div
                    class="bg-[var(--second-btn-color-tran)] flex items-center justify-center h-25"
                  >
                    AD5
                  </div>
                </SlideItem>
                <SlideItem data-slide-item="">
                  <div
                    class="bg-[var(--second-btn-color-tran)] flex items-center justify-center h-25"
                  >
                    AD6
                  </div>
                </SlideItem>
                <SlideItem data-slide-item="">
                  <div
                    class="bg-[var(--second-btn-color-tran)] flex items-center justify-center h-25"
                  >
                    AD7
                  </div>
                </SlideItem>
                <SlideItem data-slide-item="">
                  <div
                    class="bg-[var(--second-btn-color-tran)] flex items-center justify-center h-25"
                  >
                    AD8
                  </div>
                </SlideItem>
              </SlideHorizontal>
            </div>
          </SlideItem>
        </SlideHorizontal>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Search from '../../components/Search.vue'
import Dom from '../../utils/dom'
import { computed, nextTick, onMounted, reactive, watch } from 'vue'
import { _checkImgUrl, _formatNumber, _no, _showSimpleConfirmDialog, sampleSize } from '@/utils'
import { useRouter } from 'vue-router'
import { useNav } from '@/utils/hooks/useNav'

defineOptions({
  name: 'SearchPage'
})

const router = useRouter()
const nav = useNav()
const data = reactive({
  isExpand: false,
  adIndex: 0,
  history: [
    '历史记录1',
    '历史记录2',
    '历史记录3',
    '历史记录4',
    '历史记录5',
    '历史记录6',
    '历史记录7',
    '历史记录8',
    '历史记录9',
    '历史记录10'
  ],
  guess: [
    { name: '少年透明人', type: -1 },
    { name: '花呗分批次接入征信', type: -1 },
    { name: '新娘婚礼上跪求悔婚', type: -1 },
    { name: '当你想换iPhone13时', type: -1 },
    { name: 'Ling OS灵犀系统', type: -1 },
    { name: '桑塔纳2022款', type: -1 },
    { name: '透明人', type: -1 },
    { name: '恒大集团凌晨发公告', type: 0 },
    { name: '2022款日产GT-R', type: 1 },
    { name: '四川双一流大学名单', type: -1 },
    { name: '一公司放假通知走红', type: -1 },
    { name: '成都新全优教育倒闭', type: -1 },
    { name: '当代女生社交现状', type: -1 },
    { name: '恒大集团凌晨发公告', type: -1 }
  ],
  randomGuess: [],
  hotRankList: [
    { name: '国内手机厂商最大的软肋就是 android 系统！', type: 0 },
    { name: '大家的官网订单现在什么状态', type: -1 },
    { name: '库克不愧是供应链管理大师， A15 一鱼三吃', type: -1 },
    { name: '找到了 iOS 被怀疑淘宝窃听的可能原因', type: 1 },
    { name: 'rebase 还是 merge？', type: -1 },
    { name: '十一出游西安，西安的大佬们能给些建议吗？', type: 0 },
    { name: '领克 01，燃油还是 phev？', type: 1 },
    { name: '为什么要抢购新手机呢？', type: -1 },
    { name: '拼多多官方处理问题跟京东真的没法比', type: -1 },
    { name: '百度输入法 VS 搜狗输入法', type: -1 },
    { name: '关于 ios 上 app 检测代理', type: 0 },
    { name: 'iPadmini6 到货以后，要不要换路由器', type: 1 },
    { name: '现在有推荐的同步盘么？', type: -1 },
    { name: '大哥们， mac 电池鼓包你们都咋修的。。', type: -1 },
    { name: '发现一个特别赞的同步盘方案 Resilio Sync', type: -1 },
    { name: '得鼻炎了, 说下症状和应对吧', type: 1 },
    {
      name: '打翻了一瓶矿泉水在 MacBook Pro 上，赶紧用鼠标关机了，等多久可以尝试开机？',
      type: 0
    },
    { name: '筋膜枪哪个牌子好啊？', type: -1 },
    {
      name: '最近在学理财小白基础知识，然后请教大家办哪个证券账户比较好呀',
      type: -1
    },
    {
      name: '有没有长期使用 sidecar 功能的 V 友，这个东西长期的稳定性如何？',
      type: 0
    },
    { name: '犹豫是否要年年焕新', type: -1 },
    { name: '请问如何在国内给 AppStore HK/TW 区充值.', type: 0 },
    { name: '最近感觉一个妹子不错，不过我比她大 5 岁', type: 1 },
    {
      name: '12mini 1 月 20 号购入，现在电池健康 92%，正常现象？',
      type: -1
    },
    { name: '现在新 iphone12/128 啥价格比较合适啊？', type: -1 },
    { name: 'iOS 15 不改地区就能看到全球所有交通卡', type: -1 },
    { name: '求推荐拼车/打车软件', type: 1 },
    { name: '如何比较方便的杀死 nohup 起的进程及其所有子进程?', type: 0 },
    { name: '换了新工作，好像又掉坑里了。', type: 0 },
    { name: '有没有这样一款记账软件？', type: 1 }
  ],
  liveRankList: [
    { name: '毛三岁（收女徒弟）', type: 0 },
    { name: '广州表哥', type: -1 },
    { name: '一只扬儿', type: -1 },
    { name: '沈酒', type: -1 },
    { name: '客家婷子', type: 1 },
    { name: '三斤.（9237）', type: -1 },
    { name: '虎哥说车', type: -1 },
    { name: '爆笑三江锅（永不言败）', type: -1 },
    { name: '子豪(尊师胜仔）5点扛把子', type: 1 },
    { name: '琪琪', type: -1 },
    { name: '战神土牛（征战全网）', type: 0 },
    { name: '小鲁班下午5点直播', type: -1 },
    { name: '惠子ssica', type: -1 },
    { name: '大狼狗郑建鹏&言真夫妇', type: -1 },
    { name: '一条小团团', type: -1 },
    { name: '高火火', type: -1 },
    { name: '郭聪明', type: -1 },
    { name: '罗永浩', type: 1 },
    { name: '陈赫', type: 0 },
    { name: '摩登兄弟', type: -1 },
    { name: '浪老师', type: -1 },
    { name: '陈死狗cnh', type: -1 },
    { name: '杨驴驴y', type: -1 },
    { name: 'imxiaoxin', type: 0 },
    { name: '丶才子欧巴', type: -1 },
    { name: '旭旭宝宝', type: -1 },
    { name: 'pigff', type: -1 },
    { name: '正经人令北', type: -1 },
    { name: '雨神丶', type: -1 },
    { name: '智勋勋勋勋', type: 0 }
  ],
  musicRankList: [
    {
      name: '龙卷风',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/5605.mp3',
      cover: new URL('../../assets/img/music-cover/1.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 99,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '爱在西元前',
      mp3: 'https://m3.8js.net:99/1916/501204165042405.mp3',
      cover: new URL('../../assets/img/music-cover/2.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '蜗牛',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/3684.mp3',
      cover: new URL('../../assets/img/music-cover/3.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '半岛铁盒',
      mp3: 'https://m3.8js.net:99/2016n/46/94745.mp3',
      cover: new URL('../../assets/img/music-cover/4.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '轨迹',
      mp3: 'https://m3.8js.net:99/1832/411204324135934.mp3',
      cover: new URL('../../assets/img/music-cover/5.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '七里香',
      mp3: 'https://m3.8js.net:99/2016n/14/53717.mp3',
      cover: new URL('../../assets/img/music-cover/6.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '发如雪',
      mp3: 'https://m3.8js.net:99/2014/211204142150965.mp3',
      cover: new URL('../../assets/img/music-cover/7.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '霍元甲',
      mp3: 'https://m3.8js.net:99/1921/261204212643140.mp3',
      cover: new URL('../../assets/img/music-cover/8.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '千里之外(周杰伦/费玉清)',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/121.mp3',
      cover: new URL('../../assets/img/music-cover/9.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '菊花台',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/2022.mp3',
      cover: new URL('../../assets/img/music-cover/10.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '不能说的秘密',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/165.mp3',
      cover: new URL('../../assets/img/music-cover/11.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '牛仔很忙',
      mp3: 'http://im5.tongbu.com/rings/singerring/zt_uunGo_1/219.mp3',
      cover: new URL('../../assets/img/music-cover/12.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '给我一首歌的时间',
      mp3: 'https://m3.8js.net:99/1938/041204380445445.mp3',
      cover: new URL('../../assets/img/music-cover/18.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '烟花易冷',
      mp3: 'https://m3.8js.net:99/1828/051204280535192.mp3',
      cover: new URL('../../assets/img/music-cover/14.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '惊叹号',
      mp3: 'https://m3.8js.net:99/20111103/150.mp3',
      cover: new URL('../../assets/img/music-cover/15.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '明明就',
      mp3: 'https://m3.8js.net:99/2016n/27/96537.mp3',
      cover: new URL('../../assets/img/music-cover/16.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '算什么男人',
      mp3: 'https://m3.8js.net:99/20150107/429.mp3',
      cover: new URL('../../assets/img/music-cover/17.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    },
    {
      name: '告白气球',
      mp3: 'https://m3.8js.net:99/20161016/481.mp3',
      cover: new URL('../../assets/img/music-cover/18.jpg', import.meta.url).href,
      author: '周杰伦',
      duration: 60,
      use_count: 37441000,
      is_collect: false,
      is_play: false
    }
  ],
  brandRankList: {
    汽车: [
      {
        name: '五菱汽车',
        logo: 'https://www.wuling.com/favicon.ico',
        hot_count: 1395,
        living: false
      },
      {
        name: '宝马',
        logo: 'https://www.bmw.com.cn/etc/clientlibs/digitals2/clientlib/media/img/BMW_Grey_Logo.svg',
        hot_count: 1395,
        living: true
      },
      {
        name: '吉利汽车',
        logo: 'http://www.cargc.com/uploads/allimg/200828/1401364511-2.jpg',
        hot_count: 1395,
        living: false
      },
      {
        name: '一汽大众-奥迪',
        logo: 'https://www.audi.cn/bin/nemo.static.20210916063431/cms4i-nemo/assets/icons/favicon/favicon-v4.ico',
        hot_count: 1395,
        living: false
      },
      {
        name: '一汽-大众',
        logo: 'https://www.vw.com.cn/favicon.ico',
        hot_count: 1395,
        living: false
      }
    ],
    手机: [
      {
        name: '华为',
        logo: 'https://isesglobal.com/wp-content/uploads/2021/01/Huawei.jpg',
        hot_count: 1395,
        living: false
      },
      {
        name: '小米',
        logo: 'https://s01.mifile.cn/favicon.ico',
        hot_count: 1395,
        living: true
      },
      {
        name: 'vivo',
        logo: 'http://wwwstatic.vivo.com.cn/vivoportal/web/dist/img/common/favicon_ecf768e.ico',
        hot_count: 1395,
        living: false
      },
      {
        name: 'oppo',
        logo: 'https://code.oppo.com/etc.clientlibs/global-site/clientlibs/clientlib-design/resources/icons/favicon.ico',
        hot_count: 1395,
        living: false
      },
      {
        name: '三星',
        logo: 'https://www.samsung.com/etc.clientlibs/samsung/clientlibs/consumer/global/clientlib-common/resources/images/Favicon.png',
        hot_count: 1395,
        living: false
      }
    ],
    美妆: [
      {
        name: '巴黎欧莱雅',
        logo: 'https://oap-cn-prd-cd.e-loreal.cn/-/media/project/loreal/brand-sites/oap/apac/cn/identity/image-2020-06-19-20-48-00-996.png',
        hot_count: 1395,
        living: false
      },
      {
        name: '花西子',
        logo: 'https://www.haoyunbb.com/img/allimg/210607/001I43462-0.png',
        hot_count: 1395,
        living: false
      },
      {
        name: '完美日记',
        logo: 'http://5b0988e595225.cdn.sohucs.com/images/20200412/9c6caafca79e438f98d98d3986ebce4d.png',
        hot_count: 1395,
        living: false
      },
      {
        name: '雅诗兰黛',
        logo: 'https://vipyidiancom.oss-cn-beijing.aliyuncs.com/vipyidian.com/article/1_150918143107_1.png',
        hot_count: 1395,
        living: false
      },
      {
        name: 'COLORKEY珂拉琪',
        logo: 'https://www.80wzbk.com/uploads/logo/20210129/20210129104015_541.jpg',
        hot_count: 1395,
        living: false
      }
    ]
  },
  selectBrandKey: '汽车',
  selectBrandKeyIndex: 0,
  slideIndex: 0,
  timer: null,
  slideItemHeight: null
})

const lHistory = computed(() => {
  if (data.isExpand) {
    if (data.history.length > 10) return data.history.slice(0, 10)
    return data.history
  } else {
    if (data.history.length > 2) return data.history.slice(0, 2)
    return data.history
  }
})

const selectBrandList = computed(() => {
  return data.brandRankList[data.selectBrandKey]
})

const brandListKeys = computed<string[]>(() => {
  return Object.keys(data.brandRankList)
})

const slideListHeight = computed(() => {
  return {
    height: data.slideItemHeight ? data.slideItemHeight + 'px' : '100%'
  }
})

watch(
  () => data.slideIndex,
  (newVal) => {
    nextTick(() => {
      // console.log(data.$refs[`slide${newVal}`])
      data.slideItemHeight = new Dom(`[data-search-slide="${newVal}"]`).css('height')
      // console.log(data.slideItemHeight)
      data.slideItemHeight = parseFloat(data.slideItemHeight) + 50
    })
    if (newVal === 3) {
      data.timer = setInterval(() => {
        if (data.selectBrandKeyIndex === brandListKeys.value.length - 1) {
          data.selectBrandKeyIndex = 0
        } else {
          data.selectBrandKeyIndex++
        }
        data.selectBrandKey = brandListKeys.value[data.selectBrandKeyIndex]
      }, 3000)
    } else {
      clearInterval(data.timer)
    }
  },
  { immediate: true }
)

onMounted(() => {
  data.history = data.history.reverse()
  refresh()
})

function toggleKey(key: string, i: number) {
  data.selectBrandKey = key
  data.selectBrandKeyIndex = i
  clearInterval(data.timer)
}

function refresh() {
  data.randomGuess = sampleSize(data.guess, 6)
}

function toggle() {
  if (data.isExpand) {
    _showSimpleConfirmDialog(
      '是否清空历史记录？',
      () => {
        data.history = []
      },
      null,
      '确定',
      '取消'
    )
  } else {
    data.isExpand = true
  }
}
</script>

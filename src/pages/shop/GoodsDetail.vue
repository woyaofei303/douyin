<template>
  <div
    class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-black text-[14px] bg-[#f5f5f5]"
    ref="page"
    @scroll="scroll"
  >
    <header class="fixed left-0 top-0 w-[100vw] z-9" ref="header">
      <div class="h-[var(--common-header-height)] flex items-center px-2.5 py-0">
        <Icon
          class="text-[22px] bg-[rgba(176,_176,_176,_0.4)] text-white rounded-[50%] p-1.25"
          @click="router.back()"
          icon="material-symbols-light:arrow-back-ios-new"
        />
        <div class="ml-2.5 flex-[1] flex items-center justify-between">
          <div
            class="text-[12px] rounded-[20px] flex-[1] bg-[#f3f3f3] flex items-center text-[gray] invisible px-2.5 py-1.25"
          >
            <Icon class="text-[22px] bg-[unset] text-white rounded-[50%] p-0" icon="jam:search" />
            <div>多功能电源插座</div>
          </div>
          <div class="group/option ml-3.75 flex items-center gap-2">
            <Icon
              class="text-[22px] bg-[rgba(176,_176,_176,_0.4)] text-white rounded-[50%] p-1.25"
              icon="jam:search"
            />
            <Icon
              class="text-[22px] bg-[rgba(176,_176,_176,_0.4)] text-white rounded-[50%] p-1.25"
              icon="mynaui:star"
            />
            <Icon
              class="text-[22px] bg-[rgba(176,_176,_176,_0.4)] text-white rounded-[50%] p-1.25"
              icon="ph:share-fat"
            />
          </div>
        </div>
      </div>
    </header>
    <header class="fixed left-0 top-0 w-[100vw] z-9 opacity-0 bg-white" ref="headerShadow">
      <div class="h-[var(--common-header-height)] flex items-center px-2.5 py-0">
        <Icon
          class="text-[22px] bg-[unset] text-black rounded-[50%] p-1.25"
          @click="router.back()"
          icon="material-symbols-light:arrow-back-ios-new"
        />
        <div class="ml-2.5 flex-[1] flex items-center justify-between">
          <div
            class="text-[12px] rounded-[20px] flex-[1] bg-[#f3f3f3] flex items-center text-[gray] [visibility:unset] px-2.5 py-1.25"
          >
            <Icon class="text-[22px] bg-[unset] text-[gray] rounded-[50%] p-0" icon="jam:search" />
            <div>多功能电源插座</div>
          </div>
          <div class="group/option ml-3.75 flex items-center gap-2">
            <Icon
              class="text-[22px] bg-[unset] text-black rounded-[50%] p-1.25"
              icon="mynaui:star"
            />
            <Icon
              class="text-[22px] bg-[unset] text-black rounded-[50%] p-1.25"
              icon="ph:share-fat"
            />
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="flex-[1] flex justify-center items-center text-black">
          <div
            class="pt-2.5 pb-3.75 border-b-[2.5px] [border-bottom-style:solid] border-b-[black] px-0"
          >
            商品
          </div>
        </div>
        <div class="flex-[1] flex justify-center items-center text-[#646464]">
          <div class="pt-2.5 pb-3.75 px-0">评价</div>
        </div>
        <div class="flex-[1] flex justify-center items-center text-[#646464]">
          <div class="pt-2.5 pb-3.75 px-0">详情</div>
        </div>
        <div class="flex-[1] flex justify-center items-center text-[#646464]">
          <div class="pt-2.5 pb-3.75 px-0">推荐</div>
        </div>
      </div>
    </header>

    <div class="relative h-[55vh]">
      <SlideHorizontal v-model:index="state.index">
        <SlideItem data-slide-item="" v-for="(item, i) in state.detail.imgs" :key="i">
          <img
            class="h-full w-full object-cover touch-none"
            v-lazy="_checkImgUrl('goods/' + item)"
            alt=""
          />
        </SlideItem>
      </SlideHorizontal>
      <div
        class="text-[12px] absolute rounded-[15px] bg-[rgba(91,_89,_89,_0.5)] right-2.5 bottom-7.5 text-white px-2.5 py-0.75"
      >
        {{ state.index + 1 }}/{{ state.detail.imgs.length }}
      </div>
    </div>
    <div class="pt-2 pb-0 bg-[#f5f5f5] rounded-[16px_16px_0_0] [transform:translateY(-20px)] px-2">
      <div class="mb-5 px-2 py-0">
        <div class="mb-5 flex items-end">
          <div class="text-[red] [font-weight:900]">
            <span class="text-[16px]">￥</span>
            <span class="text-[26px]">{{ state.detail.price }}</span>
            <!--            <span class="decimal">.8</span>-->
          </div>
          <div
            class="ml-2.5 text-white flex items-end pt-0.5 pb-1 bg-[#f8264a] rounded-[20px] px-3.75"
          >
            <span class="text-[13px]">热销款券后</span>
            <div class="text-white [font-weight:900] -mt-1.5 [transform:translateY(4px)]">
              <span class="text-[16px]">￥</span>
              <span class="text-[26px]">{{ state.detail.real_price }}</span>
              <!--              <span class="decimal">.9</span>-->
            </div>
          </div>
        </div>
        <div class="text-black text-[16px] mb-2 overflow-hidden [font-weight:900] tracking-[1px]">
          {{ state.detail.name }}
        </div>
        <div class="text-[12px] text-[gray]">已售{{ state.detail.sold }}</div>
      </div>

      <div class="mt-1.25 mb-2.5 bg-white rounded-[10px] mx-1.25 px-3.75 py-2.5">
        <div class="flex items-start mb-5.5 px-0 py-1.25">
          <div class="text-[#a2a2a2]">保障</div>
          <div class="pl-3.75 flex-[1] flex justify-between items-center">
            假一赔四·运费险·极速退款
            <Icon class="text-[18px] text-[#a2a2a2]" icon="mingcute:right-line" />
          </div>
        </div>
        <div class="flex items-start mb-5.5 px-0 py-1.25">
          <div class="text-[#a2a2a2]">选择</div>
          <div class="pl-3.75 flex-[1] flex justify-between items-center">
            <div class="flex-[1] relative flex items-center text-[10px] overflow-hidden">
              <div class="flex overflow-hidden shrink-0">
                <div class="bg-[#f5f5f5] mr-2.5 rounded-[3px] px-2.5 py-1">
                  【10双】男土SP中筒袜
                </div>
                <div class="bg-[#f5f5f5] mr-2.5 rounded-[3px] px-2.5 py-1">【5双】男土SP中筒袜</div>
                <div class="bg-[#f5f5f5] mr-2.5 rounded-[3px] px-2.5 py-1">【5双】男土SP中筒袜</div>
              </div>
              <div class="right-0 h-full flex items-center absolute text-[#a2a2a2]">
                <div
                  class="w-15 h-full [background:linear-gradient(to_right,_transparent,_#f5f5f5)]"
                ></div>
                <div class="pl-1 flex items-center h-full bg-white">共3种规格可选</div>
              </div>
            </div>
            <Icon class="text-[18px] text-[#a2a2a2]" icon="mingcute:right-line" />
          </div>
        </div>
        <div class="flex items-start mb-5.5 px-0 py-1.25">
          <div class="text-[#a2a2a2]">物流</div>
          <div class="pl-3.75 flex-[1] block justify-between items-center">
            <div class="flex gap-1.25">
              <span>发货 四川成都</span>
              <span class="text-[#dedede]">|</span>
              <span>免运费</span>
            </div>
            <div class="flex justify-between my-2.5">
              <div>48小时内发货</div>
              <Icon class="text-[18px] text-[#a2a2a2]" icon="mingcute:right-line" />
            </div>
            <div class="mt-2.5 flex justify-between">
              <div class="text-[#a2a2a2]">送至 四川省成都市</div>
              <Icon class="text-[18px] text-[#a2a2a2]" icon="mingcute:right-line" />
            </div>
          </div>
        </div>
        <div class="mb-0 flex items-start px-0 py-1.25">
          <div class="text-[#a2a2a2]">参数</div>
          <div class="pl-3.75 flex-[1] flex justify-between items-center">
            <div class="max-w-[70vw] overflow-hidden text-ellipsis whitespace-nowrap">
              优惠新人券 立减4新人券立减4新人券立减4新人券 立减4新人券 立减4
            </div>
            <Icon class="text-[18px] text-[#a2a2a2]" icon="mingcute:right-line" />
          </div>
        </div>
      </div>

      <div class="mt-1.25 mb-2.5 bg-white rounded-[10px] mx-1.25 px-3.75 py-2.5">
        <header class="mb-5 flex justify-between items-center">
          <span class="text-[16px] [font-weight:900]">商品评论(507)</span>
          <Icon class="text-[18px] text-[#a2a2a2]" icon="mingcute:right-line" />
        </header>
        <div class="flex gap-2.5 mb-5">
          <div
            class="flex gap-1.25 bg-[rgba(255,_167,_183,_0.15)] rounded-[8px] text-[11px] px-2 py-1.5"
          >
            物美价廉 <span class="text-[#a2a2a2]">29</span>
          </div>
          <div
            class="flex gap-1.25 bg-[rgba(255,_167,_183,_0.15)] rounded-[8px] text-[11px] px-2 py-1.5"
          >
            物流很好 <span class="text-[#a2a2a2]">26</span>
          </div>
          <div
            class="flex gap-1.25 bg-[rgba(255,_167,_183,_0.15)] rounded-[8px] text-[11px] px-2 py-1.5"
          >
            推荐 <span class="text-[#a2a2a2]">18</span>
          </div>
          <div
            class="flex gap-1.25 bg-[rgba(255,_167,_183,_0.15)] rounded-[8px] text-[11px] px-2 py-1.5"
          >
            商用服务好 <span class="text-[#a2a2a2]">15</span>
          </div>
        </div>
        <div class="mb-5">
          <header class="mb-2.5 flex items-center gap-1.25">
            <img
              class="rounded-[50%] w-6.25 h-6.25"
              :src="_checkImgUrl('2S9bbgb-Sf2kIdSTxoeTw.png')"
              alt=""
            />
            <span class="text-[#a2a2a2]">花***栽</span>
          </header>
          <div class="flex gap-2.5">
            <div>
              <div class="mb-2.5">东西不错质量也很好 性价比很高 良心商家就冲这图必须给好评</div>
              <div class="text-[#c0c0c0] text-[13px]">china款/超值【买る双+送2双】共5双</div>
            </div>
            <img
              class="rounded-[8px] h-12.5 w-12.5"
              :src="_checkImgUrl('NYEfuYS-LVZ620UYgQNAM.png')"
              alt=""
            />
          </div>
        </div>
        <div class="mb-5">
          <header class="mb-2.5 flex items-center gap-1.25">
            <img
              class="rounded-[50%] w-6.25 h-6.25"
              :src="_checkImgUrl('9Tx6cZkUOoHqPkbETUZ5Y.png')"
              alt=""
            />
            <span class="text-[#a2a2a2]">花***栽</span>
          </header>
          <div class="flex gap-2.5">
            <div>
              <div class="mb-2.5">东西不错质量也很好 性价比很高 良心商家就冲这图必须给好评</div>
              <div class="text-[#c0c0c0] text-[13px]">china款/超值【买る双+送2双】共5双</div>
            </div>
            <img
              class="rounded-[8px] h-12.5 w-12.5"
              :src="_checkImgUrl('2b2rpive_RVzDrYgo-F9K.png')"
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="mt-1.25 mb-2.5 bg-white rounded-[10px] mx-1.25 px-3.75 py-2.5">
        <header class="flex items-center gap-2.5">
          <img
            class="w-15 h-15 rounded-[50%]"
            :src="_checkImgUrl('LJ-8p2jF3HydBD5j28PgQ.png')"
            alt=""
          />
          <div class="flex-[1] flex justify-between items-center">
            <div class="flex flex-col justify-between gap-1">
              <div class="text-[16px] [font-weight:900]">店铺名</div>
              <div class="flex text-[10px] [font-weight:900] gap-2.5">
                <div class="bg-[#fdf5f3] text-[#d98f50] px-0.75 py-0.5">金牌店铺</div>
                <div class="bg-[#fdf5f3] text-[#d98f50] px-0.75 py-0.5">好评过千</div>
                <div class="bg-[#fdf5f3] text-[#d98f50] px-0.75 py-0.5">销量超10万</div>
              </div>
              <div class="text-[#c0c0c0] text-[13px]">店铺口碑4.90分</div>
            </div>
            <div
              class="rounded-[4px] [font-weight:900] bg-[var(--primary-btn-color)] text-white px-3.5 py-1.25"
            >
              进店
            </div>
          </div>
        </header>

        <div class="mt-4 flex items-center gap-0.75">
          <div class="w-[33%] text-center text-[13px] font-bold">
            <div class="text-[#c0c0c0] text-[12px] font-normal mb-1.5">商品质量</div>
            <div>商品评价一般</div>
          </div>
          <div class="h-7.5 bg-[lightgrey] w-0.25"></div>
          <div class="w-[33%] text-center text-[13px] font-bold">
            <div class="text-[#c0c0c0] text-[12px] font-normal mb-1.5">物流速度</div>
            <div>平均24小时发货</div>
          </div>
          <div class="h-7.5 bg-[lightgrey] w-0.25"></div>
          <div class="w-[33%] text-center text-[13px] font-bold">
            <div class="text-[#c0c0c0] text-[12px] font-normal mb-1.5">商品质量</div>
            <div>商品评价一般</div>
          </div>
        </div>

        <div class="mt-4">
          <header class="flex items-center justify-between">
            <span class="[font-weight:900]">店铺推荐</span>
            <div class="flex items-center">
              <span class="text-[#a2a2a2]">查看全部</span>
              <Icon class="text-[18px] text-[#a2a2a2]" icon="mingcute:right-line" />
            </div>
          </header>
          <div class="mt-4 grid [grid-template-columns:repeat(3,_1fr)] gap-2.5">
            <div>
              <img
                class="rounded-[12px] object-cover h-[28vw] w-full"
                :src="_checkImgUrl('/goods/g6-0.jpg')"
                alt=""
              />
              <div
                class="overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
              >
                小米电视6 65" OLED 65英寸
              </div>
              <div class="text-[red] [font-weight:900]">
                <span class="text-[14px]">￥</span>
                <span class="text-[18px]">8</span>
                <span class="tracking-[2px] text-[14px]">.8</span>
              </div>
            </div>
            <div>
              <img
                class="rounded-[12px] object-cover h-[28vw] w-full"
                :src="_checkImgUrl('/goods/g1-0.jpg')"
                alt=""
              />
              <div
                class="overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
              >
                红白撞色条纹软糯针织上衣女2022年秋季新款甜美减龄短款毛衣开衫
              </div>
              <div class="text-[red] [font-weight:900]">
                <span class="text-[14px]">￥</span>
                <span class="text-[18px]">8</span>
                <span class="tracking-[2px] text-[14px]">.8</span>
              </div>
            </div>
            <div>
              <img
                class="rounded-[12px] object-cover h-[28vw] w-full"
                :src="_checkImgUrl('/goods/g2-0.webp')"
                alt=""
              />
              <div
                class="overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
              >
                森马t恤男2023男士纯棉上衣白色情侣装凉感短袖打底衫纯色体恤潮
              </div>
              <div class="text-[red] [font-weight:900]">
                <span class="text-[14px]">￥</span>
                <span class="text-[18px]">8</span>
                <span class="tracking-[2px] text-[14px]">.8</span>
              </div>
            </div>
            <div>
              <img
                class="rounded-[12px] object-cover h-[28vw] w-full"
                :src="_checkImgUrl('/goods/g3-0.jpg')"
                alt=""
              />
              <div
                class="overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
              >
                ins潮牌长袖t恤男宽松纯色内搭上衣潮牌百搭秋冬季潮流帅气打底衫
              </div>
              <div class="text-[red] [font-weight:900]">
                <span class="text-[14px]">￥</span>
                <span class="text-[18px]">8</span>
                <span class="tracking-[2px] text-[14px]">.8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[#f5f5f5]">
      <header class="text-[16px] pb-5 flex justify-center gap-2.5 items-center">
        <div
          class="w-0 h-0 border-r-[40px] [border-right-style:solid] border-r-[#a2a2a2] border-t-[1px] [border-top-style:solid] border-t-[transparent] border-b-[1px] [border-bottom-style:solid] border-b-[transparent]"
        ></div>
        <span class="text-[#a2a2a2]">商品详情</span>
        <div
          class="w-0 h-0 [border-right:unset] border-t-[1px] [border-top-style:solid] border-t-[transparent] border-b-[1px] [border-bottom-style:solid] border-b-[transparent] border-l-[40px] [border-left-style:solid] border-l-[#a2a2a2]"
        ></div>
      </header>

      <div>
        <img
          class="w-full block"
          v-lazy="_checkImgUrl('goods/' + i)"
          alt=""
          :key="j"
          v-for="(i, j) in state.detail.imgs"
        />
      </div>
    </div>

    <div class="p-2">
      <div class="mt-1.25 mb-2.5 bg-white rounded-[10px] mx-1.25 px-3.75 py-2.5">
        <div class="group/item" @click="toggle(i)" :key="i" v-for="(item, i) in 3">
          <header
            class="flex justify-between items-center px-0 py-3.75 group-last/item:pb-2.5 group-first/item:pt-2.5"
          >
            <div>价格说明</div>
            <Icon class="text-[18px] text-[#a2a2a2]" icon="mingcute:right-line" />
          </header>
          <div :class="[activeIndexs.includes(i) ? 'block' : 'hidden']">
            价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明价格说明
          </div>
        </div>
      </div>

      <div class="mb-15">
        <header class="[font-weight:900] text-[15px] p-3.75">你可以还会喜欢</header>

        <ScrollList class="p-1.25!" :api="recommendedShop">
          <template v-slot="{ list }">
            <WaterfallList :list="list">
              <template v-slot="{ item }">
                <div class="box-border mb-2.5" @click="nav('/shop/detail', {}, item)">
                  <div class="rounded-[8px] overflow-hidden bg-white">
                    <img class="w-full" v-lazy="_checkImgUrl('goods/' + item.cover)" />
                    <div class="p-2.5">
                      <div class="text-black text-[16px] mb-2 leading-[18px] h-9 overflow-hidden">
                        {{ item.name }}
                      </div>
                      <div
                        class="inline-block text-[#c7596a] text-[12px] mb-1 px-1 py-0 border border-[#c7596a] border-solid"
                        v-if="item.discount"
                      >
                        {{ item.discount }}
                      </div>
                      <div class="flex items-end">
                        <div class="text-[#f8264a] flex items-end text-[14px] mr-1.25">
                          ￥
                          <div class="text-[22px] [font-weight:900] [transform:translateY(2px)]">
                            {{ item.price }}
                          </div>
                        </div>
                        <div class="text-[darkgray] text-[12px]">已售{{ item.sold }}件</div>
                      </div>
                      <div class="mt-0.5 text-[#e6995c]" v-if="item.isLowPrice">近30天低价</div>
                    </div>
                  </div>
                </div>
              </template>
            </WaterfallList>
          </template>
        </ScrollList>
      </div>
    </div>

    <div class="fixed bottom-0 w-[100vw] left-0 bg-white flex box-border gap-1.5 p-2.5">
      <div class="flex-[1] flex">
        <div
          class="group/option flex-[1] flex justify-center items-center flex-col text-[11px] text-[#646464]"
        >
          <Icon class="text-[18px] group-first/option:text-[red]" icon="iconoir:shop-window" />
          <div>进店</div>
        </div>
        <div
          class="group/option flex-[1] flex justify-center items-center flex-col text-[11px] text-[#646464]"
        >
          <Icon
            class="text-[18px] group-first/option:text-[red]"
            icon="icon-park-outline:message-emoji"
          />
          <div>客服</div>
        </div>
        <div
          class="group/option flex-[1] flex justify-center items-center flex-col text-[11px] text-[#646464]"
        >
          <Icon
            class="text-[18px] group-first/option:text-[red]"
            icon="icon-park-outline:shopping"
          />
          <div>购物车</div>
        </div>
      </div>
      <div
        class="w-[60%] flex text-[15px] font-bold bg-[#f8264a] text-white rounded-[12px] overflow-hidden h-11.25"
      >
        <div
          class="flex-[1] flex justify-center items-center first:text-[#f8264a] first:bg-[#ffe9ed]"
        >
          加入购物车
        </div>
        <div
          class="flex-[1] flex justify-center items-center first:text-[#f8264a] first:bg-[#ffe9ed]"
        >
          领券购买
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SlideHorizontal from '@/components/slide/SlideHorizontal.vue'
import SlideItem from '@/components/slide/SlideItem.vue'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useNav } from '@/utils/hooks/useNav'
import { _checkImgUrl } from '@/utils'
import { useBaseStore } from '@/store/pinia'
import { recommendedShop } from '@/api/user'
import WaterfallList from '@/components/WaterfallList.vue'
import ScrollList from '@/components/ScrollList.vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'GoodsDetail'
})

const router = useRouter()
let activeIndexs = ref([])
const nav = useNav()
const store = useBaseStore()
let page = ref()
let header = ref()
let headerShadow = ref()

function scroll() {
  let d = page.value.scrollTop / 200
  // console.log('s', d, header.value)
  if (d > 0) {
    header.value.style.opacity = 1 - d
  } else {
    header.value.style.opacity = 1 - d
  }
  headerShadow.value.style.opacity = d
}

const state = reactive({
  detail: {
    price: '',
    name: '',
    sold: '',
    real_price: '',
    imgs: []
  },
  index: 0,
  listEl: null,
  fixed: false
})

function toggle(i) {
  let rIndex = activeIndexs.value.findIndex((v) => v === i)
  if (rIndex > -1) {
    activeIndexs.value.splice(rIndex, 1)
  } else {
    activeIndexs.value.push(i)
  }
}

onMounted(() => {
  console.log('r', store.routeData.imgs)
  state.detail = store.routeData
})

onUnmounted(() => {
  console.log('onUnmounted')
})
</script>

<template>
  <div class="text-[14px] relative bg-[#f8f8f8] text-black p-2.5" id="Shop">
    <div>
      <div class="relative z-2 flex items-center h-9 box-border mb-2.5">
        <div
          class="rounded-[12px] h-full pr-0.75 pl-2.5 flex-[1] gap-2.5 flex items-center py-0 border-[2px] border-[red] border-solid"
        >
          <Icon class="text-[gray] text-[20px]" icon="tabler:search" />
          <div class="flex-[1]">50元话费充值</div>
          <Icon class="text-[gray] text-[20px]" color="gray" icon="lucide:camera" />
          <div
            class="bg-[#f23e5c] h-[85%] rounded-[10px] flex justify-center items-center text-white px-2.5 py-0"
          >
            搜索
          </div>
        </div>
        <div class="ml-2.5 flex flex-col items-center justify-between text-[12px]">
          <Icon class="text-[gray] text-[20px]" icon="ep:shopping-cart" />
        </div>
      </div>
    </div>
    <ScrollList
      class="relative! z-2! h-[calc(var(--vh,_1vh)_*_100_-_var(--footer-height)_*_2)]!"
      :api="recommendedShop"
    >
      <template v-slot="{ list }">
        <div class="mb-2.5">
          <div class="bg-white mb-2.5 rounded-[8px] px-3.75 py-2.5">
            <div class="flex overflow-x-auto box-border">
              <div
                class="w-[17vw] shrink-0 text-[13px] flex flex-col justify-center items-center"
                @click="_no"
              >
                <Icon class="text-[30px] mb-0.75" icon="lets-icons:order-light" />
                <div>我的订单</div>
              </div>
              <div
                class="w-[17vw] shrink-0 text-[13px] flex flex-col justify-center items-center"
                @click="_no"
              >
                <Icon
                  class="text-[30px] mb-0.75"
                  icon="material-symbols-light:charging-station-outline"
                />
                <div>手机充值</div>
              </div>
              <div
                class="w-[17vw] shrink-0 text-[13px] flex flex-col justify-center items-center"
                @click="_no"
              >
                <Icon class="text-[30px] mb-0.75" icon="system-uicons:message" />
                <div>购物消息</div>
              </div>
              <div
                class="w-[17vw] shrink-0 text-[13px] flex flex-col justify-center items-center"
                @click="_no"
              >
                <Icon class="text-[30px] mb-0.75" icon="fluent:location-16-regular" />
                <div>小时达</div>
              </div>
              <div
                class="w-[17vw] shrink-0 text-[13px] flex flex-col justify-center items-center"
                @click="_no"
              >
                <Icon class="text-[30px] mb-0.75" icon="dashicons:money-alt" />
                <div>退款/售后</div>
              </div>
              <div
                class="w-[17vw] shrink-0 text-[13px] flex flex-col justify-center items-center"
                @click="_no"
              >
                <Icon class="text-[30px] mb-0.75" icon="icon-park-outline:clothes-turtleneck" />
                <div>潮流服饰</div>
              </div>
            </div>
          </div>
          <div class="bg-white mb-1.25 rounded-[8px] px-3.75 py-2.5">
            <div class="flex">
              <div
                class="flex flex-col justify-center items-center w-[25%] text-[12px] text-[gray]"
              >
                <img class="w-[80%]" src="@/assets/img/icon/shop/baiyibutie.png" alt="" />
                <span>38节补贴</span>
              </div>
              <div
                class="flex flex-col justify-center items-center w-[25%] text-[12px] text-[gray]"
              >
                <img class="w-[80%]" src="@/assets/img/icon/shop/1.webp" alt="" />
                <span class="text-[red] text-[16px] font-bold">
                  <span class="text-[10px]">￥</span>
                  <span>470</span>
                </span>
              </div>
              <div
                class="flex flex-col justify-center items-center w-[25%] text-[12px] text-[gray]"
              >
                <img class="w-[80%]" src="@/assets/img/icon/shop/2.webp" alt="" />
                <span class="text-[red] text-[16px] font-bold">
                  <span class="text-[10px]">￥</span>
                  <span>699</span>
                </span>
              </div>
              <div
                class="flex flex-col justify-center items-center w-[25%] text-[12px] text-[gray]"
              >
                <img class="w-[80%]" src="@/assets/img/icon/shop/3.png" alt="" />
                <span class="text-[red] text-[16px] font-bold">
                  <span class="text-[10px]">￥</span>
                  <span>8.8</span>
                </span>
              </div>
              <div
                class="flex flex-col justify-center items-center w-[25%] text-[12px] text-[gray]"
              >
                <img class="w-[80%]" src="@/assets/img/icon/shop/4.jpg" alt="" />
                <span class="text-[red] text-[16px] font-bold">
                  <span class="text-[10px]">￥</span>
                  <span>2.99</span>
                </span>
              </div>
            </div>
          </div>
        </div>
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
                      <div class="text-[22px] font-bold [transform:translateY(2px)]">
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
    <BaseFooter class="left-0!" v-bind:init-tab="2" :is-white="true" />
  </div>
</template>

<script setup lang="tsx">
import { useNav } from '@/utils/hooks/useNav'
import { _checkImgUrl, _no } from '@/utils'
import ScrollList from '@/components/ScrollList.vue'
import { recommendedShop } from '@/api/user'
import WaterfallList from '@/components/WaterfallList.vue'

defineOptions({
  name: 'Shop'
})

const nav = useNav()
</script>

<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 text-[14px] bg-[var(--color-message)] text-white"
    id="Message"
    ref="app"
  >
    <div class="h-[calc(var(--vh,_1vh)_*_100)] flex flex-col" v-show="!data.searching">
      <header
        class="flex justify-between items-center h-[var(--common-header-height)] box-border relative text-[24px] px-5 py-0"
      >
        <Icon @click="data.createChatDialog = true" icon="formkit:add" />
        <Icon icon="tabler:camera-selfie" />
        <Icon @click="data.searching = true" icon="tabler:search" />
      </header>

      <Scroll class="flex-[1]! pt-2.5! pb-[var(--footer-height)]!" ref="mainScroll">
        <div class="overflow-x-scroll flex text-[14px] gap-5 px-2.5 py-0">
          <div
            class="group/friend w-17.5 min-w-17.5"
            @click="nav('/message/chat')"
            :key="index"
            v-for="(item, index) in store.friends.all"
          >
            <div
              class="group-last/friend:h-17.5 group-last/friend:rounded-[50%] group-last/friend:flex group-last/friend:items-center group-last/friend:justify-center group-last/friend:bg-[var(--second-btn-color-tran)] group-last/friend:mb-2.5 relative mb-1.5 w-full"
              :class="[
                index % 2 === 0
                  ? 'before:content-[\'_\'] before:w-4.5 before:h-4.5 before:bg-[#73fe49] before:rounded-[50%] before:absolute before:bottom-0 before:right-0 before:border-[4px] before:border-black before:border-solid'
                  : ''
              ]"
            >
              <img
                class="group-last/friend:w-8.75 group-last/friend:h-8.75 w-full h-full rounded-[50%]"
                :src="_checkImgUrl(item.avatar)"
                alt=""
              />
            </div>
            <span
              class="w-16 text-[12px] text-white block text-center [word-break:break-all] whitespace-nowrap text-ellipsis overflow-hidden"
              >{{ item.name }}</span
            >
          </div>
          <div class="group/friend w-17.5 min-w-17.5">
            <div
              class="group-last/friend:h-17.5 group-last/friend:rounded-[50%] group-last/friend:flex group-last/friend:items-center group-last/friend:justify-center group-last/friend:bg-[var(--second-btn-color-tran)] group-last/friend:mb-2.5 relative mb-1.5 w-full"
            >
              <img
                class="group-last/friend:w-8.75 group-last/friend:h-8.75 w-full h-full rounded-[50%]"
                src="../../assets/img/icon/message/setting.png"
                alt=""
              />
            </div>
            <span
              class="w-16 text-[12px] text-white block text-center [word-break:break-all] whitespace-nowrap text-ellipsis overflow-hidden"
              >状态设置</span
            >
          </div>
        </div>
        <div class="mt-5">
          <!--      粉丝-->
          <div class="flex items-center active:bg-[#393939]" @click="nav('/message/fans')">
            <div class="relative">
              <img
                class="ml-5 mr-3.75 w-13.75 h-13.75 rounded-[50%]"
                src="../../assets/img/icon/msg-icon1.png"
                alt=""
              />
            </div>
            <div class="flex-[1] flex justify-between px-0 py-4">
              <div>
                <div class="text-[16px] text-white flex items-start">
                  <span>新朋友</span>
                </div>
                <div
                  class="text-[color:var(--second-text-color)] text-[14px] mt-1 flex items-center"
                >
                  xxx 关注了你
                </div>
              </div>
              <div class="mr-5 flex items-center">
                <dy-back class="w-3.75! h-3.75" mode="gray" img="back" direction="right" />
              </div>
            </div>
          </div>
          <!--      互动消息-->
          <div class="flex items-center active:bg-[#393939]" @click="nav('/message/all')">
            <div class="relative">
              <img
                class="ml-5 mr-3.75 w-13.75 h-13.75 rounded-[50%]"
                src="../../assets/img/icon/msg-icon2.png"
                alt=""
              />
            </div>
            <div class="flex-[1] flex justify-between px-0 py-4">
              <div>
                <div class="text-[16px] text-white flex items-start">
                  <span>互动消息</span>
                </div>
                <div
                  class="text-[color:var(--second-text-color)] text-[14px] mt-1 flex items-center"
                >
                  xxx 近期访问过你的主页
                </div>
              </div>
              <div class="mr-5 flex items-center">
                <dy-back class="w-3.75! h-3.75" mode="gray" img="back" direction="right" />
              </div>
            </div>
          </div>
          <!--      消息-->
          <div class="flex items-center active:bg-[#393939]" @click="nav('/message/chat')">
            <div
              class="relative before:content-['_'] before:w-3 before:h-3 before:bg-[#73fe49] before:rounded-[50%] before:absolute before:bottom-0 before:right-3.75 before:border-[3px] before:border-black before:border-solid"
            >
              <img
                class="ml-5 mr-3.75 w-13.75 h-13.75 rounded-[50%]"
                src="../../assets/img/icon/avatar/2.png"
                alt=""
              />
            </div>
            <div class="flex-[1] flex justify-between px-0 py-4">
              <div>
                <div class="text-[16px] text-white flex items-start">
                  <span>{{ store.userinfo.nickname }}</span>
                </div>
                <div
                  class="text-[color:var(--second-text-color)] text-[14px] mt-1 flex items-center"
                >
                  哈哈哈哈哈哈
                  <div
                    class="inline-block rounded-[50%] w-[1.5px] h-[1.5px] bg-[var(--second-text-color)] mx-2"
                  ></div>
                  10-10
                </div>
              </div>
              <div class="mr-5 flex items-center">
                <!--                          <div class="not-read"></div>-->
                <!--                          <img class="camera" src="../../assets/img/icon/close-white.png" alt="">-->
                <!--            <img class="arrow" src="../../assets/img/icon/close-white.png" alt="">-->
                <div
                  class="text-[12px] block text-white rounded-[10px] bg-[var(--primary-btn-color)] px-1.5 py-0.25"
                >
                  2
                </div>
              </div>
            </div>
          </div>
          <!--      抖音小助手-->
          <div class="flex items-center active:bg-[#393939]" @click="nav('/message/douyin-helper')">
            <div class="relative">
              <img
                class="ml-5 mr-3.75 w-13.75 h-13.75 rounded-[50%]"
                src="../../assets/img/icon/msg-icon5.webp"
                alt=""
              />
            </div>
            <div class="flex-[1] flex justify-between px-0 py-4">
              <div>
                <div class="text-[16px] text-white flex items-start">
                  <span>抖音小助手</span>
                  <span
                    class="ml-1.25 text-[10px] bg-[var(--second-btn-color-tran)] text-[color:var(--second-text-color)] rounded-[2px] px-1.25 py-0.5"
                    >官方</span
                  >
                </div>
                <div
                  class="text-[color:var(--second-text-color)] text-[14px] mt-1 flex items-center"
                >
                  #今天谁请客呢
                  <div
                    class="inline-block rounded-[50%] w-[1.5px] h-[1.5px] bg-[var(--second-text-color)] mx-2"
                  ></div>
                  星期四
                </div>
              </div>
              <div class="mr-5 flex items-center">
                <div
                  class="w-1.75 h-1.75 rounded-[50%] bg-[var(--primary-btn-color)] mr-1.25"
                ></div>
              </div>
            </div>
          </div>
          <!--      系统通知-->
          <div class="flex items-center active:bg-[#393939]" @click="nav('/message/system-notice')">
            <div class="relative">
              <img
                class="ml-5 mr-3.75 w-13.75 h-13.75 rounded-[50%]"
                src="../../assets/img/icon/msg-icon4.png"
                alt=""
              />
            </div>
            <div class="flex-[1] flex justify-between px-0 py-4">
              <div>
                <div class="text-[16px] text-white flex items-start">
                  <span>系统通知</span>
                  <span
                    class="ml-1.25 text-[10px] bg-[var(--second-btn-color-tran)] text-[color:var(--second-text-color)] rounded-[2px] px-1.25 py-0.5"
                    >官方</span
                  >
                </div>
                <div
                  class="text-[color:var(--second-text-color)] text-[14px] mt-1 flex items-center"
                >
                  协议修订通知
                  <div
                    class="inline-block rounded-[50%] w-[1.5px] h-[1.5px] bg-[var(--second-text-color)] mx-2"
                  ></div>
                  08-31
                </div>
              </div>
              <div class="mr-5 flex items-center">
                <div
                  class="w-1.75 h-1.75 rounded-[50%] bg-[var(--primary-btn-color)] mr-1.25"
                ></div>
              </div>
            </div>
          </div>
          <!--      求更新-->
          <div class="flex items-center active:bg-[#393939]" @click="nav('/me/request-update')">
            <div class="relative">
              <img
                class="ml-5 mr-3.75 w-13.75 h-13.75 rounded-[50%]"
                src="../../assets/img/icon/msg-icon7.webp"
                alt=""
              />
            </div>
            <div class="flex-[1] flex justify-between px-0 py-4">
              <div>
                <div class="text-[16px] text-white flex items-start">
                  <span>求更新</span>
                  <span
                    class="ml-1.25 text-[10px] bg-[var(--second-btn-color-tran)] text-[color:var(--second-text-color)] rounded-[2px] px-1.25 py-0.5"
                    >官方</span
                  >
                </div>
                <div
                  class="text-[color:var(--second-text-color)] text-[14px] mt-1 flex items-center"
                >
                  你收到过1次求更新
                  <div
                    class="inline-block rounded-[50%] w-[1.5px] h-[1.5px] bg-[var(--second-text-color)] mx-2"
                  ></div>
                  10-09
                </div>
              </div>
              <div class="mr-5 flex items-center">
                <div
                  class="w-1.75 h-1.75 rounded-[50%] bg-[var(--primary-btn-color)] mr-1.25"
                ></div>
              </div>
            </div>
          </div>
          <!--      任务通知-->
          <div class="flex items-center active:bg-[#393939]" @click="nav('/message/task-notice')">
            <div class="relative">
              <img
                class="ml-5 mr-3.75 w-13.75 h-13.75 rounded-[50%]"
                src="../../assets/img/icon/msg-icon6.webp"
                alt=""
              />
            </div>
            <div class="flex-[1] flex justify-between px-0 py-4">
              <div>
                <div class="text-[16px] text-white flex items-start">
                  <span>任务通知</span>
                  <span
                    class="ml-1.25 text-[10px] bg-[var(--second-btn-color-tran)] text-[color:var(--second-text-color)] rounded-[2px] px-1.25 py-0.5"
                    >官方</span
                  >
                </div>
                <div
                  class="text-[color:var(--second-text-color)] text-[14px] mt-1 flex items-center"
                >
                  发作品得流量
                  <div
                    class="inline-block rounded-[50%] w-[1.5px] h-[1.5px] bg-[var(--second-text-color)] mx-2"
                  ></div>
                  05-26
                </div>
              </div>
              <div class="mr-5 flex items-center">
                <div
                  class="w-1.75 h-1.75 rounded-[50%] bg-[var(--primary-btn-color)] mr-1.25"
                ></div>
              </div>
            </div>
          </div>
          <!--      直播通知-->
          <div class="flex items-center active:bg-[#393939]" @click="nav('/message/live-notice')">
            <div class="relative">
              <img
                class="ml-5 mr-3.75 w-13.75 h-13.75 rounded-[50%]"
                src="../../assets/img/icon/msg-icon8.webp"
                alt=""
              />
            </div>
            <div class="flex-[1] flex justify-between px-0 py-4">
              <div>
                <div class="text-[16px] text-white flex items-start">
                  <span>直播通知</span>
                  <span
                    class="ml-1.25 text-[10px] bg-[var(--second-btn-color-tran)] text-[color:var(--second-text-color)] rounded-[2px] px-1.25 py-0.5"
                    >官方</span
                  >
                </div>
                <div
                  class="text-[color:var(--second-text-color)] text-[14px] mt-1 flex items-center"
                >
                  举报结果通知
                  <div
                    class="inline-block rounded-[50%] w-[1.5px] h-[1.5px] bg-[var(--second-text-color)] mx-2"
                  ></div>
                  05-26
                </div>
              </div>
              <div class="mr-5 flex items-center">
                <div
                  class="w-1.75 h-1.75 rounded-[50%] bg-[var(--primary-btn-color)] mr-1.25"
                ></div>
              </div>
            </div>
          </div>
          <!--      钱包通知-->
          <div class="flex items-center active:bg-[#393939]" @click="nav('/message/money-notice')">
            <div class="relative">
              <img
                class="ml-5 mr-3.75 w-13.75 h-13.75 rounded-[50%]"
                src="../../assets/img/icon/msg-icon9.webp"
                alt=""
              />
            </div>
            <div class="flex-[1] flex justify-between px-0 py-4">
              <div>
                <div class="text-[16px] text-white flex items-start">
                  <span>钱包通知</span>
                  <span
                    class="ml-1.25 text-[10px] bg-[var(--second-btn-color-tran)] text-[color:var(--second-text-color)] rounded-[2px] px-1.25 py-0.5"
                    >官方</span
                  >
                </div>
                <div
                  class="text-[color:var(--second-text-color)] text-[14px] mt-1 flex items-center"
                >
                  卡券发放提醒
                  <div
                    class="inline-block rounded-[50%] w-[1.5px] h-[1.5px] bg-[var(--second-text-color)] mx-2"
                  ></div>
                  05-26
                </div>
              </div>
              <div class="mr-5 flex items-center">
                <div
                  class="w-1.75 h-1.75 rounded-[50%] bg-[var(--primary-btn-color)] mr-1.25"
                ></div>
              </div>
            </div>
          </div>

          <NoMore />

          <!--      模板-->
          <!--      <div class="message">-->
          <!--        <div class="avatar on-line">-->
          <!--          <img src="../../assets/img/icon/avatar/2.png" alt="" class="head-image">-->
          <!--        </div>-->
          <!--        <div class="content">-->
          <!--          <div class="left">-->
          <!--            <div class="name">-->
          <!--              <span>粉丝</span>-->
          <!--              <span class="tag">官方</span>-->
          <!--            </div>-->
          <!--            <div class="detail">-->
          <!--              <img class="sent" src="../../assets/img/icon/close-white.png" alt="">-->
          <!--              已送达 ，sb，凌晨 01:15-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          <div class="right">-->
          <!--            &lt;!&ndash;                          <div class="not-read"></div>&ndash;&gt;-->
          <!--            &lt;!&ndash;                          <img class="camera" src="../../assets/img/icon/close-white.png" alt="">&ndash;&gt;-->
          <!--            &lt;!&ndash;            <img class="arrow" src="../../assets/img/icon/close-white.png" alt="">&ndash;&gt;-->
          <!--            <div class="badge">12</div>-->
          <!--          </div>-->
          <!--        </div>-->
          <!--      </div>-->
        </div>
      </Scroll>
      <from-bottom-dialog page-id="Message" v-model="data.createChatDialog">
        <div class="min-h-[70vh] pb-15 mt-1.5" v-show="!data.showJoinedChat">
          <Search
            class="mx-5!"
            :isShowRightText="data.isShowRightText"
            @click="data.isShowRightText = true"
            @notice="data.isShowRightText = false"
            @clear="data.isShowRightText = false"
            placeholder="搜索用户"
            v-model="data.createChatSearchKey"
          ></Search>
          <template v-if="data.createChatSearchKey">
            <div class="px-5 py-0" v-if="data.searchFriends.length">
              <div
                class="mb-5 flex items-center nth-[1]:mt-2.5"
                :key="i"
                v-for="(item, i) in data.searchFriends"
                @click="handleClick(item)"
              >
                <img
                  class="w-12 h-12 rounded-[50%] mr-2.5"
                  src="../../assets/img/icon/head-image.jpeg"
                  alt=""
                />
                <div class="text-[14px] flex-[1] flex items-center justify-between">
                  <div class="flex flex-col">
                    <span class="text-[14px]">{{ item.name }}</span>
                    <span class="text-[13px] text-[color:var(--second-text-color)]">{{
                      item.account ? '抖音号:' + item.account : ''
                    }}</span>
                  </div>
                  <img
                    class="h-5"
                    v-if="item.select"
                    src="../../assets/img/icon/message/checked.png"
                    alt=""
                  />
                  <img
                    class="h-5"
                    v-if="!item.select"
                    src="../../assets/img/icon/message/no-check2.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="h-[50vh] flex items-center justify-center flex-col" v-else>
              <div class="text-[16px]">搜索结果为空</div>
              <div class="mt-2.5 text-[14px] text-[color:var(--second-text-color)]">
                没有搜索到相关的联系人
              </div>
            </div>
          </template>
          <template v-else>
            <div
              class="border-b-[1px] [border-bottom-style:solid] border-b-[var(--line-color)] h-12.5 flex items-center px-5 py-0"
              @click="data.showJoinedChat = true"
            >
              <img
                class="w-5.5 h-5.5 ml-2.5 mr-5"
                src="../../assets/img/icon/people-gray.png"
                alt=""
              />
              <div class="text-[14px] flex-[1] flex items-center justify-between">
                <span>已加入的群聊</span>
                <dy-back class="h-3.75" direction="right" mode="light"></dy-back>
              </div>
            </div>
            <div class="px-5 py-0">
              <div class="h-15 leading-[60px] text-[14px]">Z</div>
              <div
                class="mb-5 flex items-center nth-[1]:mt-2.5"
                :key="i"
                v-for="(item, i) in store.friends.all"
                @click="item.select = !item.select"
              >
                <img
                  class="w-12 h-12 rounded-[50%] mr-2.5"
                  :src="_checkImgUrl(item.avatar)"
                  alt=""
                />
                <div class="text-[14px] flex-[1] flex items-center justify-between">
                  <span>{{ item.name }}</span>
                  <Check class="h-5! w-5!" mode="red" v-model="item.select" />
                </div>
              </div>
            </div>
          </template>
          <div
            class="fixed bottom-0 left-0 right-0 bg-[var(--main-bg)] flex items-center justify-center pb-5"
          >
            <div
              class="w-[calc(100%_-_40px)] h-10 flex items-center text-[14px] justify-center rounded-[10px] bg-[var(--primary-btn-color)]"
            >
              发起群聊{{ selectFriends ? `(${selectFriends})` : '' }}
            </div>
          </div>
        </div>
        <div class="min-h-[70vh]" v-show="data.showJoinedChat">
          <div class="text-[17px] flex justify-between p-5">
            <dy-back
              class="h-5"
              @click="data.showJoinedChat = false"
              mode="light"
              scale="1.2"
            ></dy-back>
            <span>已加入的群聊</span>
            <span>&nbsp;</span>
          </div>

          <div class="px-5 py-0">
            <div
              class="mb-5 flex items-center relative overflow-hidden last:mb-0 nth-[1]:mt-2.5"
              :key="i"
              v-for="(item, i) in 15"
            >
              <img
                class="w-12 h-12 rounded-[50%] mr-2.5"
                src="../../assets/img/icon/head-image.jpeg"
                alt=""
              />
              <div class="text-[14px] flex-[1] flex items-center justify-between">
                <div class="box-border flex items-center">
                  <div>
                    {{ data.text.length > 20 ? data.text.substr(0, 20) + '...' : data.text }}
                  </div>
                  <div class="ml-1.25 text-[color:var(--second-text-color)]">(3)</div>
                </div>
                <dy-back class="h-3.75" direction="right" mode="light"></dy-back>
              </div>
            </div>
          </div>
          <NoMore></NoMore>
        </div>
      </from-bottom-dialog>

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
          class="fixed z-11 top-0 left-0 w-[100vw] h-[calc(var(--vh,_1vh)_*_100)] flex items-center justify-center"
          v-if="data.isShowRecommend"
        >
          <div class="relative z-4 bg-white w-[85vw] h-[80vh] rounded-[12px] overflow-hidden">
            <div
              class="text-black border-b-[1px] [border-bottom-style:solid] border-b-[whitesmoke] flex items-center justify-between p-[var(--page-padding)]"
            >
              <img
                class="w-5 opacity-0"
                src="../../assets/img/icon/components/gray-close-full2.png"
                alt=""
              />
              <div class="flex items-center">
                <span>朋友推荐</span>
                <img class="ml-0.75 w-3.75" src="../../assets/img/icon/about-gray.png" alt="" />
              </div>
              <img
                class="w-5"
                @click="data.isShowRecommend = false"
                src="../../assets/img/icon/components/gray-close-full2.png"
                alt=""
              />
            </div>
            <div
              class="pt-0 pb-[var(--page-padding)] h-[calc(80vh_-_50px)] overflow-auto px-[var(--page-padding)]"
            >
              <Scroll
                class="flex-[1]! pt-2.5! pb-[var(--footer-height)]! h-[calc(80vh_-_50px)]!"
                ref="scroll"
                @pulldown="loadRecommendData"
              >
                <Peoples v-model:list="data.recommend" :loading="data.loading" mode="recommend" />
                <Loading :is-full-screen="false" v-if="data.loading" />
                <NoMore v-else />
              </Scroll>
            </div>
          </div>
          <BaseMask />
        </div>
      </transition>
      <BaseFooter v-bind:init-tab="4" />
    </div>

    <div class="p-[var(--page-padding)]" v-show="data.searching">
      <Search
        v-model="data.searchKey"
        right-text="取消"
        right-text-color="white"
        @notice="data.searching = false"
        :isShowRightText="true"
      />
      <div>
        <template v-if="data.searchKey">
          <div
            class="mt-[var(--page-padding)] text-[color:var(--second-text-color)] text-[12px] flex items-center justify-between"
            v-if="searchFriendsAll.length"
          >
            <span>联系人</span>
            <div
              class="flex items-center"
              v-if="searchFriendsAll.length > 3"
              @click="nav('/message/more-search', { key: data.searchKey })"
            >
              <span>更多联系人</span>
              <dy-back mode="gray" img="back" scale=".6" direction="right" />
            </div>
          </div>
          <People
            v-for="item in searchFriendsAll.slice(0, 3)"
            :key="item.id"
            mode="search"
            :searchKey="data.searchKey"
            :people="item"
          />
          <div
            class="flex items-center justify-between pt-[var(--page-padding)] mt-[var(--page-padding)] border-t-[1px] [border-top-style:solid] border-t-[var(--line-color)]"
            @click="nav('/home/search', { key: data.searchKey })"
          >
            <img
              class="rounded-[50%] bg-[var(--second-btn-color-tran)] w-5.5 h-5.5 mr-2.5 p-3.25"
              src="../../assets/img/icon/search-light.png"
              alt=""
            />
            <div class="flex-[1] flex items-center justify-between">
              <div class="flex flex-col justify-between">
                <span
                  >搜索 <span class="text-[yellow]">{{ data.searchKey }}</span></span
                >
                <span class="text-[12px] text-[color:var(--second-text-color)] mt-1.25"
                  >视频、用户、音乐、话题、地点等</span
                >
              </div>
              <dy-back mode="gray" img="back" direction="right" scale=".7" />
            </div>
          </div>
        </template>
        <template v-else>
          <div
            class="mt-[var(--page-padding)] text-[color:var(--second-text-color)] text-[12px] flex items-center justify-between"
          >
            更多聊天
          </div>
          <People v-for="item in data.moreChat" :key="item.id" :people="item" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from '../../components/Search.vue'
import FromBottomDialog from '../../components/dialog/FromBottomDialog.vue'
import Check from '../../components/Check.vue'
import Peoples from '../people/components/Peoples.vue'
import People from '../people/components/Peoples.vue'
import Scroll from '../../components/Scroll.vue'
import { useBaseStore } from '@/store/pinia'

import { computed, onMounted, reactive, watch } from 'vue'
import { useNav } from '@/utils/hooks/useNav.js'
import { _checkImgUrl, _sleep, cloneDeep } from '@/utils'
import { useScroll } from '@/utils/hooks/useScroll'

defineOptions({
  name: 'Message'
})

const mainScroll = useScroll()
const store = useBaseStore()
const nav = useNav()
const data = reactive({
  isShowRecommend: false,
  searching: false,
  searchKey: '',
  createChatSearchKey: '',
  showJoinedChat: false,
  loading: false,
  createChatDialog: false,
  isShowRightText: false,
  text: 'AAAAAAAAA、BBBBBBBBBBBBB、CCCCCCCC',
  searchFriends: [],
  recommend: [],
  moreChat: []
})

onMounted(() => {
  console.log('create')
  data.recommend = cloneDeep(store.friends.all)
  data.recommend.map((v) => {
    v.type = -2
  })
  data.moreChat = cloneDeep(store.friends.all.slice(0, 3))
})

const selectFriends = computed(() => {
  return store.friends.all.filter((v) => v.select).length
})

const searchFriendsAll = computed(() => {
  return store.friends.all.filter((v) => {
    return v.name.search(data.searchKey) !== -1 || v.account.search(data.searchKey) !== -1
  })
})

watch(
  () => data.createChatSearchKey,
  (newVal) => {
    if (newVal) {
      //TODO 搜索时仅仅判断是否包含了对应字符串，抖音做了拼音判断的
      data.searchFriends = store.friends.all.filter((v) => {
        if (v.name.includes(newVal)) return true
        return v.account.includes(newVal)
      })
    } else {
      data.searchFriends = []
    }
  }
)

function handleClick(item) {
  item.select = !item.select
  data.createChatSearchKey = ''
}

async function loadRecommendData() {
  if (data.loading) return
  data.loading = true
  await _sleep(500)
  data.loading = false
  let temp = cloneDeep(store.friends.all)
  temp.map((v) => {
    v.type = -2
  })
  data.recommend = data.recommend.concat(temp)
}
</script>

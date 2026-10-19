<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]">
    <BaseHeader class="z-7!" backImg="close">
      <template v-slot:center>
        <span class="text-[16px]">私信给</span>
      </template>
      <template v-slot:bottom>
        <div
          class="border-b-[1px] [border-bottom-style:solid] border-b-[#cccccc11] text-[14px] pr-0 pl-[var(--page-padding)] h-12.5 rounded-[2px] flex items-center py-0"
        >
          <div v-if="data.selectFriends.length">
            <div class="flex max-w-[70vw] overflow-x-auto">
              <img
                class="h-7.5 w-7.5 mr-2.5 rounded-[50%]"
                :src="_checkImgUrl(item.avatar)"
                :key="i"
                v-for="(item, i) in data.selectFriends"
                @click="toggleSelect(item)"
              />
            </div>
          </div>
          <img
            class="h-5 w-5 mx-2.5 my-0"
            v-else
            src="../../assets/img/icon/search-gray.png"
            alt=""
          />
          <input
            class="text-white h-[50%] w-full [outline:none] bg-transparent p-0 border-[0] border-current border-none placeholder:text-[color:var(--second-text-color)]"
            type="text"
            placeholder="搜索"
            v-model="data.searchKey"
          />
          <img
            class="h-4.5 w-4.5 mx-2.5"
            v-if="data.searchKey"
            @click="clear"
            src="../../assets/img/icon/components/gray-close-full.png"
          />
        </div>
      </template>
    </BaseHeader>
    <div
      :class="[
        '',
        data.selectFriends.length && data.searchResult.length
          ? 'h-[calc(100%_-_272px)]'
          : 'h-[calc(100%_-_112px)]'
      ]"
      class="bg-[var(--main-bg)] fixed z-5 left-0 h-[calc(100%_-_112px)] top-28 box-border w-full overflow-y-scroll"
      v-show="data.searchKey"
    >
      <div v-if="data.searchResult.length">
        <div
          class="flex items-center px-5 py-2.5 active:bg-[#23293a]"
          :key="i"
          v-for="(item, i) of data.searchResult"
          @click="handleClick(item)"
        >
          <Check class="h-5.5! w-5.5! mr-3.75" mode="red" v-model="item.select" />
          <img
            class="h-11.25 w-11.25 rounded-[50%] mr-3.75"
            :src="_checkImgUrl(item.avatar)"
            alt=""
          />
          <div class="flex flex-col">
            <span>
              <span v-if="item.name.indexOf(data.searchKey) > -1">
                {{ item.name.substr(0, item.name.indexOf(data.searchKey))
                }}<span class="text-[#ffd800]">{{ data.searchKey }}</span
                >{{ item.name.substr(item.name.indexOf(data.searchKey) + data.searchKey.length) }}
              </span>
              <span v-else>{{ item.name }}</span>
            </span>
            <span
              class="mt-1.25 text-[12px] text-[color:var(--second-text-color)]"
              v-if="item.account"
            >
              抖音号：
              <span v-if="item.account.indexOf(data.searchKey) > -1">
                {{ item.account.substr(0, item.account.indexOf(data.searchKey))
                }}<span class="text-[#ffd800]">{{ data.searchKey }}</span
                >{{
                  item.account.substr(item.account.indexOf(data.searchKey) + data.searchKey.length)
                }}
              </span>
              <span v-else>{{ item.account }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center" v-else>
        <img class="mt-37.5 h-37.5" src="../../assets/img/icon/no-result.png" alt="" />
        <span class="mt-10 text-[16px]">搜索结果为空</span>
        <span class="mt-5 text-[12px] text-[color:var(--second-text-color)]"
          >没有搜索到相关的联系人</span
        >
      </div>
    </div>
    <div
      :class="['', data.selectFriends.length ? 'pb-40' : 'pb-0']"
      class="h-[calc(100%_-_112px)] mt-28 box-border w-full overflow-y-scroll"
      ref="list"
      @scroll="scroll"
    >
      <div>
        <div
          class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
          @click="nav('/message/joined-group-chat')"
        >
          <span>已加入的群聊</span>
          <dy-back :scale="0.7" direction="right"></dy-back>
        </div>
        <div class="text-[12px] text-[color:var(--second-text-color)] px-5 py-2.5">最近聊天</div>
        <div
          class="flex items-center px-5 py-2.5 active:bg-[#23293a]"
          :key="i"
          v-for="(item, i) of data.friends.recent"
          @click="toggleSelect(item)"
        >
          <Check class="h-5.5! w-5.5! mr-3.75" mode="red" v-model="item.select" />
          <img
            class="h-11.25 w-11.25 rounded-[50%] mr-3.75"
            :src="_checkImgUrl(item.avatar)"
            alt=""
          />
          <span>{{ item.name }}</span>
        </div>
        <div class="text-[12px] text-[color:var(--second-text-color)] px-5 py-2.5">互关好友</div>
        <div
          class="flex items-center px-5 py-2.5 active:bg-[#23293a]"
          :key="i"
          v-for="(item, i) of data.friends.eachOther"
          @click="toggleSelect(item)"
        >
          <Check class="h-5.5! w-5.5! mr-3.75" mode="red" v-model="item.select" />
          <img
            class="h-11.25 w-11.25 rounded-[50%] mr-3.75"
            :src="_checkImgUrl(item.avatar)"
            alt=""
          />
          <span>{{ item.name }}</span>
        </div>
        <div class="text-[12px] text-[color:var(--second-text-color)] px-5 py-2.5">全部</div>
        <div :key="name" v-for="(value, name) of data.friendsSort">
          <div
            :data-letter="name === '#' ? 'top' : name"
            class="text-[12px] text-[color:var(--second-text-color)] px-5 py-2.5"
          >
            <span>{{ name }}</span>
          </div>
          <div
            class="flex items-center px-5 py-2.5 active:bg-[#23293a]"
            :key="i"
            v-for="(item, i) of value"
            @click="toggleSelect(item)"
          >
            <Check class="h-5.5! w-5.5! mr-3.75" mode="red" v-model="item.select" />
            <img
              class="h-11.25 w-11.25 rounded-[50%] mr-3.75"
              :src="_checkImgUrl(item.avatar)"
              alt=""
            />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div
        class="fixed z-4 bottom-0 box-border w-[100vw] h-40 bg-[var(--main-bg)] flex flex-col justify-between"
        v-if="data.selectFriends.length && data.searchResult.length"
      >
        <div class="flex flex-[1] px-5 py-0">
          <textarea
            class="flex-[1] [outline:none] bg-transparent text-[#fff] border-[0] border-current border-none"
            placeholder="有什么想和好友说的..."
          ></textarea>
          <img class="ml-5 h-10 w-10" src="../../assets/img/poster/1.jpg" alt="" />
        </div>
        <div class="p-2.5">
          <div
            class="flex items-center text-[color:var(--second-text-color)] m-2.5"
            v-if="data.selectFriends.length > 1"
          >
            <Check class="mr-2.5 w-4! h-4!" mode="red" v-model="data.isCreateChat" />
            <span>创建群聊</span>
          </div>
          <dy-button type="primary"
            >{{ data.selectFriends.length > 1 ? '分别发送' : '发送' }}
          </dy-button>
        </div>
      </div>
    </div>
    <div
      class="w-6.25 h-[calc(var(--vh,_1vh)_*_100)] top-0 fixed z-3 right-1.25 flex items-center justify-center"
    >
      <div data-contact-indicator="" class="w-6.25 flex flex-col items-center justify-between">
        <div
          data-contact-item=""
          class="text-[color:var(--second-text-color)] text-[10px] p-0.25"
          data-index="top"
        >
          #
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          A
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          B
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          C
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          D
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          E
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          F
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          G
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          H
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          I
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          J
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          K
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          L
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          M
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          N
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          O
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          P
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          Q
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          R
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          S
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          T
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          U
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          V
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          W
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          X
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          Y
        </div>
        <div data-contact-item="" class="text-[color:var(--second-text-color)] text-[10px] p-0.25">
          Z
        </div>
      </div>
    </div>
    <div
      class="absolute right-10 top-50 flex items-center justify-center"
      :style="{ top: data.currentFixedIndicatorTop }"
      ref="hover"
      v-if="data.currentFixedIndicator"
    >
      <img class="h-12.5" src="../../assets/img/icon/components/video/water.png" alt="" />
      <span class="absolute mr-2.5 text-[18px]">{{ data.currentFixedIndicator }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import Check from '../../components/Check.vue'
import { friends } from '@/api/user'
import { onMounted, reactive, ref, watch } from 'vue'
import { useNav } from '@/utils/hooks/useNav'
import { _checkImgUrl, cloneDeep } from '@/utils'

defineOptions({
  name: 'Share2Friend'
})

const nav = useNav()
const data = reactive({
  isCreateChat: false,
  searchKey: '',
  indexOffsetTop: {},
  currentFixedIndicator: '',
  currentFixedIndicatorTop: '0px',
  friends: {
    all: {},
    recent: [],
    eachOther: []
  },
  selectFriends: [],
  friendsSort: {},
  searchResult: []
})

onMounted(() => {
  getFriends()
  let indexs = document.querySelectorAll('[data-contact-index]')
  indexs.forEach((v) => {
    data.indexOffsetTop[v.children[0].innerText] = v.offsetTop
  })
  let items = document.querySelectorAll('[data-contact-item]')
  let item = document.querySelector(`[data-contact-item]:nth-child(2)`)
  let itemHeight = item.clientHeight
  let ul = document.querySelector('[data-contact-indicator]')
  let ulOffsetTop = ul.offsetTop
  ul.addEventListener('touchstart', (e) => {
    let pageY = e.touches[0].pageY - ulOffsetTop
    let currentIndex = pageY / itemHeight
    currentIndex = Math.floor(currentIndex)
    render(currentIndex)
    data.currentFixedIndicatorTop = e.touches[0].pageY - 28 + 'px'
  })
  ul.addEventListener('touchmove', (e) => {
    let pageY = e.touches[0].pageY - ulOffsetTop
    data.currentFixedIndicatorTop = e.touches[0].pageY - 28 + 'px'

    let currentIndex = pageY / itemHeight
    currentIndex = Math.floor(currentIndex)
    if (currentIndex >= 0 && currentIndex < 27) {
      render(currentIndex)
    }
  })
  ul.addEventListener('touchend', () => {
    return (data.currentFixedIndicator = '')
  })
  let render = (currentIndex) => {
    items.forEach((el) => {
      el.classList.remove('text-white', 'text-[color:var(--second-text-color)]')
      el.classList.add('text-[rgb(143,143,158)]')
    })
    items[currentIndex].classList.replace('text-[rgb(143,143,158)]', 'text-white')
    data.currentFixedIndicator = items[currentIndex].innerText
    goto(items[currentIndex])
  }
})

watch(
  () => data.searchKey,
  (newVal) => {
    let temp = cloneDeep(data.friends.all)
    temp.map((v) => {
      if (data.selectFriends.find((w) => w.id === v.id)) v.select = true
    })
    data.searchResult = temp.filter((v) => {
      return v.name.includes(newVal) || v.account.includes(newVal)
    })
  }
)

function handleClick(item) {
  toggleSelect(item)
  data.searchKey = ''
}

function clear() {
  console.log('clear')
  data.searchKey = ''
}

function toggleSelect(item) {
  //减少判断次数，找到了就跳出循环
  for (let i = 0; i < data.friends.recent.length; i++) {
    let v = data.friends.recent[i]
    if (v.name === item.name) {
      v.select = !v.select
      break
    }
  }

  for (let i = 0; i < data.friends.eachOther.length; i++) {
    let v = data.friends.eachOther[i]
    if (v.name === item.name) {
      v.select = !v.select
      break
    }
  }

  let find = false
  let keys = Object.keys(data.friendsSort)
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i]
    for (let j = 0; j < data.friendsSort[k].length; j++) {
      let value = data.friendsSort[k][j]
      if (value.name === item.name) {
        value.select = !value.select
        find = true
        break
      }
    }
    if (find) break
  }

  let resIndex = data.selectFriends.findIndex((v) => v.name === item.name)
  if (resIndex !== -1) {
    item.select = false
    data.selectFriends.splice(resIndex, 1)
  } else {
    item.select = true
    data.selectFriends.push(item)
  }
}

async function getFriends() {
  //TODO 这里的数据不对
  let res = await friends()
  console.log('getFriends', res)
  if (res.success) {
    data.friends = res.data
    data.friends.all = data.friends.all.sort((a, b) => {
      if (a.pinyin < b.pinyin) return -1
      if (a.pinyin > b.pinyin) return 1
      return 0
    })
    data.friends.all.map((v) => {
      if (data.friendsSort[v.pinyin]) {
        data.friendsSort[v.pinyin].push(v)
      } else {
        data.friendsSort[v.pinyin] = [v]
      }
    })
  }
}

const list = ref()

function goto(el) {
  let py
  if (el.dataset['index']) {
    py = 'top'
  } else {
    py = el.innerText
  }
  if (document.querySelector(`[data-letter="${py}"]`)) {
    list.value.scrollTop = document.querySelector(`[data-letter="${py}"]`).offsetTop - 100
  }
}

function scroll(e) {
  // let isFixed = document.querySelector(`.fixed`)
  // console.log(isFixed)
  // let listScrollTop = e.target.scrollTop + (isFixed ? 110 : 110)
  let listScrollTop = e.target.scrollTop + 110
  // console.log('listScrollTop', listScrollTop)
  let currentKey = null
  for (const key in data.indexOffsetTop) {
    // if (currentKey) break
    let offsetTop = data.indexOffsetTop[key]
    // console.log('offsetTop',offsetTop)
    if (offsetTop < listScrollTop) {
      currentKey = key
    }
  }
  data.currentFixedIndicator = currentKey
  // console.log('currentKey', currentKey)
}
</script>

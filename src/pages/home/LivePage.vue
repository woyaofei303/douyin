<template>
  <div class="w-full h-[calc(var(--vh,_1vh)_*_100)] text-white text-[14px] relative" ref="page">
    <div class="w-full h-[calc(var(--vh,_1vh)_*_100)] bg-black flex items-center justify-center">
      <video
        class="w-full object-cover"
        ref="videoEl"
        src="https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000cj1lq4jc77u0ng6s1gt0&amp;line=0&amp;file_id=bed51c00899b458cbc5d8280147c22a1&amp;sign=7749aec7bd62a3760065f60e40fc1867&amp;is_play_url=1&amp;source=PackSourceEnum_PUBLISH"
        poster="/images/jwWCPZVTIA4IKM-8WipLF.png"
        preload=""
        loop=""
        muted
        x5-video-player-type="h5-page"
        x5-video-player-fullscreen="false"
        webkit-playsinline="true"
        x5-playsinline="true"
        playsinline="true"
        fullscreen="false"
        autoplay=""
      >
        <p class="m-0 p-0">您的浏览器不支持 video 标签。</p>
      </video>
    </div>
    <div class="absolute top-0 w-full h-[calc(var(--vh,_1vh)_*_100)]">
      <div class="flex justify-between mt-2.5">
        <div class="ml-[var(--page-padding)]">
          <div
            class="box-border bg-[var(--second-btn-color-tran)] flex pr-1 pl-0.5 items-center rounded-[20px] py-0.75"
          >
            <img
              class="rounded-[50%] w-7.5 h-7.5 mr-1"
              :src="_checkImgUrl(userinfo.avatar_168x168.url_list[0])"
              alt=""
            />
            <div class="flex-[1] flex items-center justify-between">
              <div class="w-20">
                <div class="text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {{ userinfo.nickname }}
                </div>
                <div class="text-[gainsboro] text-[10px]">2万本场点赞</div>
              </div>
              <div
                class="h-7.5 w-11.25 bg-[var(--primary-btn-color)] rounded-[30px] flex items-center justify-center text-[12px]"
              >
                关注
              </div>
            </div>
          </div>
          <div class="mt-[calc(var(--page-padding)_/_2)] flex text-[12px]">
            <div
              class="flex items-center bg-[rgba(58,_58,_70,_0.3)] rounded-[20px] mr-2.5 px-2.5 py-1"
            >
              <img class="mr-1.25 w-2.5 h-2.5" src="../../assets/img/icon/home/jin.webp" alt="" />
              <span>唱歌</span>
            </div>
            <div
              class="flex items-center bg-[rgba(58,_58,_70,_0.3)] rounded-[20px] mr-2.5 px-2.5 py-1"
            >
              <img
                class="mr-1.25 w-2.5 h-2.5"
                src="../../assets/img/icon/home/rank-yellow.png"
                alt=""
              />
              <span>江苏第15名</span>
            </div>
          </div>
        </div>
        <div class="mt-0.75 flex flex-col">
          <div class="flex">
            <img
              class="w-7.5 h-7.5 rounded-[50%] mr-0.75"
              src="../../assets/img/icon/avatar/1.png"
              alt=""
            />
            <img
              class="w-7.5 h-7.5 rounded-[50%] mr-0.75"
              src="../../assets/img/icon/avatar/2.png"
              alt=""
            />
            <img
              class="w-7.5 h-7.5 rounded-[50%] mr-0.75"
              src="../../assets/img/icon/avatar/3.png"
              alt=""
            />
            <div
              class="w-7.5 h-7.5 rounded-[50%] mr-0.75 text-[12px] bg-[var(--second-btn-color-tran)] flex items-center justify-center"
            >
              107
            </div>
            <dy-back
              class="w-[calc(30px_-_12px)]! h-[calc(30px_-_12px)] rounded-[50%] mr-2.5 ml-1.25 p-1.5"
              img="close"
              mode="light"
              @click="$router.back()"
            />
          </div>
          <div class="flex justify-end">
            <div
              class="rounded-[13px_0_0_13px] pr-0 pl-2.5 mt-3.75 bg-[rgba(58,_58,_70,_0.3)] flex items-center text-[10px] py-0.5"
            >
              <!--              缺个icon-->
              <span>更多同城</span>
              <dy-back scale=".5" direction="right" img="back" mode="light" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="absolute bottom-0 w-full box-border pt-[var(--page-padding)] pb-2.5 flex px-[var(--page-padding)]"
      >
        <div class="w-[87%]">
          <div class="mb-2.5 overflow-auto h-[20vh]" ref="comments">
            <div class="min-h-[20vh] flex flex-col justify-end" ref="comments-wrapper">
              <div class="rounded-[10px] bg-[rgba(58,_58,_70,_0.3)] mb-1.25 px-1.25 py-1">
                <span class="text-[#a4eafd] [word-break:break-all]"
                  >欢迎来到直播间！抖音严禁未成年人直播或打赏，直接间内严禁出现违法违规、低俗色情、吸烟酗酒等内容。如主播在直播过程中以不当方式诱导打赏、私下交易，请谨慎判断，以防人身财产损失。请大家注意财产安全，谨防网络诈骗。</span
                >
              </div>
              <div
                class="rounded-[10px] bg-[rgba(58,_58,_70,_0.3)] mb-1.25 px-1.25 py-1"
                :key="j"
                v-for="(i, j) in list"
              >
                <div class="inline-block">
                  <div
                    class="flex items-center text-[10px] rounded-[10px] mr-1.25 bg-[#8285b9] px-1.5 py-0"
                  >
                    <img class="mr-0.75 w-3" src="../../assets/img/icon/home/level.webp" alt="" />
                    <span>30</span>
                  </div>
                </div>
                <span class="mr-1.25 text-[13px] text-[#a4eafd]">{{ i.name }}</span>
                <span class="[word-break:break-all]">{{ i.text }}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <div
              class="flex-[1] text-[#a2a2a2] text-[12px] rounded-[15px] bg-[rgba(58,_58,_70,_0.3)] flex items-center justify-between px-2.5 py-1"
            >
              <span>说点什么</span>
              <img class="w-5" src="../../assets/img/icon/home/voice.png" alt="" />
            </div>
            <img
              class="ml-2.5 w-5 h-5 bg-[rgba(58,_58,_70,_0.3)] rounded-[50%] p-1.25"
              src="../../assets/img/icon/home/more.png"
              alt=""
            />
            <img
              class="ml-2.5 w-5 h-5 bg-[rgba(58,_58,_70,_0.3)] rounded-[50%] p-1.25"
              src="../../assets/img/icon/home/love.webp"
              alt=""
            />
            <img class="ml-2.5 w-7.75" src="../../assets/img/icon/home/gift.webp" alt="" />
          </div>
        </div>
        <div class="flex-[1] flex justify-end items-end">
          <div
            class="rounded-[20px] w-[calc(35px_+_2px)] flex flex-col items-center justify-center"
            :class="[
              isFollowed
                ? '[background:linear-gradient(to_bottom,_rgba(240,_183,_31,_0.2),_#f0b71f)]'
                : '[background:linear-gradient(to_bottom,_#000000,_var(--primary-btn-color))]'
            ]"
          >
            <img
              class="w-8.75 rounded-[50%] bg-white p-[1.5px]"
              src="../../assets/img/icon/avatar/2.png"
              alt=""
            />
            <div
              class="group/options mt-2 mb-1.25 flex w-5 h-5 justify-center items-center"
              v-if="!isFollowed"
              @click.stop="attention"
              ref="attention-option"
            >
              <img
                class="absolute w-4.5 [transition:all_0.8s] group-data-[following=true]/options:opacity-0 group-data-[following=true]/options:[transform:rotate(180deg)]"
                src="../../assets/img/icon/add-light.png"
                alt=""
              />
              <img
                class="absolute w-4.5 [transition:all_0.8s] opacity-0 [transform:rotate(-180deg)] group-data-[following=true]/options:opacity-100 group-data-[following=true]/options:[transform:rotate(0deg)]"
                src="../../assets/img/icon/ok-white.png"
                alt=""
              />
            </div>
            <img
              class="w-8 my-1.25"
              v-if="isFollowed"
              src="../../assets/img/icon/home/followed.webp"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <base-button @click="sendComment">点击</base-button>
  </div>
</template>
<script>
import BaseButton from '../../components/BaseButton'
import Dom from '../../utils/dom'
import { nextTick } from 'vue'
import { mapState } from 'pinia'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _sleep, random } from '@/utils'
import Mock from 'mockjs'

export default {
  name: 'LivePage',
  components: { BaseButton },
  props: {},
  data() {
    return {
      timer1: -1,
      timer2: -1,
      timer3: -1,
      isFollowed: false,
      list: [],
      barrage: [],
      barrageTemplate: () => {
        let name = Mock.mock('@cname')
        let a = Mock.mock('@csentence')
        return `
        <div data-live-effect="barrage" class="fixed top-[50%] [transform:translateX(100%)] flex items-center text-[12px] animate-[dy-anim-b7ad63_5s_linear]" >
          <div class="rounded-[20px] mr-1.25 px-1.5 py-0.25 border border-white border-solid" >${name}</div>
          <div >${a}</div>
        </div>
        `
      },
      userJoinedTemplate: () => {
        let src = '/images/icon/love.webp'
        let name = Mock.mock('@cname')
        return `
        <div class="text-[12px] absolute top-[70vh] left-3.75 rounded-[20px] bg-[rgba(115,_114,_181,_0.7)] mb-1.25 animate-[dy-user-joined-anim-d1a3b4_3s_linear] px-2 py-1" >
          <div class="inline-block" >
            <div class="flex items-center text-[10px] rounded-[10px] mr-1.25 bg-[#8285b9] px-1.5 py-0" >
              <img class="mr-0.75 w-3" src="${src}" alt="">
              <span>30</span>
            </div>
          </div>
          <span class="mr-1.25 text-[13px] text-[#a4eafd]" >${name}</span>
          <span class="[word-break:break-all]" >加入了直播间</span>
        </div>
        `
      },
      sendGiftTemplate: () => {
        let avatarList = [
          '/images/EPsQ7u4sNnrHC-ix-a9yQ.png',
          '/images/Xex2IhY-Zm338cNlcGuNW.png',
          '/images/gddHyRZrdk0Em3RRgVa9g.png',
          '/images/LJ-8p2jF3HydBD5j28PgQ.png',
          '/images/KwJ9N7yFjYylfwYeThWjx.png',
          '/images/EKkC06GI4yXC2mNHMrm46.png',
          '/images/rlkpmpGPdhYZRJl3J4Xl7.png',
          '/images/Ge4mMWQoICdpyTyixk3Sf.png'
        ]
        let avatar = avatarList[random(0, avatarList.length - 1)]
        let gift = '/images/icon/love.webp'
        let name = Mock.mock('@cname')
        let name2 = Mock.mock('@cname')
        let num = Mock.mock('@integer(60,400)')
        return `
        <div data-live-effect="gift" class="fixed top-[63vh] left-3.75 flex items-end animate-[dy-send-gift-anim-891e2f_2s_linear]" >
          <div class="[background:linear-gradient(to_right,_var(--primary-btn-color),_rgba(252,_47,_86,_0.2))] rounded-[50px] flex items-center p-1.25" >
            <img class="mr-1.25 w-10 h-10 object-cover rounded-[50%]" src="${avatar}" alt="" >
            <div class="w-[20vw]" >
              <div class="whitespace-nowrap overflow-hidden text-ellipsis text-[14px]" >${name}</div>
              <div class="whitespace-nowrap overflow-hidden text-ellipsis text-[12px] text-[yellow]" >
                <span >送</span>
                <span class="text-[yellow]" >${name2}</span>
              </div>
            </div>
            <div >
              <img class="w-10" src="${gift}" alt="" >
            </div>
          </div>
          <div class="text-[23px] font-bold [font-style:oblique]" >
            x${num}
          </div>
        </div>
        `
      },
      page: null
    }
  },
  computed: {
    ...mapState(useBaseStore, ['friends', 'userinfo'])
  },
  activated() {
    this.page = this.$refs.page
    this.timer1 = setInterval(async () => {
      this.sendGift()
      await _sleep(300)
      this.sendGift()
      this.joinUser()
    }, 1000)
    this.timer2 = setInterval(async () => {
      this.sendBarrage()
    }, 1500)
    this.timer3 = setInterval(async () => {
      this.sendComment()
    }, 700)
    this.$refs.videoEl.play()
  },
  deactivated() {
    clearInterval(this.timer1)
    clearInterval(this.timer2)
    clearInterval(this.timer3)
  },
  methods: {
    _checkImgUrl,
    sendGift() {
      let page = new Dom(this.page)
      let sendGift = new Dom().create(this.sendGiftTemplate())
      sendGift.on('animationend', () => {
        sendGift.remove()
      })
      let oldSendGift = new Dom('[data-live-effect=gift]')
      let top = document.body.clientHeight * 0.6
      if (oldSendGift.els.length !== 0) {
        top = sendGift.removePx(oldSendGift.css('top')) - 70
      }
      if (top < 100) {
        top = document.body.clientHeight * 0.6
      }
      console.log('top', top)
      sendGift.css('top', top)
      page.append(sendGift)
    },
    joinUser() {
      let page = new Dom(this.page)
      let user = new Dom().create(this.userJoinedTemplate())
      user.on('animationend', () => {
        user.remove()
      })
      page.append(user)
    },
    sendBarrage() {
      let page = new Dom(this.page)
      let barrage = new Dom().create(this.barrageTemplate())
      barrage.on('animationend', () => {
        barrage.remove()
      })
      let oldBarrages = new Dom('[data-live-effect=barrage]')
      let top = document.body.clientHeight * 0.35
      if (oldBarrages.els.length !== 0) {
        top = barrage.removePx(oldBarrages.css('top')) + 20
      }
      if (top > document.body.clientHeight * 0.5) {
        top = document.body.clientHeight * 0.35
      }
      barrage.css('top', top)
      page.append(barrage)
    },
    sendComment() {
      this.list.push({
        name: Mock.mock('@cname'),
        text: Mock.mock('@csentence')
      })
      nextTick(() => {
        let comments = this.$refs['comments']
        comments.scrollTo({
          top: comments.scrollHeight - comments.clientHeight,
          behavior: 'smooth'
        })
        // comments.scrollTop = comments.scrollHeight - comments.clientHeight
      })
    },
    attention() {
      let option = this.$refs['attention-option']
      option.dataset.following = String(option.dataset.following !== 'true')
      setTimeout(() => {
        this.isFollowed = true
      }, 1000)
    }
  }
}
</script>

<template>
  <div class="fixed left-0 right-0 bottom-0 top-0 overflow-auto text-white text-[14px]">
    <BaseHeader>
      <template v-slot:center>
        <span class="text-[16px]">设置</span>
      </template>
    </BaseHeader>
    <div class="pt-15">
      <div class="text-[color:var(--second-text-color)] text-[13px] mt-5 mr-0 mb-0 ml-5">帐号</div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img class="mr-2.5 w-3.75" src="@/assets/img/icon/newicon/left_menu/user.png" alt="" />
          <span>帐号与安全</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img class="mr-2.5 w-3.75" src="@/assets/img/icon/newicon/left_menu/lock.png" alt="" />
          <span>隐私设置</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>

      <div class="h-0.25 bg-[var(--line-color)] w-[calc(100%_-_30px)] ml-3.75"></div>
      <div class="text-[color:var(--second-text-color)] text-[13px] mt-5 mr-0 mb-0 ml-5">通用</div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img class="mr-2.5 w-3.75" src="@/assets/img/icon/newicon/left_menu/remind.png" alt="" />
          <span>通知设置</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img
            class="mr-2.5 w-3.75"
            src="@/assets/img/icon/newicon/left_menu/dynamics.png"
            alt=""
          />
          <span>动态壁纸</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img
            class="mr-2.5 w-3.75"
            src="@/assets/img/icon/newicon/left_menu/setting-two.png"
            alt=""
          />
          <span>通用设置</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div class="h-0.25 bg-[var(--line-color)] w-[calc(100%_-_30px)] ml-3.75"></div>

      <div class="text-[color:var(--second-text-color)] text-[13px] mt-5 mr-0 mb-0 ml-5">
        帐号互通
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img class="mr-2.5 w-3.75" src="@/assets/img/icon/newicon/left_menu/toutiao.png" alt="" />
          <span>头条主页</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div class="h-0.25 bg-[var(--line-color)] w-[calc(100%_-_30px)] ml-3.75"></div>

      <div class="text-[color:var(--second-text-color)] text-[13px] mt-5 mr-0 mb-0 ml-5">关于</div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img
            class="mr-2.5 w-3.75"
            src="@/assets/img/icon/newicon/left_menu/adddddddd.png"
            alt=""
          />
          <span>广告反馈与设置</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img class="mr-2.5 w-3.75" src="@/assets/img/icon/newicon/left_menu/book.png" alt="" />
          <span>用户协议</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img
            class="mr-2.5 w-3.75"
            src="@/assets/img/icon/newicon/left_menu/bookmark.png"
            alt=""
          />
          <span>社区自律公约</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img
            class="mr-2.5 w-3.75"
            src="@/assets/img/icon/newicon/left_menu/personal-privacy.png"
            alt=""
          />
          <span>隐私政策</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img class="mr-2.5 w-3.75" src="@/assets/img/icon/newicon/left_menu/protect.png" alt="" />
          <span>应用权限</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img class="mr-2.5 w-3.75" src="@/assets/img/icon/newicon/left_menu/ring.png" alt="" />
          <span>第三方SDK列表</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img class="mr-2.5 w-3.75" src="@/assets/img/icon/newicon/left_menu/about.png" alt="" />
          <span>关于抖音</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img
            class="mr-2.5 w-3.75"
            src="@/assets/img/icon/newicon/left_menu/feedback.png"
            alt=""
          />
          <span>反馈与帮助</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img class="mr-2.5 w-3.75" src="@/assets/img/icon/newicon/left_menu/delete.png" alt="" />
          <span>清理占用空间</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div class="h-0.25 bg-[var(--line-color)] w-[calc(100%_-_30px)] ml-3.75"></div>

      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img class="mr-2.5 w-3.75" src="@/assets/img/icon/newicon/left_menu/switch.png" alt="" />
          <span>切换空间</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>
      <div
        class="flex justify-between items-center min-h-12.5 text-[14px] px-[var(--page-padding)] py-0"
      >
        <div class="flex justify-between items-center text-white">
          <img class="mr-2.5 w-3.75" src="@/assets/img/icon/newicon/left_menu/logout.png" alt="" />
          <span>退出登录</span>
        </div>
        <div
          class="max-w-[80%] flex justify-between items-center text-[color:var(--second-text-color)]"
        >
          <dy-back class="ml-1.25" direction="right"></dy-back>
        </div>
      </div>

      <div class="text-[color:var(--second-text-color)] text-[13px] text-center m-10">
        抖音 {{ gitLastCommitHash }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const gitLastCommitHash = ref(LATEST_COMMIT_HASH)

defineOptions({
  name: 'ChooseSchool'
})
</script>

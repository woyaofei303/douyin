<template>
  <div
    v-if="player.current && route.path === '/home'"
    @pointerdown.capture="resetClick"
    class="video-lab-tools fixed inset-x-0 top-14 z-60 pointer-events-none text-[13px] text-white"
  >
    <div
      v-if="player.danmaku"
      class="absolute inset-x-0 top-14 overflow-hidden h-24"
      aria-label="弹幕"
    >
      <div
        v-for="(row, lane) in visibleDanmaku(player.comments, player.current.position)"
        :key="row.id"
        class="absolute inset-x-0 whitespace-nowrap font-semibold [text-shadow:0_1px_3px_black]"
        :style="{
          top: `${lane * 26}px`,
          transform: `translateX(${90 - (player.current.position - row.time) * 26}%)`
        }"
      >
        {{ row.text }}
      </div>
    </div>
    <div class="flex justify-end pr-3">
      <button
        class="pointer-events-auto rounded-full bg-black/75 px-3 py-2 border border-white/30"
        @click.stop="expanded = !expanded"
      >
        {{ t('播放工具', 'Player tools') }}
      </button>
    </div>
    <section
      v-if="expanded"
      class="pointer-events-auto m-3 p-4 rounded-[12px] bg-[#111827]/95 border border-white/20 max-h-[65vh] overflow-auto"
      @pointerdown.stop
      @click.stop
    >
      <div class="flex justify-between gap-2 items-center mb-3">
        <strong>{{ t('当前视频', 'Current video') }} · {{ player.current.videoId }}</strong>
        <button
          class="rounded-[6px] bg-white/10 border border-white/30 px-2 py-1"
          @click="act('language', player.language === 'zh' ? 'en' : 'zh')"
        >
          {{ player.language === 'zh' ? 'English' : '中文' }}
        </button>
      </div>
      <div class="flex flex-wrap gap-2 items-center">
        <button
          :disabled="locked"
          class="rounded-[6px] bg-teal-300 text-black px-3 py-2 disabled:opacity-40"
          @click="act(player.current.playing ? 'pause' : 'play')"
        >
          {{ player.current.playing ? t('暂停', 'Pause') : t('播放', 'Play') }}
        </button>
        <button
          :disabled="locked"
          class="rounded-[6px] bg-white/10 px-3 py-2 disabled:opacity-40"
          @click="act('mute', !player.current.muted)"
        >
          {{ player.current.muted ? t('取消静音', 'Unmute') : t('静音', 'Mute') }}
        </button>
        <label
          >{{ t('倍速', 'Speed') }}
          <select
            :value="player.current.speed"
            :disabled="locked"
            class="bg-slate-800 p-2 rounded-[6px]"
            @change="act('speed', Number(($event.target as HTMLSelectElement).value))"
          >
            <option v-for="speed in speeds" :key="speed" :value="speed">{{ speed }}×</option>
          </select>
        </label>
        <label
          >{{ t('清晰度', 'Quality') }}
          <select
            :value="player.current.quality"
            :disabled="locked || player.current.qualities.length < 2"
            class="bg-slate-800 p-2 rounded-[6px] disabled:opacity-50"
            @change="act('quality', ($event.target as HTMLSelectElement).value)"
          >
            <option v-for="quality in player.current.qualities" :key="quality">
              {{ quality }}
            </option>
          </select>
        </label>
      </div>
      <label class="block my-3"
        >{{ t('播放进度', 'Position') }} {{ player.current.position.toFixed(1) }} /
        {{ player.current.duration.toFixed(1) }}s
        <input
          :aria-label="t('播放进度', 'Position')"
          type="range"
          min="0"
          :max="player.current.duration"
          step="0.1"
          :value="player.current.position"
          :disabled="locked"
          class="w-full accent-teal-300"
          @change="act('seek', Number(($event.target as HTMLInputElement).value))"
        />
      </label>
      <div class="flex flex-wrap gap-2">
        <button class="rounded-[6px] bg-white/10 px-3 py-2" @click="requestFullscreen">
          {{ player.fullscreen ? t('退出全屏', 'Exit fullscreen') : t('全屏', 'Fullscreen') }}
        </button>
        <button
          v-if="player.connected"
          :disabled="locked || !player.current.nativeEligible"
          class="rounded-[6px] bg-white/10 px-3 py-2 disabled:opacity-40"
          @click="requestNative"
        >
          {{ t('交给 Flutter', 'Play in Flutter') }}
        </button>
        <button class="rounded-[6px] bg-white/10 px-3 py-2" @click="requestPractice">
          {{ t('练习素材', 'Practice clips') }}
        </button>
        <label class="flex items-center gap-1"
          ><input v-model="player.danmaku" type="checkbox" />{{ t('弹幕', 'Danmaku') }}</label
        >
      </div>
      <p v-if="player.connected && !player.current.nativeEligible" class="my-2 text-amber-200">
        {{
          t(
            '当前外部视频仅在 H5 播放；练习素材支持原生接力和双清晰度。',
            'External clips play in H5. Practice clips support native handoff and two qualities.'
          )
        }}
      </p>
      <p class="my-2 text-white/60">
        {{ t('演示身份', 'Demo identity') }}：{{ player.identity }} ·
        {{ t('评论仅保存在当前浏览器', 'Comments are stored on this device') }}
      </p>
      <form class="flex gap-2" @submit.prevent="submit">
        <input
          v-model="draft"
          :maxlength="80"
          :placeholder="t('在当前时间发送弹幕', 'Comment at the current time')"
          :aria-label="t('弹幕内容', 'Comment')"
          class="min-w-0 flex-1 rounded-[6px] bg-white/10 p-2"
        />
        <button
          :disabled="!draft.trim() || saving"
          class="rounded-[6px] bg-teal-300 text-black px-3 disabled:opacity-40"
        >
          {{ saving ? t('保存中', 'Saving') : t('发送', 'Send') }}
        </button>
      </form>
      <p v-if="commentError" role="alert" class="text-amber-200 my-2">{{ commentError }}</p>
      <ul class="max-h-24 overflow-auto my-2">
        <li v-for="row in player.comments.slice(-5)" :key="row.id">
          {{ row.time.toFixed(1) }}s · {{ row.text }}
        </li>
      </ul>
      <p v-if="player.error || player.notice" role="alert" class="text-amber-200 my-2">
        {{
          player.notice ||
          t('播放异常，可切换练习素材或重试：', 'Playback failed. Try practice clips or retry: ') +
            player.error
        }}
      </p>
      <details class="mt-3 border-t border-white/20 pt-2">
        <summary>{{ t('播放诊断', 'Playback diagnostics') }}</summary>
        <p>
          {{ t('首次画面等待', 'Initial frame wait') }}：{{
            player.metrics.startupMs === null ? '—' : `${player.metrics.startupMs}ms`
          }}
          · {{ player.metrics.firstFrameKind || '—' }}
        </p>
        <p>
          {{ t('卡顿', 'Stalls') }}：{{ player.metrics.stalls }} / {{ player.metrics.stallMs }}ms ·
          {{ t('失败', 'Failures') }}：{{ player.metrics.failures }}
        </p>
        <p class="text-white/60">
          {{
            t(
              'video-frame 为视频帧回调；playing-proxy 仅为播放事件近似值。',
              'video-frame uses a frame callback; playing-proxy is an event approximation.'
            )
          }}
        </p>
        <ol class="max-h-24 overflow-auto">
          <li v-for="(row, index) in player.events" :key="index">{{ row }}</li>
        </ol>
      </details>
    </section>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  act,
  addComment,
  player,
  requestFullscreen,
  requestNative,
  requestPractice
} from './hybrid'
import { speeds, visibleDanmaku } from './model'
const route = useRoute()
const expanded = ref(false),
  draft = ref(''),
  saving = ref(false),
  commentError = ref('')
const locked = computed(() => player.pending || !player.current?.ready)
const t = (zh: string, en: string) => (player.language === 'en' ? en : zh)
// A new control gesture must not inherit the legacy feed's 200ms click suppression.
function resetClick() {
  window.isMoved = false
}
async function submit() {
  saving.value = true
  commentError.value = ''
  try {
    addComment(draft.value)
    draft.value = ''
  } catch {
    commentError.value = t(
      '保存失败，请保留内容后重试。',
      'Could not save. Your draft is preserved; try again.'
    )
  } finally {
    saving.value = false
  }
}
</script>

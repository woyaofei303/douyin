import posts from '@/assets/data/posts6.json'

// These are distinct lesson IDs sharing two versions of our own test clip.
export const practiceVideos = Array.from({ length: 5 }, (_, index) => ({
  ...posts[0],
  aweme_id: `lab-${index + 1}`,
  lab: true,
  desc: `播放练习 ${index + 1}：第 8 秒、1.5 倍速、360p / 720p 接力`,
  statistics: {
    admire_count: 0,
    comment_count: 0,
    digg_count: 0,
    collect_count: 0,
    play_count: 0,
    share_count: 0
  },
  author: {
    ...posts[0].author,
    uid: 'video-lab',
    nickname: '播放实验室',
    unique_id: 'video_lab',
    signature: '自制测试图与测试音；练习数据，不代表真实用户',
    follower_count: 0,
    following_count: 0,
    total_favorited: 0,
    avatar_168x168: { url_list: [''] },
    avatar_300x300: { url_list: [''] }
  },
  music: {
    ...posts[0].music,
    title: '自制测试音',
    author: '播放实验室',
    play_url: { ...posts[0].music.play_url, url_list: [] }
  },
  video: {
    ...posts[0].video,
    ratio: '720p',
    duration: 20000,
    poster: '',
    cover: { ...posts[0].video.cover, url_list: [''] },
    play_addr: { ...posts[0].video.play_addr, uri: 'lab-v1', url_list: ['/lab-media/demo-720.mp4'] }
  }
}))

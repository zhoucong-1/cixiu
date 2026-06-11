<template>
  <Layout>
    <div class="community-page">
      <div class="container">
        <section class="page-header">
          <h1 class="page-title">互动交流</h1>
          <p class="page-subtitle">与专家交流，参与社区讨论，观看直播教学</p>
        </section>

        <!-- 标签切换 -->
        <div class="tab-switcher">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            :class="['tab-btn', { active: activeTab === tab.value }]"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- 专家入驻 -->
        <section v-if="activeTab === 'experts'" class="experts-section">
          <h2 class="section-title">专家入驻</h2>
          <div class="experts-grid">
            <div v-for="expert in experts" :key="expert.id" class="expert-card">
              <div class="expert-avatar">{{ expert.avatar }}</div>
              <div class="expert-content">
                <h3 class="expert-name">{{ expert.name }}</h3>
                <p class="expert-title">{{ expert.title }}</p>
                <p class="expert-bio">{{ expert.bio }}</p>
                <button class="btn-primary" @click="consultExpert(expert)">
                  咨询专家
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- 问答社区 -->
        <section v-if="activeTab === 'qa'" class="qa-section">
          <div class="qa-header">
            <h2 class="section-title">问答社区</h2>
            <button class="btn-primary" @click="showAskModal = true">提问</button>
          </div>
          <div class="questions-list">
            <div v-for="question in questions" :key="question.id" class="question-card">
              <div class="question-header">
                <h3 class="question-title">{{ question.title }}</h3>
                <span class="question-status" :class="question.status">
                  {{ question.status === 'answered' ? '已解答' : '待解答' }}
                </span>
              </div>
              <p class="question-content">{{ question.content }}</p>
              <div class="question-meta">
                <span class="question-author">{{ question.author }}</span>
                <span class="question-date">{{ question.date }}</span>
                <span class="question-answers">{{ question.answerCount }} 个回答</span>
              </div>
              <div v-if="question.answers && question.answers.length > 0" class="answers-preview">
                <div
                  v-for="(answer, index) in question.answers.slice(0, 1)"
                  :key="index"
                  class="answer-item"
                >
                  <p class="answer-content">{{ answer.content }}</p>
                  <span class="answer-author">— {{ answer.author }}</span>
                </div>
              </div>
              <button class="btn-link" @click="viewQuestion(question)">查看全部回答</button>
            </div>
          </div>
        </section>

        <!-- 直播活动 -->
        <section v-if="activeTab === 'live'" class="live-section">
          <h2 class="section-title">直播活动</h2>
          <div class="live-grid">
            <div v-for="live in liveStreams" :key="live.id" class="live-card">
              <div class="live-image">
                <img :src="live.image" :alt="live.title" />
              </div>
              <div class="live-badge" :class="{ 'live-now': live.isLive }">
                {{ live.isLive ? '直播中' : '即将开始' }}
              </div>
              <div class="live-content">
                <h3 class="live-title">{{ live.title }}</h3>
                <p class="live-time">{{ live.time }}</p>
                <p class="live-description">{{ live.description }}</p>
                <div class="live-actions">
                  <button class="btn-primary" @click="joinLive(live)">
                    {{ live.isLive ? '进入直播间' : '预约观看' }}
                  </button>
                  <a :href="`/shop?type=material&live=${live.id}`" class="btn-link">
                    购买材料包
                  </a>
                </div>
              </div>
            </div>
          </div>···~~
        </section>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Layout from '../../components/Layout/Layout.vue'
import message from '../../utils/message'
import './Community.css'

const activeTab = ref('experts')
const showAskModal = ref(false)

const tabs = [
  { label: '专家入驻', value: 'experts' },
  { label: '问答社区', value: 'qa' },
  { label: '直播活动', value: 'live' },
]

const experts = [
  {
    id: 1,
    name: '阿依古丽',
    title: '国家级非遗传承人',
    bio: '从事刺绣技艺传承30余年，擅长传统图案设计',
    avatar: '👩',
  },
  {
    id: 2,
    name: '买买提',
    title: '刺绣工艺大师',
    bio: '专注于现代创新设计，多次获得工艺美术大奖',
    avatar: '👨',
  },
]

const questions = [
  {
    id: 1,
    title: '如何选择合适的刺绣丝线？',
    content: '刚开始学习刺绣，不知道应该选择什么样的丝线，有什么建议吗？',
    author: '初学者',
    date: '2024-01-10',
    status: 'answered',
    answerCount: 3,
    answers: [
      {
        author: '阿依古丽',
        content: '建议初学者选择质量较好的真丝线，颜色鲜艳且不易褪色...',
      },
    ],
  },
  {
    id: 2,
    title: '传统图案的寓意有哪些？',
    content: '想了解传统刺绣图案的寓意和文化内涵',
    author: '文化爱好者',
    date: '2024-01-08',
    status: 'answered',
    answerCount: 2,
    answers: [],
  },
]

const liveStreams = [
  {
    id: 1,
    title: '基础针法教学',
    time: '2024-01-20 14:00',
    description: '讲解基础刺绣针法，适合初学者',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image=basic%20stitch%20embroidery%20tutorial%20live%20stream%20teaching%20online%20class%20video&image_size=landscape_4_3',
    isLive: false,
  },
  {
    id: 2,
    title: '传统图案设计',
    time: '直播中',
    description: '现场演示传统图案的设计与绣制',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?traditional%20pattern%20design%20live%20broadcast%20artisan%20demonstrating%20real-time&image_size=landscape_4_3',
    isLive: true,
  },
]

const consultExpert = (expert: any) => {
  message.info(`咨询专家：${expert.name}`)
}

const viewQuestion = (question: any) => {
  message.info(`查看问题详情：${question.title}`)
}

const joinLive = (live: any) => {
  if (live.isLive) {
    message.info('进入直播间')
  } else {
    message.success('已预约观看')
  }
}
</script>


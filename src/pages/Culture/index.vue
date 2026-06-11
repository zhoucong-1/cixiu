<template>
  <Layout>
    <div class="culture-page">
      <div class="container">
        <section class="page-header">
          <h1 class="page-title">文化内涵</h1>
          <p class="page-subtitle">深入理解哈密刺绣的文化价值与象征意义</p>
        </section>

        <!-- 故事化叙述 -->
        <section class="stories-section">
          <h2 class="section-title">文化故事</h2>
          <div class="stories-grid">
            <div v-for="story in stories" :key="story.id" class="story-card">
              <div class="story-image">
                <img :src="story.image" :alt="story.title" />
              </div>
              <h3 class="story-title">{{ story.title }}</h3>
              <p class="story-content">{{ story.content }}</p>
            </div>
          </div>
        </section>

        <!-- 价值传承 -->
        <section class="values-section">
          <h2 class="section-title">价值传承</h2>
          <div class="values-grid">
            <div v-for="(value, index) in values" :key="index" class="value-card">
              <div class="value-image">
                <img :src="value.image" :alt="value.title" />
              </div>
              <h3 class="value-title">{{ value.title }}</h3>
              <p class="value-description">{{ value.description }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '../../components/Layout/Layout.vue'
import './Culture.css'

const stories = [
  {
    id: 1,
    title: '丝绸之路上的文化融合',
    content: '哈密刺绣作为丝绸之路上的重要文化载体，融合了东西方文化元素，形成了独特的艺术风格。',
    image: 'https://picsum.photos/id/65/600/400',
  },
  {
    id: 2,
    title: '民族身份的象征',
    content: '刺绣技艺承载着维吾尔族人民的文化记忆，是民族身份认同的重要标志。',
    image: 'https://picsum.photos/id/66/600/400',
  },
]

const values = [
  {
    title: '历史价值',
    description: '记录和传承了千百年的文化传统，是活态的历史见证',
    image: 'https://picsum.photos/id/67/400/300',
  },
  {
    title: '文化价值',
    description: '体现了多元文化的融合，展现了中华民族文化的多样性',
    image: 'https://picsum.photos/id/68/400/300',
  },
  {
    title: '艺术价值',
    description: '精湛的技艺和独特的审美，具有极高的艺术欣赏价值',
    image: 'https://picsum.photos/id/69/400/300',
  },
]
</script>


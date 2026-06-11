<template>
  <Layout>
    <div class="works-page">
      <div class="container">
        <section class="page-header">
          <h1 class="page-title">作品展示</h1>
          <p class="page-subtitle">欣赏传统与创新的精美刺绣作品</p>
        </section>

        <!-- 筛选和排序 -->
        <section class="works-filters">
          <div class="filter-group">
            <label>主题：</label>
            <select v-model="selectedTheme" class="filter-select">
              <option value="">全部</option>
              <option value="traditional">传统</option>
              <option value="modern">现代</option>
              <option value="fusion">融合</option>
            </select>
          </div>
          <div class="filter-group">
            <label>风格：</label>
            <select v-model="selectedStyle" class="filter-select">
              <option value="">全部</option>
              <option value="elegant">优雅</option>
              <option value="vibrant">鲜艳</option>
              <option value="minimalist">简约</option>
            </select>
          </div>
          <div class="view-toggle">
            <button
              :class="['view-btn', { active: viewMode === 'grid' }]"
              @click="viewMode = 'grid'"
            >
              网格
            </button>
            <button
              :class="['view-btn', { active: viewMode === 'list' }]"
              @click="viewMode = 'list'"
            >
              列表
            </button>
          </div>
        </section>

        <!-- 作品画廊 -->
        <section class="works-gallery">
          <div :class="['works-grid', { 'list-view': viewMode === 'list' }]">
            <div
              v-for="work in filteredWorks"
              :key="work.id"
              class="work-card"
              @click="viewWorkDetail(work)"
            >
              <div class="work-image">
                <img :src="work.image" :alt="work.title" />
              </div>
              <div class="work-content">
                <h3 class="work-title">{{ work.title }}</h3>
                <p class="work-description">{{ work.description }}</p>
                <div class="work-meta">
                  <span class="work-theme">{{ work.theme }}</span>
                  <span class="work-rating">⭐ {{ work.rating }}</span>
                </div>
                <div class="work-actions">
                  <button class="btn-primary" @click.stop="purchaseWork(work)">
                    立即购买
                  </button>
                  <button class="btn-secondary" @click.stop="viewDetail(work)">
                    查看详情
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 评价系统 -->
        <section class="reviews-section">
          <h2 class="section-title">用户评价</h2>
          <div class="reviews-list">
            <div v-for="review in reviews" :key="review.id" class="review-card">
              <div class="review-header">
                <div class="reviewer-info">
                  <span class="reviewer-name">{{ review.name }}</span>
                  <div class="review-rating">
                    <span v-for="i in 5" :key="i" :class="['star', { filled: i <= review.rating }]">
                      ⭐
                    </span>
                  </div>
                </div>
                <span class="review-date">{{ review.date }}</span>
              </div>
              <p class="review-content">{{ review.content }}</p>
              <div class="review-work">作品：{{ review.workTitle }}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '../../components/Layout/Layout.vue'
import './Works.css'

const router = useRouter()

const selectedTheme = ref('')
const selectedStyle = ref('')
const viewMode = ref<'grid' | 'list'>('grid')

const works = [
  {
    id: 1,
    title: '传统花卉图案',
    description: '精美的传统花卉刺绣作品，色彩鲜艳，工艺精湛',
    theme: '传统',
    style: 'elegant',
    rating: 4.8,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?traditional%20flower%20pattern%20embroidery%20artwork%20peonies%20roses%20colorful%20silk%20masterpiece&image_size=landscape_4_3',
  },
  {
    id: 2,
    title: '现代几何设计',
    description: '融合现代设计理念的几何图案作品',
    theme: '现代',
    style: 'minimalist',
    rating: 4.6,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?modern%20geometric%20design%20embroidery%20contemporary%20abstract%20patterns%20symmetric%20art&image_size=landscape_4_3',
  },
  {
    id: 3,
    title: '融合风格作品',
    description: '传统与现代完美融合的创新作品',
    theme: '融合',
    style: 'vibrant',
    rating: 4.9,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?fusion%20style%20embroidery%20artwork%20blending%20traditional%20modern%20innovative%20design&image_size=landscape_4_3',
  },
]

const filteredWorks = computed(() => {
  let result = works
  if (selectedTheme.value) {
    result = result.filter(work => work.theme === selectedTheme.value)
  }
  if (selectedStyle.value) {
    result = result.filter(work => work.style === selectedStyle.value)
  }
  return result
})

const reviews = [
  {
    id: 1,
    name: '张**',
    rating: 5,
    date: '2024-01-10',
    content: '作品非常精美，工艺精湛，完全超出预期！',
    workTitle: '传统花卉图案',
  },
  {
    id: 2,
    name: '李**',
    rating: 4,
    date: '2024-01-08',
    content: '质量很好，包装精美，值得推荐。',
    workTitle: '现代几何设计',
  },
]

const viewWorkDetail = (work: any) => {
  router.push(`/works/${work.id}`)
}

const purchaseWork = (work: any) => {
  router.push(`/shop/product/${work.id}`)
}

const viewDetail = (work: any) => {
  router.push(`/works/${work.id}`)
}
</script>


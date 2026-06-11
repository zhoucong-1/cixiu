<template>
  <Layout>
    <div class="works-detail-page">
      <div class="container">
        <div class="breadcrumb">
          <a href="/works">作品展示</a>
          <span> / </span>
          <span>{{ work?.title }}</span>
        </div>

        <div v-if="work" class="work-detail">
          <div class="work-main">
            <div class="work-image-large">
              <img :src="work.image" :alt="work.title" />
            </div>

            <div class="work-info">
              <h1 class="work-title">{{ work.title }}</h1>
              <p class="work-description">{{ work.description }}</p>

              <div class="work-meta">
                <div class="meta-item">
                  <span class="meta-label">主题：</span>
                  <span class="meta-value">{{ work.theme }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">风格：</span>
                  <span class="meta-value">{{ work.style }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">评分：</span>
                  <div class="rating">
                    <span v-for="i in 5" :key="i" :class="['star', { filled: i <= work.rating }]">
                      ⭐
                    </span>
                    <span class="rating-value">{{ work.rating }}</span>
                  </div>
                </div>
                <div class="meta-item">
                  <span class="meta-label">收藏数：</span>
                  <span class="meta-value">{{ work.favorites }}</span>
                </div>
              </div>

              <div class="work-details">
                <h3 class="details-title">作品详情</h3>
                <div class="details-content">
                  <p>{{ work.details }}</p>
                </div>
              </div>

              <div class="work-actions">
                <button @click="purchaseWork" class="btn-purchase">立即购买</button>
                <button @click="addToFavorites" class="btn-favorite">
                  {{ isFavorited ? '已收藏' : '收藏' }}
                </button>
                <button @click="shareWork" class="btn-share">分享</button>
              </div>
            </div>
          </div>

          <div class="work-tabs">
            <button
              :class="['tab-btn', { active: activeTab === 'reviews' }]"
              @click="activeTab = 'reviews'"
            >
              用户评价 ({{ work.reviews?.length || 0 }})
            </button>
            <button
              :class="['tab-btn', { active: activeTab === 'related' }]"
              @click="activeTab = 'related'"
            >
              相关作品
            </button>
          </div>

          <div class="work-tab-content">
            <div v-if="activeTab === 'reviews'" class="reviews-section">
              <div v-if="work.reviews && work.reviews.length > 0" class="reviews-list">
                <div v-for="review in work.reviews" :key="review.id" class="review-item">
                  <div class="review-header">
                    <div class="reviewer-info">
                      <span class="reviewer-name">{{ review.name }}</span>
                      <div class="review-rating">
                        <span
                          v-for="i in 5"
                          :key="i"
                          :class="['star', { filled: i <= review.rating }]"
                        >
                          ⭐
                        </span>
                      </div>
                    </div>
                    <span class="review-date">{{ review.date }}</span>
                  </div>
                  <p class="review-content">{{ review.content }}</p>
                </div>
              </div>
              <div v-else class="no-reviews">暂无评价</div>
            </div>

            <div v-if="activeTab === 'related'" class="related-works">
              <div class="related-grid">
                <div
                  v-for="item in relatedWorks"
                  :key="item.id"
                  class="related-card"
                  @click="viewWork(item.id)"
                >
                  <div class="related-image">
                    <img :src="item.image" :alt="item.title" />
                  </div>
                  <div class="related-content">
                    <h4 class="related-title">{{ item.title }}</h4>
                    <div class="related-rating">⭐ {{ item.rating }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '../../components/Layout/Layout.vue'
import message from '../../utils/message'
import './WorksDetail.css'

const route = useRoute()
const router = useRouter()

const work = ref<any>(null)
const activeTab = ref<'reviews' | 'related'>('reviews')
const isFavorited = ref(false)
const relatedWorks = ref<any[]>([])

const worksData: Record<string, any> = {
  '1': {
    id: 1,
    title: '传统花卉图案',
    description: '精美的传统花卉刺绣作品，色彩鲜艳，工艺精湛',
    theme: '传统',
    style: '优雅',
    rating: 4.8,
    favorites: 156,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=400&fit=crop&auto=format',
    details:
      '这件作品采用了传统的花卉图案设计，运用了多种传统针法，展现了哈密刺绣的精湛技艺。作品色彩搭配和谐，层次分明，具有很高的艺术价值和收藏价值。',
    reviews: [
      {
        id: 1,
        name: '张**',
        rating: 5,
        date: '2024-01-10',
        content: '作品非常精美，工艺精湛，完全超出预期！',
      },
      {
        id: 2,
        name: '李**',
        rating: 4,
        date: '2024-01-08',
        content: '质量很好，包装精美，值得推荐。',
      },
    ],
  },
  '2': {
    id: 2,
    title: '现代几何设计',
    description: '融合现代设计理念的几何图案作品',
    theme: '现代',
    style: '简约',
    rating: 4.6,
    favorites: 98,
    image: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?w=600&h=400&fit=crop&auto=format',
    details: '这件作品将传统刺绣技艺与现代几何设计相结合，创造出独特的视觉效果。',
    reviews: [],
  },
  '3': {
    id: 3,
    title: '融合风格作品',
    description: '传统与现代完美融合的创新作品',
    theme: '融合',
    style: '鲜艳',
    rating: 4.9,
    favorites: 203,
    image: 'https://images.unsplash.com/photo-1452421822248-d4c2b9f16dc6?w=600&h=400&fit=crop&auto=format',
    details: '这件作品完美融合了传统与现代元素，展现了创新的设计理念。',
    reviews: [],
  },
}

onMounted(() => {
  const workId = route.params.id as string
  work.value = worksData[workId] || worksData['1']

  // 加载相关作品
  relatedWorks.value = [
    { id: 2, title: '现代几何设计', rating: 4.6, image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=400&fit=crop&auto=format' },
    { id: 3, title: '融合风格作品', rating: 4.9, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format' },
  ]
})

const purchaseWork = () => {
  if (work.value) {
    router.push(`/shop/product/${work.value.id}`)
  }
}

const addToFavorites = () => {
  isFavorited.value = !isFavorited.value
  if (isFavorited.value && work.value) {
    work.value.favorites++
  } else if (work.value) {
    work.value.favorites--
  }
}

const shareWork = () => {
  if (navigator.share && work.value) {
    navigator.share({
      title: work.value.title,
      text: work.value.description,
      url: window.location.href,
    })
  } else {
    message.info('分享功能：' + work.value?.title)
  }
}

const viewWork = (id: number) => {
  router.push(`/works/${id}`)
}
</script>


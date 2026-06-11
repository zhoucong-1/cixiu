<template>
  <Layout>
    <div class="home-page">
      <!-- 轮播图区域 -->
      <section class="home-carousel">
        <div class="container">
          <div class="carousel-wrapper">
            <div class="carousel-container">
              <div
                v-for="(slide, index) in carouselSlides"
                :key="index"
                :class="['carousel-slide', { active: currentSlide === index }]"
              >
                <div class="slide-content">
                  <div class="slide-image">
                    <img :src="slide.image" :alt="slide.title" @error="handleSlideImageError" />
                  </div>
                  <div class="slide-text">
                    <h2 class="slide-title">{{ slide.title }}</h2>
                    <p class="slide-desc">{{ slide.description }}</p>
                    <a v-if="slide.link" :href="slide.link" class="slide-btn">了解更多</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-indicators">
              <button
                v-for="(slide, index) in carouselSlides"
                :key="index"
                :class="['indicator', { active: currentSlide === index }]"
                @click="currentSlide = index"
              ></button>
            </div>
            <button class="carousel-btn prev" @click="prevSlide">‹</button>
            <button class="carousel-btn next" @click="nextSlide">›</button>
          </div>
        </div>
      </section>

      <!-- 热门推荐区域 -->
      <section class="home-recommend">
        <div class="container">
          <h2 class="section-title">热门推荐</h2>
          <div class="recommend-tabs">
            <button
              v-for="tab in recommendTabs"
              :key="tab.value"
              :class="['tab-btn', { active: activeTab === tab.value }]"
              @click="activeTab = tab.value"
            >
              {{ tab.label }}
            </button>
          </div>
          <div class="recommend-grid">
            <div
              v-for="(item, index) in filteredRecommendItems"
              :key="index"
              class="recommend-card"
              @click="handleRecommendClick(item)"
            >
              <div class="card-image">
                <img :src="item.image" :alt="item.title" />
              </div>
              <div v-if="item.badge" class="card-badge">{{ item.badge }}</div>
              <div class="card-content">
                <h3 class="card-title">{{ item.title }}</h3>
                <p class="card-desc">{{ item.desc }}</p>
                <div v-if="item.price" class="card-price">¥{{ item.price }}</div>
                <div v-if="item.rating" class="card-rating">⭐ {{ item.rating }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 特色板块预览 -->
      <section class="home-features">
        <div class="container">
          <h2 class="section-title">探索更多</h2>
          <div class="features-grid">
            <a
              v-for="(feature, index) in features"
              :key="index"
              :href="feature.path"
              class="feature-card"
            >
              <div class="feature-icon">{{ feature.icon }}</div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-desc">{{ feature.desc }}</p>
            </a>
          </div>
        </div>
      </section>

      <!-- 最新动态 -->
      <section class="home-news">
        <div class="container">
          <div class="news-header">
            <h2 class="section-title">最新动态</h2>
            <a href="/news" class="more-link">查看更多 →</a>
          </div>
          <div class="news-grid">
            <article
              v-for="news in latestNews"
              :key="news.id"
              class="news-card"
              @click="viewNews(news)"
            >
              <div class="news-image">
                <img :src="news.image" :alt="news.title" />
              </div>
              <div class="news-content">
                <div class="news-meta">
                  <span class="news-category">{{ news.category }}</span>
                  <span class="news-date">{{ news.date }}</span>
                </div>
                <h3 class="news-title">{{ news.title }}</h3>
                <p class="news-excerpt">{{ news.excerpt }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '../../components/Layout/Layout.vue'
import './Home.css'

const router = useRouter()

const currentSlide = ref(0)
const activeTab = ref('articles')

const carouselSlides = [
  {
    title: '哈密刺绣数字图谱',
    description: '传承千年技艺，展现文化魅力',
    image: 'https://picsum.photos/id/10/800/450',
    link: '/about',
  },
  {
    title: '春季新品限时优惠',
    description: '精选刺绣作品，购买即享8折优惠',
    image: 'https://picsum.photos/id/20/800/450',
    link: '/shop',
  },
  {
    title: '在线学习课程',
    description: '跟随传承人学习传统刺绣技艺',
    image: 'https://picsum.photos/id/30/800/450',
    link: '/craft',
  },
]

const recommendTabs = [
  { label: '文章', value: 'articles' },
  { label: '作品', value: 'works' },
  { label: '商品', value: 'products' },
]

const recommendArticles = [
  {
    title: '哈密刺绣的历史源流',
    desc: '探索新疆维吾尔族刺绣的起源与发展历程',
    image: 'https://picsum.photos/id/1/600/400',
    badge: '热门',
    link: '/history',
  },
  {
    title: '传统图案的寓意解读',
    desc: '深入了解传统刺绣图案的文化内涵',
    image: 'https://picsum.photos/id/2/600/400',
    link: '/art',
  },
  {
    title: '制作工艺详解',
    desc: '学习传统刺绣的制作流程与技巧',
    image: 'https://picsum.photos/id/3/600/400',
    link: '/craft',
  },
]

const recommendWorks = [
  {
    title: '传统花卉图案',
    desc: '精美的传统花卉刺绣作品',
    image: 'https://picsum.photos/id/4/600/400',
    rating: 4.8,
    link: '/works/1',
  },
  {
    title: '现代几何设计',
    desc: '融合现代设计理念的创新作品',
    image: 'https://picsum.photos/id/5/600/400',
    rating: 4.6,
    link: '/works/2',
  },
  {
    title: '融合风格作品',
    desc: '传统与现代完美结合',
    image: 'https://picsum.photos/id/6/600/400',
    rating: 4.9,
    link: '/works/3',
  },
]

const recommendProducts = [
  {
    title: '传统花卉刺绣作品',
    desc: '手工制作，工艺精湛',
    image: 'https://picsum.photos/id/7/600/400',
    price: 299,
    badge: '热销',
    link: '/shop/product/1',
  },
  {
    title: '优质刺绣丝线套装',
    desc: '24色真丝线，色彩鲜艳持久',
    image: 'https://picsum.photos/id/8/600/400',
    price: 89,
    badge: '新品',
    link: '/shop/product/4',
  },
  {
    title: '定制刺绣服务',
    desc: '根据您的需求定制专属作品',
    image: 'https://picsum.photos/id/9/600/400',
    price: 599,
    link: '/shop/product/3',
  },
]

const filteredRecommendItems = computed(() => {
  switch (activeTab.value) {
    case 'articles':
      return recommendArticles
    case 'works':
      return recommendWorks
    case 'products':
      return recommendProducts
    default:
      return recommendArticles
  }
})

const features = [
  { icon: '📜', title: '历史源流', desc: '追溯刺绣的起源与发展', path: '/history' },
  { icon: '🎨', title: '艺术特色', desc: '图案库与针法技艺', path: '/art' },
  { icon: '🏛️', title: '文化内涵', desc: '深入理解文化价值', path: '/culture' },
  { icon: '✂️', title: '制作工艺', desc: '工艺流程与材料详解', path: '/craft' },
]

const latestNews = [
  {
    id: 1,
    title: '国家级非遗——哈密刺绣，传统工艺的璀璨明珠',
    excerpt: '哈密刺绣技艺正式入选国家级非物质文化遗产代表性项目名录...',
    category: '行业动态',
    date: '2025-05-15',
    image: 'https://picsum.photos/id/15/600/400',
  },
  {
    id: 2,
    title: '锦绣哈密——刺绣暨手工艺文化作品展为哈密瓜节锦上添花',
    excerpt: '一年一度的哈密刺绣文化节将于下月举行...',
    category: '活动信息',
    date: '2024-01-10',
    image: 'https://picsum.photos/id/16/600/400',
  },
  {
    id: 3,
    title: '非遗保护新政策出台',
    excerpt: '国家出台新的非物质文化遗产保护政策，加大对传统手工艺的扶持力度。',
    category: '政策法规',
    date: '2024-01-05',
    image: 'https://picsum.photos/id/17/600/400',
  },
  {
    id: 4,
    title: '春季新品限时优惠',
    excerpt: '春季新品刺绣作品限时优惠，购买即享8折优惠...',
    category: '促销信息',
    date: '2024-01-01',
    image: 'https://picsum.photos/id/18/600/400',
  },
]

let carouselTimer: number | null = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselSlides.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? carouselSlides.length - 1 : currentSlide.value - 1
}

const handleSlideImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = 'https://picsum.photos/id/40/800/450'
}

const handleRecommendClick = (item: any) => {
  if (item.link) {
    router.push(item.link)
  }
}

const viewNews = (news: any) => {
  router.push(`/news/${news.id}`)
}

onMounted(() => {
  carouselTimer = window.setInterval(() => {
    nextSlide()
  }, 5000)
})

onUnmounted(() => {
  if (carouselTimer) {
    clearInterval(carouselTimer)
  }
})
</script>


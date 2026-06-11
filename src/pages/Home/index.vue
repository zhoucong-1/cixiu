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
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20Hami%20embroidery%20artwork%20display%20colorful%20floral%20patterns%20on%20silk%20fabric%20elegant%20cultural%20heritage&image_size=landscape_16_9',
    link: '/about',
  },
  {
    title: '春季新品限时优惠',
    description: '精选刺绣作品，购买即享8折优惠',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=spring%20new%20collection%20handmade%20embroidered%20products%20beautiful%20flowers%20and%20geometric%20patterns%20Uyghur%20style&image_size=landscape_16_9',
    link: '/shop',
  },
  {
    title: '在线学习课程',
    description: '跟随传承人学习传统刺绣技艺',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=online%20embroidery%20learning%20course%20hands%20sewing%20with%20colorful%20threads%20teaching%20traditional%20crafts&image_size=landscape_16_9',
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
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20Hami%20embroidery%20historical%20artifacts%20traditional%20textile%20museum%20display%20Silk%20Road%20culture&image_size=landscape_4_3',
    badge: '热门',
    link: '/history',
  },
  {
    title: '传统图案的寓意解读',
    desc: '深入了解传统刺绣图案的文化内涵',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=close-up%20of%20traditional%20Chinese%20embroidery%20pattern%20symbolic%20meaning%20intricate%20stitchwork%20detail&image_size=landscape_4_3',
    link: '/art',
  },
  {
    title: '制作工艺详解',
    desc: '学习传统刺绣的制作流程与技巧',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=embroidery%20making%20process%20step%20by%20step%20tools%20and%20materials%20needlework%20craftsmanship&image_size=landscape_4_3',
    link: '/craft',
  },
]

const recommendWorks = [
  {
    title: '传统花卉图案',
    desc: '精美的传统花卉刺绣作品',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20flower%20embroidery%20artwork%20colorful%20peonies%20and%20lotus%20patterns%20on%20silk%20Chinese%20style&image_size=landscape_4_3',
    rating: 4.8,
    link: '/works/1',
  },
  {
    title: '现代几何设计',
    desc: '融合现代设计理念的创新作品',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20geometric%20design%20embroidery%20contemporary%20patterns%20symmetric%20shapes%20minimalist%20textile%20art&image_size=landscape_4_3',
    rating: 4.6,
    link: '/works/2',
  },
  {
    title: '融合风格作品',
    desc: '传统与现代完美结合',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fusion%20style%20embroidery%20combining%20traditional%20and%20modern%20elements%20innovative%20textile%20design&image_size=landscape_4_3',
    rating: 4.9,
    link: '/works/3',
  },
]

const recommendProducts = [
  {
    title: '传统花卉刺绣作品',
    desc: '手工制作，工艺精湛',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20flower%20embroidery%20product%20handmade%20decorative%20pillow%20or%20wall%20hanging%20gift&image_size=landscape_4_3',
    price: 299,
    badge: '热销',
    link: '/shop/product/1',
  },
  {
    title: '优质刺绣丝线套装',
    desc: '24色真丝线，色彩鲜艳持久',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20embroidery%20silk%20thread%20set%2024%20vibrant%20colors%20spools%20arranged%20neatly%20for%20crafting&image_size=landscape_4_3',
    price: 89,
    badge: '新品',
    link: '/shop/product/4',
  },
  {
    title: '定制刺绣服务',
    desc: '根据您的需求定制专属作品',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=custom%20embroidery%20service%20personalized%20name%20or%20design%20tailored%20handmade%20textile%20product&image_size=landscape_4_3',
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
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=intangible%20cultural%20heritage%20ceremony%20Hami%20embroidery%20recognition%20award%20official%20event&image_size=landscape_4_3',
  },
  {
    id: 2,
    title: '锦绣哈密——刺绣暨手工艺文化作品展为哈密瓜节锦上添花',
    excerpt: '一年一度的哈密刺绣文化节将于下月举行...',
    category: '活动信息',
    date: '2024-01-10',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hami%20embroidery%20cultural%20exhibition%20showcase%20beautiful%20textile%20works%20display%20hall&image_size=landscape_4_3',
  },
  {
    id: 3,
    title: '非遗保护新政策出台',
    excerpt: '国家出台新的非物质文化遗产保护政策，加大对传统手工艺的扶持力度。',
    category: '政策法规',
    date: '2024-01-05',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cultural%20heritage%20protection%20policy%20document%20traditional%20crafts%20preservation%20government%20support&image_size=landscape_4_3',
  },
  {
    id: 4,
    title: '春季新品限时优惠',
    excerpt: '春季新品刺绣作品限时优惠，购买即享8折优惠...',
    category: '促销信息',
    date: '2024-01-01',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=spring%20new%20products%20embroidered%20items%20seasonal%20promotion%20colorful%20handmade%20goods&display&image_size=landscape_4_3',
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
  img.src = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hami%20embroidery%20digital%20atlas%20banner%20traditional%20Chinese%20textile%20art&image_size=landscape_16_9'
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


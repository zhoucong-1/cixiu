<template>
  <Layout>
    <div class="news-page">
      <div class="container">
        <section class="page-header">
          <h1 class="page-title">新闻动态</h1>
          <p class="page-subtitle">了解哈密刺绣的最新行业动态、政策法规及活动信息</p>
        </section>

        <!-- 订阅区域 -->
        <section class="subscription-section">
          <div class="subscription-card">
            <h3 class="subscription-title">订阅新闻</h3>
            <p class="subscription-desc">订阅您感兴趣的新闻类别，及时获取最新更新</p>
            <div class="subscription-form">
              <select v-model="selectedCategory" class="category-select">
                <option value="">选择类别</option>
                <option value="industry">行业动态</option>
                <option value="policy">政策法规</option>
                <option value="activity">活动信息</option>
                <option value="promotion">促销信息</option>
              </select>
              <input v-model="email" type="email" placeholder="请输入邮箱地址" class="email-input" />
              <button @click="handleSubscribe" class="btn-primary">订阅</button>
            </div>
          </div>
        </section>

        <!-- 新闻列表 -->
        <section class="news-list-section">
          <div class="news-filters">
            <button
              v-for="category in categories"
              :key="category.value"
              :class="['filter-btn', { active: activeCategory === category.value }]"
              @click="activeCategory = category.value"
            >
              {{ category.label }}
            </button>
          </div>

          <div class="news-grid">
            <article v-for="news in filteredNews" :key="news.id" class="news-card">
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
                <div class="news-actions">
                  <a @click.prevent="viewNewsDetail(news.id)" href="#" class="btn-link">阅读更多</a>
                  <button @click="shareNews(news)" class="share-btn">分享</button>
                </div>
              </div>
            </article>
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
import message from '../../utils/message'
import './News.css'

const router = useRouter()

const selectedCategory = ref('')
const email = ref('')
const activeCategory = ref('all')

const categories = [
  { label: '全部', value: 'all' },
  { label: '行业动态', value: 'industry' },
  { label: '政策法规', value: 'policy' },
  { label: '活动信息', value: 'activity' },
  { label: '促销信息', value: 'promotion' },
]

const newsList = [
  {
    id: 1,
    title: '国家级非遗——哈密刺绣，传统工艺的璀璨明珠',
    excerpt: '哈密刺绣哈密刺绣是哈密维吾尔族一种美化服饰的传统手工艺，是维吾尔族人民日常生活中的重要用品，也是中国文化传承的一块瑰宝。它是在哈密维吾尔族文化与中原汉族、西域土著以及中亚各民族长期交流和相互影响之下逐渐发展起来的,于2008年6月被列入第二批国家级非物质文化遗产名录。',
    category: '行业动态',
    categoryValue: 'industry',
    date: '2025-05-15',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?national%20intangible%20heritage%20Hami%20embroidery%20award%20ceremony&image_size=landscape_4_3',
  },
  {
    id: 2,
    title: '锦绣哈密——刺绣暨手工艺文化作品展为哈密瓜节锦上添花',
    excerpt: '一年一度的哈密刺绣文化节将于下月举行，届时将有众多传承人现场展示精湛技艺。',
    category: '活动信息',
    categoryValue: 'activity',
    date: '2024-01-10',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?splendid%20Hami%20embroidery%20cultural%20festival%20celebration%20event%20colorful%20scene&image_size=landscape_4_3',
  },
  {
    id: 3,
    title: '非遗保护新政策出台',
    excerpt: '国家出台新的非物质文化遗产保护政策，加大对传统手工艺的扶持力度。',
    category: '政策法规',
    categoryValue: 'policy',
    date: '2024-01-05',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?new%20cultural%20heritage%20protection%20policy%20announcement%20document%20official%20press&image_size=landscape_4_3',
  },
  {
    id: 4,
    title: '春季新品限时优惠',
    excerpt: '春季新品刺绣作品限时优惠，购买即享8折优惠，更有精美礼品相送。',
    category: '促销信息',
    categoryValue: 'promotion',
    date: '2024-01-01',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?spring%20sale%20promotion%20new%20embroidery%20products%20discount&image_size=landscape_4_3',
  },
]

const filteredNews = computed(() => {
  if (activeCategory.value === 'all') {
    return newsList
  }
  return newsList.filter(news => news.categoryValue === activeCategory.value)
})

const handleSubscribe = () => {
  if (email.value && selectedCategory.value) {
    message.success(`已订阅 ${selectedCategory.value} 类别的新闻，我们将发送到 ${email.value}`)
    email.value = ''
    selectedCategory.value = ''
  } else {
    message.warning('请填写完整的订阅信息')
  }
}

const viewNewsDetail = (id: number) => {
  router.push(`/news/${id}`)
}

const shareNews = (news: any) => {
  if (navigator.share) {
    navigator.share({
      title: news.title,
      text: news.excerpt,
      url: window.location.href,
    })
  } else {
    message.info('分享功能：' + news.title)
  }
}
</script>


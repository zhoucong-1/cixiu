<template>
  <Layout>
    <div class="news-detail-page">
      <div class="container">
        <div class="breadcrumb">
          <a href="/news">新闻动态</a>
          <span> / </span>
          <span>{{ news?.title }}</span>
        </div>

        <article v-if="news" class="news-article">
          <header class="article-header">
            <div class="article-meta">
              <span class="article-category">{{ news.category }}</span>
              <span class="article-date">{{ news.date }}</span>
              <span class="article-views">阅读量: {{ news.views }}</span>
            </div>
            <h1 class="article-title">{{ news.title }}</h1>
            <p class="article-subtitle">{{ news.subtitle }}</p>
          </header>

          <div class="article-image">
            <img :src="news.image" :alt="news.title" @error="handleImageError" />
          </div>

          <div class="article-content">
            <div v-for="(paragraph, index) in news.content" :key="index" class="content-paragraph">
              <h2 v-if="paragraph.type === 'heading'" class="content-heading">
                {{ paragraph.text }}
              </h2>
              <p v-else-if="paragraph.type === 'text'" class="content-text">{{ paragraph.text }}</p>
              <img v-else-if="paragraph.type === 'image'" :src="paragraph.src" :alt="paragraph.alt" class="content-image" />
            </div>
          </div>

          <div class="article-tags">
            <span v-for="tag in news.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>

          <div class="article-actions">
            <button @click="shareNews" class="btn-share">分享</button>
            <button @click="subscribeCategory" class="btn-subscribe">订阅此类新闻</button>
          </div>

          <div class="related-news">
            <h3 class="related-title">相关新闻</h3>
            <div class="related-grid">
              <div
                v-for="item in relatedNews"
                :key="item.id"
                class="related-card"
                @click="viewNews(item.id)"
              >
                <div class="related-image">
                  <img :src="item.image" :alt="item.title" />
                </div>
                <div class="related-content">
                  <h4 class="related-card-title">{{ item.title }}</h4>
                  <span class="related-date">{{ item.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '../../components/Layout/Layout.vue'
import message from '../../utils/message'
import './NewsDetail.css'

const route = useRoute()
const router = useRouter()

const news = ref<any>(null)
const relatedNews = ref<any[]>([])

const newsData: Record<string, any> = {
  '1': {
    id: 1,
    title: '国家级非遗——哈密刺绣，传统工艺的璀璨明珠',
    subtitle: '哈密刺绣哈密刺绣是哈密维吾尔族一种美化服饰的传统手工艺，是维吾尔族人民日常生活中的重要用品，也是中国文化传承的一块瑰宝。它是在哈密维吾尔族文化与中原汉族、西域土著以及中亚各民族长期交流和相互影响之下逐渐发展起来的,于2008年6月被列入第二批国家级非物质文化遗产名录。',
    category: '行业动态',
    date: '2025-05-15',
    views: 1234,
    image: 'https://picsum.photos/id/87/800/450',
    tags: ['非遗', '传承', '保护'],
    content: [
      { type: 'text', text: '近日，哈密刺绣技艺正式入选国家级非物质文化遗产代表性项目名录，这是对哈密地区传统手工艺的重要认可。' },
      { type: 'image', src: 'https://picsum.photos/id/88/800/400', alt: '非遗授牌仪式' },
      { type: 'heading', text: '入选意义' },
      { type: 'text', text: '此次入选国家级非遗名录，标志着哈密刺绣技艺的保护和传承工作进入了一个新的阶段。这不仅是对传统手工艺的认可，更是对民族文化传承的重要推动。' },
      { type: 'image', src: 'https://picsum.photos/id/89/800/400', alt: '传统刺绣作品' },
      { type: 'heading', text: '未来展望' },
      { type: 'text', text: '未来，我们将继续致力于哈密刺绣技艺的保护、传承和推广工作，让更多的人了解和喜爱这一传统艺术形式。' },
    ],
  },
  '2': {
    id: 2,
    title: '锦绣哈密——刺绣暨手工艺文化作品展为哈密瓜节锦上添花',
    subtitle: '一年一度的哈密刺绣文化节将于下月举行，届时将有众多传承人现场展示精湛技艺。',
    category: '活动信息',
    date: '2024-01-10',
    views: 856,
    image: 'https://picsum.photos/id/90/800/450',
    tags: ['文化节', '活动', '传承人'],
    content: [
      { type: 'text', text: '2024年哈密刺绣文化节即将在下月隆重开幕，这是展示哈密刺绣文化的重要平台。' },
      { type: 'image', src: 'https://picsum.photos/id/91/800/400', alt: '展览现场' },
      { type: 'heading', text: '活动亮点' },
      { type: 'text', text: '本次文化节将邀请多位国家级非遗传承人现场展示精湛的刺绣技艺，同时还将举办作品展览、技艺教学等活动。' },
      { type: 'image', src: 'https://picsum.photos/id/92/800/400', alt: '传承人演示' },
    ],
  },
  '3': {
    id: 3,
    title: '非遗保护新政策出台',
    subtitle: '国家出台新的非物质文化遗产保护政策，加大对传统手工艺的扶持力度。',
    category: '政策法规',
    date: '2024-01-05',
    views: 2156,
    image: 'https://picsum.photos/id/93/800/450',
    tags: ['政策', '非遗', '扶持'],
    content: [
      { type: 'text', text: '近日，文化和旅游部联合财政部发布《关于进一步加强非物质文化遗产保护工作的指导意见》，明确提出加大对传统刺绣、剪纸等手工艺类非遗项目的资金支持力度。' },
      { type: 'image', src: 'https://picsum.photos/id/94/800/400', alt: '政策文件发布现场' },
      { type: 'heading', text: '政策要点' },
      { type: 'text', text: '根据新政策，国家级非遗传承人每年将获得专项补助资金，用于开展传习活动、培养接班人和举办展览展示。同时，各地将建设一批非遗工坊，为传统手工艺人提供创作和销售平台。' },
      { type: 'image', src: 'https://picsum.photos/id/95/800/400', alt: '非遗工坊内部环境' },
      { type: 'heading', text: '对哈密刺绣的影响' },
      { type: 'text', text: '哈密刺绣作为第二批国家级非遗项目，将直接受益于此次政策调整。预计未来三年内，当地将新增5个刺绣传承基地，培训超过200名年轻绣娘，让这一古老技艺焕发新的生机。' },
    ],
  },
  '4': {
    id: 4,
    title: '春季新品限时优惠',
    subtitle: '春季新品刺绣作品限时优惠，购买即享8折优惠，更有精美礼品相送。',
    category: '促销信息',
    date: '2024-01-01',
    views: 3421,
    image: 'https://picsum.photos/id/96/800/450',
    tags: ['促销', '新品', '优惠'],
    content: [
      { type: 'text', text: '新春伊始，哈密刺绣官方商城推出春季新品限时优惠活动！全场刺绣作品8折起，部分爆款更是直降5折，机会难得不容错过。' },
      { type: 'image', src: 'https://picsum.photos/id/97/800/400', alt: '春季新品展示' },
      { type: 'heading', text: '活动详情' },
      { type: 'text', text: '活动时间：2024年1月1日 - 2月29日；参与方式：商城下单自动享受折扣，满500元再送精美刺绣书签一套；特别福利：前100名下单用户可获得传承人亲笔签名证书。' },
      { type: 'image', src: 'https://picsum.photos/id/98/800/400', alt: '精美礼品赠送' },
      { type: 'heading', text: '推荐商品' },
      { type: 'text', text: '本次春季新品包括：花卉系列抱枕套（8色可选）、几何纹样桌旗套装、定制姓名刺绣T恤等。所有产品均由认证绣娘手工制作，品质保证。' },
    ],
  },
}

onMounted(() => {
  const newsId = route.params.id as string
  news.value = newsData[newsId] || newsData['1']
  
  // 加载相关新闻
  relatedNews.value = [
    { id: 2, title: '2024年哈密刺绣文化节即将开幕', date: '2024-01-10', image: 'https://picsum.photos/id/15/300/200' },
    { id: 3, title: '非遗保护新政策出台', date: '2024-01-05', image: 'https://picsum.photos/id/16/300/200' },
    { id: 4, title: '春季新品限时优惠', date: '2024-01-01', image: 'https://picsum.photos/id/17/300/200' },
  ]
})

const shareNews = () => {
  if (navigator.share && news.value) {
    navigator.share({
      title: news.value.title,
      text: news.value.subtitle,
      url: window.location.href,
    })
  } else {
    message.info('分享功能：' + news.value?.title)
  }
}

const subscribeCategory = () => {
  if (news.value) {
    message.success(`已订阅 ${news.value.category} 类别的新闻`)
  }
}

const viewNews = (id: number) => {
  router.push(`/news/${id}`)
}

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  // 如果主图加载失败，使用备用图
  img.src = 'https://picsum.photos/id/18/800/450'
}
</script>


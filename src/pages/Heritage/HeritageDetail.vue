<template>
  <Layout>
    <div class="heritage-detail-page">
      <div class="container">
        <div class="breadcrumb">
          <a href="/heritage">传承发展</a>
          <span> / </span>
          <span>{{ activity?.title }}</span>
        </div>

        <article v-if="activity" class="activity-article">
          <header class="article-header">
            <div class="article-meta">
              <span class="activity-date">{{ activity.date }}</span>
              <span class="activity-location">{{ activity.location }}</span>
            </div>
            <h1 class="article-title">{{ activity.title }}</h1>
            <p class="article-subtitle">{{ activity.description }}</p>
            <div class="article-tags">
              <span v-for="tag in activity.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </header>

          <!-- 活动封面图 -->
          <div class="article-cover">
            <img :src="activity.image" :alt="activity.title" />
          </div>

          <!-- 活动详情内容 -->
          <section class="detail-section">
            <h2 class="detail-heading">活动介绍</h2>
            <div class="detail-content">
              <p v-for="(para, idx) in activity.detailContent" :key="idx" class="detail-paragraph">{{ para }}</p>
            </div>
          </section>

          <!-- 活动图片展示 -->
          <section class="detail-section">
            <h2 class="detail-heading">活动掠影</h2>
            <div class="gallery-grid">
              <img
                v-for="(img, idx) in activity.gallery"
                :key="idx"
                :src="img"
                :alt="`活动图片${idx + 1}`"
                class="gallery-image"
              />
            </div>
          </section>

          <!-- 活动信息 -->
          <section class="info-section">
            <h2 class="detail-heading">活动信息</h2>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">活动时间</span>
                <span class="info-value">{{ activity.timeInfo || activity.date }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">活动地点</span>
                <span class="info-value">{{ activity.location }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">参与人数</span>
                <span class="info-value">{{ activity.participants || '限50人' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">报名方式</span>
                <span class="info-value">{{ activity.registerMethod || '线上预约' }}</span>
              </div>
            </div>
          </section>

          <!-- 报名按钮 -->
          <div class="action-section">
            <button @click="registerActivity" class="btn-register">立即报名</button>
            <button @click="goBack" class="btn-back">返回列表</button>
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
import './HeritageDetail.css'

const route = useRoute()
const router = useRouter()

const activity = ref<any>(null)

// 活动详细数据
const activitiesData: Record<string, any> = {
  '1': {
    id: 1,
    title: '2024年哈密刺绣传承人培训班',
    description: '面向全疆的刺绣技艺培训班，邀请国家级传承人授课，培养新一代传承人。',
    date: '2025-10-15',
    location: '哈密市文化中心',
    image: 'https://picsum.photos/id/68/800/450',
    tags: ['培训', '传承', '教育'],
    timeInfo: '2025年10月15日 - 10月25日（每日9:00-17:00）',
    participants: '限30人',
    registerMethod: '线上预约 / 现场报名',
    detailContent: [
      '本次培训班由哈密市文化和旅游局主办，特邀卡德尔·热合曼、阿吉尔·赛买提、布如力·斯开克三位国家级非遗传承人亲临授课。',
      '培训课程涵盖：传统纹样设计、基础针法入门、色彩搭配原理、作品创作实践四大模块。学员将系统学习哈密刺绣的核心技艺，并在传承人指导下完成一件独立刺绣作品。',
      '培训班面向全疆招收学员，要求对传统手工艺有浓厚兴趣、具备一定美术基础者优先。培训结束后将颁发结业证书，优秀学员有机会成为传承人工作室的签约绣娘。',
    ],
    gallery: [
      'https://picsum.photos/id/69/600/400',
      'https://picsum.photos/id/70/600/400',
      'https://picsum.photos/id/71/600/400',
      'https://picsum.photos/id/72/600/400',
    ],
  },
  '2': {
    id: 2,
    title: '传统技艺进校园活动',
    description: '组织传承人走进中小学校园，向学生展示和传授传统刺绣技艺。',
    date: '2026-04-20',
    location: '哈密市各中小学',
    image: 'https://picsum.photos/id/73/800/450',
    tags: ['教育', '推广', '青少年'],
    timeInfo: '2026年4月起，每两周一次（周五下午）',
    participants: '每校限40名学生',
    registerMethod: '学校统一组织报名',
    detailContent: [
      '"非遗进校园"系列活动旨在让青少年近距离感受哈密刺绣的魅力，在孩子们心中播下传统文化的种子。',
      '活动内容包括：传承人现场演示刺绣技艺、学生动手体验基础针法、欣赏优秀刺绣作品展览、聆听非遗背后的文化故事。每场活动约90分钟，寓教于乐。',
      '目前已与哈密市第一中学、第五小学等8所学校建立合作关系，累计覆盖学生超过2000人次。未来计划拓展至更多区县学校。',
    ],
    gallery: [
      'https://picsum.photos/id/74/600/400',
      'https://picsum.photos/id/75/600/400',
      'https://picsum.photos/id/76/600/400',
      'https://picsum.photos/id/77/600/400',
    ],
  },
  '3': {
    id: 3,
    title: '刺绣作品巡回展览',
    description: '在各地举办刺绣作品展览，展示传承成果，推广刺绣文化。',
    date: '2026-05-10',
    location: '乌鲁木齐、北京、上海',
    image: 'https://picsum.photos/id/78/800/450',
    tags: ['展览', '推广', '文化交流'],
    timeInfo: '2026年5月 - 8月（各城市展期2周）',
    participants: '不限人数，免费参观',
    registerMethod: '无需预约，直接参观',
    detailContent: [
      '"锦绣中华——哈密刺绣精品展"是一场跨越三座城市的巡回展览，汇集了三代传承人的百余件代表作品。',
      '展览分为三个单元："千年丝路"展示历史渊源与经典纹样、"匠心独运"呈现当代创新设计、"薪火相传"记录传承人与学员的成长故事。每件作品都附有二维码语音讲解。',
      '首站乌鲁木齐已吸引超过5000名观众，后续将在北京798艺术区和上海外滩美术馆展出。展览期间还将举办刺绣体验工坊和传承人见面会。',
    ],
    gallery: [
      'https://picsum.photos/id/79/600/400',
      'https://picsum.photos/id/80/600/400',
      'https://picsum.photos/id/81/600/400',
      'https://picsum.photos/id/82/600/400',
    ],
  },
}

onMounted(() => {
  const activityId = route.params.id as string
  activity.value = activitiesData[activityId] || activitiesData['1']
})

const registerActivity = () => {
  if (activity.value) {
    message.success(`已成功报名「${activity.value.title}」！我们将尽快与您联系确认。`)
  }
}

const goBack = () => {
  router.push('/heritage')
}
</script>

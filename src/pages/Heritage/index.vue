<template>
  <Layout>
    <div class="heritage-page">
      <div class="container">
        <section class="page-header">
          <h1 class="page-title">传承发展</h1>
          <p class="page-subtitle">了解哈密刺绣的传承历程与发展现状</p>
        </section>

        <!-- 传承人介绍 -->
        <section class="inheritors-section">
          <h2 class="section-title">传承人介绍</h2>
          <div class="inheritors-grid">
            <div v-for="inheritor in inheritors" :key="inheritor.id" class="inheritor-card">
              <div class="inheritor-avatar">{{ inheritor.avatar }}</div>
              <div class="inheritor-content">
                <h3 class="inheritor-name">{{ inheritor.name }}</h3>
                <p class="inheritor-title">{{ inheritor.title }}</p>
                <p class="inheritor-bio">{{ inheritor.bio }}</p>
                <div class="inheritor-achievements">
                  <h4 class="achievements-title">主要成就：</h4>
                  <ul class="achievements-list">
                    <li v-for="achievement in inheritor.achievements" :key="achievement">
                      {{ achievement }}
                    </li>
                  </ul>
                </div>
                <div class="inheritor-actions">
                  <button @click="viewWorks(inheritor.id)" class="btn-primary">查看作品</button>
                  <button @click="contactInheritor(inheritor.id)" class="btn-secondary">联系传承人</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 传承活动 -->
        <section class="activities-section">
          <h2 class="section-title">传承活动</h2>
          <div class="activities-list">
            <div v-for="activity in activities" :key="activity.id" class="activity-card">
              <div class="activity-image">
                <img :src="activity.image" :alt="activity.title" />
              </div>
              <div class="activity-content">
                <div class="activity-meta">
                  <span class="activity-date">{{ activity.date }}</span>
                  <span class="activity-location">{{ activity.location }}</span>
                </div>
                <h3 class="activity-title">{{ activity.title }}</h3>
                <p class="activity-description">{{ activity.description }}</p>
                <div class="activity-tags">
                  <span v-for="tag in activity.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
                <button @click="viewActivity(activity.id)" class="btn-link">了解更多</button>
              </div>
            </div>
          </div>
        </section>

        <!-- 传承成果 -->
        <section class="achievements-section">
          <h2 class="section-title">传承成果</h2>
          <div class="achievements-grid">
            <div v-for="achievement in achievements" :key="achievement.id" class="achievement-card">
              <div class="achievement-icon">{{ achievement.icon }}</div>
              <h3 class="achievement-title">{{ achievement.title }}</h3>
              <p class="achievement-value">{{ achievement.value }}</p>
              <p class="achievement-desc">{{ achievement.description }}</p>
            </div>
          </div>
        </section>

        <!-- 传承计划 -->
        <section class="plans-section">
          <h2 class="section-title">传承计划</h2>
          <div class="plans-list">
            <div v-for="plan in plans" :key="plan.id" class="plan-card">
              <div class="plan-header">
                <h3 class="plan-title">{{ plan.title }}</h3>
                <span class="plan-status" :class="plan.status">{{ getStatusText(plan.status) }}</span>
              </div>
              <p class="plan-description">{{ plan.description }}</p>
              <div class="plan-timeline">
                <span class="plan-date">计划时间：{{ plan.timeline }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Layout from '../../components/Layout/Layout.vue'
import message from '../../utils/message'
import './Heritage.css'

const router = useRouter()

const inheritors = [
  {
    id: 1,
    name: '卡德尔.热合曼',
    title: '哈密市级代表性传承人',
    avatar: '👩',
    bio: '哈密传统工艺工作站驻站设计师,带领30多位绣娘团队',
    achievements: [
      '2008年获得国家级非遗传承人称号',
      '2017年成立哈密市绣娘团队',
      '2021年成为非遗保护与民族团结的代表人物',
    ],
  },
  {
    id: 2,
    name: '阿吉尔·赛买提‌',
    title: '第四批国家级非遗传承人',
    avatar: '👨',
    bio: '自12岁起随母亲学艺,注册“阿加汗”刺绣商标,创办加工厂,培养学员超1800人作品以图案丰富、色彩明快、针脚细密著称 ‌‌官网‌。',
    achievements: [  
      '1988年《春播》获全国农民书画大赛一等奖',
      '2010年荣获"自治区工艺美术大师"',
      '2012年成为第四批国家非遗传承人',
    ],
  },
  {
    id: 3,
    name: '布如力·斯开克‌',
    title: '第五批国家级非遗传承人',
    avatar: '👩',
    bio: '自幼随母亲学艺,掌握多种传统绣法与纹样设计组建26人职业班,推动技艺系统化传承。',
    achievements: [
      '2017年入选第五批国家级传承人推荐名单',
      '2022年评为国家级非物质文化遗产代表性传承人',
      '2026年仍以传承人身份传承与推广一线',
    ],
  },
]

const activities = [
  {
    id: 1,
    title: '2024年哈密刺绣传承人培训班',
    description: '面向全疆的刺绣技艺培训班，邀请国家级传承人授课，培养新一代传承人。',
    date: '2025-10-15',
    location: '哈密市文化中心',
    image: 'https://picsum.photos/id/74/600/400',
    tags: ['培训', '传承', '教育'],
  },
  {
    id: 2,
    title: '传统技艺进校园活动',
    description: '组织传承人走进中小学校园，向学生展示和传授传统刺绣技艺。',
    date: '2026-04-20',
    location: '哈密市各中小学',
    image: 'https://picsum.photos/id/75/600/400',
    tags: ['教育', '推广', '青少年'],
  },
  {
    id: 3,
    title: '刺绣作品巡回展览',
    description: '在各地举办刺绣作品展览，展示传承成果，推广刺绣文化。',
    date: '2026-05-10',
    location: '乌鲁木齐、北京、上海',
    image: 'https://picsum.photos/id/76/600/400',
    tags: ['展览', '推广', '文化交流'],
  },
]

const achievements = [
  {
    id: 1,
    title: '传承人数量',
    value: '50+',
    description: '各级非遗传承人总数',
    icon: '👥',
  },
  {
    id: 2,
    title: '培训学员',
    value: '2000+',
    description: '累计培训学员人数',
    icon: '🎓',
  },
  {
    id: 3,
    title: '作品数量',
    value: '5000+',
    description: '传承人创作作品总数',
    icon: '🎨',
  },
  {
    id: 4,
    title: '获奖作品',
    value: '100+',
    description: '各类奖项获奖作品数',
    icon: '🏆',
  },
]

const plans = [
  {
    id: 1,
    title: '建立传承人数据库',
    description: '建立完整的传承人信息数据库，记录传承人的技艺特点和作品信息。',
    timeline: '2025年-2026前半年',
    status: 'ongoing',
  },
  {
    id: 2,
    title: '开展青少年传承计划',
    description: '在中小学校开设刺绣课程，培养青少年对传统技艺的兴趣。',
    timeline: '2026全年',
    status: 'planned',
  },
  {
    id: 3,
    title: '建设传承基地',
    description: '建设集展示、教学、创作于一体的传承基地，为传承活动提供场所。',
    timeline: '2026-2027年',
    status: 'planned',
  },
]

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    ongoing: '进行中',
    planned: '计划中',
    completed: '已完成',
  }
  return statusMap[status] || status
}

const viewWorks = (inheritorId: number) => {
  router.push(`/works?inheritor=${inheritorId}`)
}

const contactInheritor = (inheritorId: number) => {
  message.info(`联系传承人：${inheritors.find(i => i.id === inheritorId)?.name}`)
}

const viewActivity = (activityId: number) => {
  router.push(`/heritage/${activityId}`)
}
</script>


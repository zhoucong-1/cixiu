<template>
  <Layout>
    <div class="about-page">
      <div class="container">
        <!-- 顶部简介：项目使命 + 视觉介绍 -->
        <section class="page-header">
          <div class="about-hero">
            <div class="about-hero-text">
              <h1 class="page-title">关于我们</h1>
              <p class="page-subtitle">
                “哈密刺绣数字图谱”致力于用数字技术记录、保护和传播哈密新疆维吾尔族刺绣这一珍贵的非物质文化遗产，
                让传统纹样、针法技艺与当代生活重新建立连接。
              </p>
              <div class="about-mission-list">
                <div class="mission-item" v-for="mission in missions" :key="mission.id">
                  <h3 class="mission-title">{{ mission.title }}</h3>
                  <p class="mission-desc">{{ mission.description }}</p>
                </div>
              </div>
            </div>
            <div class="about-hero-visual">
              <div class="about-hero-circle">
                <span class="about-hero-icon">绣</span>
              </div>
              <p class="about-hero-caption">
                以“针”为笔，以“线”为墨，织就哈密大地上的光与色。
              </p>
            </div>
          </div>
        </section>

        <!-- 我们在做什么：与各模块/商城呼应 -->
        <section class="what-we-do-section">
          <h2 class="section-title">我们在做什么</h2>
          <div class="what-we-do-grid">
            <div v-for="item in whatWeDo" :key="item.id" class="what-card">
              <div class="what-icon">{{ item.icon }}</div>
              <h3 class="what-title">{{ item.title }}</h3>
              <p class="what-desc">{{ item.description }}</p>
            </div>
          </div>
        </section>

        <!-- 团队介绍：突出“数字 + 非遗”跨学科团队 -->
        <section class="team-section">
          <h2 class="section-title">核心团队</h2>
          <p class="section-intro">
            团队由非遗专家、刺绣传承人、用户体验设计师和工程技术人员组成，
            共同推动哈密刺绣的数字化保护、创新设计与产业化发展。
          </p>
          <div class="team-grid">
            <div v-for="member in teamMembers" :key="member.id" class="team-card">
              <div class="team-avatar">{{ member.avatar }}</div>
              <h3 class="team-name">{{ member.name }}</h3>
              <p class="team-role">{{ member.role }}</p>
              <p class="team-bio">{{ member.bio }}</p>
            </div>
          </div>
        </section>

        <!-- 发展历程：与“传承发展/历史源流”呼应 -->
        <section class="history-section">
          <h2 class="section-title">平台发展历程</h2>
          <div class="history-timeline">
            <div v-for="(milestone, index) in milestones" :key="index" class="milestone-item">
              <div class="milestone-year">{{ milestone.year }}</div>
              <div class="milestone-content">
                <h3 class="milestone-title">{{ milestone.title }}</h3>
                <p class="milestone-description">{{ milestone.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 合作网络：政府 / 机构 / 产业 -->
        <section class="partners-section">
          <h2 class="section-title">合作网络</h2>
          <div class="partners-grid">
            <div v-for="partner in partners" :key="partner.id" class="partner-card">
              <div class="partner-logo">{{ partner.logo }}</div>
              <h3 class="partner-name">{{ partner.name }}</h3>
              <p class="partner-desc">{{ partner.description }}</p>
            </div>
          </div>
        </section>

        <!-- 影响力与成果：既有文化也有产业 -->
        <section class="achievements-section">
          <h2 class="section-title">平台影响力与成果</h2>
          <div class="achievements-grid">
            <div
              v-for="achievement in achievements"
              :key="achievement.id"
              class="achievement-card"
            >
              <div class="achievement-icon">{{ achievement.icon }}</div>
              <h3 class="achievement-title">{{ achievement.title }}</h3>
              <p class="achievement-value">{{ achievement.value }}</p>
              <p class="achievement-desc">{{ achievement.description }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '../../components/Layout/Layout.vue'
import './About.css'

const missions = [
  {
    id: 1,
    title: '系统梳理哈密刺绣文化谱系',
    description:
      '通过“历史源流、艺术特色、文化内涵、制作工艺、传承发展”等板块，构建完整的哈密刺绣数字知识体系。',
  },
  {
    id: 2,
    title: '服务传承人和从业者',
    description:
      '为刺绣传承人、合作社和工作室提供作品展示、课程教学、材料采购、品牌推广等一体化服务。',
  },
  {
    id: 3,
    title: '连接大众与非遗生活化应用',
    description:
      '通过线上商城、互动社区和故事化内容，让更多普通用户在日常生活中“看得见、买得到、用得上”哈密刺绣。',
  },
]

const whatWeDo = [
  {
    id: 1,
    icon: '📚',
    title: '数字档案与知识图谱',
    description:
      '汇集纹样、针法、工艺流程、口述历史等多源资料，构建可检索、可扩展的哈密刺绣数字档案库。',
  },
  {
    id: 2,
    icon: '🧵',
    title: '线上教学与技艺传承',
    description:
      '通过图文教程、视频课程与线上活动，支持不同水平学习者系统掌握哈密刺绣技艺。',
  },
  {
    id: 3,
    icon: '🛒',
    title: '文创开发与精品商城',
    description:
      '联合传承人和设计团队，推出兼具文化内涵与现代审美的刺绣作品和衍生文创产品。',
  },
  {
    id: 4,
    icon: '🤝',
    title: '多方协同的保护机制',
    description:
      '与政府部门、研究机构、企业平台深度合作，探索非遗保护与乡村振兴相结合的新路径。',
  },
]

const teamMembers = [
  {
    id: 1,
    name: '卡德尔.热合曼',
    role: '项目发起人 / 非遗传承与策划',
    bio: '成长于哈密刺绣世家，负责整体文化定位与传承路径设计，平衡“守正”与“创新”。',
    avatar: '👤',
  },
  {
    id: 2,
    name: '周聪',
    role: '技术总监 / 数字化架构',
    bio: '专注文化数字化与知识图谱技术，负责平台架构、数据可视化与性能优化。',
    avatar: '💻',
  },
  {
    id: 3,
    name: '海欣航',
    role: '内容主编 / 文化研究',
    bio: '民族文化研究者，负责历史资料梳理、文本校对与多语种内容策划。',
    avatar: '📚',
  },
  {
    id: 4,
    name: '吴优',
    role: '产品与视觉设计',
    bio: '将传统纹样、色彩与现代交互设计结合，为平台打造具有“哈密气质”的数字体验。',
    avatar: '🎨',
  },
]

const milestones = [
  {
    year: '2025',
    title: '项目立项与田野调研',
    description: '完成对哈密及周边地区多轮走访，记录传承人口述史，收集典型纹样与作品。',
  },
  {
    year: '2026',
    title: '数字图谱原型平台上线',
    description: '搭建首版“历史源流、艺术特色、文化内涵、制作工艺”四大核心板块。',
  },
  {
    year: '2026',
    title: '商城与在线课程开通',
    description: '引入传承人工作室与合作社，推出线上商城与系统课程体系，打通“文化—产品—用户”的闭环。',
  },
  {
    year: '2026-2027',
    title: '社区与传承基地共建',
    description: '上线互动社区功能，并与线下基地联动，形成线上线下一体化传承网络。',
  },
]

const partners = [
  {
    id: 1,
    name: '哈密市文化局',
    description: '提供非遗名录与政策支持，共同推进哈密刺绣保护与展示。',
    logo: '🏛️',
  },
  {
    id: 2,
    name: '新疆非遗保护中心',
    description: '在非遗保护规范、资料采集和研究方法上提供专业指导。',
    logo: '🎨',
  },
  {
    id: 3,
    name: '哈密刺绣传承人协会',
    description: '联合多位国家级、自治区级、市级传承人，共建作品库和培训体系。',
    logo: '👥',
  },
  {
    id: 4,
    name: '高校与科研机构',
    description: '在民族文化研究、数字人文与设计创新方面开展联合课题研究。',
    logo: '🏫',
  },
]

const achievements = [
  {
    id: 1,
    title: '参与用户',
    value: '10,000+',
    description: '来自全国各地的非遗爱好者、设计师与研究者在平台上交流与学习。',
    icon: '👥',
  },
  {
    id: 2,
    title: '收录作品',
    value: '500+',
    description: '涵盖传统服饰、家居装饰、文创礼品等多种类型的哈密刺绣作品。',
    icon: '🎨',
  },
  {
    id: 3,
    title: '合作传承人 / 工作室',
    value: '20+',
    description: '与多位代表性传承人和合作社建立长期合作关系。',
    icon: '🤝',
  },
  {
    id: 4,
    title: '平台访问量',
    value: '100万+',
    description: '通过图谱、课程、商城等多种入口，持续扩大哈密刺绣的公众影响力。',
    icon: '📊',
  },
]
</script>


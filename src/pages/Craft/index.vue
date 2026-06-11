<template>
  <Layout>
    <div class="craft-page">
      <div class="container">
        <section class="page-header">
          <h1 class="page-title">制作工艺</h1>
          <p class="page-subtitle">了解刺绣的材料与工艺流程</p>
        </section>

        <!-- 材料详解 -->
        <section class="materials-section">
          <h2 class="section-title">材料详解</h2>
          <div class="materials-grid">
            <div v-for="(material, index) in materials" :key="index" class="material-card">
              <div class="material-image">
                <img :src="material.image" :alt="material.name" />
              </div>
              <h3 class="material-name">{{ material.name }}</h3>
              <p class="material-description">{{ material.description }}</p>
              <p class="material-usage">{{ material.usage }}</p>
              <a href="/shop?type=material" class="btn-primary">
                购买材料
              </a>
            </div>
          </div>
        </section>

        <!-- 工艺流程 -->
        <section class="process-section">
          <h2 class="section-title">工艺流程</h2>
          <div class="process-container">
            <div v-for="process in processes" :key="process.step" class="process-step">
              <div class="step-number">{{ process.step }}</div>
              <div class="step-content">
                <h3 class="step-title">{{ process.title }}</h3>
                <p class="step-description">{{ process.description }}</p>
              </div>
            </div>
          </div>
          <div class="process-actions">
            <button class="btn-primary" @click="goToDiy">
              购买DIY体验包
            </button>
          </div>
        </section>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Layout from '../../components/Layout/Layout.vue'
import './Craft.css'

const router = useRouter()

const materials = [
  {
    name: '优质丝绸',
    description: '选用上等丝绸面料，质地柔软，光泽自然',
    usage: '用于制作高档刺绣作品',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20quality%20silk%20fabric%20for%20embroidery%20smooth%20shiny%20texture%20natural%20material&image_size=landscape_4_3',
  },
  {
    name: '彩色丝线',
    description: '丰富的色彩选择，色彩鲜艳持久',
    usage: '用于图案绣制',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20embroidery%20silk%20thread%20skeins%20rainbow%20colors%20vibrant%20bright%20craft%20supplies&image_size=landscape_4_3',
  },
  {
    name: '绣绷与工具套装',
    description: '专业绣绷、绣针、剪刀等全套工具，适合各水平学习者使用',
    usage: '用于固定面料和精细操作',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=embroidery%20hoop%20tool%20set%20wooden%20frame%20needles%20scissors%20professional%20equipment%20kit&image_size=landscape_4_3',
  },
]

const processes = [
  { step: 1, title: '设计图案', description: '根据需求设计刺绣图案' },
  { step: 2, title: '选材备料', description: '选择合适的布料和丝线' },
  { step: 3, title: '上绷固定', description: '将布料固定在绣架上' },
  { step: 4, title: '开始绣制', description: '按照图案进行绣制' },
  { step: 5, title: '完成整理', description: '完成绣制并进行后期整理' },
]

const goToDiy = () => {
  router.push('/craft/diy')
}
</script>


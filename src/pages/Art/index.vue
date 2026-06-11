<template>
  <Layout>
    <div class="art-page">
      <div class="container">
        <!-- 页面标题 -->
        <section class="page-header">
          <h1 class="page-title">艺术特色</h1>
          <p class="page-subtitle">探索哈密刺绣的图案库与针法技艺</p>
        </section>

        <!-- 标签切换 -->
        <div class="tab-switcher">
          <button
            :class="['tab-btn', { active: activeTab === 'patterns' }]"
            @click="activeTab = 'patterns'"
          >
            图案库
          </button>
          <button
            :class="['tab-btn', { active: activeTab === 'techniques' }]"
            @click="activeTab = 'techniques'"
          >
            针法技艺
          </button>
        </div>

        <!-- 图案库内容 -->
        <section v-if="activeTab === 'patterns'" class="patterns-section">
          <h2 class="section-title">图案库</h2>
          <div class="patterns-grid">
            <div v-for="pattern in patterns" :key="pattern.id" class="pattern-card">
              <div class="pattern-image">
                <img :src="pattern.image" :alt="pattern.name" />
              </div>
              <div class="pattern-content">
                <div class="pattern-category">{{ pattern.category }}</div>
                <h3 class="pattern-name">{{ pattern.name }}</h3>
                <p class="pattern-description">{{ pattern.description }}</p>
                <div class="pattern-meaning">
                  <strong>寓意：</strong>
                  {{ pattern.meaning }}
                </div>
                <div class="pattern-actions">
                  <a :href="`/shop?pattern=${pattern.id}`" class="btn-primary">
                    查看相关商品
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 针法技艺内容 -->
        <section v-if="activeTab === 'techniques'" class="techniques-section">
          <h2 class="section-title">针法技艺教学</h2>
          <div class="techniques-grid">
            <div v-for="technique in techniques" :key="technique.id" class="technique-card">
              <div class="technique-image">
                <img :src="technique.image" :alt="technique.name" />
              </div>
              <div class="technique-content">
                <div class="technique-header">
                  <h3 class="technique-name">{{ technique.name }}</h3>
                  <span :class="['difficulty-badge', `difficulty-${technique.difficulty}`]">
                    {{ technique.difficulty }}
                  </span>
                </div>
                <p class="technique-description">{{ technique.description }}</p>
                <div class="technique-actions">
                  <a :href="`/craft/technique/${technique.id}`" class="btn-secondary">
                    学习教程
                  </a>
                  <a :href="`/shop?type=material&technique=${technique.id}`" class="btn-link">
                    购买材料包
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Layout from '../../components/Layout/Layout.vue'
import './Art.css'

const activeTab = ref<'patterns' | 'techniques'>('patterns')

const patterns = [
  {
    id: 1,
    name: '花卉图案',
    category: '自然',
    meaning: '象征生命力和美好愿望',
    image: 'https://picsum.photos/id/58/600/400',
    description: '传统花卉图案，寓意繁荣昌盛',
  },
  {
    id: 2,
    name: '几何图案',
    category: '抽象',
    meaning: '代表秩序和和谐',
    image: 'https://picsum.photos/id/59/600/400',
    description: '精美的几何纹样，体现对称美',
  },
  {
    id: 3,
    name: '动物图案',
    category: '自然',
    meaning: '象征吉祥和力量',
    image: 'https://picsum.photos/id/61/600/400',
    description: '传统动物纹样，寓意吉祥如意',
  },
]

const techniques = [
  {
    id: 1,
    name: '平针绣',
    description: '最基础的刺绣针法，适合大面积填充',
    difficulty: '初级',
    image: 'https://picsum.photos/id/62/600/400',
  },
  {
    id: 2,
    name: '锁边绣',
    description: '用于边缘装饰，形成精美的轮廓',
    difficulty: '中级',
    image: 'https://picsum.photos/id/63/600/400',
  },
  {
    id: 3,
    name: '盘金绣',
    description: '使用金线盘绕，形成华丽的装饰效果',
    difficulty: '高级',
    image: 'https://picsum.photos/id/64/600/400',
  },
]
</script>


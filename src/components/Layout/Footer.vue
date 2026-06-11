<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- 主要内容区 -->
      <div class="footer-content">
        <!-- 品牌信息 -->
        <div class="footer-brand">
          <h3 class="footer-brand-title">哈密刺绣数字图谱</h3>
          <p class="footer-brand-desc">
            传承新疆维吾尔族刺绣文化，弘扬非遗技艺，让传统艺术在现代数字时代焕发新活力。
          </p>
          <div class="footer-social">
            <a
              v-for="(social, index) in socialLinks"
              :key="index"
              :href="social.path"
              class="social-link"
              :aria-label="social.name"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="social-icon">{{ social.icon }}</span>
            </a>
          </div>
        </div>

        <!-- 链接列 -->
        <div class="footer-links">
          <div v-for="(column, index) in footerLinks" :key="index" class="footer-link-column">
            <h4 class="footer-link-title">{{ column.title }}</h4>
            <ul class="footer-link-list">
              <li v-for="(link, linkIndex) in column.links" :key="linkIndex">
                <a :href="link.path" class="footer-link">
                  {{ link.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 联系信息 -->
      <div class="footer-contact">
        <div class="footer-contact-item">
          <span class="contact-label">联系电话：</span>
          <span class="contact-value">186-6299-5253</span>
        </div>
        <div class="footer-contact-item">
          <span class="contact-label">邮箱：</span>
          <span class="contact-value">18662995253@163.com</span>
        </div>
        <div class="footer-contact-item">
          <span class="contact-label">地址：</span>
          <span class="contact-value">新疆维吾尔自治区库尔勒市</span>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>
            © {{ currentYear }} 哈密刺绣数字图谱. 保留所有权利.
          </p>
          <p class="footer-icp">
            <a href="#" class="footer-link">ICP备案号：XXXXXXXX</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import './Footer.css'

const currentYear = computed(() => new Date().getFullYear())

const socialLinks = [
  { name: '微信', icon: '💬', path: '#' },
  { name: '微博', icon: '📱', path: '#' },
  { name: '抖音', icon: '🎵', path: '#' },
]

const footerLinks = [
  {
    title: '关于我们',
    links: [
      { name: '关于我们', path: '/about' },
      { name: '团队介绍', path: '/about/team' },
      { name: '发展历程', path: '/about/history' },
      { name: '合作伙伴', path: '/about/partners' },
    ],
  },
  {
    title: '快速链接',
    links: [
      { name: '历史源流', path: '/history' },
      { name: '艺术特色', path: '/art' },
      { name: '作品展示', path: '/works' },
      { name: '新闻动态', path: '/news' },
    ],
  },
  {
    title: '商城服务',
    links: [
      { name: '商城首页', path: '/shop' },
      { name: '商品分类', path: '/shop/categories' },
      { name: '定制服务', path: '/shop/custom' },
      { name: '购物指南', path: '/shop/guide' },
    ],
  },
  {
    title: '帮助支持',
    links: [
      { name: '帮助中心', path: '/help' },
      { name: '联系我们', path: '/contact' },
      { name: '意见反馈', path: '/feedback' },
      { name: '隐私政策', path: '/privacy' },
    ],
  },
]
</script>


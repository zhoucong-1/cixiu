<template>
  <header :class="['header', className]">
    <div class="header-container">
      <!-- Logo区域 -->
      <div class="header-logo">
        <a @click.prevent="navigateTo('/')" href="#" class="logo-link">
          <span class="logo-char">绣</span>
        </a>
      </div>

      <!-- 导航菜单 - 桌面端 -->
      <nav class="header-nav desktop-only">
        <ul class="nav-list">
          <li v-for="(item, index) in navItems" :key="index" class="nav-item">
            <a @click.prevent="navigateTo(item.path)" href="#" class="nav-link">
              {{ item.name }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- 右侧操作区 -->
      <div class="header-actions">
        <!-- 搜索 -->
        <button class="header-action-btn" aria-label="搜索" @click="toggleSearch">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 19L14.65 14.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- 购物车 -->
        <a @click.prevent="navigateTo('/shop/cart')" href="#" class="header-action-btn cart-btn" aria-label="购物车">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7H15L14 13H6L5 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="7.5" cy="16.5" r="1.5" fill="currentColor"/>
            <circle cx="13.5" cy="16.5" r="1.5" fill="currentColor"/>
          </svg>
          <span v-if="totalItemCount > 0" class="cart-badge">{{ totalItemCount }}</span>
        </a>

        <!-- 用户中心 -->
        <a @click.prevent="navigateTo('/user')" href="#" class="header-action-btn" aria-label="用户中心">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 19C3 15 6.13401 12 10 12C13.866 12 17 15 17 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>

        <!-- 商城按钮 -->
        <a @click.prevent="navigateTo(shopItem.path)" href="#" class="btn-shop">
          {{ shopItem.name }}
        </a>

        <!-- 移动端菜单按钮 -->
        <button
          class="header-action-btn mobile-menu-btn mobile-only"
          @click="toggleMenu"
          aria-label="菜单"
        >
          <span :class="['icon-menu', { active: isMenuOpen }]">
            {{ isMenuOpen ? '✕' : '☰' }}
          </span>
        </button>
      </div>
    </div>

    <!-- 搜索框 -->
    <div v-if="showSearch" class="search-overlay" @click="showSearch = false">
      <div class="search-box" @click.stop>
        <input
          type="text"
          placeholder="搜索商品、作品、文章..."
          class="search-input"
          @keyup.enter="handleSearch"
          ref="searchInputRef"
        />
        <button class="search-btn" @click="handleSearch">搜索</button>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <nav :class="['mobile-nav', { 'mobile-nav-open': isMenuOpen }]">
      <ul class="mobile-nav-list">
        <li v-for="(item, index) in navItems" :key="index" class="mobile-nav-item">
          <a @click.prevent="navigateTo(item.path)" href="#" class="mobile-nav-link">
            {{ item.name }}
          </a>
        </li>
        <li class="mobile-nav-item">
          <a @click.prevent="navigateTo(shopItem.path)" href="#" class="mobile-nav-link">
            {{ shopItem.name }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import message from '../../utils/message'
import { totalItemCount } from '../../store/cart'
import './Header.css'

const router = useRouter()

interface Props {
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: ''
})

const isMenuOpen = ref(false)
const showSearch = ref(false)

const navItems = [
  { name: '历史源流', path: '/history' },
  { name: '艺术特色', path: '/art' },
  { name: '文化内涵', path: '/culture' },
  { name: '制作工艺', path: '/craft' },
  { name: '传承发展', path: '/heritage' },
  { name: '新闻动态', path: '/news' },
  { name: '作品展示', path: '/works' },
  { name: '关于我们', path: '/about' },
]

const shopItem = { name: '商城', path: '/shop', highlight: true }

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const searchInputRef = ref<HTMLInputElement | null>(null)

const toggleSearch = async () => {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    await nextTick()
    searchInputRef.value?.focus()
  }
}

const handleSearch = () => {
  // 处理搜索逻辑
  if (searchInputRef.value?.value) {
    message.info(`搜索：${searchInputRef.value.value}`)
    showSearch.value = false
  }
}

const navigateTo = (path: string) => {
  router.push(path)
  closeMenu()
}
</script>


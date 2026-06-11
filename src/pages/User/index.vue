<template>
  <Layout>
    <div class="user-page">
      <div class="container">
        <section class="page-header">
          <h1 class="page-title">个人中心</h1>
          <p class="page-subtitle">管理你的账号信息与订单</p>
        </section>

        <div class="user-grid">
          <div class="user-card">
            <div class="user-avatar">{{ user?.avatar || '👤' }}</div>
            <div class="user-info">
              <div class="user-name">{{ user?.displayName || '未登录用户' }}</div>
              <div class="user-meta">用户名：{{ user?.username }}</div>
            </div>

            <div class="user-actions">
              <button class="btn-secondary" @click="goOrders">我的订单</button>
              <button class="btn-primary" @click="handleLogout">退出登录</button>
            </div>
          </div>

          <div class="panel-card">
            <h2 class="panel-title">快捷入口</h2>
            <div class="quick-list">
              <button class="quick-item" @click="goOrders">
                <span class="quick-icon">📦</span>
                <span class="quick-text">查看订单</span>
              </button>
              <button class="quick-item" @click="goCart">
                <span class="quick-icon">🛒</span>
                <span class="quick-text">购物车</span>
              </button>
              <button class="quick-item" @click="goShop">
                <span class="quick-icon">🏬</span>
                <span class="quick-text">继续逛逛</span>
              </button>
            </div>
            <p class="panel-hint">提示：目前为本地模拟登录，刷新页面仍保持登录态。</p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '../../components/Layout/Layout.vue'
import message from '../../utils/message'
import { getCurrentUser, logout, type AuthUser } from '../../utils/auth'
import './User.css'

const router = useRouter()
const user = ref<AuthUser | null>(null)

onMounted(() => {
  user.value = getCurrentUser()
})

const goOrders = () => router.push('/shop/orders')
const goCart = () => router.push('/shop/cart')
const goShop = () => router.push('/shop')

const handleLogout = () => {
  logout()
  message.success('已退出登录')
  router.replace('/login')
}
</script>



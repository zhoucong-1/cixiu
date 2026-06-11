<template>
  <Layout>
    <div class="auth-page">
      <div class="container">
        <div class="auth-card">
          <h1 class="auth-title">登录</h1>
          <p class="auth-subtitle">欢迎回来，登录后进入个人中心</p>

          <form class="auth-form" @submit.prevent="handleLogin">
            <div class="form-item">
              <label class="form-label">用户名</label>
              <input
                v-model="username"
                class="form-input"
                type="text"
                placeholder="请输入用户名"
                autocomplete="username"
              />
            </div>

            <div class="form-item">
              <label class="form-label">密码</label>
              <input
                v-model="password"
                class="form-input"
                type="password"
                placeholder="请输入密码"
                autocomplete="current-password"
              />
            </div>

            <button class="btn-primary auth-submit" type="submit">登录</button>

            <div class="auth-links">
              <span class="link-text">还没有账号？</span>
              <a href="#" class="link" @click.prevent="goRegister">去注册</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '../../components/Layout/Layout.vue'
import message from '../../utils/message'
import { login } from '../../utils/auth'
import './Login.css'

const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')

const handleLogin = () => {
  const res = login({ username: username.value, password: password.value })
  if (!res.ok) {
    message.warning(res.message || '登录失败')
    return
  }

  message.success('登录成功')
  const redirect = (route.query.redirect as string) || '/user'
  router.replace(redirect)
}

const goRegister = () => {
  const redirect = (route.query.redirect as string) || '/user'
  router.push({ path: '/register', query: { redirect } })
}
</script>



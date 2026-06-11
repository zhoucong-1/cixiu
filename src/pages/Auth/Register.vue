<template>
  <Layout>
    <div class="auth-page">
      <div class="container">
        <div class="auth-card">
          <h1 class="auth-title">注册</h1>
          <p class="auth-subtitle">创建账号后将自动登录</p>

          <form class="auth-form" @submit.prevent="handleRegister">
            <div class="form-item">
              <label class="form-label">用户名</label>
              <input
                v-model="username"
                class="form-input"
                type="text"
                placeholder="至少 2 位"
                autocomplete="username"
              />
            </div>

            <div class="form-item">
              <label class="form-label">密码</label>
              <input
                v-model="password"
                class="form-input"
                type="password"
                placeholder="至少 4 位"
                autocomplete="new-password"
              />
            </div>

            <div class="form-item">
              <label class="form-label">确认密码</label>
              <input
                v-model="confirmPassword"
                class="form-input"
                type="password"
                placeholder="再次输入密码"
                autocomplete="new-password"
              />
            </div>

            <button class="btn-primary auth-submit" type="submit">注册并登录</button>

            <div class="auth-links">
              <span class="link-text">已有账号？</span>
              <a href="#" class="link" @click.prevent="goLogin">去登录</a>
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
import { register } from '../../utils/auth'
import './Register.css'

const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    message.warning('两次输入的密码不一致')
    return
  }

  const res = register({ username: username.value, password: password.value })
  if (!res.ok) {
    message.warning(res.message || '注册失败')
    return
  }

  message.success('注册成功，已自动登录')
  const redirect = (route.query.redirect as string) || '/user'
  router.replace(redirect)
}

const goLogin = () => {
  const redirect = (route.query.redirect as string) || '/user'
  router.push({ path: '/login', query: { redirect } })
}
</script>



<template>
  <div v-if="error" class="app-error">
    <p>页面加载出错，请刷新重试</p>
    <button @click="error = null">重新加载</button>
  </div>
  <router-view v-else />
  <Toast />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import Toast from './components/Toast/Toast.vue'

const error = ref<Error | null>(null)

onErrorCaptured((err: Error) => {
  error.value = err
  console.error('App Error:', err)
  return false
})
</script>

<style scoped>
.app-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #666;
  font-size: 16px;
}
.app-error button {
  margin-top: 12px;
  padding: 8px 24px;
  background: #b8860b;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>


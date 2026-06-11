<template>
  <Teleport to="body">
    <TransitionGroup
      name="toast"
      tag="div"
      class="toast-container"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', `toast-${toast.type}`]"
      >
        <div class="toast-icon">
          <span v-if="toast.type === 'success'">✓</span>
          <span v-else-if="toast.type === 'error'">✕</span>
          <span v-else-if="toast.type === 'warning'">⚠</span>
          <span v-else>ℹ</span>
        </div>
        <div class="toast-content">
          <p class="toast-message">{{ toast.message }}</p>
        </div>
        <button
          v-if="toast.closable"
          class="toast-close"
          @click="removeToast(toast.id)"
          aria-label="关闭"
        >
          ✕
        </button>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import './Toast.css'

export interface ToastOptions {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  closable?: boolean
}

interface ToastItem extends ToastOptions {
  id: number
}

const toasts = ref<ToastItem[]>([])
let toastIdCounter = 0

const addToast = (options: ToastOptions) => {
  const id = ++toastIdCounter
  const toast: ToastItem = {
    id,
    message: options.message,
    type: options.type || 'info',
    duration: options.duration ?? 3000,
    closable: options.closable ?? true,
  }

  toasts.value.push(toast)

  // 自动移除
  if (toast.duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, toast.duration)
  }

  return id
}

const removeToast = (id: number) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const clearAll = () => {
  toasts.value = []
}

// 暴露方法供全局使用
onMounted(() => {
  ;(window as any).__toast = {
    success: (message: string, options?: Partial<ToastOptions>) =>
      addToast({ ...options, message, type: 'success' }),
    error: (message: string, options?: Partial<ToastOptions>) =>
      addToast({ ...options, message, type: 'error' }),
    warning: (message: string, options?: Partial<ToastOptions>) =>
      addToast({ ...options, message, type: 'warning' }),
    info: (message: string, options?: Partial<ToastOptions>) =>
      addToast({ ...options, message, type: 'info' }),
    clear: clearAll,
  }
})

onUnmounted(() => {
  delete (window as any).__toast
})
</script>


/**
 * 消息提示工具函数
 * 提供统一的 API 来显示 Toast 消息
 */

declare global {
  interface Window {
    __toast?: {
      success: (message: string, options?: Partial<{ duration: number; closable: boolean }>) => number
      error: (message: string, options?: Partial<{ duration: number; closable: boolean }>) => number
      warning: (message: string, options?: Partial<{ duration: number; closable: boolean }>) => number
      info: (message: string, options?: Partial<{ duration: number; closable: boolean }>) => number
      clear: () => void
    }
  }
}

const getToast = () => {
  if (typeof window !== 'undefined' && window.__toast) {
    return window.__toast
  }
  // 降级到原生 alert
  return {
    success: (msg: string) => alert(msg),
    error: (msg: string) => alert(msg),
    warning: (msg: string) => alert(msg),
    info: (msg: string) => alert(msg),
    clear: () => {},
  }
}

export const message = {
  success: (msg: string, duration = 3000) => {
    return getToast().success(msg, { duration })
  },
  error: (msg: string, duration = 4000) => {
    return getToast().error(msg, { duration })
  },
  warning: (msg: string, duration = 3000) => {
    return getToast().warning(msg, { duration })
  },
  info: (msg: string, duration = 3000) => {
    return getToast().info(msg, { duration })
  },
  clear: () => {
    getToast().clear()
  },
}

export default message


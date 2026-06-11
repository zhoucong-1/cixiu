/**
 * 购物车全局状态管理
 */

import { reactive, computed } from 'vue'

export interface CartItem {
  id: number
  title: string
  spec: string
  price: number
  quantity: number
  image: string
  selected: boolean
}

// 购物车状态
const cartState = reactive({
  items: [] as CartItem[],
})

// 从 localStorage 恢复购物车数据
const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('cixiu_cart')
    if (saved) {
      cartState.items = JSON.parse(saved)
    }
  } catch (e) {
    console.error('加载购物车数据失败:', e)
  }
}

// 保存购物车数据到 localStorage
const saveCartToStorage = () => {
  try {
    localStorage.setItem('cixiu_cart', JSON.stringify(cartState.items))
  } catch (e) {
    console.error('保存购物车数据失败:', e)
  }
}

// 初始化时加载数据
loadCartFromStorage()

// 计算属性
export const cartItems = computed(() => cartState.items)

export const isAllSelected = computed(() => {
  return cartState.items.length > 0 && cartState.items.every(item => item.selected)
})

export const selectedCount = computed(() => {
  return cartState.items.filter(item => item.selected).length
})

export const totalPrice = computed(() => {
  return cartState.items
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
})

export const totalItemCount = computed(() => {
  return cartState.items.reduce((sum, item) => sum + item.quantity, 0)
})

// 操作方法
export function addToCart(product: {
  id: number
  title: string
  price: number
  image: string
  spec?: string
  quantity?: number
}) {
  const existingItem = cartState.items.find(item => item.id === product.id)

  if (existingItem) {
    // 如果商品已存在，增加数量
    existingItem.quantity += product.quantity || 1
  } else {
    // 如果商品不存在，添加新商品
    cartState.items.push({
      id: product.id,
      title: product.title,
      spec: product.spec || '默认规格',
      price: product.price,
      image: product.image,
      quantity: product.quantity || 1,
      selected: true,
    })
  }

  saveCartToStorage()
}

export function removeFromCart(id: number) {
  const index = cartState.items.findIndex(item => item.id === id)
  if (index > -1) {
    cartState.items.splice(index, 1)
    saveCartToStorage()
  }
}

export function updateQuantity(id: number, quantity: number) {
  const item = cartState.items.find(item => item.id === id)
  if (item) {
    item.quantity = Math.max(1, quantity)
    saveCartToStorage()
  }
}

export function toggleSelectItem(id: number) {
  const item = cartState.items.find(item => item.id === id)
  if (item) {
    item.selected = !item.selected
    saveCartToStorage()
  }
}

export function toggleSelectAll() {
  const selectAll = !isAllSelected.value
  cartState.items.forEach(item => {
    item.selected = selectAll
  })
  saveCartToStorage()
}

export function removeSelectedItems() {
  cartState.items = cartState.items.filter(item => !item.selected)
  saveCartToStorage()
}

export function clearCart() {
  cartState.items = []
  saveCartToStorage()
}

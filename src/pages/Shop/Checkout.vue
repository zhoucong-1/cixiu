<template>
  <Layout>
    <div class="checkout-page">
      <div class="container">
        <section class="page-header">
          <h1 class="page-title">结算</h1>
        </section>

        <div class="checkout-content">
          <div class="checkout-main">
            <!-- 收货地址 -->
            <section class="address-section">
              <h2 class="section-title">收货地址</h2>
              <div class="address-list">
                <div
                  v-for="address in addresses"
                  :key="address.id"
                  :class="['address-card', { active: selectedAddress === address.id }]"
                  @click="selectedAddress = address.id"
                >
                  <div class="address-header">
                    <span class="address-name">{{ address.name }}</span>
                    <span class="address-phone">{{ address.phone }}</span>
                    <span v-if="address.isDefault" class="address-default">默认</span>
                  </div>
                  <p class="address-detail">{{ address.detail }}</p>
                </div>
                <button class="btn-add-address" @click="showAddAddress = true">
                  + 添加新地址
                </button>
              </div>
            </section>

            <!-- 订单商品 -->
            <section class="order-section">
              <h2 class="section-title">订单商品</h2>
              <div class="order-items">
                <div v-for="item in orderItems" :key="item.id" class="order-item">
                  <div class="order-image">
                    <img :src="item.image" :alt="item.title" />
                  </div>
                  <div class="order-info">
                    <h3 class="order-title">{{ item.title }}</h3>
                    <p class="order-spec">{{ item.spec }}</p>
                  </div>
                  <div class="order-quantity">x{{ item.quantity }}</div>
                  <div class="order-price">¥{{ (item.price * item.quantity).toFixed(2) }}</div>
                </div>
              </div>
            </section>

            <!-- 支付方式 -->
            <section class="payment-section">
              <h2 class="section-title">支付方式</h2>
              <div class="payment-methods">
                <label
                  v-for="method in paymentMethods"
                  :key="method.value"
                  :class="['payment-method', { active: selectedPayment === method.value }]"
                >
                  <input
                    type="radio"
                    :value="method.value"
                    v-model="selectedPayment"
                    class="payment-radio"
                  />
                  <span class="payment-icon">{{ method.icon }}</span>
                  <span class="payment-name">{{ method.name }}</span>
                </label>
              </div>
            </section>
          </div>

          <!-- 订单汇总 -->
          <section class="summary-section">
            <div class="summary-card">
              <div class="summary-row">
                <span>商品总计：</span>
                <span>¥{{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="summary-row">
                <span>运费：</span>
                <span>¥{{ shippingFee.toFixed(2) }}</span>
              </div>
              <div class="summary-row summary-total">
                <span>实付款：</span>
                <span class="total-amount">¥{{ totalAmount.toFixed(2) }}</span>
              </div>
              <button @click="submitOrder" class="btn-submit" :disabled="!canSubmit">
                提交订单
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '../../components/Layout/Layout.vue'
import message from '../../utils/message'
import { cartItems, clearCart } from '../../store/cart'
import './Checkout.css'

const router = useRouter()

const selectedAddress = ref(1)
const selectedPayment = ref('alipay')
const showAddAddress = ref(false)

const addresses = [
  {
    id: 1,
    name: '张三',
    phone: '138****8888',
    detail: '新疆维吾尔自治区哈密市伊州区XX街道XX号',
    isDefault: true,
  },
  {
    id: 2,
    name: '李四',
    phone: '139****9999',
    detail: '新疆维吾尔自治区哈密市伊州区YY街道YY号',
    isDefault: false,
  },
]

// 从购物车获取商品
const orderItems = computed(() => cartItems.value)

const paymentMethods = [
  { value: 'alipay', name: '支付宝', icon: '💳' },
  { value: 'wechat', name: '微信支付', icon: '💵' },
  { value: 'bank', name: '银行卡', icon: '🏦' },
]

const subtotal = computed(() => {
  return orderItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const shippingFee = computed(() => {
  return subtotal.value >= 200 ? 0 : 15
})

const totalAmount = computed(() => {
  return subtotal.value + shippingFee.value
})

const canSubmit = computed(() => {
  return selectedAddress.value > 0 && selectedPayment.value && orderItems.value.length > 0
})

const submitOrder = () => {
  if (canSubmit.value) {
    // 创建订单
    const orderNumber = Date.now().toString()
    const newOrder = {
      id: Date.now(),
      orderNumber,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      total: totalAmount.value,
      isReviewed: false,
      items: orderItems.value.map(item => ({
        id: item.id,
        title: item.title,
        spec: item.spec,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    }

    // 保存订单到 localStorage
    try {
      const saved = localStorage.getItem('cixiu_orders')
      let orders = saved ? JSON.parse(saved) : []
      orders.unshift(newOrder)
      localStorage.setItem('cixiu_orders', JSON.stringify(orders))
    } catch (e) {
      console.error('保存订单失败:', e)
    }

    // 清空购物车
    clearCart()

    message.success('订单提交成功！')
    router.push('/shop/orders')
  }
}
</script>


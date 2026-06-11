<template>
  <Layout>
    <div class="orders-page">
      <div class="container">
        <section class="page-header">
          <h1 class="page-title">我的订单</h1>
        </section>

        <!-- 订单状态筛选 -->
        <div class="order-filters">
          <button
            v-for="status in orderStatuses"
            :key="status.value"
            :class="['filter-btn', { active: activeStatus === status.value }]"
            @click="activeStatus = status.value"
          >
            {{ status.label }}
          </button>
        </div>

        <!-- 订单列表 -->
        <div class="orders-list">
          <div v-for="order in filteredOrders" :key="order.id" class="order-card">
            <div class="order-header">
              <div class="order-info">
                <span class="order-number">订单号：{{ order.orderNumber }}</span>
                <span class="order-date">{{ order.date }}</span>
              </div>
              <span :class="['order-status', order.status]">{{ getStatusText(order.status) }}</span>
            </div>

            <div class="order-items">
              <div v-for="item in order.items" :key="item.id" class="order-item">
                <div class="item-image">
                  <img v-if="item.image && !item.image.match(/^[🌸🔷✂️🧵📰🎉📋🛍️]$/)" :src="item.image" :alt="item.title" />
                  <span v-else>{{ item.image }}</span>
                </div>
                <div class="item-info">
                  <h3 class="item-title">{{ item.title }}</h3>
                  <p class="item-spec">{{ item.spec }}</p>
                </div>
                <div class="item-quantity">x{{ item.quantity }}</div>
                <div class="item-price">¥{{ (item.price * item.quantity).toFixed(2) }}</div>
              </div>
            </div>

            <div class="order-footer">
              <div class="order-total">
                共 {{ order.items.length }} 件商品，合计：
                <span class="total-amount">¥{{ order.total.toFixed(2) }}</span>
              </div>
              <div class="order-actions">
                <button
                  v-if="order.status === 'pending'"
                  @click="cancelOrder(order.id)"
                  class="btn-secondary"
                >
                  取消订单
                </button>
                <button
                  v-if="order.status === 'paid'"
                  @click="confirmReceipt(order.id)"
                  class="btn-primary"
                >
                  确认收货
                </button>
                <button
                  v-if="order.status === 'completed' && !order.isReviewed"
                  @click="reviewOrder(order.id)"
                  class="btn-primary"
                >
                  评价
                </button>
                <button @click="viewOrderDetail(order.id)" class="btn-link">查看详情</button>
              </div>
            </div>
          </div>

          <div v-if="filteredOrders.length === 0" class="empty-orders">
            <p>暂无订单</p>
          </div>
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
import './Orders.css'

const router = useRouter()

const activeStatus = ref('all')

const orderStatuses = [
  { label: '全部', value: 'all' },
  { label: '待付款', value: 'pending' },
  { label: '待发货', value: 'paid' },
  { label: '待收货', value: 'shipping' },
  { label: '已完成', value: 'completed' },
]

const orders = ref<any[]>([])

// 从 localStorage 加载订单
const loadOrders = () => {
  try {
    const saved = localStorage.getItem('cixiu_orders')
    if (saved) {
      orders.value = JSON.parse(saved)
    }
  } catch (e) {
    console.error('加载订单数据失败:', e)
  }
}

loadOrders()

const filteredOrders = computed(() => {
  if (activeStatus.value === 'all') {
    return orders.value
  }
  return orders.value.filter(order => order.status === activeStatus.value)
})

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: '待付款',
    paid: '待发货',
    shipping: '待收货',
    completed: '已完成',
    cancelled: '已取消',
  }
  return statusMap[status] || status
}

const cancelOrder = (id: number) => {
  if (confirm('确定要取消订单吗？')) {
    message.success('订单已取消')
  }
}

const confirmReceipt = (id: number) => {
  if (confirm('确认已收到商品？')) {
    message.success('确认收货成功')
  }
}

const reviewOrder = (id: number) => {
  message.info('跳转到评价页面')
}

const viewOrderDetail = (id: number) => {
  router.push(`/shop/order/${id}`)
}
</script>


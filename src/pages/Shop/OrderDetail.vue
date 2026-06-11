<template>
  <Layout>
    <div class="order-detail-page">
      <div class="container">
        <div class="breadcrumb">
          <a href="/shop/orders">我的订单</a>
          <span> / </span>
          <span>订单详情</span>
        </div>

        <div v-if="order" class="order-detail">
          <div class="order-header">
            <div class="order-info">
              <h1 class="order-title">订单详情</h1>
              <div class="order-meta">
                <span class="order-number">订单号：{{ order.orderNumber }}</span>
                <span class="order-date">下单时间：{{ order.orderDate }}</span>
                <span :class="['order-status', `status-${order.status}`]">
                  {{ getStatusText(order.status) }}
                </span>
              </div>
            </div>
          </div>

          <div class="order-content">
            <div class="order-section">
              <h3 class="section-title">收货信息</h3>
              <div class="address-info">
                <p class="address-name">{{ order.address.name }}</p>
                <p class="address-phone">{{ order.address.phone }}</p>
                <p class="address-detail">{{ order.address.detail }}</p>
              </div>
            </div>

            <div class="order-section">
              <h3 class="section-title">商品信息</h3>
              <div class="products-list">
                <div v-for="item in order.products" :key="item.id" class="product-item">
                  <div class="product-image">{{ item.image }}</div>
                  <div class="product-info">
                    <h4 class="product-name">{{ item.name }}</h4>
                    <div class="product-specs">
                      <span v-if="item.spec">规格：{{ item.spec }}</span>
                    </div>
                    <div class="product-price-info">
                      <span class="product-price">¥{{ item.price }}</span>
                      <span class="product-quantity">x{{ item.quantity }}</span>
                    </div>
                  </div>
                  <div class="product-total">¥{{ item.price * item.quantity }}</div>
                </div>
              </div>
            </div>

            <div class="order-section">
              <h3 class="section-title">费用明细</h3>
              <div class="price-details">
                <div class="price-row">
                  <span class="price-label">商品总额</span>
                  <span class="price-value">¥{{ order.totalAmount }}</span>
                </div>
                <div class="price-row">
                  <span class="price-label">运费</span>
                  <span class="price-value">¥{{ order.shippingFee }}</span>
                </div>
                <div v-if="order.discount > 0" class="price-row">
                  <span class="price-label">优惠</span>
                  <span class="price-value discount">-¥{{ order.discount }}</span>
                </div>
                <div class="price-row total">
                  <span class="price-label">实付金额</span>
                  <span class="price-value">¥{{ order.paidAmount }}</span>
                </div>
              </div>
            </div>

            <div v-if="order.paymentMethod" class="order-section">
              <h3 class="section-title">支付信息</h3>
              <div class="payment-info">
                <p>支付方式：{{ order.paymentMethod }}</p>
                <p v-if="order.paidTime">支付时间：{{ order.paidTime }}</p>
              </div>
            </div>

            <div v-if="order.trackingNumber" class="order-section">
              <h3 class="section-title">物流信息</h3>
              <div class="shipping-info">
                <p>物流单号：{{ order.trackingNumber }}</p>
                <p v-if="order.shippingCompany">物流公司：{{ order.shippingCompany }}</p>
              </div>
            </div>
          </div>

          <div class="order-actions">
            <button v-if="order.status === 'pending'" @click="cancelOrder" class="btn-cancel">
              取消订单
            </button>
            <button v-if="order.status === 'pending'" @click="payOrder" class="btn-pay">
              立即支付
            </button>
            <button v-if="order.status === 'shipped'" @click="confirmReceive" class="btn-confirm">
              确认收货
            </button>
            <button @click="viewLogistics" class="btn-logistics">查看物流</button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '../../components/Layout/Layout.vue'
import message from '../../utils/message'
import './OrderDetail.css'

const route = useRoute()
const router = useRouter()

const order = ref<any>(null)

const ordersData: Record<string, any> = {
  '1': {
    id: 1,
    orderNumber: '202401150001',
    orderDate: '2024-01-15 10:30:00',
    status: 'pending',
    address: {
      name: '张三',
      phone: '138****8888',
      detail: '新疆维吾尔自治区哈密市伊州区XX街道XX号',
    },
    products: [
      {
        id: 1,
        name: '传统花卉刺绣作品',
        image: '🌸',
        price: 299,
        quantity: 1,
        spec: '标准版',
      },
      {
        id: 4,
        name: '优质刺绣丝线套装',
        image: '🧵',
        price: 89,
        quantity: 2,
        spec: '24色',
      },
    ],
    totalAmount: 477,
    shippingFee: 20,
    discount: 50,
    paidAmount: 447,
    paymentMethod: null,
    paidTime: null,
    trackingNumber: null,
    shippingCompany: null,
  },
  '2': {
    id: 2,
    orderNumber: '202401100002',
    orderDate: '2024-01-10 14:20:00',
    status: 'shipped',
    address: {
      name: '李四',
      phone: '139****9999',
      detail: '北京市朝阳区XX路XX号',
    },
    products: [
      {
        id: 2,
        name: '现代几何图案作品',
        image: '🔷',
        price: 399,
        quantity: 1,
        spec: '标准版',
      },
    ],
    totalAmount: 399,
    shippingFee: 20,
    discount: 0,
    paidAmount: 419,
    paymentMethod: '微信支付',
    paidTime: '2024-01-10 14:25:00',
    trackingNumber: 'SF1234567890',
    shippingCompany: '顺丰速运',
  },
}

onMounted(() => {
  const orderId = route.params.id as string
  order.value = ordersData[orderId] || ordersData['1']
})

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: '待支付',
    paid: '已支付',
    shipped: '已发货',
    completed: '已完成',
    cancelled: '已取消',
  }
  return statusMap[status] || status
}

const cancelOrder = () => {
  if (confirm('确定要取消订单吗？')) {
    if (order.value) {
      order.value.status = 'cancelled'
      message.success('订单已取消')
    }
  }
}

const payOrder = () => {
  router.push(`/shop/checkout?orderId=${order.value?.id}`)
}

const confirmReceive = () => {
  if (confirm('确认已收到商品？')) {
    if (order.value) {
      order.value.status = 'completed'
      message.success('订单已完成')
    }
  }
}

const viewLogistics = () => {
  if (order.value?.trackingNumber) {
    message.info(`物流单号：${order.value.trackingNumber}`)
  } else {
    message.warning('暂无物流信息')
  }
}
</script>


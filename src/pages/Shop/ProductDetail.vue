<template>
  <Layout>
    <div class="product-detail-page">
      <div class="container">
        <!-- 面包屑导航 -->
        <nav class="breadcrumb">
          <a href="/">首页</a>
          <span>/</span>
          <a href="/shop">商城</a>
          <span>/</span>
          <span>{{ product.title }}</span>
        </nav>

        <!-- 商品详情 -->
        <div class="product-detail">
          <!-- 商品图片 -->
          <div class="product-images">
            <div class="main-image">
              <img :src="productImages[selectedImage]" :alt="product.title" />
            </div>
            <div class="thumbnail-list">
              <div
                v-for="(img, index) in productImages"
                :key="index"
                :class="['thumbnail', { active: selectedImage === index }]"
                @click="selectedImage = index"
              >
                <img :src="img" :alt="`图片${index + 1}`" />
              </div>
            </div>
          </div>

          <!-- 商品信息 -->
          <div class="product-info">
            <h1 class="product-title">{{ product.title }}</h1>
            <div class="product-meta">
              <div class="product-rating">
                <span class="rating-stars">⭐⭐⭐⭐⭐</span>
                <span class="rating-value">{{ product.rating }}</span>
                <span class="rating-count">({{ product.reviewCount }}条评价)</span>
              </div>
              <div class="product-sales">已售 {{ product.sales }} 件</div>
            </div>

            <div class="product-price-section">
              <div class="price-current">¥{{ product.price }}</div>
              <div v-if="product.originalPrice" class="price-original">¥{{ product.originalPrice }}</div>
              <div class="price-discount" v-if="product.originalPrice">
                省¥{{ product.originalPrice - product.price }}
              </div>
            </div>

            <!-- 规格选择 -->
            <div class="product-specs">
              <div v-for="spec in product.specs" :key="spec.name" class="spec-group">
                <label class="spec-label">{{ spec.name }}：</label>
                <div class="spec-options">
                  <button
                    v-for="option in spec.options"
                    :key="option"
                    :class="['spec-option', { active: selectedSpecs[spec.name] === option }]"
                    @click="selectedSpecs[spec.name] = option"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
            </div>

            <!-- 数量选择 -->
            <div class="product-quantity">
              <label>数量：</label>
              <div class="quantity-control">
                <button @click="decreaseQuantity" :disabled="quantity <= 1" class="quantity-btn">-</button>
                <input v-model.number="quantity" type="number" min="1" class="quantity-input" />
                <button @click="increaseQuantity" class="quantity-btn">+</button>
              </div>
              <span class="stock-info">库存 {{ product.stock }} 件</span>
            </div>

            <!-- 操作按钮 -->
            <div class="product-actions">
              <button class="btn-cart" @click="addToCart">加入购物车</button>
              <button class="btn-buy" @click="buyNow">立即购买</button>
              <button class="btn-favorite" @click="toggleFavorite">
                {{ isFavorite ? '已收藏' : '收藏' }}
              </button>
            </div>
          </div>
        </div>

        <!-- 商品详情标签页 -->
        <div class="product-tabs">
          <div class="tab-header">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              :class="['tab-btn', { active: activeTab === tab.value }]"
              @click="activeTab = tab.value"
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="tab-content">
            <!-- 商品详情 -->
            <div v-if="activeTab === 'detail'" class="tab-panel">
              <h3>商品详情</h3>
              <p>{{ product.description }}</p>
              <div class="detail-images">
                <img src="https://picsum.photos/id/24/800/500" alt="商品详情图1" class="detail-image" />
                <img src="https://picsum.photos/id/25/800/500" alt="商品详情图2" class="detail-image" />
                <img src="https://picsum.photos/id/26/800/500" alt="商品详情图3" class="detail-image" />
              </div>
            </div>

            <!-- 用户评价 -->
            <div v-if="activeTab === 'reviews'" class="tab-panel">
              <div class="reviews-summary">
                <div class="rating-overview">
                  <div class="rating-score">{{ product.rating }}</div>
                  <div class="rating-stars">⭐⭐⭐⭐⭐</div>
                  <div class="rating-text">基于{{ product.reviewCount }}条评价</div>
                </div>
              </div>
              <div class="reviews-list">
                <div v-for="review in reviews" :key="review.id" class="review-item">
                  <div class="review-header">
                    <span class="reviewer-name">{{ review.name }}</span>
                    <div class="review-rating">
                      <span v-for="i in 5" :key="i" :class="['star', { filled: i <= review.rating }]">
                        ⭐
                      </span>
                    </div>
                    <span class="review-date">{{ review.date }}</span>
                  </div>
                  <p class="review-content">{{ review.content }}</p>
                </div>
              </div>
            </div>

            <!-- 相关推荐 -->
            <div v-if="activeTab === 'related'" class="tab-panel">
              <div class="related-products">
                <div v-for="item in relatedProducts" :key="item.id" class="related-product-card">
                  <div class="related-image">
                    <img :src="item.image" :alt="item.title" />
                  </div>
                  <h4 class="related-title">{{ item.title }}</h4>
                  <div class="related-price">¥{{ item.price }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '../../components/Layout/Layout.vue'
import message from '../../utils/message'
import { addToCart as addProductToCart } from '../../store/cart'
import './ProductDetail.css'

const route = useRoute()
const router = useRouter()
const selectedImage = ref(0)
const quantity = ref(1)
const isFavorite = ref(false)
const activeTab = ref('detail')

const productImages = [
  'https://picsum.photos/id/27/600/400',
  'https://picsum.photos/id/28/600/400',
  'https://picsum.photos/id/29/600/400',
  'https://picsum.photos/id/31/600/400',
]

const product = {
  id: Number(route.params.id) || 1,
  title: '传统花卉刺绣作品',
  description: '精美的传统花卉图案，采用优质真丝线手工制作，色彩鲜艳持久，工艺精湛。适合作为装饰品或礼品赠送。',
  price: 299,
  originalPrice: 399,
  rating: 4.8,
  reviewCount: 128,
  sales: 120,
  stock: 50,
  specs: [
    {
      name: '尺寸',
      options: ['小号', '中号', '大号'],
    },
    {
      name: '颜色',
      options: ['红色', '蓝色', '金色'],
    },
  ],
  image: 'https://picsum.photos/id/32/600/400',
}

const selectedSpecs = reactive({
  尺寸: '中号',
  颜色: '红色',
})

const tabs = [
  { label: '商品详情', value: 'detail' },
  { label: '用户评价', value: 'reviews' },
  { label: '相关推荐', value: 'related' },
]

const reviews = [
  {
    id: 1,
    name: '张**',
    rating: 5,
    date: '2024-01-10',
    content: '作品非常精美，工艺精湛，完全超出预期！包装也很精美，值得推荐。',
  },
  {
    id: 2,
    name: '李**',
    rating: 4,
    date: '2024-01-08',
    content: '质量很好，颜色鲜艳，和描述一致。',
  },
]

const relatedProducts = [
  { id: 2, title: '现代几何图案', price: 399, image: 'https://picsum.photos/id/33/600/400' },
  { id: 3, title: '融合风格作品', price: 499, image: 'https://picsum.photos/id/34/600/400' },
]

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const increaseQuantity = () => {
  if (quantity.value < product.stock) {
    quantity.value++
  }
}

const addToCart = () => {
  addProductToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    spec: `${selectedSpecs.尺寸} / ${selectedSpecs.颜色}`,
    quantity: quantity.value,
  })
  message.success(`已将 ${product.title} 加入购物车`)
}

const buyNow = () => {
  router.push(`/shop/checkout?product=${product.id}&quantity=${quantity.value}`)
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}
</script>


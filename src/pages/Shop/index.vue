<template>
  <Layout>
    <div class="shop-page">
      <div class="container">
        <section class="page-header">
          <h1 class="page-title">商城</h1>
          <p class="page-subtitle">精选刺绣产品，支持定制服务</p>
        </section>

        <!-- 商品分类 -->
        <section class="categories-section">
          <div class="categories-list">
            <button
              v-for="category in categories"
              :key="category.id"
              :class="['category-btn', { active: activeCategory === category.id }]"
              @click="activeCategory = category.id"
            >
              {{ category.name }}
            </button>
          </div>
        </section>

        <!-- 商品列表 -->
        <section class="products-section">
          <div class="products-header">
            <div class="products-count">共找到 {{ filteredProducts.length }} 件商品</div>
            <div class="products-sort">
              <label>排序：</label>
              <select v-model="sortBy" class="sort-select">
                <option value="default">默认</option>
                <option value="price-asc">价格从低到高</option>
                <option value="price-desc">价格从高到低</option>
                <option value="sales">销量</option>
              </select>
            </div>
          </div>

          <div class="products-grid">
            <div
              v-for="product in sortedProducts"
              :key="product.id"
              class="product-card"
              @click="viewProduct(product)"
            >
              <div class="product-image">
                <img :src="product.image" :alt="product.title" />
              </div>
              <div v-if="product.isNew" class="product-badge new">新品</div>
              <div v-if="product.isHot" class="product-badge hot">热销</div>
              <div class="product-content">
                <h3 class="product-title">{{ product.title }}</h3>
                <p class="product-desc">{{ product.description }}</p>
                <div class="product-meta">
                  <div class="product-rating">⭐ {{ product.rating }}</div>
                  <div class="product-sales">已售 {{ product.sales }}</div>
                </div>
                <div class="product-footer">
                  <div class="product-price">
                    <span class="price-current">¥{{ product.price }}</span>
                    <span v-if="product.originalPrice" class="price-original">
                      ¥{{ product.originalPrice }}
                    </span>
                  </div>
                  <button class="btn-cart" @click.stop="handleAddToCart(product)">加入购物车</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '../../components/Layout/Layout.vue'
import message from '../../utils/message'
import { addToCart as addProductToCart } from '../../store/cart'
import './Shop.css'

const router = useRouter()

const activeCategory = ref(0)
const sortBy = ref('default')

const categories = [
  { id: 0, name: '全部' },
  { id: 1, name: '传统作品' },
  { id: 2, name: '现代设计' },
  { id: 3, name: '定制服务' },
  { id: 4, name: '材料工具' },
]

const products = [
  {
    id: 1,
    title: '传统花卉刺绣作品',
    description: '精美的传统花卉图案，手工制作',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    sales: 120,
    category: 1,
    image: 'https://picsum.photos/id/44/600/400',
    isNew: false,
    isHot: true,
  },
  {
    id: 2,
    title: '现代几何图案作品',
    description: '融合现代设计理念的几何图案',
    price: 399,
    originalPrice: null,
    rating: 4.6,
    sales: 80,
    category: 2,
    image: 'https://picsum.photos/id/45/600/400',
    isNew: true,
    isHot: false,
  },
  {
    id: 3,
    title: '定制刺绣服务',
    description: '根据您的需求定制专属刺绣作品',
    price: 599,
    originalPrice: null,
    rating: 5.0,
    sales: 50,
    category: 3,
    image: 'https://picsum.photos/id/46/600/400',
    isNew: false,
    isHot: false,
  },
  {
    id: 4,
    title: '优质刺绣丝线套装',
    description: '24色真丝线，色彩鲜艳持久',
    price: 89,
    originalPrice: 129,
    rating: 4.7,
    sales: 200,
    category: 4,
    image: 'https://picsum.photos/id/47/600/400',
    isNew: false,
    isHot: true,
  },
]

const filteredProducts = computed(() => {
  if (activeCategory.value === 0) {
    return products
  }
  return products.filter(product => product.category === activeCategory.value)
})

const sortedProducts = computed(() => {
  const result = [...filteredProducts.value]
  switch (sortBy.value) {
    case 'price-asc':
      return result.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return result.sort((a, b) => b.price - a.price)
    case 'sales':
      return result.sort((a, b) => b.sales - a.sales)
    default:
      return result
  }
})

const viewProduct = (product: any) => {
  router.push(`/shop/product/${product.id}`)
}

const handleAddToCart = (product: any) => {
  addProductToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
  })
  message.success(`已将 ${product.title} 加入购物车`)
}
</script>


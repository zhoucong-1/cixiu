<template>
  <Layout>
    <div class="cart-page">
      <div class="container">
        <section class="page-header">
          <h1 class="page-title">购物车</h1>
        </section>

        <div v-if="cartItems.length === 0" class="empty-cart">
          <div class="empty-icon">🛒</div>
          <p class="empty-text">购物车是空的</p>
          <a href="/shop" class="btn-primary">去购物</a>
        </div>

        <div v-else class="cart-content">
          <!-- 购物车列表 -->
          <div class="cart-list">
            <div class="cart-header">
              <input
                type="checkbox"
                :checked="isAllSelected"
                @change="toggleSelectAll"
                class="select-all-checkbox"
              />
              <span>全选</span>
              <span class="header-product">商品</span>
              <span class="header-price">单价</span>
              <span class="header-quantity">数量</span>
              <span class="header-subtotal">小计</span>
              <span class="header-action">操作</span>
            </div>

            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <input
                type="checkbox"
                v-model="item.selected"
                class="item-checkbox"
              />
              <div class="item-image">
                <img :src="item.image" :alt="item.title" />
              </div>
              <div class="item-info">
                <h3 class="item-title">{{ item.title }}</h3>
                <p class="item-spec">{{ item.spec }}</p>
              </div>
              <div class="item-price">¥{{ item.price }}</div>
              <div class="item-quantity">
                <button @click="decreaseQuantity(item)" class="quantity-btn">-</button>
                <input v-model.number="item.quantity" type="number" min="1" class="quantity-input" />
                <button @click="increaseQuantity(item)" class="quantity-btn">+</button>
              </div>
              <div class="item-subtotal">¥{{ (item.price * item.quantity).toFixed(2) }}</div>
              <button @click="removeItem(item.id)" class="btn-remove">删除</button>
            </div>
          </div>

          <!-- 结算栏 -->
          <div class="cart-footer">
            <div class="footer-left">
              <input
                type="checkbox"
                :checked="isAllSelected"
                @change="toggleSelectAll"
                class="select-all-checkbox"
              />
              <span>全选</span>
              <button @click="removeSelected" class="btn-remove-selected">删除选中</button>
            </div>
            <div class="footer-right">
              <div class="total-info">
                <span class="total-label">已选 {{ selectedCount }} 件商品，合计：</span>
                <span class="total-price">¥{{ totalPrice.toFixed(2) }}</span>
              </div>
              <button @click="checkout" class="btn-checkout" :disabled="selectedCount === 0">
                结算
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Layout from '../../components/Layout/Layout.vue'
import {
  cartItems,
  isAllSelected,
  selectedCount,
  totalPrice,
  toggleSelectAll,
  updateQuantity,
  removeFromCart,
  removeSelectedItems,
} from '../../store/cart'
import './Cart.css'

const router = useRouter()

const decreaseQuantity = (item: any) => {
  if (item.quantity > 1) {
    updateQuantity(item.id, item.quantity - 1)
  }
}

const increaseQuantity = (item: any) => {
  updateQuantity(item.id, item.quantity + 1)
}

const removeItem = (id: number) => {
  removeFromCart(id)
}

const removeSelected = () => {
  removeSelectedItems()
}

const checkout = () => {
  if (selectedCount.value > 0) {
    router.push('/shop/checkout')
  }
}
</script>


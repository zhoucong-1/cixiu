/**
 * 应用入口文件
 * 哈密刺绣数字图谱
 */

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './styles/theme.css'
import './styles/global.css'

// 导入页面组件
import Home from './pages/Home/index.vue'
import History from './pages/History/index.vue'
import Art from './pages/Art/index.vue'
import Culture from './pages/Culture/index.vue'
import Craft from './pages/Craft/index.vue'
import CraftDiy from './pages/Craft/Diy.vue'
import Heritage from './pages/Heritage/index.vue'
import HeritageDetail from './pages/Heritage/HeritageDetail.vue'
import News from './pages/News/index.vue'
import NewsDetail from './pages/News/NewsDetail.vue'
import Works from './pages/Works/index.vue'
import WorksDetail from './pages/Works/WorksDetail.vue'
import About from './pages/About/index.vue'
import Shop from './pages/Shop/index.vue'
import ProductDetail from './pages/Shop/ProductDetail.vue'
import Cart from './pages/Shop/Cart.vue'
import Checkout from './pages/Shop/Checkout.vue'
import Orders from './pages/Shop/Orders.vue'
import OrderDetail from './pages/Shop/OrderDetail.vue'
import Login from './pages/Auth/Login.vue'
import Register from './pages/Auth/Register.vue'
import UserCenter from './pages/User/index.vue'
import { isLoggedIn } from './utils/auth'

// 路由配置
const routes = [
  { path: '/', component: Home },
  { path: '/history', component: History },
  { path: '/art', component: Art },
  { path: '/culture', component: Culture },
  { path: '/craft', component: Craft },
  { path: '/craft/diy', component: CraftDiy },
  { path: '/heritage', component: Heritage },
  { path: '/heritage/:id', component: HeritageDetail },
  { path: '/news', component: News },
  { path: '/news/:id', component: NewsDetail },
  { path: '/works', component: Works },
  { path: '/works/:id', component: WorksDetail },
  { path: '/about', component: About },
  { path: '/shop', component: Shop },
  { path: '/shop/product/:id', component: ProductDetail },
  { path: '/shop/cart', component: Cart },
  { path: '/shop/checkout', component: Checkout },
  { path: '/shop/orders', component: Orders },
  { path: '/shop/order/:id', component: OrderDetail },
  { path: '/login', component: Login, meta: { guestOnly: true } },
  { path: '/register', component: Register, meta: { guestOnly: true } },
  { path: '/user', component: UserCenter, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // 每次路由切换时滚动到页面顶部
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const loggedIn = isLoggedIn()

  if (to.meta?.requiresAuth && !loggedIn) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.meta?.guestOnly && loggedIn) {
    return { path: '/user' }
  }

  return true
})

const app = createApp(App)
app.use(router)
app.mount('#root')


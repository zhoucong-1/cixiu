<template>
  <Layout>
    <div class="craft-diy-page">
      <div class="container">
        <!-- 顶部主视觉 -->
        <section class="diy-hero">
          <div class="hero-image">
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=DIY%20embroidery%20kit%20beginner%20package%20complete%20set%20colorful%20threads%20fabric%20hoop%20needles&image_size=landscape_16_9" alt="DIY刺绣体验包" />
          </div>
          <div class="hero-overlay">
            <h1 class="page-title">DIY 体验包</h1>
            <p class="page-subtitle">适合入门体验哈密刺绣的完整套装</p>
          </div>
        </section>

        <section class="diy-intro">
          <div class="diy-card">
            <div class="card-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=DIY%20embroidery%20kit%20contents%20pre-printed%20fabric%20colorful%20threads%20scissors%20needles%20instructions&image_size=landscape_16_9" alt="体验包内容" />
            </div>
            <h2 class="section-title">体验包内容</h2>
            <ul class="diy-list">
              <li>预印花布料 1 块</li>
              <li>配套彩色丝线若干</li>
              <li>刺绣针与小剪刀</li>
              <li>基础针法图解说明书</li>
            </ul>
          </div>
          <div class="diy-card">
            <div class="card-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=embroidery%20experience%20workshop%20person%20learning%20to%20stitch%20hands-on%20crafting%20fun&image_size=landscape_16_9" alt="刺绣体验" />
            </div>
            <h2 class="section-title">适合人群</h2>
            <p class="diy-text">
              适合第一次接触刺绣的体验者，也适合作为亲子互动、手工课堂的教学材料。
            </p>
          </div>
        </section>

        <!-- 作品效果展示 -->
        <section class="diy-gallery">
          <h2 class="gallery-title">完成效果参考</h2>
          <div class="gallery-grid">
            <div class="gallery-item">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=finished%20flower%20pattern%20embroidery%20DIY%20project%20colorful%20roses%20peonies%20beautiful%20result&image_size=landscape_4_3" alt="花卉图案成品" />
              <span class="gallery-label">花卉图案</span>
            </div>
            <div class="gallery-item">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=finished%20geometric%20pattern%20embroidery%20symmetric%20designs%20modern%20look%20DIY%20completed&image_size=landscape_4_3" alt="几何纹样成品" />
              <span class="gallery-label">几何纹样</span>
            </div>
            <div class="gallery-item">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=finished%20animal%20pattern%20embroidery%20birds%20butterflies%20traditional%20motifs%20handmade%20art&image_size=landscape_4_3" alt="动物图案成品" />
              <span class="gallery-label">动物图案</span>
            </div>
          </div>
        </section>

        <section class="diy-actions">
          <button class="btn-primary" @click="goShop">
            去商城购买体验包
          </button>
        </section>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Layout from '../../components/Layout/Layout.vue'
import './Craft.css'

const router = useRouter()

const goShop = () => {
  router.push('/shop?type=diy')
}
</script>



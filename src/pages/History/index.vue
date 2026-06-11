<template>
  <Layout>
    <div class="history-page">
      <div class="container">
        <!-- 页面标题 -->
        <section class="page-header">
          <h1 class="page-title">历史源流</h1>
          <p class="page-subtitle">追溯新疆维吾尔族刺绣的起源、发展及重要历史节点</p>
        </section>

        <!-- 时间轴区域 -->
        <section class="timeline-section">
          <h2 class="section-title">历史时间轴</h2>
          <div class="timeline">
            <div v-for="(item, index) in timelineData" :key="index" class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <div class="timeline-year">{{ item.year }}</div>
                <h3 class="timeline-title">{{ item.title }}</h3>
                <p class="timeline-description">{{ item.description }}</p>
                <div v-if="item.works && item.works.length > 0" class="timeline-works">
                  <h4 class="works-title">代表作品：</h4>
                  <div class="works-list">
                    <a
                      v-for="(work, i) in item.works"
                      :key="i"
                      @click.prevent="viewWork(i + 1)"
                      href="#"
                      class="work-link"
                    >
                      {{ work }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 互动地图区域 -->
        <section class="map-section">
          <h2 class="section-title">文化交流互动地图</h2>
          <div class="map-container">
            <div class="map-info-panel">
              <h3 class="map-title">丝路沿线交流节点</h3>
              <p class="map-text">
                通过真实地图呈现哈密刺绣在新疆及全国范围内的交流轨迹，点击标记可查看简要介绍。
              </p>
              <ul class="map-list">
                <li v-for="item in mapPoints" :key="item.id">
                  <span class="dot"></span>
                  <span class="city-name">{{ item.name }}</span>
                  <span class="city-tag">{{ item.tag }}</span>
                </li>
              </ul>
              <p class="map-tip">提示：地图可缩放拖动，点击标记点可查看刺绣交流简介。</p>
            </div>

            <div class="map-viewport">
              <div ref="mapContainer" class="amap-container"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '../../components/Layout/Layout.vue'
import './History.css'
import message from '../../utils/message'
// 使用高德地图 JS API 加载真实地图（需在高德开放平台申请 key）
// 文档：https://lbs.amap.com/api/javascript-api

const router = useRouter()
const mapContainer = ref<HTMLDivElement | null>(null)
let map: any = null

declare const AMap: any

const viewWork = (id: number) => {
  router.push(`/works/${id}`)
}

const timelineData = [
  {
    year: '古代',
    title: '起源',
    description: '新疆维吾尔族刺绣技艺的起源，融合了丝绸之路多元文化',
    works: ['传统图案作品1', '传统图案作品2'],
  },
  {
    year: '明清时期',
    title: '发展',
    description: '刺绣技艺在明清时期得到进一步发展，形成了独特的艺术风格',
    works: ['明清风格作品1'],
  },
  {
    year: '近现代',
    title: '传承',
    description: '近现代以来，刺绣技艺得到保护和传承，成为重要的非物质文化遗产',
    works: ['现代传承作品1', '现代传承作品2'],
  },
]

const mapPoints = [
  {
    id: 1,
    name: '哈密',
    tag: '技艺源头',
    lat: 42.82,
    lng: 93.51,
    description: '哈密地区是维吾尔族刺绣的重要发源地之一，保留了大量传统图案与针法。',
  },
  {
    id: 2,
    name: '乌鲁木齐',
    tag: '现代传播',
    lat: 43.82,
    lng: 87.61,
    description: '作为新疆地区中心城市，汇聚了各地刺绣匠人，实现传统技艺的集中展示与推广。',
  },
  {
    id: 3,
    name: '喀什',
    tag: '多元交流',
    lat: 39.47,
    lng: 75.99,
    description: '丝绸之路南线的重要节点，不同民族的纹样与色彩在此交汇融合。',
  },
  {
    id: 4,
    name: '西安',
    tag: '古都枢纽',
    lat: 34.34,
    lng: 108.94,
    description: '古代长安城见证了西域与中原之间的频繁往来，也促成了刺绣图案的双向流动。',
  },
]

const handleMarkerClick = (point: (typeof mapPoints)[number]) => {
  message.info(`${point.name}：${point.description}`)
}

const goShop = (point: (typeof mapPoints)[number]) => {
  router.push({ path: '/shop', query: { fromCity: point.name } })
}

const loadAMap = () => {
  if (typeof window === 'undefined') return Promise.resolve()
  if ((window as any).AMap) return Promise.resolve()

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    // TODO: 将 YOUR_AMAP_KEY 替换为你在高德开放平台申请的 Web JS API key
    script.src =
      'https://webapi.amap.com/maps?v=2.0&key=7ba1cffb372c13ef1cbf6280c33a6bc9&plugin=AMap.ToolBar,AMap.Scale'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('AMap script load failed'))
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  if (!mapContainer.value) return

  try {
    await loadAMap()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map = new (window as any).AMap.Map(mapContainer.value, {
      center: [100, 38],
      zoom: 4,
      viewMode: '2D',
      // 使用高德默认地图样式，边界线更清晰
      mapStyle: 'amap://styles/normal',
    })

    // 控件
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map.addControl(new (window as any).AMap.ToolBar())
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map.addControl(new (window as any).AMap.Scale())

    // 根据标记点自动适配视野，至少能看到中国区域轮廓
    map.setFitView()

    mapPoints.forEach((point) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const marker = new (window as any).AMap.Marker({
        position: [point.lng, point.lat],
        title: point.name,
      })
      map.add(marker)
      marker.on('click', () => {
        handleMarkerClick(point)
        map.setCenter([point.lng, point.lat])
        map.setZoom(5)
      })
    })
  } catch (e) {
    console.error(e)
    message.error('地图加载失败，请稍后重试')
  }
})

onBeforeUnmount(() => {
  if (map && map.destroy) {
    map.destroy()
    map = null
  }
})
</script>


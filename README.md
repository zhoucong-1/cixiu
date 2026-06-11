# 哈密刺绣数字图谱

传承新疆维吾尔族刺绣文化，弘扬非遗技艺，让传统艺术在现代数字时代焕发新活力。

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
npm install
```

或使用 yarn:

```bash
yarn install
```

### 启动开发服务器

```bash
npm run dev
```

或使用 yarn:

```bash
yarn dev
```

项目将在 `http://localhost:3000` 启动，浏览器会自动打开。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 📁 项目结构

```
cixiu/
├── public/                 # 静态资源
├── src/
│   ├── components/        # 组件
│   │   └── Layout/        # 布局组件
│   ├── pages/             # 页面
│   │   └── Home/         # 首页
│   ├── styles/            # 样式文件
│   │   ├── theme.css     # 主题变量
│   │   └── global.css    # 全局样式
│   ├── App.tsx           # 应用根组件
│   └── main.tsx          # 应用入口
├── index.html             # HTML模板
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript配置
├── vite.config.ts        # Vite配置
└── README.md             # 项目说明
```

## 🎨 设计系统

项目使用统一的设计系统，包括：

- **色彩系统**：传统红色、金色主题
- **字体系统**：统一的字号和字重规范
- **间距系统**：4px基础单位的间距体系
- **组件规范**：统一的组件样式和交互

详细设计规范请查看：[设计系统-整体布局与风格.md](./设计系统-整体布局与风格.md)

## 🛠️ 技术栈

- **React 18** - UI框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **React Router** - 路由管理

## 📝 开发规范

### 代码风格

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 使用函数式组件和 Hooks

### 文件命名

- 组件文件：PascalCase（如 `Header.tsx`）
- 样式文件：与组件同名（如 `Header.css`）
- 工具文件：camelCase（如 `utils.ts`）

### 导入顺序

1. React 相关
2. 第三方库
3. 组件
4. 样式文件

## 🚧 开发计划

- [x] 设计系统建立
- [x] 基础布局组件
- [ ] 首页轮播图
- [ ] 商品展示组件
- [ ] 商城功能
- [ ] 用户系统
- [ ] 更多页面...

## 📄 许可证

MIT License

## 👥 贡献

欢迎提交 Issue 和 Pull Request！


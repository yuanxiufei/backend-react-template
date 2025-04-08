# React Manager 后台管理系统

基于 React18、TypeScript、Vite、Ant Design 等最新技术栈的后台管理系统模板

## 技术栈

- 核心框架：React 18
- 开发语言：TypeScript 4.x
- 构建工具：Vite 4.x
- UI 框架：Ant Design 5.x
- 状态管理：Zustand
- 路由工具：React Router 6.x
- CSS 预处理：Less
- HTTP 工具：Axios
- 代码规范：ESLint + Prettier
- 图表可视化：ECharts 5.x
- 低代码引擎：AMIS 6.x

## 项目依赖

```json
主要依赖：
- react ^18.2.0
- react-dom ^18.2.0
- react-router-dom ^6.11.0
- antd ^5.6.1
- zustand ^4.3.8
- axios ^1.4.0
- echarts ^5.4.2
- amis 6.12.0
- typescript ^4.9.3

开发依赖：
- vite ^4.1.0
- @vitejs/plugin-react ^3.1.0
- eslint ^8.36.0
- prettier ^2.8.4
```

## 目录结构

```
├── public/             # 静态资源
├── src/                # 源代码
│   ├── api/            # 接口请求
│   ├── assets/         # 静态资源
│   ├── components/     # 公共组件
│   ├── config/         # 全局配置
│   ├── hooks/          # 自定义Hook
│   ├── layout/         # 布局组件
│   ├── router/         # 路由配置
│   ├── store/          # 状态管理
│   ├── styles/         # 全局样式
│   ├── types/          # 类型定义
│   ├── utils/          # 工具函数
│   ├── views/          # 页面组件
│   ├── App.tsx         # 根组件
│   └── main.tsx        # 入口文件
├── .env.*              # 环境变量配置
├── .eslintrc.cjs       # ESLint配置
├── .prettierrc.cjs     # Prettier配置
├── tsconfig.json       # TypeScript配置
└── vite.config.ts      # Vite配置
```

## 开发运行

```bash
# 安装依赖
npm install
# 或者
yarn
# 或者
pnpm install

# 启动开发服务器
npm run dev
```

## 打包构建

```bash
# 生产环境构建
npm run build

# 预发环境构建
npm run build:stg

# 预览构建产物
npm run preview
```

## 代码格式化

项目使用 ESLint + Prettier 进行代码规范和格式化：

- ESLint：负责代码质量检查
- Prettier：负责代码格式化

```bash
# 运行 ESLint 检查
npx eslint src/**/*.{ts,tsx}

# 运行 Prettier 格式化
npx prettier --write src/**/*.{ts,tsx}
```

## 开发规范

- 遵循 TypeScript 开发规范，所有的组件和工具函数都应该有类型定义
- 组件开发遵循 React Hooks 的开发理念
- 使用 CSS Modules 或 styled-components 编写样式，避免全局样式污染
- 遵循 ESLint 规则进行代码开发
- 提交代码前进行代码格式化

## 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0 或 yarn >= 1.22.0

# Intercom Web Admin

一个使用 Vue 3 + Vite + TypeScript + TailwindCSS 构建的现代化Web管理界面。

## 🚀 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 6
- **语言**: TypeScript
- **样式**: TailwindCSS v4
- **路由**: Vue Router 4
- **状态管理**: Pinia
- **测试**: Vitest + Playwright
- **代码规范**: ESLint + Prettier + Oxlint

## 📦 主要依赖

- `vue`: ^3.5.16
- `vue-router`: ^4.5.1
- `pinia`: ^3.0.2
- `tailwindcss`: ^4.1.8
- `@tailwindcss/postcss`: ^4.1.8
- `@tailwindcss/typography`: ^0.5.16
- `typescript`: ^5.8.3
- `vite`: ^6.3.5

## 🛠️ 开发环境设置

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 运行测试

```bash
# 单元测试
pnpm test:unit

# 端到端测试
pnpm test:e2e
```

### 代码检查和格式化

```bash
# ESLint检查
pnpm lint

# 代码格式化
pnpm format
```

## 🎨 TailwindCSS 配置

项目已配置TailwindCSS v4，包含以下功能：

- 响应式设计工具类
- Typography插件 (`@tailwindcss/typography`)
- 自定义主题扩展
- PostCSS集成

### TailwindCSS使用示例

```vue
<template>
  <div class="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-2">标题</h1>
    <p class="text-blue-100">这是一段使用TailwindCSS样式的文本</p>
  </div>
</template>
```

## 📁 项目结构

```
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 资源文件
│   ├── components/        # Vue组件
│   ├── views/            # 页面视图
│   ├── router/           # 路由配置
│   ├── stores/           # Pinia状态管理
│   └── main.js           # 应用入口
├── e2e/                  # 端到端测试
├── tailwind.config.js    # TailwindCSS配置
├── postcss.config.js     # PostCSS配置
├── vite.config.js        # Vite配置
└── package.json
```

## 🔧 配置说明

### TailwindCSS v4 配置

项目使用TailwindCSS v4的新架构：

- 使用 `@tailwindcss/postcss` 插件
- 简化的CSS导入：`@import "tailwindcss"`
- 现代化的配置文件

### TypeScript配置

- 启用严格模式
- Vue单文件组件支持
- 路径别名配置

### 开发工具

- Vue DevTools集成
- Hot Module Replacement (HMR)
- 自动化测试配置

## 🌐 浏览器支持

- Chrome ≥ 87
- Firefox ≥ 78
- Safari ≥ 14
- Edge ≥ 88

## 📝 开发建议

1. **组件设计**: 优先使用TailwindCSS工具类，减少自定义CSS
2. **状态管理**: 使用Pinia进行状态管理，遵循组合式API模式
3. **类型安全**: 充分利用TypeScript的类型检查功能
4. **测试**: 编写单元测试和端到端测试确保代码质量

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

此项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

# 环境变量配置说明

## 本地开发环境

如果需要自定义API地址，可以创建 `.env.local` 文件（此文件会被git忽略）：

```bash
# .env.local
VITE_API_BASE_URL=http://your-custom-api-server.com/api
VITE_APP_TITLE=iLock设备管理端
```

## Vercel部署环境变量配置

在Vercel控制台中设置以下环境变量：

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入你的项目设置
3. 点击 "Environment Variables" 标签
4. 添加以下环境变量：

```
Name: VITE_API_BASE_URL
Value: http://39.108.49.167:20033/api
Environment: Production, Preview, Development
```

```
Name: VITE_APP_TITLE
Value: iLock设备管理端
Environment: Production, Preview, Development
```

## 默认配置

如果不设置环境变量，系统会使用以下默认值：

- **开发环境**: 使用Vite代理 `/api` -> `http://39.108.49.167:20033`
- **生产环境**: 直接使用 `http://39.108.49.167:20033/api`

## 注意事项

1. 如果后端API支持HTTPS，建议使用HTTPS地址
2. 确保后端服务器配置了正确的CORS策略
3. 生产环境建议使用域名而不是IP地址

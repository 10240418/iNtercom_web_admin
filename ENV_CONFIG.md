# 环境变量配置说明

## CORS和混合内容问题解决方案

通过 `vercel.json` 配置文件，我们设置了API代理来解决以下问题：

1. **混合内容问题**：HTTPS前端请求HTTP后端被浏览器阻止
2. **CORS跨域问题**：跨域请求被后端或浏览器阻止

现在所有API请求都会通过Vercel代理转发到后端服务器。

## 本地开发环境

如果需要自定义API地址，可以创建 `.env.local` 文件（此文件会被git忽略）：

```bash
# .env.local
VITE_API_BASE_URL=http://your-custom-api-server.com/api
VITE_APP_TITLE=iLock设备管理端
```

## Vercel部署环境变量配置

### 选项1：使用代理（推荐，已配置）

默认情况下使用 `vercel.json` 中配置的代理，无需额外设置环境变量。

### 选项2：直接配置API地址

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

**当前配置**（使用Vercel代理）：

- **开发环境**: 使用Vite代理 `/api` -> `http://39.108.49.167:20033`
- **生产环境**: 使用Vercel代理 `/api` -> `http://39.108.49.167:20033/api`

## 注意事项

1. ✅ **已解决混合内容问题**：通过Vercel代理避免HTTPS到HTTP的直接请求
2. ✅ **已解决CORS问题**：通过代理和头部配置解决跨域问题
3. 🔄 **建议后端升级**：如果条件允许，建议后端支持HTTPS
4. 🚀 **生产环境优化**：建议使用域名而不是IP地址

## Vercel代理配置说明

`vercel.json` 文件配置了以下功能：

1. **URL重写**：将 `/api/*` 请求转发到 `http://39.108.49.167:20033/api/*`
2. **CORS头部**：自动添加跨域请求所需的HTTP头部
3. **认证支持**：支持带凭证的请求（Authorization header等）

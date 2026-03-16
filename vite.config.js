import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [vue(), vueJsx(), command === 'serve' ? vueDevTools() : null].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'element-plus',
      '@element-plus/icons-vue',
      'axios',
      'dayjs',
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks (id) {
          if (!id.includes('node_modules')) return

          if (id.includes('@element-plus/icons-vue')) {
            return 'element-icons'
          }

          if (id.includes('element-plus')) {
            const componentMatch = id.match(/element-plus\/es\/components\/([^/]+)/)
            if (componentMatch) {
              const componentName = componentMatch[1]

              if (
                ['button', 'form', 'input', 'input-number', 'select', 'option', 'option-group', 'checkbox', 'radio', 'switch'].includes(
                  componentName,
                )
              ) {
                return 'ep-form'
              }

              if (
                ['table', 'pagination', 'card', 'dialog', 'tabs', 'tag', 'avatar', 'empty', 'descriptions'].includes(
                  componentName,
                )
              ) {
                return 'ep-data'
              }

              if (['message', 'message-box', 'loading', 'icon', 'scrollbar'].includes(componentName)) {
                return 'ep-feedback'
              }

              return `ep-${componentName}`
            }

            if (id.includes('/es/locale/')) {
              return 'ep-locale'
            }

            return 'ep-core'
          }

          if (id.includes('vue-router') || id.includes('pinia') || id.includes('/vue/')) {
            return 'vue-core'
          }

          if (id.includes('axios') || id.includes('dayjs')) {
            return 'app-vendor'
          }
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api': {
        target: 'http://43.139.69.15:20033',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err)
          })
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url)
          })
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url)
          })
        },
      },
    },
  },
}))

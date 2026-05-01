/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 将 CSS 变量主题 token 映射为 Tailwind 工具类
      // 用法示例：bg-primary、text-primary-dark、border-border
      colors: {
        primary: {
          DEFAULT: 'var(--c-primary)',
          light:   'var(--c-primary-light)',
          dark:    'var(--c-primary-dark)',
          bg:      'var(--c-primary-bg)',
        },
        success: 'var(--c-success)',
        warning: 'var(--c-warning)',
        danger:  'var(--c-danger)',
        info:    'var(--c-info)',
        sidebar: {
          bg:     'var(--c-sidebar-bg)',
          text:   'var(--c-sidebar-text)',
          active: 'var(--c-sidebar-active)',
        },
        page: {
          bg: 'var(--c-page-bg)',
        },
        card:   'var(--c-card-bg)',
        header: 'var(--c-header-bg)',
        border: 'var(--c-border)',
        text: {
          primary:   'var(--c-text-primary)',
          secondary: 'var(--c-text-secondary)',
          muted:     'var(--c-text-muted)',
        },
      },
      fontFamily: {
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'SF Mono',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
      },
    },
  },
  plugins: [typography],
}

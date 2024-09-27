/// <reference types="vitest" />
import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'node:path'

export default defineConfig(({ mode }) => ({
  test: {
    css: false,
    include: ['**/*.test.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setup-tests.ts',
    clearMocks: true,
    coverage: {
      include: ['src/**/*'],
      exclude: ['src/main.tsx'],
      thresholds: {
        '100': false,
      },
      provider: 'istanbul',
      enabled: true,
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(new URL('src', import.meta.url).toString()),
    },
  },
  plugins: [
    react(),
    ...(mode === 'test'
      ? []
      : [
          eslintPlugin(),
          VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.png', 'robots.txt', 'apple-touch-icon.png', 'icons/*.svg', 'fonts/*.woff2'],
            manifest: {
              theme_color: '#BD34FE',
              icons: [
                {
                  src: '/android-chrome-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
                  purpose: 'any maskable',
                },
                {
                  src: '/android-chrome-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                },
              ],
            },
          }),
        ]),
  ],
}))

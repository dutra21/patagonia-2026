/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const BACKGROUND = '#020617'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Never reload on its own: the app shows "Nova versão disponível — atualizar".
      registerType: 'prompt',
      // Registered from React (src/app/pwa/UpdatePrompt.tsx).
      injectRegister: false,
      // Icons and manifest are already matched by globPatterns below; avoid duplicate entries.
      includeManifestIcons: false,
      manifest: {
        id: '/',
        name: 'Patagonia 2026',
        short_name: 'Patagonia',
        description: 'Roteiro, voos, hospedagens, passeios e checklist da viagem à Patagônia — 20 a 30/11/2026.',
        lang: 'pt-BR',
        dir: 'ltr',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: BACKGROUND,
        theme_color: BACKGROUND,
        categories: ['travel'],
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache everything the build emits: the whole app works offline after the first visit.
        globPatterns: ['**/*.{js,css,html,woff2,svg,png,ico,webp,avif}'],
        // (manifest.webmanifest is added by the plugin itself)
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
        // No runtime caching: the app makes no network requests at runtime.
        runtimeCaching: [],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./src/test/setup.ts'],
    restoreMocks: true,
  },
})

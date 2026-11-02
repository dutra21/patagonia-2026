import { defineConfig, devices } from '@playwright/test'

const PORT = 4173
/** Set E2E_BASE_URL to test another server (e.g. `wrangler pages dev` or the deployed site). */
const externalBaseURL = process.env['E2E_BASE_URL']

// By default runs against the production build (`vite preview`) so the service worker is real.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: externalBaseURL ?? `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'mobile-chrome', use: { ...devices['Pixel 7'] } }],
  ...(externalBaseURL
    ? {}
    : {
        webServer: {
          command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
          url: `http://localhost:${PORT}`,
          reuseExistingServer: !process.env['CI'],
          timeout: 180_000,
        },
      }),
})

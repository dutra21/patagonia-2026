import { expect, test, type Page } from '@playwright/test'
import { appRoutes } from './routes.ts'

async function waitForServiceWorker(page: Page) {
  // "activated" means the install step (precaching every asset) has finished.
  await page.waitForFunction(async () => {
    const registration = await navigator.serviceWorker.ready
    return registration.active?.state === 'activated'
  })
}

test('the whole app works offline after the first visit', async ({ context, page }) => {
  // 1. First visit, online.
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'Patagonia 2026' })).toBeVisible()
  await waitForServiceWorker(page)

  // 2. Airplane mode.
  await context.setOffline(true)
  await page.reload()
  await expect(page.getByRole('heading', { level: 1, name: 'Patagonia 2026' })).toBeVisible()
  await expect(page.getByText('Offline', { exact: true })).toBeVisible()
  // Hero image and font come from the cache too.
  await expect(page.getByRole('img', { name: /Perito Moreno/ })).toHaveJSProperty('complete', true)
  expect(await page.getByRole('img', { name: /Perito Moreno/ }).evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
  expect(await page.evaluate(() => document.fonts.check('16px "Inter Variable"'))).toBe(true)

  // 3. Direct navigation to every route (full page loads, served by navigateFallback).
  for (const { path, heading } of appRoutes) {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
  }
  await page.goto('/roteiro?dia=3')
  await expect(page.getByRole('heading', { level: 2, name: 'Estrada para El Chaltén + Chorrillo e Miradores' })).toBeVisible()

  // 4. Client-side navigation through the menu.
  await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Voos' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Voos' })).toBeVisible()
  await expect(page.getByRole('article', { name: 'AR1881' })).toBeVisible()

  // 5. Checklist: check an item offline, reload offline, still checked.
  await page.goto('/checklist')
  await page.getByRole('checkbox', { name: 'Seguro viagem' }).check()
  await page.reload()
  await expect(page.getByRole('heading', { level: 1, name: 'Checklist' })).toBeVisible()
  await expect(page.getByRole('checkbox', { name: 'Seguro viagem' })).toBeChecked()
  await expect(page.getByText('1 de 38 itens prontos')).toBeVisible()
})

test('Chrome considers the app installable', async ({ page }) => {
  await page.goto('/')
  await waitForServiceWorker(page)

  const cdp = await page.context().newCDPSession(page)
  const manifest = await cdp.send('Page.getAppManifest')
  expect(manifest.errors).toEqual([])
  expect(manifest.url).toMatch(/manifest\.webmanifest$/)

  const { installabilityErrors } = await cdp.send('Page.getInstallabilityErrors')
  expect(installabilityErrors).toEqual([])
})

test('the manifest has what Android and iOS need', async ({ page, request }) => {
  const manifest = (await (await request.get('/manifest.webmanifest')).json()) as {
    name: string
    short_name: string
    display: string
    start_url: string
    theme_color: string
    background_color: string
    icons: { src: string; sizes: string; purpose?: string }[]
  }
  expect(manifest).toMatchObject({
    name: 'Patagonia 2026',
    short_name: 'Patagonia',
    display: 'standalone',
    start_url: '/',
    theme_color: '#020617',
    background_color: '#020617',
  })
  const sizes = manifest.icons.map((icon) => `${icon.sizes}${icon.purpose === 'maskable' ? ' maskable' : ''}`)
  expect(sizes).toEqual(expect.arrayContaining(['192x192', '512x512', '512x512 maskable']))
  for (const icon of manifest.icons) expect((await request.get(`/${icon.src}`)).ok(), icon.src).toBe(true)

  await page.goto('/')
  const appleIcon = await page.locator('link[rel="apple-touch-icon"]').getAttribute('href')
  expect(appleIcon).toBe('/apple-touch-icon-180x180.png')
  expect((await request.get(appleIcon ?? '')).ok()).toBe(true)
})

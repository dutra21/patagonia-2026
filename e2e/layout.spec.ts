import { expect, test } from '@playwright/test'
import { appRoutes } from './routes.ts'

test.describe('360px wide screen', () => {
  test.use({ viewport: { width: 360, height: 740 } })

  for (const { path } of appRoutes) {
    test(`${path} has no horizontal scroll`, async ({ page }) => {
      await page.goto(path)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow).toBeLessThanOrEqual(0)

      const truncated = await page
        .getByRole('navigation', { name: 'Principal' })
        .locator('a span')
        .evaluateAll((spans) => spans.filter((s) => s.scrollWidth > s.clientWidth).map((s) => s.textContent))
      expect(truncated).toEqual([])
    })
  }
})

test('saved light theme is applied before the app renders (no flash)', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Ativar tema claro' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

  // Read the attribute as early as possible on reload, before React runs.
  await page.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => {
      ;(window as unknown as { themeAtDomReady: string | undefined }).themeAtDomReady = document.documentElement.dataset['theme']
    })
  })
  await page.reload()
  const early = await page.evaluate(() => (window as unknown as { themeAtDomReady: string | undefined }).themeAtDomReady)
  expect(early).toBe('light')
  await expect(page.getByRole('button', { name: 'Ativar tema escuro' })).toBeVisible()
})

test('keyboard users can skip to the content', async ({ page }) => {
  await page.goto('/voos')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Pular para o conteúdo' })
  await expect(skip).toBeFocused()
  await expect(skip).toBeInViewport()
})

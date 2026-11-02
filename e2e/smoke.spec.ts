import { expect, test } from '@playwright/test'
import { appRoutes } from './routes.ts'

for (const { path, heading } of appRoutes) {
  test(`direct visit to ${path} renders its page`, async ({ page }) => {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Principal' }).locator('[aria-current="page"]')).toHaveCount(1)
  })
}

test('makes no request outside the app origin', async ({ page, baseURL }) => {
  const external: string[] = []
  page.on('request', (request) => {
    if (!request.url().startsWith(baseURL ?? '') && !request.url().startsWith('data:')) external.push(request.url())
  })
  for (const { path } of appRoutes) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
  }
  expect(external).toEqual([])
})

test('CSP allows the inline theme script and blocks nothing the app uses', async ({ page }) => {
  const violations: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error' && /Content Security Policy/i.test(message.text())) violations.push(message.text())
  })
  const response = await page.goto('/')
  expect(response?.headers()['content-security-policy']).toContain("default-src 'self'")

  await page.getByRole('button', { name: 'Ativar tema claro' }).click()
  await page.reload()
  // The inline script ran (theme applied before React), so its hash is allowed.
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

  for (const { path } of appRoutes) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
  }
  expect(violations).toEqual([])
})

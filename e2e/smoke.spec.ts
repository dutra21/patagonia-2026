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

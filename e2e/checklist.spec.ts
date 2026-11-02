import { expect, test } from '@playwright/test'

test('checked items survive a reload', async ({ page }) => {
  await page.goto('/checklist')
  const item = page.getByRole('checkbox', { name: 'Seguro viagem' })
  await item.check()
  await expect(page.getByText('1 de 32 itens prontos')).toBeVisible()

  await page.reload()
  await expect(page.getByRole('checkbox', { name: 'Seguro viagem' })).toBeChecked()
  await expect(page.getByText('1 de 32 itens prontos')).toBeVisible()
})

test('another tab sees the change', async ({ context, page }) => {
  await page.goto('/checklist')
  const other = await context.newPage()
  await other.goto('/checklist')

  await page.getByRole('checkbox', { name: 'Power bank' }).check()
  await expect(other.getByRole('checkbox', { name: 'Power bank' })).toBeChecked()
})

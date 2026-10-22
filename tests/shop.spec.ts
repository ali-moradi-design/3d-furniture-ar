import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(String(e)));
  return errors;
}

test('shop lists all products and filters by category', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('article')).toHaveCount(5);

  await page
    .getByRole('navigation', { name: 'Filter by category' })
    .getByRole('link', { name: 'Chairs' })
    .click();
  await expect(page).toHaveURL(/\/shop\/chairs\/$/);
  await expect(page.getByRole('article')).toHaveCount(2);
  expect(errors).toEqual([]);
});

test('shop page has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

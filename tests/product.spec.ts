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

async function waitForModel(page: Page) {
  await page.waitForFunction(
    () =>
      (document.querySelector('model-viewer') as { loaded?: boolean } | null)?.loaded ===
      true,
    undefined,
    { timeout: 45_000 },
  );
}

test('product page loads the 3D model without console errors', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/products/ainsley-velvet-sofa/');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Ainsley Velvet Sofa' }),
  ).toBeVisible();
  await waitForModel(page);
  expect(errors).toEqual([]);
});

test('choosing a fabric switches the glTF material variant', async ({ page }) => {
  await page.goto('/products/ainsley-velvet-sofa/');
  await waitForModel(page);
  await page.getByRole('radio', { name: 'Navy' }).check({ force: true });
  await expect(page.getByTestId('fabric-name')).toHaveText('Navy');
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (document.querySelector('model-viewer') as { variantName?: string })
            .variantName,
      ),
    )
    .toBe('Navy');
});

test('add to cart updates the header count', async ({ page }) => {
  await page.goto('/products/marlow-lounge-chair/');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.getByText('Cart (1)')).toBeVisible();
  await expect(page.locator('p[role="status"]')).toContainText('nothing is charged');
});

test('view in your room shows a QR code where AR is unavailable', async ({ page }) => {
  await page.goto('/products/marlow-lounge-chair/');
  await waitForModel(page);
  await page.getByRole('button', { name: /View in your room/ }).click();
  await expect(page.getByRole('dialog', { name: 'Open on your phone' })).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'QR code for this page' }).locator('svg'),
  ).toBeVisible();
});

test('product page has no accessibility violations', async ({ page }) => {
  await page.goto('/products/marlow-lounge-chair/');
  await waitForModel(page);
  const results = await new AxeBuilder({ page }).exclude('model-viewer').analyze();
  expect(results.violations).toEqual([]);
});

import { test, expect } from '@playwright/test';

test.describe('Visual Regression Snapshot Tests', () => {
  test('landing page visual snapshot', async ({ page }) => {
    await page.goto('/');
    // Capture full page screenshot and compare with baseline snapshot
    await expect(page).toHaveScreenshot('landing-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });

  test('dashboard page visual snapshot', async ({ page }) => {
    await page.goto('/dashboard');
    // Mask dynamic content (e.g., timestamps or dynamic chart elements)
    await expect(page).toHaveScreenshot('dashboard-page.png', {
      fullPage: true,
      mask: [page.getByTestId('dynamic-timestamp')],
    });
  });

  test('reports analytics page visual snapshot', async ({ page }) => {
    await page.goto('/reports');
    await expect(page).toHaveScreenshot('reports-page.png', {
      fullPage: true,
    });
  });

  test('upgrade plan options visual snapshot', async ({ page }) => {
    await page.goto('/upgrade');
    await expect(page).toHaveScreenshot('upgrade-page.png');
  });
});

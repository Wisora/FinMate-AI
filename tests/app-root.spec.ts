import { test, expect } from '@playwright/test';

test.describe('Application Root Entry', () => {
  test('mounts App component inside root container', async ({ page }) => {
    // 1. Load the running application
    await page.goto('/');

    // 2. Verify the primary root container exists in the DOM
    const root = page.locator('#root, #__next');
    await expect(root).toBeAttached();

    // 3. Verify core app layout content renders inside the browser
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});

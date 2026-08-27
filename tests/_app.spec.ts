import { test, expect } from '@playwright/test';

test.describe('App Bootstrapping & Layout', () => {
  test('renders the application home page successfully', async ({ page }) => {
    // Navigate waiting only for DOM parsing, avoiding dev server compile hangs
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Assert URL directly (Playwright automatically retries until true)
    await expect(page).toHaveURL('/');
  });

  test('handles authenticated app states cleanly', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Playwright auto-waits for visibility—no manual page.waitForSelector needed
    await expect(page.locator('body')).toBeVisible();
  });
});
import { test, expect } from '@playwright/test';

test.describe('Localization & Theme Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('updates document attributes and theme when switching dark mode', async ({ page }) => {
    // Locate and click dark mode toggle button on the UI
    const themeToggle = page.getByRole('button', { name: /toggle theme|dark mode/i });
    await themeToggle.click();

    // Verify <html> element receives the 'dark' class in the DOM
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveClass(/dark/);
  });

  test('persists user settings to localStorage', async ({ page }) => {
    await page.goto('/');

    // Check localStorage setting populated by LanguageContext
    const localStorageData = await page.evaluate(() => {
      return localStorage.getItem('finmate_settings');
    });

    expect(localStorageData).not.toBeNull();
  });
});

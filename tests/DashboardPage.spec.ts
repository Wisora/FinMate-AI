import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Dashboard route in the browser
    await page.goto('/dashboard');
  });

  test('renders Dashboard heading', async ({ page }) => {
    // Check that the main Dashboard header is visible
    const heading = page.getByRole('heading', { name: /dashboard/i });
    await expect(heading).toBeVisible();
  });

  test('renders AssistantChat component', async ({ page }) => {
    // Check that the AssistantChat textbox input is present and interactive
    const chatInput = page.getByRole('textbox');
    await expect(chatInput).toBeVisible();
  });
});

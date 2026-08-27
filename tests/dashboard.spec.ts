import { test, expect } from '@playwright/test';

test.describe('Dashboard Page & Layout', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Dashboard route in the browser
    await page.goto('/dashboard');
  });

  test('renders Dashboard heading and layout elements', async ({ page }) => {
    // Check that the main Dashboard header is visible
    const heading = page.getByRole('heading', { name: /dashboard/i });
    await expect(heading).toBeVisible();
  });

  test('renders AssistantChat input box', async ({ page }) => {
    // Check that the chat textbox input is present and interactive
    const chatInput = page.getByRole('textbox');
    await expect(chatInput).toBeVisible();
  });
});
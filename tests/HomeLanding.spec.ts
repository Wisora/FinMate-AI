import { test, expect } from '@playwright/test';

test.describe('Home Landing Page', () => {
  test('renders heading and hydrates client-side content', async ({ page }) => {
    // 1. Navigate to the Next.js root route
    await page.goto('/');

    // 2. Verify main heading renders in the browser
    const heading = page.getByRole('heading', { name: /welcome to finmate ai/i });
    await expect(heading).toBeVisible();

    // 3. Verify client-side hydrated content becomes visible
    const hydratedText = page.getByText(/you are now seeing client‑side hydrated content/i);
    await expect(hydratedText).toBeVisible();
  });
});
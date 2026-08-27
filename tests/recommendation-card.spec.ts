import { test, expect } from '@playwright/test';

test.describe('RecommendationCard Component Workflows', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard route where RecommendationCard components render
    await page.goto('/dashboard');
  });

  test('renders recommendation title, description, and benefit', async ({ page }) => {
    // Assert recommendation content and impact tags are visible in the UI
    await expect(
      page.getByText('Switch to High-Yield Savings')
    ).toBeVisible();
    await expect(
      page.getByText('Move emergency fund to earn 4.5% APY.')
    ).toBeVisible();
    await expect(page.getByText(/HIGH IMPACT/i)).toBeVisible();
    await expect(page.getByText('+$450')).toBeVisible();
  });

  test('triggers strategy application when action button is clicked', async ({ page }) => {
    // Click the action button
    const applyBtn = page.getByRole('button', { name: /Apply Strategy/i });
    await applyBtn.click();

    // Verify UI responds (button shifts to applied state or shows confirmation toast)
    const appliedBtn = page.getByRole('button', { name: /applied|Applied Strategy/i });
    await expect(appliedBtn).toBeVisible();
  });

  test('renders applied state correctly when recommendation is applied', async ({ page }) => {
    // Locate recommendation button with applied state attribute
    const appliedButton = page.getByRole('button', { name: /applied/i });
    await expect(appliedButton).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByText(/applied/i)).toBeVisible();
  });
});

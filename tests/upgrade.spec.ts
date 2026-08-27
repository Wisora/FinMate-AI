import { test, expect } from '@playwright/test';

test.describe('Upgrade & Subscription Checkout Workflows', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the upgrade route
    await page.goto('/upgrade');
  });

  test('renders plan features and upgrade options for free tier users', async ({ page }) => {
    // Verify main page header
    const heading = page.getByRole('heading', {
      name: /Supercharge Your Wealth Building with Pro Analytics & Priority AI/i,
    });
    await expect(heading).toBeVisible();

    // Verify current plan badge and CTA button
    await expect(page.getByText('Current Plan')).toBeVisible();
    
    const upgradeBtn = page.getByRole('button', { name: /Upgrade to Pro Now →/i });
    await expect(upgradeBtn).toBeVisible();
  });

  test('toggles between annual and monthly billing options', async ({ page }) => {
    // Initial annual pricing display
    await expect(page.getByText('$7.99/mo')).toBeVisible();

    // Toggle billing frequency switch
    const toggleButton = page.getByRole('button', { name: /monthly|annual/i });
    await toggleButton.click();

    // Verify monthly pricing display updates
    await expect(page.getByText('$9.99/mo')).toBeVisible();
  });

  test('simulates successful checkout workflow', async ({ page }) => {
    // Click upgrade button to initiate checkout action
    const upgradeBtn = page.getByRole('button', {
      name: /Upgrade to Pro Now →/i,
    });
    await upgradeBtn.click();

    // Verify success toast notification renders in DOM
    const successToast = page.getByText(/🎉 Congratulations! You are now a FinMate AI Pro member!/i);
    await expect(successToast).toBeVisible();

    // Verify UI reflects unlocked Pro status
    await expect(
      page.getByText('You have unlocked FinMate Pro Membership!')
    ).toBeVisible();
  });

  test('renders active status badge for existing Pro plan users', async ({ page }) => {
    // Navigate with query or state set to Pro plan user session
    await page.goto('/upgrade?plan=pro');

    // Verify Pro tier status banner
    await expect(
      page.getByText('You have unlocked FinMate Pro Membership!')
    ).toBeVisible();

    // Ensure upgrade CTA is not present for active Pro users
    const upgradeBtn = page.getByRole('button', { name: /Upgrade to Pro Now →/i });
    await expect(upgradeBtn).not.toBeVisible();
  });
});

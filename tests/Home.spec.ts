import { test, expect } from '@playwright/test';

test.describe('Home Page & Navigation Workflows', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app root home page
    await page.goto('/');
  });

  test('renders user welcome message and hero title', async ({ page }) => {
    // Check for user welcome text and hero headline
    await expect(page.getByText(/Alex Johnson/i)).toBeVisible();
    await expect(
      page.getByText(/Take Control of Your Savings, Debt & Investments/i)
    ).toBeVisible();
  });

  test('navigates to financial dashboard when hero button is clicked', async ({ page }) => {
    const dashboardBtn = page.getByRole('button', {
      name: /Go to Financial Dashboard/i,
    });
    await dashboardBtn.click();

    // Verify browser navigated to dashboard route
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('navigates to reports when report button is clicked', async ({ page }) => {
    const reportsBtn = page.getByRole('button', {
      name: /View Financial Reports/i,
    });
    await reportsBtn.click();

    // Verify browser navigated to reports route
    await expect(page).toHaveURL(/\/reports/);
  });

  test('navigates to settings when configure settings link is clicked', async ({ page }) => {
    const settingsBtn = page.getByRole('button', {
      name: /Configure Settings →/i,
    });
    await settingsBtn.click();

    // Verify browser navigated to settings route
    await expect(page).toHaveURL(/\/settings/);
  });

  test('triggers navigation from promo banner upgrade button', async ({ page }) => {
    // Locate upgrade button within the real PromoBanner component
    const promoUpgradeBtn = page.getByRole('button', {
      name: /Upgrade/i,
    });
    await promoUpgradeBtn.click();

    // Verify route transitions to upgrade page
    await expect(page).toHaveURL(/\/upgrade/);
  });
});
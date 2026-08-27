import { test, expect } from '@playwright/test';

test.describe('Reports & Financial Analytics Page Workflows', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept backend API routes to return predictable report data
    await page.route('**/api/reports/summary*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          income: 6000,
          expenses: 4000,
          netSavings: 2000,
          healthScore: 80,
          savingsProgress: 50,
        }),
      });
    });

    await page.route('**/api/reports/categories*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { category: 'Housing', amount: 2000, percentage: 50, color: '#3b82f6' },
          { category: 'Food', amount: 1000, percentage: 25, color: '#10b981' },
        ]),
      });
    });

    // Navigate to the reports page
    await page.goto('/reports');
  });

  test('renders KPI metrics and category breakdown correctly', async ({ page }) => {
    // Assert page header and financial KPI cards are visible
    await expect(page.getByText('Financial Analytics & Reports')).toBeVisible();
    await expect(page.getByText('$6000')).toBeVisible();
    await expect(page.getByText('$4000')).toBeVisible();
    await expect(page.getByText('$2000')).toBeVisible();

    // Verify category breakdown elements render
    await expect(page.getByText('Housing')).toBeVisible();
    await expect(page.getByText('$2000 (50%)')).toBeVisible();
  });

  test('prevents export for free plan users and prompts upgrade', async ({ page }) => {
    // Attempt to click export button as a free plan user
    const exportCsvBtn = page.getByRole('button', { name: /exportCSV/i });
    await exportCsvBtn.click();

    // Verify warning toast message or modal prompt appears
    const warningToast = page.getByText(/upgrade required|feature available on pro/i);
    await expect(warningToast).toBeVisible();

    // Verify browser redirects to the upgrade route
    await expect(page).toHaveURL(/\/upgrade/);
  });

  test('generates AI report when generate button is clicked', async ({ page }) => {
    // Route AI report generation endpoint to return generated insight text
    await page.route('**/api/reports/ai-summary*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          report: 'AI Analysis: Cashflow performance is strong.',
        }),
      });
    });

    const generateBtn = page.getByRole('button', { name: /generateReport/i });
    await generateBtn.click();

    // Playwright auto-retries until the async AI generated content displays
    await expect(
      page.getByText('AI Analysis: Cashflow performance is strong.')
    ).toBeVisible();

    // Verify success toast notification
    const successToast = page.getByText(/AI Financial Analysis Report generated successfully!/i);
    await expect(successToast).toBeVisible();
  });
});

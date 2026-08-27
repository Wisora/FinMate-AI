import { test, expect } from '@playwright/test';

test.describe('ReportCard Component Workflows', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard route where the ReportCard is rendered
    await page.goto('/dashboard');
  });

  test('renders cashflow summary and savings rate correctly', async ({ page }) => {
    // Assert financial summary title and metrics render accurately
    await expect(page.getByText(/Financial Summary/i)).toBeVisible();
    await expect(page.getByText(/40% Savings Rate/i)).toBeVisible();
    await expect(page.getByText('$5000')).toBeVisible();
    await expect(page.getByText('$3000')).toBeVisible();
    await expect(page.getByText('$2000')).toBeVisible();
  });

  test('renders top spending category and AI insight message', async ({ page }) => {
    // Assert category details and AI insight messaging
    await expect(
      page.getByText(/Top Spending: Housing & Utilities/i)
    ).toBeVisible();
    await expect(page.getByText(/\$1200 \(40%\)/i)).toBeVisible();
    await expect(
      page.getByText(/Great job saving 40% of your income this month!/i)
    ).toBeVisible();
  });

  test('navigates to analytics when view details button is clicked', async ({ page }) => {
    // Click the view full reports action button
    const detailsBtn = page.getByRole('button', {
      name: /View Full Reports & Analytics/i,
    });
    await detailsBtn.click();

    // Verify browser navigates to reports page or opens analytics drawer
    await expect(page).toHaveURL(/\/reports/);
  });
});

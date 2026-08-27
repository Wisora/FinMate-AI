import { test, expect } from '@playwright/test';

test.describe('Profile Page Workflows', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept backend financial summary API calls to return stable mock data
    await page.route('**/api/reports/summary*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          healthScore: 85,
          netSavings: 2500,
          savingsProgress: 60,
        }),
      });
    });

    // Navigate to the profile page
    await page.goto('/profile');
  });

  test('renders user profile details and health summary', async ({ page }) => {
    // Verify user profile details are visible in the DOM
    await expect(page.getByText('Jane Doe')).toBeVisible();
    await expect(page.getByText(/jane@example.com/i)).toBeVisible();
    await expect(page.getByText(/Persona: Aggressive Debt Payoff & Saver/i)).toBeVisible();

    // Verify financial summary metrics calculated from API response
    await expect(page.getByText('85 / 100')).toBeVisible();
    await expect(page.getByText('60%')).toBeVisible();
  });

  test('toggles edit form and submits updated profile values', async ({ page }) => {
    // Click edit profile button
    const editBtn = page.getByRole('button', { name: /Edit Profile/i });
    await editBtn.click();

    // Locate form inputs and update fields
    const nameInput = page.getByLabel(/Full Name/i);
    const emailInput = page.getByLabel(/Email Address/i);

    await nameInput.fill('Jane Smith');
    await emailInput.fill('janesmith@example.com');

    // Submit form
    const saveBtn = page.getByRole('button', { name: /Save Profile/i });
    await saveBtn.click();

    // Assert success toast message appears on screen
    const toast = page.getByText(/Profile details updated successfully!/i);
    await expect(toast).toBeVisible();

    // Verify updated values render in the profile card
    await expect(page.getByText('Jane Smith')).toBeVisible();
  });

  test('triggers navigation to upgrade page for free plan users', async ({ page }) => {
    const upgradeBtn = page.getByRole('button', { name: /Upgrade to Pro/i });
    await upgradeBtn.click();

    // Verify browser navigates to upgrade route
    await expect(page).toHaveURL(/\/upgrade/);
  });
});

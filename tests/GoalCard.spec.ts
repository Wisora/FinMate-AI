import { test, expect } from '@playwright/test';

test.describe('GoalCard Interactive Workflows', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the newly created /dashboard route page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
  });

  test('renders goal title and progress percentage correctly', async ({ page }) => {
    await expect(page.getByText('Emergency Savings')).toBeVisible();
    await expect(page.getByText(/30% Completed/i)).toBeVisible();
  });

  test('opens edit modal or triggers action when edit button is clicked', async ({ page }) => {
    const editBtn = page.getByRole('button', { name: /editGoal/i });
    await editBtn.click();

    const modalHeader = page.getByRole('heading', { name: /edit goal/i });
    await expect(modalHeader).toBeVisible();
  });

  test('updates goal progress when top-up button is clicked', async ({ page }) => {
    const add100Btn = page.getByRole('button', { name: /\+ Add \$100/i });
    await add100Btn.click();

    await expect(page.getByText('$1,600')).toBeVisible();
  });
});
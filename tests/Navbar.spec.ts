import { test, expect } from '@playwright/test';

test.describe('Navbar Component & Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Load the application
    await page.goto('/');
  });

  test('renders brand title, navigation items, and user profile name', async ({ page }) => {
    // Verify brand title and main navigation landmark
    await expect(page.getByText(/FinMate/i)).toBeVisible();
    await expect(page.getByRole('navigation', { name: /Main Navigation/i })).toBeVisible();

    // Verify user profile name is displayed in the nav header
    await expect(page.getByText(/Jane Doe|Alex/i)).toBeVisible();
  });

  test('navigates to selected sections when navigation options are clicked', async ({ page }) => {
    const reportsBtn = page.getByRole('button', { name: /reports/i });
    await reportsBtn.click();

    // Verify browser navigates or updates route/tab state
    await expect(page).toHaveURL(/\/reports|#reports/);
  });

  test('toggles mobile menu dropdown when hamburger icon is clicked', async ({ page, isMobile }) => {
    // Set viewport to mobile size if not already mobile
    await page.setViewportSize({ width: 375, height: 667 });

    const mobileMenuBtn = page.getByRole('button', { name: /Toggle Mobile Menu/i });
    await mobileMenuBtn.click();

    // Verify language/settings dropdown or menu links are visible inside mobile menu
    const languageSelects = page.getByRole('combobox');
    await expect(languageSelects.first()).toBeVisible();
  });
});

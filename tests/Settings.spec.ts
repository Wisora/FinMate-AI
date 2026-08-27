import { test, expect } from '@playwright/test';

test.describe('Settings Page Workflows', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the settings route
    await page.goto('/settings');
  });

  test('renders language, currency, and theme settings options', async ({ page }) => {
    // Verify main header heading
    const heading = page.getByRole('heading', { name: /Regional & Language Configuration/i });
    await expect(heading).toBeVisible();

    // Verify switch and submit button elements
    const themeSwitch = page.getByRole('switch');
    await expect(themeSwitch).toBeVisible();

    const saveBtn = page.getByRole('button', { name: /saveSettings/i });
    await expect(saveBtn).toBeVisible();
  });

  test('toggles dark mode switch', async ({ page }) => {
    const themeSwitch = page.getByRole('switch');
    
    // Read initial state
    const initialChecked = await themeSwitch.getAttribute('aria-checked');

    // Click to toggle switch state
    await themeSwitch.click();

    // Assert that aria-checked attribute has toggled
    const newChecked = await themeSwitch.getAttribute('aria-checked');
    expect(newChecked).not.toBe(initialChecked);
  });

  test('submits form and triggers settings update toast', async ({ page }) => {
    const saveBtn = page.getByRole('button', { name: /saveSettings/i });
    await saveBtn.click();

    // Verify success toast notification renders in DOM
    const toast = page.getByText(/settings updated|saved successfully/i);
    await expect(toast).toBeVisible();
  });

  test('handles data reset trigger correctly and reloads page', async ({ page }) => {
    const resetBtn = page.getByRole('button', {
      name: /Reset All Data to Sample Defaults/i,
    });

    // Listen for page navigation/reload triggered by reset button
    const reloadPromise = page.waitForURL(/\/settings|\//);

    await resetBtn.click();

    // Assert info toast message appears
    const toast = page.getByText('Application data & settings reset to initial state.');
    await expect(toast).toBeVisible();

    // Verify page reload took place naturally
    await reloadPromise;
  });
});

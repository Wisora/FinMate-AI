import { test, expect } from '@playwright/test';

test.describe('PromoBanner Component', () => {
  test('renders banner for free plan users', async ({ page }) => {
    // Navigate to a page where free users see the promo banner
    await page.goto('/');

    const banner = page.getByRole('banner');
    await expect(banner).toBeVisible();

    const bannerText = page.getByText(
      /Get priority Gemini AI insights, automated report PDF export/i
    );
    await expect(bannerText).toBeVisible();
  });

  test('does not render banner for pro plan users', async ({ page }) => {
    // Set authenticated state or query param for a pro user session
    await page.goto('/?plan=pro');

    const banner = page.getByRole('banner');
    await expect(banner).not.toBeVisible();
  });

  test('navigates when upgrade CTA button is clicked', async ({ page }) => {
    await page.goto('/');

    const upgradeBtn = page.getByRole('button', { name: /upgradeToPro/i }).first();
    await upgradeBtn.click();

    // Verify browser navigates to the upgrade checkout page
    await expect(page).toHaveURL(/\/upgrade/);
  });

  test('hides banner when dismiss button is clicked', async ({ page }) => {
    await page.goto('/');

    const dismissBtn = page.getByRole('button', { name: /Dismiss banner/i });
    await dismissBtn.click();

    // Assert banner element is removed or hidden from the viewport
    const banner = page.getByRole('banner');
    await expect(banner).not.toBeVisible();
  });
});
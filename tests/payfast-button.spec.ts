import { test, expect } from '@playwright/test';

test.describe('PayFast Payment Button Integration', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the checkout or upgrade page where PayFast button lives
    await page.goto('/upgrade');
  });

  test('renders submit button and hidden payment fields correctly', async ({ page }) => {
    // 1. Verify payment action button is visible
    const payfastBtn = page.getByRole('button', { name: /Subscribe with PayFast/i });
    await expect(payfastBtn).toBeVisible();

    // 2. Locate the parent payment form
    const form = page.locator('form[action*="payfast.co.za"]');
    await expect(form).toHaveAttribute(
      'action',
      'https://sandbox.payfast.co.za/eng/process'
    );

    // 3. Verify hidden merchant and signature payload values
    const merchantInput = page.locator('input[name="merchant_id"]');
    await expect(merchantInput).toHaveValue('10000100');

    const signatureInput = page.locator('input[name="signature"]');
    await expect(signatureInput).toHaveValue('mock_md5_hash_signature');
  });

  test('submits form to PayFast sandbox URL when clicked', async ({ page }) => {
    const payfastBtn = page.getByRole('button', { name: /Subscribe with PayFast/i });
    
    // Intercept form submission navigation target
    const [request] = await Promise.all([
      page.waitForRequest((req) => req.url().includes('sandbox.payfast.co.za')),
      payfastBtn.click(),
    ]);

    expect(request.url()).toContain('sandbox.payfast.co.za/eng/process');
  });
});

# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: payfast-button.spec.ts >> PayFast Payment Button Integration >> renders submit button and hidden payment fields correctly
- Location: tests\payfast-button.spec.ts:9:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /Subscribe with PayFast/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('button', { name: /Subscribe with PayFast/i })

```

```yaml
- heading "404" [level=1]
- heading "This page could not be found." [level=2]
- button "Open Next.js Dev Tools":
  - img
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('PayFast Payment Button Integration', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Navigate to the checkout or upgrade page where PayFast button lives
  6  |     await page.goto('/upgrade');
  7  |   });
  8  | 
  9  |   test('renders submit button and hidden payment fields correctly', async ({ page }) => {
  10 |     // 1. Verify payment action button is visible
  11 |     const payfastBtn = page.getByRole('button', { name: /Subscribe with PayFast/i });
> 12 |     await expect(payfastBtn).toBeVisible();
     |                              ^ Error: expect(locator).toBeVisible() failed
  13 | 
  14 |     // 2. Locate the parent payment form
  15 |     const form = page.locator('form[action*="payfast.co.za"]');
  16 |     await expect(form).toHaveAttribute(
  17 |       'action',
  18 |       'https://sandbox.payfast.co.za/eng/process'
  19 |     );
  20 | 
  21 |     // 3. Verify hidden merchant and signature payload values
  22 |     const merchantInput = page.locator('input[name="merchant_id"]');
  23 |     await expect(merchantInput).toHaveValue('10000100');
  24 | 
  25 |     const signatureInput = page.locator('input[name="signature"]');
  26 |     await expect(signatureInput).toHaveValue('mock_md5_hash_signature');
  27 |   });
  28 | 
  29 |   test('submits form to PayFast sandbox URL when clicked', async ({ page }) => {
  30 |     const payfastBtn = page.getByRole('button', { name: /Subscribe with PayFast/i });
  31 |     
  32 |     // Intercept form submission navigation target
  33 |     const [request] = await Promise.all([
  34 |       page.waitForRequest((req) => req.url().includes('sandbox.payfast.co.za')),
  35 |       payfastBtn.click(),
  36 |     ]);
  37 | 
  38 |     expect(request.url()).toContain('sandbox.payfast.co.za/eng/process');
  39 |   });
  40 | });
  41 | 
```
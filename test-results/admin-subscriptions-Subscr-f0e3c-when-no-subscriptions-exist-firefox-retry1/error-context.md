# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-subscriptions.spec.ts >> Subscriptions Admin Page >> displays fallback message when no subscriptions exist
- Location: tests\admin-subscriptions.spec.ts:23:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('No subscriptions found.')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('No subscriptions found.')

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
  3  | const mockSubscriptions = [
  4  |   {
  5  |     id: 1,
  6  |     plan: 'Pro',
  7  |     status: 'Active',
  8  |     amount: 29.99,
  9  |     payment_method: 'Credit Card',
  10 |     user: { email: 'alex@example.com' },
  11 |   },
  12 |   {
  13 |     id: 2,
  14 |     plan: 'Free',
  15 |     status: 'Inactive',
  16 |     amount: 0,
  17 |     payment_method: 'N/A',
  18 |     user: { email: 'sam@example.com' },
  19 |   },
  20 | ];
  21 | 
  22 | test.describe('Subscriptions Admin Page', () => {
  23 |   test('displays fallback message when no subscriptions exist', async ({ page }) => {
  24 |     // Intercept backend API to return an empty array
  25 |     await page.route('**/api/subscriptions*', async (route) => {
  26 |       await route.fulfill({
  27 |         status: 200,
  28 |         contentType: 'application/json',
  29 |         body: JSON.stringify([]),
  30 |       });
  31 |     });
  32 | 
  33 |     await page.goto('/admin/subscriptions');
  34 | 
  35 |     // Assert fallback empty state text renders
> 36 |     await expect(page.getByText('No subscriptions found.')).toBeVisible();
     |                                                             ^ Error: expect(locator).toBeVisible() failed
  37 |   });
  38 | 
  39 |   test('fetches and renders subscription records in a table', async ({ page }) => {
  40 |     // Intercept backend API to return mock subscriptions dataset
  41 |     await page.route('**/api/subscriptions*', async (route) => {
  42 |       await route.fulfill({
  43 |         status: 200,
  44 |         contentType: 'application/json',
  45 |         body: JSON.stringify(mockSubscriptions),
  46 |       });
  47 |     });
  48 | 
  49 |     await page.goto('/admin/subscriptions');
  50 | 
  51 |     // Verify header and table structure
  52 |     await expect(page.getByText('Subscriptions')).toBeVisible();
  53 |     await expect(page.getByText('User Email')).toBeVisible();
  54 |     await expect(page.getByText('Payment Method')).toBeVisible();
  55 | 
  56 |     // Verify first subscription record row
  57 |     await expect(page.getByText('alex@example.com')).toBeVisible();
  58 |     await expect(page.getByText('Pro')).toBeVisible();
  59 |     await expect(page.getByText('$29.99')).toBeVisible();
  60 | 
  61 |     // Verify second subscription record row
  62 |     await expect(page.getByText('sam@example.com')).toBeVisible();
  63 |     await expect(page.getByText('Inactive')).toBeVisible();
  64 |   });
  65 | });
  66 | 
```
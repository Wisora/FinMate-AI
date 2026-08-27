# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AdminSubscriptions.spec.ts >> Admin Subscriptions Page >> blocks access or redirects for non-admin users
- Location: tests\AdminSubscriptions.spec.ts:15:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/Access denied/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/Access denied/i)

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
  6  |     user_id: 'usr_123',
  7  |     plan: 'Pro Annual',
  8  |     status: 'Active',
  9  |     start_date: '2026-01-01',
  10 |     end_date: '2027-01-01',
  11 |   },
  12 | ];
  13 | 
  14 | test.describe('Admin Subscriptions Page', () => {
  15 |   test('blocks access or redirects for non-admin users', async ({ page }) => {
  16 |     // Navigate to the admin page as an unauthenticated/standard user
  17 |     await page.goto('/AdminSubscriptions');
  18 | 
  19 |     // Asserts that 'Access denied' is visible and main admin view is hidden
> 20 |     await expect(page.getByText(/Access denied/i)).toBeVisible();
     |                                                    ^ Error: expect(locator).toBeVisible() failed
  21 |     await expect(page.getByText('Subscription Dashboard')).not.toBeVisible();
  22 |   });
  23 | 
  24 |   test('fetches and renders subscription rows for admin users', async ({ page }) => {
  25 |     // Intercept the API fetch request and return mock JSON data
  26 |     await page.route('**/api/subscriptions*', async (route) => {
  27 |       await route.fulfill({
  28 |         status: 200,
  29 |         contentType: 'application/json',
  30 |         body: JSON.stringify(mockSubscriptions),
  31 |       });
  32 |     });
  33 | 
  34 |     // Navigate to the admin subscriptions page
  35 |     await page.goto('/AdminSubscriptions');
  36 | 
  37 |     // Verify dashboard title is present
  38 |     await expect(page.getByText('Subscription Dashboard')).toBeVisible();
  39 | 
  40 |     // Verify mocked user and plan details populate in the UI/table
  41 |     await expect(page.getByText('usr_123')).toBeVisible();
  42 |     await expect(page.getByText('Pro Annual')).toBeVisible();
  43 |   });
  44 | });
```
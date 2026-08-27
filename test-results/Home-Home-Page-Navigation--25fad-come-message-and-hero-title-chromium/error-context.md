# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Home.spec.ts >> Home Page & Navigation Workflows >> renders user welcome message and hero title
- Location: tests\Home.spec.ts:9:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/Alex Johnson/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/Alex Johnson/i)

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
  3  | test.describe('Home Page & Navigation Workflows', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Navigate to the app root home page
  6  |     await page.goto('/');
  7  |   });
  8  | 
  9  |   test('renders user welcome message and hero title', async ({ page }) => {
  10 |     // Check for user welcome text and hero headline
> 11 |     await expect(page.getByText(/Alex Johnson/i)).toBeVisible();
     |                                                   ^ Error: expect(locator).toBeVisible() failed
  12 |     await expect(
  13 |       page.getByText(/Take Control of Your Savings, Debt & Investments/i)
  14 |     ).toBeVisible();
  15 |   });
  16 | 
  17 |   test('navigates to financial dashboard when hero button is clicked', async ({ page }) => {
  18 |     const dashboardBtn = page.getByRole('button', {
  19 |       name: /Go to Financial Dashboard/i,
  20 |     });
  21 |     await dashboardBtn.click();
  22 | 
  23 |     // Verify browser navigated to dashboard route
  24 |     await expect(page).toHaveURL(/\/dashboard/);
  25 |   });
  26 | 
  27 |   test('navigates to reports when report button is clicked', async ({ page }) => {
  28 |     const reportsBtn = page.getByRole('button', {
  29 |       name: /View Financial Reports/i,
  30 |     });
  31 |     await reportsBtn.click();
  32 | 
  33 |     // Verify browser navigated to reports route
  34 |     await expect(page).toHaveURL(/\/reports/);
  35 |   });
  36 | 
  37 |   test('navigates to settings when configure settings link is clicked', async ({ page }) => {
  38 |     const settingsBtn = page.getByRole('button', {
  39 |       name: /Configure Settings →/i,
  40 |     });
  41 |     await settingsBtn.click();
  42 | 
  43 |     // Verify browser navigated to settings route
  44 |     await expect(page).toHaveURL(/\/settings/);
  45 |   });
  46 | 
  47 |   test('triggers navigation from promo banner upgrade button', async ({ page }) => {
  48 |     // Locate upgrade button within the real PromoBanner component
  49 |     const promoUpgradeBtn = page.getByRole('button', {
  50 |       name: /Upgrade/i,
  51 |     });
  52 |     await promoUpgradeBtn.click();
  53 | 
  54 |     // Verify route transitions to upgrade page
  55 |     await expect(page).toHaveURL(/\/upgrade/);
  56 |   });
  57 | });
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: upgrade.spec.ts >> Upgrade & Subscription Checkout Workflows >> renders plan features and upgrade options for free tier users
- Location: tests\upgrade.spec.ts:9:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /Supercharge Your Wealth Building with Pro Analytics & Priority AI/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /Supercharge Your Wealth Building with Pro Analytics & Priority AI/i })

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
  3  | test.describe('Upgrade & Subscription Checkout Workflows', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Navigate to the upgrade route
  6  |     await page.goto('/upgrade');
  7  |   });
  8  | 
  9  |   test('renders plan features and upgrade options for free tier users', async ({ page }) => {
  10 |     // Verify main page header
  11 |     const heading = page.getByRole('heading', {
  12 |       name: /Supercharge Your Wealth Building with Pro Analytics & Priority AI/i,
  13 |     });
> 14 |     await expect(heading).toBeVisible();
     |                           ^ Error: expect(locator).toBeVisible() failed
  15 | 
  16 |     // Verify current plan badge and CTA button
  17 |     await expect(page.getByText('Current Plan')).toBeVisible();
  18 |     
  19 |     const upgradeBtn = page.getByRole('button', { name: /Upgrade to Pro Now →/i });
  20 |     await expect(upgradeBtn).toBeVisible();
  21 |   });
  22 | 
  23 |   test('toggles between annual and monthly billing options', async ({ page }) => {
  24 |     // Initial annual pricing display
  25 |     await expect(page.getByText('$7.99/mo')).toBeVisible();
  26 | 
  27 |     // Toggle billing frequency switch
  28 |     const toggleButton = page.getByRole('button', { name: /monthly|annual/i });
  29 |     await toggleButton.click();
  30 | 
  31 |     // Verify monthly pricing display updates
  32 |     await expect(page.getByText('$9.99/mo')).toBeVisible();
  33 |   });
  34 | 
  35 |   test('simulates successful checkout workflow', async ({ page }) => {
  36 |     // Click upgrade button to initiate checkout action
  37 |     const upgradeBtn = page.getByRole('button', {
  38 |       name: /Upgrade to Pro Now →/i,
  39 |     });
  40 |     await upgradeBtn.click();
  41 | 
  42 |     // Verify success toast notification renders in DOM
  43 |     const successToast = page.getByText(/🎉 Congratulations! You are now a FinMate AI Pro member!/i);
  44 |     await expect(successToast).toBeVisible();
  45 | 
  46 |     // Verify UI reflects unlocked Pro status
  47 |     await expect(
  48 |       page.getByText('You have unlocked FinMate Pro Membership!')
  49 |     ).toBeVisible();
  50 |   });
  51 | 
  52 |   test('renders active status badge for existing Pro plan users', async ({ page }) => {
  53 |     // Navigate with query or state set to Pro plan user session
  54 |     await page.goto('/upgrade?plan=pro');
  55 | 
  56 |     // Verify Pro tier status banner
  57 |     await expect(
  58 |       page.getByText('You have unlocked FinMate Pro Membership!')
  59 |     ).toBeVisible();
  60 | 
  61 |     // Ensure upgrade CTA is not present for active Pro users
  62 |     const upgradeBtn = page.getByRole('button', { name: /Upgrade to Pro Now →/i });
  63 |     await expect(upgradeBtn).not.toBeVisible();
  64 |   });
  65 | });
  66 | 
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: profile.spec.ts >> Profile Page Workflows >> toggles edit form and submits updated profile values
- Location: tests\profile.spec.ts:33:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Edit Profile/i })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e4]:
    - heading "404" [level=1] [ref=e5]
    - heading "This page could not be found." [level=2] [ref=e7]
  - button "Open Next.js Dev Tools" [ref=e13] [cursor=pointer]
  - alert [ref=e17]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Profile Page Workflows', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Intercept backend financial summary API calls to return stable mock data
  6  |     await page.route('**/api/reports/summary*', async (route) => {
  7  |       await route.fulfill({
  8  |         status: 200,
  9  |         contentType: 'application/json',
  10 |         body: JSON.stringify({
  11 |           healthScore: 85,
  12 |           netSavings: 2500,
  13 |           savingsProgress: 60,
  14 |         }),
  15 |       });
  16 |     });
  17 | 
  18 |     // Navigate to the profile page
  19 |     await page.goto('/profile');
  20 |   });
  21 | 
  22 |   test('renders user profile details and health summary', async ({ page }) => {
  23 |     // Verify user profile details are visible in the DOM
  24 |     await expect(page.getByText('Jane Doe')).toBeVisible();
  25 |     await expect(page.getByText(/jane@example.com/i)).toBeVisible();
  26 |     await expect(page.getByText(/Persona: Aggressive Debt Payoff & Saver/i)).toBeVisible();
  27 | 
  28 |     // Verify financial summary metrics calculated from API response
  29 |     await expect(page.getByText('85 / 100')).toBeVisible();
  30 |     await expect(page.getByText('60%')).toBeVisible();
  31 |   });
  32 | 
  33 |   test('toggles edit form and submits updated profile values', async ({ page }) => {
  34 |     // Click edit profile button
  35 |     const editBtn = page.getByRole('button', { name: /Edit Profile/i });
> 36 |     await editBtn.click();
     |                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
  37 | 
  38 |     // Locate form inputs and update fields
  39 |     const nameInput = page.getByLabel(/Full Name/i);
  40 |     const emailInput = page.getByLabel(/Email Address/i);
  41 | 
  42 |     await nameInput.fill('Jane Smith');
  43 |     await emailInput.fill('janesmith@example.com');
  44 | 
  45 |     // Submit form
  46 |     const saveBtn = page.getByRole('button', { name: /Save Profile/i });
  47 |     await saveBtn.click();
  48 | 
  49 |     // Assert success toast message appears on screen
  50 |     const toast = page.getByText(/Profile details updated successfully!/i);
  51 |     await expect(toast).toBeVisible();
  52 | 
  53 |     // Verify updated values render in the profile card
  54 |     await expect(page.getByText('Jane Smith')).toBeVisible();
  55 |   });
  56 | 
  57 |   test('triggers navigation to upgrade page for free plan users', async ({ page }) => {
  58 |     const upgradeBtn = page.getByRole('button', { name: /Upgrade to Pro/i });
  59 |     await upgradeBtn.click();
  60 | 
  61 |     // Verify browser navigates to upgrade route
  62 |     await expect(page).toHaveURL(/\/upgrade/);
  63 |   });
  64 | });
  65 | 
```
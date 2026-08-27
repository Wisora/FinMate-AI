# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: GoalCard.spec.ts >> GoalCard Interactive Workflows >> renders goal title and progress percentage correctly
- Location: tests\GoalCard.spec.ts:9:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Emergency Savings')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Emergency Savings')

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
  3  | test.describe('GoalCard Interactive Workflows', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Navigate to dashboard page in full browser context
  6  |     await page.goto('/dashboard');
  7  |   });
  8  | 
  9  |   test('renders goal title and progress percentage correctly', async ({ page }) => {
  10 |     // Assert goal title and progress indicator are visible
> 11 |     await expect(page.getByText('Emergency Savings')).toBeVisible();
     |                                                       ^ Error: expect(locator).toBeVisible() failed
  12 |     await expect(page.getByText(/30% Completed/i)).toBeVisible();
  13 |   });
  14 | 
  15 |   test('opens edit modal or triggers action when edit button is clicked', async ({ page }) => {
  16 |     // Locate and click the edit goal button
  17 |     const editBtn = page.getByRole('button', { name: /editGoal/i });
  18 |     await editBtn.click();
  19 | 
  20 |     // Verify UI responds (e.g. edit modal opens or form pops up)
  21 |     const modalHeader = page.getByRole('heading', { name: /edit goal/i });
  22 |     await expect(modalHeader).toBeVisible();
  23 |   });
  24 | 
  25 |   test('updates goal progress when top-up button is clicked', async ({ page }) => {
  26 |     // Locate the quick top-up button and click it
  27 |     const add100Btn = page.getByRole('button', { name: /\+ Add \$100/i });
  28 |     await add100Btn.click();
  29 | 
  30 |     // Verify progress UI updates (e.g. amount or percentage increases)
  31 |     await expect(page.getByText('$1,600')).toBeVisible();
  32 |   });
  33 | });
```
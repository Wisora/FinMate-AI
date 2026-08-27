# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: recommendation-card.spec.ts >> RecommendationCard Component Workflows >> renders recommendation title, description, and benefit
- Location: tests\recommendation-card.spec.ts:9:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Switch to High-Yield Savings')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Switch to High-Yield Savings')

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
  3  | test.describe('RecommendationCard Component Workflows', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Navigate to dashboard route where RecommendationCard components render
  6  |     await page.goto('/dashboard');
  7  |   });
  8  | 
  9  |   test('renders recommendation title, description, and benefit', async ({ page }) => {
  10 |     // Assert recommendation content and impact tags are visible in the UI
  11 |     await expect(
  12 |       page.getByText('Switch to High-Yield Savings')
> 13 |     ).toBeVisible();
     |       ^ Error: expect(locator).toBeVisible() failed
  14 |     await expect(
  15 |       page.getByText('Move emergency fund to earn 4.5% APY.')
  16 |     ).toBeVisible();
  17 |     await expect(page.getByText(/HIGH IMPACT/i)).toBeVisible();
  18 |     await expect(page.getByText('+$450')).toBeVisible();
  19 |   });
  20 | 
  21 |   test('triggers strategy application when action button is clicked', async ({ page }) => {
  22 |     // Click the action button
  23 |     const applyBtn = page.getByRole('button', { name: /Apply Strategy/i });
  24 |     await applyBtn.click();
  25 | 
  26 |     // Verify UI responds (button shifts to applied state or shows confirmation toast)
  27 |     const appliedBtn = page.getByRole('button', { name: /applied|Applied Strategy/i });
  28 |     await expect(appliedBtn).toBeVisible();
  29 |   });
  30 | 
  31 |   test('renders applied state correctly when recommendation is applied', async ({ page }) => {
  32 |     // Locate recommendation button with applied state attribute
  33 |     const appliedButton = page.getByRole('button', { name: /applied/i });
  34 |     await expect(appliedButton).toHaveAttribute('aria-pressed', 'true');
  35 |     await expect(page.getByText(/applied/i)).toBeVisible();
  36 |   });
  37 | });
  38 | 
```
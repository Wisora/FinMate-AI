# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: report-card.spec.ts >> ReportCard Component Workflows >> navigates to analytics when view details button is clicked
- Location: tests\report-card.spec.ts:29:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /View Full Reports & Analytics/i })

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
  3  | test.describe('ReportCard Component Workflows', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Navigate to dashboard route where the ReportCard is rendered
  6  |     await page.goto('/dashboard');
  7  |   });
  8  | 
  9  |   test('renders cashflow summary and savings rate correctly', async ({ page }) => {
  10 |     // Assert financial summary title and metrics render accurately
  11 |     await expect(page.getByText(/Financial Summary/i)).toBeVisible();
  12 |     await expect(page.getByText(/40% Savings Rate/i)).toBeVisible();
  13 |     await expect(page.getByText('$5000')).toBeVisible();
  14 |     await expect(page.getByText('$3000')).toBeVisible();
  15 |     await expect(page.getByText('$2000')).toBeVisible();
  16 |   });
  17 | 
  18 |   test('renders top spending category and AI insight message', async ({ page }) => {
  19 |     // Assert category details and AI insight messaging
  20 |     await expect(
  21 |       page.getByText(/Top Spending: Housing & Utilities/i)
  22 |     ).toBeVisible();
  23 |     await expect(page.getByText(/\$1200 \(40%\)/i)).toBeVisible();
  24 |     await expect(
  25 |       page.getByText(/Great job saving 40% of your income this month!/i)
  26 |     ).toBeVisible();
  27 |   });
  28 | 
  29 |   test('navigates to analytics when view details button is clicked', async ({ page }) => {
  30 |     // Click the view full reports action button
  31 |     const detailsBtn = page.getByRole('button', {
  32 |       name: /View Full Reports & Analytics/i,
  33 |     });
> 34 |     await detailsBtn.click();
     |                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
  35 | 
  36 |     // Verify browser navigates to reports page or opens analytics drawer
  37 |     await expect(page).toHaveURL(/\/reports/);
  38 |   });
  39 | });
  40 | 
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: reports.spec.ts >> Reports & Financial Analytics Page Workflows >> generates AI report when generate button is clicked
- Location: tests\reports.spec.ts:60:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /generateReport/i })

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
  3  | test.describe('Reports & Financial Analytics Page Workflows', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Intercept backend API routes to return predictable report data
  6  |     await page.route('**/api/reports/summary*', async (route) => {
  7  |       await route.fulfill({
  8  |         status: 200,
  9  |         contentType: 'application/json',
  10 |         body: JSON.stringify({
  11 |           income: 6000,
  12 |           expenses: 4000,
  13 |           netSavings: 2000,
  14 |           healthScore: 80,
  15 |           savingsProgress: 50,
  16 |         }),
  17 |       });
  18 |     });
  19 | 
  20 |     await page.route('**/api/reports/categories*', async (route) => {
  21 |       await route.fulfill({
  22 |         status: 200,
  23 |         contentType: 'application/json',
  24 |         body: JSON.stringify([
  25 |           { category: 'Housing', amount: 2000, percentage: 50, color: '#3b82f6' },
  26 |           { category: 'Food', amount: 1000, percentage: 25, color: '#10b981' },
  27 |         ]),
  28 |       });
  29 |     });
  30 | 
  31 |     // Navigate to the reports page
  32 |     await page.goto('/reports');
  33 |   });
  34 | 
  35 |   test('renders KPI metrics and category breakdown correctly', async ({ page }) => {
  36 |     // Assert page header and financial KPI cards are visible
  37 |     await expect(page.getByText('Financial Analytics & Reports')).toBeVisible();
  38 |     await expect(page.getByText('$6000')).toBeVisible();
  39 |     await expect(page.getByText('$4000')).toBeVisible();
  40 |     await expect(page.getByText('$2000')).toBeVisible();
  41 | 
  42 |     // Verify category breakdown elements render
  43 |     await expect(page.getByText('Housing')).toBeVisible();
  44 |     await expect(page.getByText('$2000 (50%)')).toBeVisible();
  45 |   });
  46 | 
  47 |   test('prevents export for free plan users and prompts upgrade', async ({ page }) => {
  48 |     // Attempt to click export button as a free plan user
  49 |     const exportCsvBtn = page.getByRole('button', { name: /exportCSV/i });
  50 |     await exportCsvBtn.click();
  51 | 
  52 |     // Verify warning toast message or modal prompt appears
  53 |     const warningToast = page.getByText(/upgrade required|feature available on pro/i);
  54 |     await expect(warningToast).toBeVisible();
  55 | 
  56 |     // Verify browser redirects to the upgrade route
  57 |     await expect(page).toHaveURL(/\/upgrade/);
  58 |   });
  59 | 
  60 |   test('generates AI report when generate button is clicked', async ({ page }) => {
  61 |     // Route AI report generation endpoint to return generated insight text
  62 |     await page.route('**/api/reports/ai-summary*', async (route) => {
  63 |       await route.fulfill({
  64 |         status: 200,
  65 |         contentType: 'application/json',
  66 |         body: JSON.stringify({
  67 |           report: 'AI Analysis: Cashflow performance is strong.',
  68 |         }),
  69 |       });
  70 |     });
  71 | 
  72 |     const generateBtn = page.getByRole('button', { name: /generateReport/i });
> 73 |     await generateBtn.click();
     |                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
  74 | 
  75 |     // Playwright auto-retries until the async AI generated content displays
  76 |     await expect(
  77 |       page.getByText('AI Analysis: Cashflow performance is strong.')
  78 |     ).toBeVisible();
  79 | 
  80 |     // Verify success toast notification
  81 |     const successToast = page.getByText(/AI Financial Analysis Report generated successfully!/i);
  82 |     await expect(successToast).toBeVisible();
  83 |   });
  84 | });
  85 | 
```
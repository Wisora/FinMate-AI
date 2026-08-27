# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual.spec.ts >> Visual Regression Snapshot Tests >> dashboard page visual snapshot
- Location: tests\visual.spec.ts:13:7

# Error details

```
Error: A snapshot doesn't exist at C:\Users\Craig A\Desktop\finmate-ai\tests\visual.spec.ts-snapshots\dashboard-page-chromium-win32.png, writing actual.
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
  3  | test.describe('Visual Regression Snapshot Tests', () => {
  4  |   test('landing page visual snapshot', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     // Capture full page screenshot and compare with baseline snapshot
  7  |     await expect(page).toHaveScreenshot('landing-page.png', {
  8  |       fullPage: true,
  9  |       maxDiffPixelRatio: 0.05,
  10 |     });
  11 |   });
  12 | 
  13 |   test('dashboard page visual snapshot', async ({ page }) => {
  14 |     await page.goto('/dashboard');
  15 |     // Mask dynamic content (e.g., timestamps or dynamic chart elements)
> 16 |     await expect(page).toHaveScreenshot('dashboard-page.png', {
     |     ^ Error: A snapshot doesn't exist at C:\Users\Craig A\Desktop\finmate-ai\tests\visual.spec.ts-snapshots\dashboard-page-chromium-win32.png, writing actual.
  17 |       fullPage: true,
  18 |       mask: [page.getByTestId('dynamic-timestamp')],
  19 |     });
  20 |   });
  21 | 
  22 |   test('reports analytics page visual snapshot', async ({ page }) => {
  23 |     await page.goto('/reports');
  24 |     await expect(page).toHaveScreenshot('reports-page.png', {
  25 |       fullPage: true,
  26 |     });
  27 |   });
  28 | 
  29 |   test('upgrade plan options visual snapshot', async ({ page }) => {
  30 |     await page.goto('/upgrade');
  31 |     await expect(page).toHaveScreenshot('upgrade-page.png');
  32 |   });
  33 | });
  34 | 
```
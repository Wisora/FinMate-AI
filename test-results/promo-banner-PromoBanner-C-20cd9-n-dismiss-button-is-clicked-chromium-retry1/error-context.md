# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: promo-banner.spec.ts >> PromoBanner Component >> hides banner when dismiss button is clicked
- Location: tests\promo-banner.spec.ts:35:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Dismiss banner/i })

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
  3  | test.describe('PromoBanner Component', () => {
  4  |   test('renders banner for free plan users', async ({ page }) => {
  5  |     // Navigate to a page where free users see the promo banner
  6  |     await page.goto('/');
  7  | 
  8  |     const banner = page.getByRole('banner');
  9  |     await expect(banner).toBeVisible();
  10 | 
  11 |     const bannerText = page.getByText(
  12 |       /Get priority Gemini AI insights, automated report PDF export/i
  13 |     );
  14 |     await expect(bannerText).toBeVisible();
  15 |   });
  16 | 
  17 |   test('does not render banner for pro plan users', async ({ page }) => {
  18 |     // Set authenticated state or query param for a pro user session
  19 |     await page.goto('/?plan=pro');
  20 | 
  21 |     const banner = page.getByRole('banner');
  22 |     await expect(banner).not.toBeVisible();
  23 |   });
  24 | 
  25 |   test('navigates when upgrade CTA button is clicked', async ({ page }) => {
  26 |     await page.goto('/');
  27 | 
  28 |     const upgradeBtn = page.getByRole('button', { name: /upgradeToPro/i }).first();
  29 |     await upgradeBtn.click();
  30 | 
  31 |     // Verify browser navigates to the upgrade checkout page
  32 |     await expect(page).toHaveURL(/\/upgrade/);
  33 |   });
  34 | 
  35 |   test('hides banner when dismiss button is clicked', async ({ page }) => {
  36 |     await page.goto('/');
  37 | 
  38 |     const dismissBtn = page.getByRole('button', { name: /Dismiss banner/i });
> 39 |     await dismissBtn.click();
     |                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
  40 | 
  41 |     // Assert banner element is removed or hidden from the viewport
  42 |     const banner = page.getByRole('banner');
  43 |     await expect(banner).not.toBeVisible();
  44 |   });
  45 | });
```
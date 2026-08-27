# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: language-settings.spec.ts >> Localization & Theme Integration >> updates document attributes and theme when switching dark mode
- Location: tests\language-settings.spec.ts:8:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /toggle theme|dark mode/i })

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
  3  | test.describe('Localization & Theme Integration', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/');
  6  |   });
  7  | 
  8  |   test('updates document attributes and theme when switching dark mode', async ({ page }) => {
  9  |     // Locate and click dark mode toggle button on the UI
  10 |     const themeToggle = page.getByRole('button', { name: /toggle theme|dark mode/i });
> 11 |     await themeToggle.click();
     |                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
  12 | 
  13 |     // Verify <html> element receives the 'dark' class in the DOM
  14 |     const htmlElement = page.locator('html');
  15 |     await expect(htmlElement).toHaveClass(/dark/);
  16 |   });
  17 | 
  18 |   test('persists user settings to localStorage', async ({ page }) => {
  19 |     await page.goto('/');
  20 | 
  21 |     // Check localStorage setting populated by LanguageContext
  22 |     const localStorageData = await page.evaluate(() => {
  23 |       return localStorage.getItem('finmate_settings');
  24 |     });
  25 | 
  26 |     expect(localStorageData).not.toBeNull();
  27 |   });
  28 | });
  29 | 
```
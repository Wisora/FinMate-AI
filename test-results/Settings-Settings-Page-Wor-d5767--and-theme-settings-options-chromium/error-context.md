# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Settings.spec.ts >> Settings Page Workflows >> renders language, currency, and theme settings options
- Location: tests\Settings.spec.ts:9:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /Regional & Language Configuration/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /Regional & Language Configuration/i })

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
  3  | test.describe('Settings Page Workflows', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Navigate to the settings route
  6  |     await page.goto('/settings');
  7  |   });
  8  | 
  9  |   test('renders language, currency, and theme settings options', async ({ page }) => {
  10 |     // Verify main header heading
  11 |     const heading = page.getByRole('heading', { name: /Regional & Language Configuration/i });
> 12 |     await expect(heading).toBeVisible();
     |                           ^ Error: expect(locator).toBeVisible() failed
  13 | 
  14 |     // Verify switch and submit button elements
  15 |     const themeSwitch = page.getByRole('switch');
  16 |     await expect(themeSwitch).toBeVisible();
  17 | 
  18 |     const saveBtn = page.getByRole('button', { name: /saveSettings/i });
  19 |     await expect(saveBtn).toBeVisible();
  20 |   });
  21 | 
  22 |   test('toggles dark mode switch', async ({ page }) => {
  23 |     const themeSwitch = page.getByRole('switch');
  24 |     
  25 |     // Read initial state
  26 |     const initialChecked = await themeSwitch.getAttribute('aria-checked');
  27 | 
  28 |     // Click to toggle switch state
  29 |     await themeSwitch.click();
  30 | 
  31 |     // Assert that aria-checked attribute has toggled
  32 |     const newChecked = await themeSwitch.getAttribute('aria-checked');
  33 |     expect(newChecked).not.toBe(initialChecked);
  34 |   });
  35 | 
  36 |   test('submits form and triggers settings update toast', async ({ page }) => {
  37 |     const saveBtn = page.getByRole('button', { name: /saveSettings/i });
  38 |     await saveBtn.click();
  39 | 
  40 |     // Verify success toast notification renders in DOM
  41 |     const toast = page.getByText(/settings updated|saved successfully/i);
  42 |     await expect(toast).toBeVisible();
  43 |   });
  44 | 
  45 |   test('handles data reset trigger correctly and reloads page', async ({ page }) => {
  46 |     const resetBtn = page.getByRole('button', {
  47 |       name: /Reset All Data to Sample Defaults/i,
  48 |     });
  49 | 
  50 |     // Listen for page navigation/reload triggered by reset button
  51 |     const reloadPromise = page.waitForURL(/\/settings|\//);
  52 | 
  53 |     await resetBtn.click();
  54 | 
  55 |     // Assert info toast message appears
  56 |     const toast = page.getByText('Application data & settings reset to initial state.');
  57 |     await expect(toast).toBeVisible();
  58 | 
  59 |     // Verify page reload took place naturally
  60 |     await reloadPromise;
  61 |   });
  62 | });
  63 | 
```
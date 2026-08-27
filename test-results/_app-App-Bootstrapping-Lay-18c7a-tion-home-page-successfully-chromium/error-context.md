# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

Test info

- Name: _app.spec.ts >> App Bootstrapping & Layout >> renders the application home page successfully
- Location: tests\_app.spec.ts:4:7

Error details

Test timeout of 30000ms exceeded.

Error: page.goto: Test timeout of 30000ms exceeded.
Call log:

- navigating to "<http://localhost:3000/>", waiting until "load"

Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('App Bootstrapping & Layout', () => {
  4  |   test('renders the application home page successfully', async ({ page }) => {
  5  |     // Navigate to the Next.js root route
> 6  |     await page.goto('/');
     |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  7  | 
  8  |     // Wait for the main body element to load
  9  |     await page.waitForSelector('body');
  10 | 
  11 |     // Verify the page title or core content loads
  12 |     await expect(page).toHaveURL('http://localhost:3000/');
  13 |   });
  14 | 
  15 |   test('handles authenticated app states cleanly', async ({ page }) => {
  16 |     await page.goto('/');
  17 |     
  18 |     // Check that the page container renders without global errors
  19 |     const body = page.locator('body');
  20 |     await expect(body).toBeVisible();
  21 |   });
  22 | });
```

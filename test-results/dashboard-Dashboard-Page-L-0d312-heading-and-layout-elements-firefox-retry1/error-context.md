# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> Dashboard Page & Layout >> renders Dashboard heading and layout elements
- Location: tests\dashboard.spec.ts:9:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /dashboard/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /dashboard/i })

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
  3  | test.describe('Dashboard Page & Layout', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Navigate to the Dashboard route in the browser
  6  |     await page.goto('/dashboard');
  7  |   });
  8  | 
  9  |   test('renders Dashboard heading and layout elements', async ({ page }) => {
  10 |     // Check that the main Dashboard header is visible
  11 |     const heading = page.getByRole('heading', { name: /dashboard/i });
> 12 |     await expect(heading).toBeVisible();
     |                           ^ Error: expect(locator).toBeVisible() failed
  13 |   });
  14 | 
  15 |   test('renders AssistantChat input box', async ({ page }) => {
  16 |     // Check that the chat textbox input is present and interactive
  17 |     const chatInput = page.getByRole('textbox');
  18 |     await expect(chatInput).toBeVisible();
  19 |   });
  20 | });
```
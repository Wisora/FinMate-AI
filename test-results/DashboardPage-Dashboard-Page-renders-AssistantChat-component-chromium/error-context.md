# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: DashboardPage.spec.ts >> Dashboard Page >> renders AssistantChat component
- Location: tests\DashboardPage.spec.ts:15:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('textbox')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('textbox')

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
  3  | test.describe('Dashboard Page', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Navigate to the Dashboard route in the browser
  6  |     await page.goto('/dashboard');
  7  |   });
  8  | 
  9  |   test('renders Dashboard heading', async ({ page }) => {
  10 |     // Check that the main Dashboard header is visible
  11 |     const heading = page.getByRole('heading', { name: /dashboard/i });
  12 |     await expect(heading).toBeVisible();
  13 |   });
  14 | 
  15 |   test('renders AssistantChat component', async ({ page }) => {
  16 |     // Check that the AssistantChat textbox input is present and interactive
  17 |     const chatInput = page.getByRole('textbox');
> 18 |     await expect(chatInput).toBeVisible();
     |                             ^ Error: expect(locator).toBeVisible() failed
  19 |   });
  20 | });
  21 | 
```
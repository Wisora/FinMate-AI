# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: DashboardComponents.spec.ts >> Dashboard UI Components >> renders GoalCard with expected goal content
- Location: tests\DashboardComponents.spec.ts:9:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/save money/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/save money/i)

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
  3  | test.describe('Dashboard UI Components', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Navigate to the Dashboard page before each test
  6  |     await page.goto('/dashboard');
  7  |   });
  8  | 
  9  |   test('renders GoalCard with expected goal content', async ({ page }) => {
  10 |     // Verify goal card section or specific goal text is visible
  11 |     const goalText = page.getByText(/save money/i);
> 12 |     await expect(goalText).toBeVisible();
     |                            ^ Error: expect(locator).toBeVisible() failed
  13 |   });
  14 | 
  15 |   test('renders ReportCard with report type', async ({ page }) => {
  16 |     // Verify report card content is visible
  17 |     const reportText = page.getByText(/weekly report/i);
  18 |     await expect(reportText).toBeVisible();
  19 |   });
  20 | 
  21 |   test('renders RecommendationCard with recommendation text', async ({ page }) => {
  22 |     // Verify recommendation card text is visible
  23 |     const recommendationText = page.getByText(/cut down on dining out/i);
  24 |     await expect(recommendationText).toBeVisible();
  25 |   });
  26 | 
  27 |   test('renders AssistantChat with interactive input box', async ({ page }) => {
  28 |     // Locate the chat input box by role or placeholder
  29 |     const chatInput = page.getByRole('textbox');
  30 |     await expect(chatInput).toBeVisible();
  31 |   });
  32 | });
  33 | 
```
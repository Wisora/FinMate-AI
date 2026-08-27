# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Navbar.spec.ts >> Navbar Component & Navigation >> renders brand title, navigation items, and user profile name
- Location: tests\Navbar.spec.ts:9:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/FinMate/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/FinMate/i)

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
  3  | test.describe('Navbar Component & Navigation', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Load the application
  6  |     await page.goto('/');
  7  |   });
  8  | 
  9  |   test('renders brand title, navigation items, and user profile name', async ({ page }) => {
  10 |     // Verify brand title and main navigation landmark
> 11 |     await expect(page.getByText(/FinMate/i)).toBeVisible();
     |                                              ^ Error: expect(locator).toBeVisible() failed
  12 |     await expect(page.getByRole('navigation', { name: /Main Navigation/i })).toBeVisible();
  13 | 
  14 |     // Verify user profile name is displayed in the nav header
  15 |     await expect(page.getByText(/Jane Doe|Alex/i)).toBeVisible();
  16 |   });
  17 | 
  18 |   test('navigates to selected sections when navigation options are clicked', async ({ page }) => {
  19 |     const reportsBtn = page.getByRole('button', { name: /reports/i });
  20 |     await reportsBtn.click();
  21 | 
  22 |     // Verify browser navigates or updates route/tab state
  23 |     await expect(page).toHaveURL(/\/reports|#reports/);
  24 |   });
  25 | 
  26 |   test('toggles mobile menu dropdown when hamburger icon is clicked', async ({ page, isMobile }) => {
  27 |     // Set viewport to mobile size if not already mobile
  28 |     await page.setViewportSize({ width: 375, height: 667 });
  29 | 
  30 |     const mobileMenuBtn = page.getByRole('button', { name: /Toggle Mobile Menu/i });
  31 |     await mobileMenuBtn.click();
  32 | 
  33 |     // Verify language/settings dropdown or menu links are visible inside mobile menu
  34 |     const languageSelects = page.getByRole('combobox');
  35 |     await expect(languageSelects.first()).toBeVisible();
  36 |   });
  37 | });
  38 | 
```
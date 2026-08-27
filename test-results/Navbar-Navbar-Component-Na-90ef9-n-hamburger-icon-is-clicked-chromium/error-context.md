# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Navbar.spec.ts >> Navbar Component & Navigation >> toggles mobile menu dropdown when hamburger icon is clicked
- Location: tests\Navbar.spec.ts:26:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Toggle Mobile Menu/i })

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
  3  | test.describe('Navbar Component & Navigation', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Load the application
  6  |     await page.goto('/');
  7  |   });
  8  | 
  9  |   test('renders brand title, navigation items, and user profile name', async ({ page }) => {
  10 |     // Verify brand title and main navigation landmark
  11 |     await expect(page.getByText(/FinMate/i)).toBeVisible();
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
> 31 |     await mobileMenuBtn.click();
     |                         ^ Error: locator.click: Test timeout of 30000ms exceeded.
  32 | 
  33 |     // Verify language/settings dropdown or menu links are visible inside mobile menu
  34 |     const languageSelects = page.getByRole('combobox');
  35 |     await expect(languageSelects.first()).toBeVisible();
  36 |   });
  37 | });
  38 | 
```
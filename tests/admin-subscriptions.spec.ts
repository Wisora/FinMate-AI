import { test, expect } from '@playwright/test';

const mockSubscriptions = [
  {
    id: 1,
    plan: 'Pro',
    status: 'Active',
    amount: 29.99,
    payment_method: 'Credit Card',
    user: { email: 'alex@example.com' },
  },
  {
    id: 2,
    plan: 'Free',
    status: 'Inactive',
    amount: 0,
    payment_method: 'N/A',
    user: { email: 'sam@example.com' },
  },
];

test.describe('Subscriptions Admin Page', () => {
  const ROUTE = '/admin-subscriptions';

  test('displays fallback message when no subscriptions exist', async ({ page }) => {
    await page.route('**/api/subscriptions*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.goto(ROUTE, { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('No subscriptions found.')).toBeVisible();
  });

  test('fetches and renders subscription records in a table', async ({ page }) => {
    await page.route('**/api/subscriptions*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockSubscriptions),
      });
    });

    await page.goto(ROUTE, { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('Subscriptions')).toBeVisible();
    await expect(page.getByText('User Email')).toBeVisible();
    await expect(page.getByText('Payment Method')).toBeVisible();

    await expect(page.getByText('alex@example.com')).toBeVisible();
    await expect(page.getByText('Pro')).toBeVisible();
    await expect(page.getByText('$29.99')).toBeVisible();

    await expect(page.getByText('sam@example.com')).toBeVisible();
    await expect(page.getByText('Inactive')).toBeVisible();
  });
});
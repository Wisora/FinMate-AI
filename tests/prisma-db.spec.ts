import { test, expect } from '@playwright/test';

test.describe('Database & Server Health Suite', () => {
  test('verifies application server is reachable', async ({ request }) => {
    const response = await request.get('/');
    expect(response.status()).toBe(200);
  });
});
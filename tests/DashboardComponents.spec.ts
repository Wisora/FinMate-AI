import { test, expect } from '@playwright/test';

test.describe('Dashboard UI Components', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Dashboard page before each test
    await page.goto('/dashboard');
  });

  test('renders GoalCard with expected goal content', async ({ page }) => {
    // Verify goal card section or specific goal text is visible
    const goalText = page.getByText(/save money/i);
    await expect(goalText).toBeVisible();
  });

  test('renders ReportCard with report type', async ({ page }) => {
    // Verify report card content is visible
    const reportText = page.getByText(/weekly report/i);
    await expect(reportText).toBeVisible();
  });

  test('renders RecommendationCard with recommendation text', async ({ page }) => {
    // Verify recommendation card text is visible
    const recommendationText = page.getByText(/cut down on dining out/i);
    await expect(recommendationText).toBeVisible();
  });

  test('renders AssistantChat with interactive input box', async ({ page }) => {
    // Locate the chat input box by role or placeholder
    const chatInput = page.getByRole('textbox');
    await expect(chatInput).toBeVisible();
  });
});

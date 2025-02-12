import { test, expect } from '@playwright/test';

test('Home page loads correctly', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  const titleStartingText = 'Track your subscriptions effortlessly with';

  await expect(page.getByText(titleStartingText)).toBeVisible();
  const title = page.getByText(titleStartingText);
  await expect(title).toContainText('SubControl');
});

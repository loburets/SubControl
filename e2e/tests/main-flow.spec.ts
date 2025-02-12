import { test, expect } from '@playwright/test';

test('Main flow smoke test', async ({ page }) => {
  // Open landing page
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  // Check that the title is correct
  const titleStartingText = 'Track your subscriptions effortlessly with';
  await expect(page.getByText(titleStartingText)).toBeVisible();
  const title = page.getByText(titleStartingText);
  await expect(title).toContainText('SubControl');

  // Check some other elements
  await expect(
    page.locator(
      'text=SubControl is free to use with no hidden fees. You can even contribute or check the code yourself.'
    )
  ).toBeVisible();
  await expect(
    page.locator('img[alt="Upcoming payments dashboard"]')
  ).toBeVisible();

  // Click sign up button and go to the main app
  const signUpButtonSelector = "text=Sign up – it's quick & easy!";
  await expect(page.locator(signUpButtonSelector)).toBeVisible();
  await page.click(signUpButtonSelector);
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('h3:has-text("Sign Up")')).toBeVisible();
});

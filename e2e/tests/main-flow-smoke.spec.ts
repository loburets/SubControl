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

  // Fill in the sign-up form
  await page.fill(
    'input[placeholder="Enter your email"]',
    `test-${Date.now()}-e2e-playwright@example.com`
  );
  await page.fill('input[placeholder="Enter your password"]', 'password123');

  // Submit the form
  await page.click('button:has-text("Sign Up")');

  // Wait for navigation to the home page after successful sign-up
  await expect(
    page.locator(
      'text=No subscriptions found. Add your first subscription to get started.'
    )
  ).toBeVisible();

  // Create Subscription
  await page.click('button:has-text("Create new")');
  await expect(
    page.locator('h2:has-text("Create Subscription")')
  ).toBeVisible();

  // Fill in the subscription form
  await page.click('text=Weekly');
  await page.fill(
    'input[placeholder="Netflix, Spotify, etc."]',
    'Test subscription title'
  );
  await page.fill('input[placeholder="9.99"]', '19.92');
  // Click the dropdown trigger to open the currency selection menu
  await page.click('.ant-select-selector');
  // Wait for the dropdown menu to appear
  await page.waitForSelector('.ant-select-dropdown:visible');
  // Click the CAD option
  await page.click('.ant-select-item[title="CAD"]');

  // Submit the form
  await page.click('button:has-text("Create")');

  // Wait for navigation to the home page after successful subscription creation
  await expect(page.locator('h1:has-text("Your subscriptions")')).toBeVisible();

  // expect the subscription to appear in the list
  await expect(
    page.locator('h4:has-text("Test subscription title")')
  ).toBeVisible();
  // monthly price
  await expect(page.getByText('C$86.56')).toBeVisible();
  // yearly price
  await expect(page.getByText('C$1035.84')).toBeVisible();
  await expect(page.getByText('Weekly')).toBeVisible();
  await expect(page.getByText('Total spent: C$19.92')).toBeVisible();
});

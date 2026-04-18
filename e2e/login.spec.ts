import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should login successfully', async ({ page }) => {
    // Go to the login page
    await page.goto('/login');

    // Fill in the login form
    await page.getByLabel('Email Address').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');

    // Click the login button
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify navigation to dashboard/home
    await expect(page).toHaveURL('/');
    
    // Check for some text that indicates we're logged in
    // Since it's a mock login for now, we just expect to be on home
  });

  test('should show registration link', async ({ page }) => {
    await page.goto('/login');
    const registerLink = page.getByRole('link', { name: 'Sign up' });
    await expect(registerLink).toBeVisible();
    await expect(registerLink).toHaveAttribute('href', '/register');
  });
});

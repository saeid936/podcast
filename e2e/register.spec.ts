import { test, expect } from '@playwright/test';

test.describe('Registration', () => {
  test('should register a new user successfully', async ({ page }) => {
    await page.goto('/register');

    // Fill in the registration form
    await page.getByLabel('Email Address').fill('newuser@example.com');
    await page.getByLabel('Password').fill('newpassword123');

    // Click the sign up button
    await page.getByRole('button', { name: 'Sign Up' }).click();

    // Verify navigation to dashboard/home
    await expect(page).toHaveURL('/');
    
    // Check if the avatar with the first letter is present in the header
    const avatar = page.locator('.MuiAvatar-root');
    await expect(avatar).toBeVisible();
    await expect(avatar).toHaveText('N');
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/register');
    const loginLink = page.getByRole('link', { name: 'Sign in' });
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toHaveAttribute('href', '/login');
  });
});

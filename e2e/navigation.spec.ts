import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Login as a CREATOR (default in Login.tsx mock)
    await page.goto('/login');
    await page.getByLabel('Email Address').fill('creator@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL('/');
  });

  test('should navigate to Discover page', async ({ page }) => {
    await page.getByRole('button', { name: 'Discover' }).click();
    await expect(page).toHaveURL('/discover');
    await expect(page.getByText('Browse all')).toBeVisible();
  });

  test('should navigate to Library page', async ({ page }) => {
    await page.getByRole('button', { name: 'Library' }).click();
    await expect(page).toHaveURL('/library');
    await expect(page.getByText('Your Library')).toBeVisible();
  });

  test('should navigate to Upload page', async ({ page }) => {
    await page.getByRole('button', { name: 'Upload' }).click();
    await expect(page).toHaveURL('/upload');
    await expect(page.getByText('Upload Media')).toBeVisible();
  });

  test('should navigate back to Home', async ({ page }) => {
    await page.goto('/library');
    await page.getByRole('button', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
  });
});

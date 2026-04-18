import { test, expect } from '@playwright/test';

test.describe('Role Based Access Control', () => {
  test('Guest (not logged in) should have limited access', async ({ page }) => {
    await page.goto('/');
    // Should see home content
    await expect(page.getByText('Good Morning')).toBeVisible();
    
    // Sidebar should NOT show Upload or Admin
    await expect(page.getByRole('button', { name: 'Upload' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Admin' })).not.toBeVisible();

    // Header should show Sign In
    await expect(page.getByText('Sign In')).toBeVisible();
  });

  test('Creator should see Upload but not Admin', async ({ page }) => {
    // Login as creator
    await page.goto('/login');
    await page.getByLabel('Email Address').fill('creator@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL('/');

    // Sidebar should show Upload but NOT Admin
    await expect(page.getByRole('button', { name: 'Upload' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Admin' })).not.toBeVisible();
  });

  test('Admin should see both Upload and Admin', async ({ page }) => {
    // Login as admin
    await page.goto('/login');
    await page.getByLabel('Email Address').fill('admin@audiostream.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL('/');

    // Sidebar should show both
    await expect(page.getByRole('button', { name: 'Upload' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Admin' })).toBeVisible();

    // Navigate to Admin page
    await page.getByRole('button', { name: 'Admin' }).click();
    await expect(page).toHaveURL('/admin');
    await expect(page.getByText('Admin Dashboard')).toBeVisible();
    await expect(page.getByText('User Management')).toBeVisible();
    await expect(page.getByText('admin@audiostream.com')).toBeVisible();
  });

  test('Listener should not see Upload or Admin', async ({ page }) => {
    // Login as listener
    await page.goto('/login');
    await page.getByLabel('Email Address').fill('listener@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL('/');

    // Sidebar should NOT show Upload or Admin
    await expect(page.getByRole('button', { name: 'Upload' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Admin' })).not.toBeVisible();
  });
});

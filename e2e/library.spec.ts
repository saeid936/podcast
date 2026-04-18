import { test, expect } from '@playwright/test';

test.describe('Library Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.getByLabel('Email Address').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL('/');
    
    // Navigate to Library
    await page.getByRole('button', { name: 'Library' }).click();
    await expect(page).toHaveURL('/library');
  });

  test('should display mock library items', async ({ page }) => {
    await expect(page.getByText('My Awesome Playlist')).toBeVisible();
    await expect(page.getByText('Late Night Jazz')).toBeVisible();
    await expect(page.getByText('Morning Coffee')).toBeVisible();
    await expect(page.getByText('Workout Mix')).toBeVisible();
  });

  test('should navigate to playlist detail', async ({ page }) => {
    await page.getByText('My Awesome Playlist').click();
    // The ID for 'My Awesome Playlist' is 'l1'
    await expect(page).toHaveURL(/\/playlist\/l1/);
    await expect(page.getByText('Today\'s Top Hits')).toBeVisible();
  });

  test('should play a playlist from the library', async ({ page }) => {
    const playlistItem = page.locator('li').filter({ hasText: 'My Awesome Playlist' });
    await playlistItem.hover();

    const playButton = playlistItem.locator('.play-btn');
    await playButton.click();

    // Player should show the playlist title
    // Using a more specific selector for the player to avoid strict mode violation
    const player = page.locator('.MuiBox-root').filter({ hasText: 'My Awesome Playlist' }).last();
    await expect(player).toBeVisible();
  });
});

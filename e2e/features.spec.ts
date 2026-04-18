import { test, expect } from '@playwright/test';

test.describe('Dashboard Features', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.getByLabel('Email Address').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL('/');
  });

  test('should filter podcasts via search', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search podcasts...');
    await expect(searchInput).toBeVisible();

    // Type a search query
    await searchInput.fill('Tech');

    // Check if only "The Tech Daily" (from MOCK_PODCASTS) is visible or at least filtered
    const techPodcast = page.getByText('The Tech Daily');
    await expect(techPodcast).toBeVisible();

    const nonMatchingPodcast = page.getByText('Mindful Moments');
    await expect(nonMatchingPodcast).not.toBeVisible();
  });

  test('should toggle like on current track', async ({ page }) => {
    // We need to click the play button on the 'The Tech Daily' card
    const podcastCard = page.locator('.MuiCard-root').filter({ hasText: 'The Tech Daily' });
    await podcastCard.hover(); // Hover to reveal the play button
    const playButton = podcastCard.locator('.play-button');
    await playButton.click();
    
    // Check for the player (GlobalPlayer)
    // The GlobalPlayer component shows up when currentTrack is set.
    // It contains the track title.
    const player = page.locator('footer, .MuiBox-root').filter({ hasText: 'The Tech Daily' });
    
    // Find the like button (it uses FavoriteBorderIcon initially)
    const likeButton = page.getByRole('button').filter({ has: page.locator('svg[data-testid="FavoriteBorderIcon"]') });
    await expect(likeButton).toBeVisible();

    // Click to like
    await likeButton.click();

    // Check if it changed to FavoriteIcon (filled)
    const likedButton = page.getByRole('button').filter({ has: page.locator('svg[data-testid="FavoriteIcon"]') });
    await expect(likedButton).toBeVisible();
  });
});

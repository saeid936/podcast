import { test, expect } from '@playwright/test';

test.describe('Playback Controls', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.getByLabel('Email Address').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL('/');
  });

  test('should play and pause a track from the dashboard', async ({ page }) => {
    // Hover over a podcast card to reveal play button
    const podcastCard = page.locator('.MuiCard-root').filter({ hasText: 'The Tech Daily' });
    await podcastCard.hover();
    
    const playButton = podcastCard.locator('.play-button');
    await playButton.click();

    // Player should appear
    const player = page.locator('.MuiBox-root').filter({ hasText: 'The Tech Daily' }).last();
    await expect(player).toBeVisible();

    // Check if it's playing (Pause icon should be visible)
    const pauseButton = page.locator('button').filter({ has: page.locator('svg[data-testid="PauseIcon"]') });
    await expect(pauseButton).toBeVisible();

    // Pause it
    await pauseButton.click();

    // Play icon should return
    const resumeButton = page.locator('button').filter({ has: page.locator('svg[data-testid="PlayArrowIcon"]') }).last();
    await expect(resumeButton).toBeVisible();
  });

  test('should seek through the track', async ({ page }) => {
    // Start playback
    const podcastCard = page.locator('.MuiCard-root').filter({ hasText: 'The Tech Daily' });
    await podcastCard.hover();
    await podcastCard.locator('.play-button').click();

    // Find the progress slider
    const slider = page.locator('.MuiSlider-root').first();
    await expect(slider).toBeVisible();

    // Get current progress text
    const initialTime = await page.getByTestId('progress-time').innerText();
    
    // Seek forward - we can click on the slider
    const box = await slider.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }

    // Check if time changed
    const newTime = await page.getByTestId('progress-time').innerText();
    expect(newTime).not.toBe(initialTime);
  });
});

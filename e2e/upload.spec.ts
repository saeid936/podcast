import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('Upload and Play Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as a CREATOR
    await page.goto('/login');
    await page.getByLabel('Email Address').fill('creator@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL('/');
  });

  test('should upload an mp3 and fast play it from dashboard', async ({ page }) => {
    // Navigate to Upload page
    await page.getByRole('button', { name: 'Upload' }).click();
    await expect(page).toHaveURL('/upload');

    const trackTitle = 'My Fast Play Track ' + Date.now();
    await page.getByLabel('Track / Episode Title').fill(trackTitle);

    // Prepare a mock audio file
    const filePath = path.join(__dirname, 'test-audio.mp3');
    fs.writeFileSync(filePath, 'mock audio content');

    // Upload the file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);

    // Handle the alert
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    // Click Publish button
    await page.getByRole('button', { name: 'Publish Track' }).click();

    // Should be redirected to Dashboard
    await expect(page).toHaveURL('/');

    // Wait for the new track to appear (Dashboard has a 1s delay for loading state)
    const newTrackCard = page.locator('.MuiCard-root').filter({ hasText: trackTitle });
    await expect(newTrackCard).toBeVisible({ timeout: 10000 });

    // Test Fast Play: Hover and click play button on the card
    await newTrackCard.hover();
    const playButton = newTrackCard.locator('.play-button');
    await playButton.click();

    // Verify player is showing the new track
    const player = page.locator('.MuiBox-root').filter({ hasText: trackTitle }).last();
    await expect(player).toBeVisible();
    
    // Check for pause icon to ensure it's "playing"
    await expect(page.locator('svg[data-testid="PauseIcon"]')).toBeVisible();

    // Clean up
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  });
});

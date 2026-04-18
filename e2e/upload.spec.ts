import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('Upload Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Login as a CREATOR
    await page.goto('/login');
    await page.getByLabel('Email Address').fill('creator@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL('/');
    
    // Navigate to Upload page
    await page.getByRole('button', { name: 'Upload' }).click();
    await expect(page).toHaveURL('/upload');
  });

  test('should upload a file successfully', async ({ page }) => {
    // Fill in title
    await page.getByLabel('Track / Episode Title').fill('My New Podcast Episode');

    // Prepare a mock audio file
    const filePath = path.join(__dirname, 'test-audio.mp3');
    fs.writeFileSync(filePath, 'mock audio content');

    // Upload the file
    // The input is hidden, so we use the fileChooser or just setInputFiles on the hidden input
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);

    // Check if file name is displayed
    await expect(page.getByText('test-audio.mp3')).toBeVisible();

    // Click Publish button
    const publishButton = page.getByRole('button', { name: 'Publish Track' });
    await expect(publishButton).toBeEnabled();

    // Handle the alert that appears on success
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Upload successful');
      await dialog.accept();
    });

    await publishButton.click();

    // After upload, title should be cleared and button disabled
    await expect(page.getByLabel('Track / Episode Title')).toHaveValue('');
    await expect(publishButton).toBeDisabled();

    // Clean up mock file
    fs.unlinkSync(filePath);
  });
});

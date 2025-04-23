import { test, expect } from '@playwright/test';

test('Sending Email', async ({ page }) => {
  await page.goto('http://localhost:3009/send-email');
  await expect(page).toHaveTitle(/Send Email/);

  // Fill in text fields
  await page.fill('input[name="to"]', 'benes.jiri@yahoo.co.uk');
  await page.fill('input[name="subject"]', 'Testing email from localhost');
  await page.fill('textarea[name="text"]', 'This is a test message from Playwright automated testing.');

  await page.screenshot({ path: 'before-submit.png' });

  await page.click('button[type="submit"]');

  await page.screenshot({ path: 'after-submit.png' });
});
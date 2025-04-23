import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3009/');
  await expect(page).toHaveTitle(/Jiri Beneš | Full - Stack JavaScript Developer/);
});
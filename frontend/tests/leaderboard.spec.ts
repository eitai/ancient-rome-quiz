import { test, expect } from '@playwright/test';

test('clicking Leaderboard opens leaderboard and Back returns to start screen', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Leaderboard' }).click();
  await expect(page.getByRole('heading', { name: 'Leaderboard' })).toBeVisible();

  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByRole('button', { name: 'Start Quiz' })).toBeVisible();
});

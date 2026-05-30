import { test, expect } from '@playwright/test';

test('shows the page title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Ancient Rome Quiz');
});

test('shows the Start Quiz and Leaderboard buttons', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Start Quiz' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Leaderboard' })).toBeVisible();
});

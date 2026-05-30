import { test, expect } from '@playwright/test';
import { MOCK_QUESTIONS } from './fixtures/questions';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/questions', (route) => route.fulfill({ json: MOCK_QUESTIONS }));
  await page.goto('/?duration=3');
  await page.getByRole('button', { name: 'Start Quiz' }).click();

  await page.getByRole('button', { name: 'Augustus' }).click();
  await page.getByRole('button', { name: '753 BC' }).click();
  await page.getByRole('button', { name: 'The Colosseum' }).click();
  await page.getByRole('button', { name: 'Latin' }).click();
  await page.getByRole('button', { name: 'Julius Caesar' }).click();
});

test('saving score to leaderboard shows confirmation', async ({ page }) => {
  await page.getByRole('button', { name: 'Add to Leaderboard' }).click();
  await page.getByPlaceholder('Enter your name').fill('eitai');
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('Score saved!')).toBeVisible();
});

test('clicking Play Again returns to start screen', async ({ page }) => {
  await page.getByRole('button', { name: 'Play Again' }).click();

  await expect(page.getByRole('button', { name: 'Start Quiz' })).toBeVisible();
});

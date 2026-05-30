import { test, expect } from '@playwright/test';
import { MOCK_QUESTIONS } from './fixtures/questions';

const CORRECT_ANSWER_CLASS = /emerald/;
const WRONG_ANSWER_CLASS = /red/;
const REVEAL_TIMEOUT = { timeout: 6000 };

test.beforeEach(async ({ page }) => {
  await page.route('**/api/questions', (route) => route.fulfill({ json: MOCK_QUESTIONS }));
  await page.goto('/?duration=3');
  await page.getByRole('button', { name: 'Start Quiz' }).click();
});

test('hint appears when time is running low', async ({ page }) => {
  await expect(page.getByText(MOCK_QUESTIONS[0].hint)).toBeVisible({ timeout: 5000 });
});

test('timer expiry auto-advances to the next question', async ({ page }) => {
  await expect(page.getByText('Question 1 of 5')).toBeVisible();
  await expect(page.getByText('Question 2 of 5')).toBeVisible({ timeout: 6000 });
});

test('correct answer turns green and wrong answer turns red after timer expires', async ({ page }) => {
  const wrongAnswer = page.getByRole('button', { name: 'Julius Caesar' });
  await wrongAnswer.click();

  await expect(page.getByRole('button', { name: 'Augustus' })).toHaveClass(CORRECT_ANSWER_CLASS, REVEAL_TIMEOUT);
  await expect(wrongAnswer).toHaveClass(WRONG_ANSWER_CLASS, REVEAL_TIMEOUT);
});

test('correct answer turns green when timer expires with no answer selected', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Augustus' })).toHaveClass(CORRECT_ANSWER_CLASS, REVEAL_TIMEOUT);
  await expect(page.getByRole('button', { name: 'Julius Caesar' })).not.toHaveClass(WRONG_ANSWER_CLASS);
  await expect(page.getByRole('button', { name: 'Nero' })).not.toHaveClass(WRONG_ANSWER_CLASS);
  await expect(page.getByRole('button', { name: 'Caligula' })).not.toHaveClass(WRONG_ANSWER_CLASS);
});

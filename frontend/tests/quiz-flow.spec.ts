import { test, expect } from '@playwright/test';
import { MOCK_QUESTIONS } from './fixtures/questions';

const CORRECT_ANSWER_CLASS = /emerald/;
const WRONG_ANSWER_CLASS = /red/;
const REVEAL_TIMEOUT = { timeout: 5000 };

test.beforeEach(async ({ page }) => {
  await page.route('**/api/questions', (route) => route.fulfill({ json: MOCK_QUESTIONS }));
  await page.goto('/?duration=3');
  await page.getByRole('button', { name: 'Start Quiz' }).click();
});

test('all 5 correct answers shows score 5 / 5', async ({ page }) => {
  await expect(page.getByText('Question 1 of 5')).toBeVisible();
  const augustusButton = page.getByRole('button', { name: 'Augustus' });
  await augustusButton.click();
  await expect(augustusButton).toHaveClass(CORRECT_ANSWER_CLASS, REVEAL_TIMEOUT);

  await expect(page.getByText('Question 2 of 5')).toBeVisible();
  const century = page.getByRole('button', { name: '753 BC' });
  await century.click();
  await expect(century).toHaveClass(CORRECT_ANSWER_CLASS, REVEAL_TIMEOUT);

  await expect(page.getByText('Question 3 of 5')).toBeVisible();
  const colosseum = page.getByRole('button', { name: 'The Colosseum' });
  await colosseum.click();
  await expect(colosseum).toHaveClass(CORRECT_ANSWER_CLASS, REVEAL_TIMEOUT);

  await expect(page.getByText('Question 4 of 5')).toBeVisible();
  const latin = page.getByRole('button', { name: 'Latin' });
  await latin.click();
  await expect(latin).toHaveClass(CORRECT_ANSWER_CLASS, REVEAL_TIMEOUT);

  await expect(page.getByText('Question 5 of 5')).toBeVisible();
  const juliusCaesar = page.getByRole('button', { name: 'Julius Caesar' });
  await juliusCaesar.click();
  await expect(juliusCaesar).toHaveClass(CORRECT_ANSWER_CLASS, REVEAL_TIMEOUT);

  await expect(page.getByText('5 / 5')).toBeVisible();
});

test('3 correct and 2 wrong answers shows score 3 / 5', async ({ page }) => {
  const augustusButton = page.getByRole('button', { name: 'Augustus' });
  await augustusButton.click();
  await expect(augustusButton).toHaveClass(CORRECT_ANSWER_CLASS, REVEAL_TIMEOUT);

  const century = page.getByRole('button', { name: '753 BC' });
  await century.click();
  await expect(century).toHaveClass(CORRECT_ANSWER_CLASS, REVEAL_TIMEOUT);

  const colosseum = page.getByRole('button', { name: 'The Colosseum' });
  await colosseum.click();
  await expect(colosseum).toHaveClass(CORRECT_ANSWER_CLASS, REVEAL_TIMEOUT);

  const greek = page.getByRole('button', { name: 'Greek' });
  await greek.click();
  await expect(greek).toHaveClass(WRONG_ANSWER_CLASS, REVEAL_TIMEOUT);

  const pompey = page.getByRole('button', { name: 'Pompey' });
  await pompey.click();
  await expect(pompey).toHaveClass(WRONG_ANSWER_CLASS, REVEAL_TIMEOUT);

  await expect(page.getByText('3 / 5')).toBeVisible();
});

test('changing answer from wrong to correct marks correct answer green', async ({ page }) => {
  const wrongAnswer = page.getByRole('button', { name: 'Julius Caesar' });
  await wrongAnswer.click();

  const correctAnswer = page.getByRole('button', { name: 'Augustus' });
  await correctAnswer.click();

  await expect(correctAnswer).toHaveClass(CORRECT_ANSWER_CLASS, REVEAL_TIMEOUT);
  await expect(wrongAnswer).not.toHaveClass(CORRECT_ANSWER_CLASS);
});

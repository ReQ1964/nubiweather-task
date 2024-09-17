import { test, expect } from '@playwright/test';
import MockDate from 'mockdate';

test.describe('Main App', () => {
  test.beforeEach(async ({ page }) => {
    MockDate.set('2024-08-08');
    await page.goto('http://localhost:5173/');
  });

  test('should have correct data displayed', async ({ page }) => {
    await expect(page).toHaveTitle('NubiWeather');
    await expect(page.getByText('Gliwice')).toBeVisible();
  });

  test('should display suggestions', async ({ page }) => {
    const input = page.getByRole('textbox');
    await expect(input).toBeVisible();

    await input.fill('Kat');
    await expect(page.getByText('Katowice')).toBeVisible();
  });

  test('should change the city when clicked on suggestion', async ({
    page,
  }) => {
    const input = page.getByRole('textbox');
    await expect(input).toBeVisible();

    await input.fill('Kat');
    await expect(page.getByText('Katowice')).toBeVisible();
    await page.getByText('Katowice').click();

    await expect(page.getByText('Katowice, Poland')).toBeVisible();
  });

  test('should change the city when clicked enter', async ({ page }) => {
    const input = page.getByRole('textbox');
    await expect(input).toBeVisible();

    await input.fill('Katowice');
    await page.keyboard.press('Enter');

    await expect(page.getByText('Katowice, Poland')).toBeVisible();
  });
});

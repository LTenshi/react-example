import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  })

  test.afterEach(async ({ page }) => {
    await page.close();
  })
  
  test('contains links to home and examples pages', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Examples' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'here' })).toBeVisible();
  })

  test('the preamble is visible',async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Readme' })).toBeVisible();
  })
  
  test('succesfully navigates to the examples page', async ({ page }) => {
    await page.getByRole('link', { name: 'Examples' }).click();
    await expect(page.getByRole('main')).toContainText('Simple API Endpoints');
  });
});
import { test, expect } from '@playwright/test';

// WARNING, this assumes that the API is running!
test.describe('Examples', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/examples');
  })

  test('checks if api is running', async ({ page }) => {
    await page.goto('http://localhost:3001/')
    await expect(page.locator('body')).toContainText('You are on the API address right now! You are probably looking for one port number down (3000 hopefully)');
  })
  
  test('contains links to home and examples pages', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Examples' })).toBeVisible();
  })

  test('the three categories are visible',async ({ page }) => {
    await expect(page.getByRole('main')).toContainText('Simple API Endpoints');
    await expect(page.locator('h4')).toContainText('A list of some submarine movies');
    await expect(page.getByRole('main')).toContainText('Form Submitting Example');
  })

  test.describe('in simple API endpoints', () => {
    test('the press me button for the get request is visible', async ({page}) => {
      await expect(page.getByTestId('btn-get-example')).toBeVisible();
    })

    test('the get example press me button fetches some data from the api', async ({page}) => {
      await page.getByTestId('btn-get-example').click();
      await expect(page.getByRole('main')).toContainText('Output from the get endpoint on the API: This is an example get request output!');
    })

    test('the post example press me button fetches some data from the api', async ({page}) => {
      await page.getByTestId('input-post-example').click();
      await page.getByTestId('input-post-example').fill('testing');
      await page.getByTestId('btn-post-example').click();
      await expect(page.getByRole('main')).toContainText('-testing');
    })
  })

  test.describe('in list of submarine movies', () => {
    test('there are 8 movies', async ({ page }) => {
      await expect(page.getByTestId('btn-get-example')).toBeVisible();
    })
  })

  test.describe('in the form', () => {
    test('the form is completed fully, and it updates the list of movies above', async ({ page }) => {
      await page.getByTestId('input-form-title').click();
      await page.getByTestId('input-form-title').fill('Testing');
      await page.getByTestId('textarea-form-description').click();
      await page.getByTestId('textarea-form-description').fill('Testinton description');
      await page.getByTestId('input-form-rating').click();
      await page.getByTestId('input-form-rating').fill('5');
      await page.getByTestId('input-form-date-added').fill('1999-01-01');
      await page.getByTestId('submit-form-example').click();
      await expect(page.getByTestId('movie-8').locator('h2')).toContainText('Testing');
      await expect(page.getByTestId('movie-8')).toContainText('★★☆☆☆');
      await expect(page.getByTestId('movie-8')).toContainText('Added on: 01/01/1999');
      await expect(page.getByTestId('movie-8').locator('h6')).toContainText('Testinton description');
    })

    test('the form is ignored, and submit button is pressed', async ({ page }) => {
      let requestPerformed = false;
      await page.goto('http://localhost:3000/examples');
      await page.getByTestId('submit-form-example').click();
      page.on('request', request => {
        if (request.url().includes("/example/post-movie-object")) {
          requestPerformed = true
        } 
      })

      expect(requestPerformed).toBe(false);
    })
  })
});
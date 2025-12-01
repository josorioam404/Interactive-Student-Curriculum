import { Given, When, Then } from '@cucumber/cucumber';
import { Page, Browser, chromium } from 'playwright';
import { expect } from '@playwright/test';

let browser: Browser;
let page: Page;

Given('the curriculum system is running', async function () {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
});

Given('a student account exists with email {string} and password {string}', async function (email: string, password: string) {
  // Setup test data - could call API to create test user
  this.testUser = { email, password };
});

Given('I am on the login page', async function () {
  await page.goto('http://localhost:3000/login');
  await expect(page.locator('h1')).toContainText('Iniciar Sesión');
});

When('I enter email {string}', async function (email: string) {
  await page.fill('[data-testid="email-input"]', email);
});

When('I enter password {string}', async function (password: string) {
  await page.fill('[data-testid="password-input"]', password);
});

When('I click the login button', async function () {
  await page.click('[data-testid="login-button"]');
});

When('I click the login button without entering credentials', async function () {
  await page.click('[data-testid="login-button"]');
});

Then('I should be redirected to the dashboard', async function () {
  await page.waitForURL('**/dashboard');
  expect(page.url()).toContain('/dashboard');
});

Then('I should see my curriculum grid', async function () {
  await expect(page.locator('[data-testid="curriculum-grid"]')).toBeVisible();
});

Then('I should see an error message {string}', async function (errorMessage: string) {
  await expect(page.locator('[data-testid="error-message"]')).toContainText(errorMessage);
});

Then('I should remain on the login page', async function () {
  expect(page.url()).toContain('/login');
});

Then('I should see validation errors', async function () {
  await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
  await expect(page.locator('[data-testid="password-error"]')).toBeVisible();
});

Then('the login button should be disabled', async function () {
  await expect(page.locator('[data-testid="login-button"]')).toBeDisabled();
});

// Cleanup
After(async function () {
  if (page) await page.close();
  if (browser) await browser.close();
});
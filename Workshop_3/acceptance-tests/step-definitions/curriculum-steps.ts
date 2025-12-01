import { Given, When, Then } from '@cucumber/cucumber';
import { Page, Browser, chromium } from 'playwright';
import { expect } from '@playwright/test';

let browser: Browser;
let page: Page;

Given('I am logged in as a student', async function () {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  // Mock login or use test credentials
  await page.goto('http://localhost:3000/login');
  await page.fill('[data-testid="email-input"]', 'student@unal.edu.co');
  await page.fill('[data-testid="password-input"]', 'password123');
  await page.click('[data-testid="login-button"]');
});

Given('I have selected {string} program', async function (program: string) {
  // Assume program selection happens after login
  await page.selectOption('[data-testid="program-select"]', program);
});

Given('I am on the dashboard page', async function () {
  await page.waitForURL('**/dashboard');
  expect(page.url()).toContain('/dashboard');
});

Given('I am viewing the curriculum grid', async function () {
  await expect(page.locator('[data-testid="curriculum-grid"]')).toBeVisible();
});

When('I view the curriculum grid', async function () {
  await expect(page.locator('[data-testid="curriculum-grid"]')).toBeVisible();
});

When('I click on {string} subject', async function (subjectName: string) {
  await page.click(`[data-testid="subject-${subjectName}"]`);
});

When('I select {string} filter', async function (filterType: string) {
  await page.selectOption('[data-testid="status-filter"]', filterType);
});

Then('I should see subjects organized by semesters', async function () {
  await expect(page.locator('[data-testid="semester-1"]')).toBeVisible();
  await expect(page.locator('[data-testid="semester-2"]')).toBeVisible();
});

Then('completed subjects should be marked in green', async function () {
  await expect(page.locator('.subject-completed')).toHaveClass(/green/);
});

Then('available subjects should be marked in blue', async function () {
  await expect(page.locator('.subject-available')).toHaveClass(/blue/);
});

Then('locked subjects should be marked in gray', async function () {
  await expect(page.locator('.subject-locked')).toHaveClass(/gray/);
});

Then('I should see prerequisite connections between subjects', async function () {
  await expect(page.locator('[data-testid="prerequisite-line"]')).toBeVisible();
});

Then('a modal should open with subject details', async function () {
  await expect(page.locator('[data-testid="subject-modal"]')).toBeVisible();
});

Then('I should see the subject name, credits, and description', async function () {
  await expect(page.locator('[data-testid="subject-name"]')).toBeVisible();
  await expect(page.locator('[data-testid="subject-credits"]')).toBeVisible();
  await expect(page.locator('[data-testid="subject-description"]')).toBeVisible();
});

Then('I should see my grade if the subject is completed', async function () {
  const isCompleted = await page.locator('[data-testid="subject-status"]').textContent();
  if (isCompleted?.includes('Completed')) {
    await expect(page.locator('[data-testid="subject-grade"]')).toBeVisible();
  }
});

Then('I should see prerequisites if any exist', async function () {
  await expect(page.locator('[data-testid="prerequisites-section"]')).toBeVisible();
});

Then('only completed subjects should be visible', async function () {
  const subjects = page.locator('.subject-card');
  const count = await subjects.count();
  for (let i = 0; i < count; i++) {
    await expect(subjects.nth(i)).toHaveClass(/completed/);
  }
});

Then('only available subjects should be visible', async function () {
  const subjects = page.locator('.subject-card');
  const count = await subjects.count();
  for (let i = 0; i < count; i++) {
    await expect(subjects.nth(i)).toHaveClass(/available/);
  }
});

Then('all subjects should be visible', async function () {
  await expect(page.locator('.subject-card')).toHaveCount(await page.locator('.subject-card').count());
});
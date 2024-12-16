import { test, expect } from '@playwright/test';

test.describe('SignUp Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders page layout correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
  });

  test('Invalid email displays error', async ({ page }) => {
    const emailInput = page.getByPlaceholder('Type your email');

    await emailInput.fill('invalid');
    await emailInput.blur();

    await expect(page.getByText('Invalid email address')).toBeVisible();
  });

  test('Valid email displays success', async ({ page }) => {
    const emailInput = page.getByPlaceholder('Type your email');

    await emailInput.fill('asdasd@gf.com');
    await emailInput.blur();

    await expect(emailInput).toHaveClass(/border-success/);
  });

  test('Password validation rules are getting green on the go', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('Create your password');

    await passwordInput.fill('shorT');

    await expect(page.getByText('8 characters or more (no spaces)')).toHaveClass(/text-ink/);
    await expect(page.getByText('Uppercase and lowercase letters')).toHaveClass(/text-success/);
    await expect(page.getByText('At least one digit')).toHaveClass(/text-ink/);
  });

  test('Password errors are displayed on form submit', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('Create your password');

    await passwordInput.fill('shor1');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await expect(page.getByText('8 characters or more (no spaces)')).toHaveClass(/text-error/);
    await expect(page.getByText('Uppercase and lowercase letters')).toHaveClass(/text-error/);
    await expect(page.getByText('At least one digit')).toHaveClass(/text-success/);
  });

  test('Password happy pass', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('Create your password');

    await passwordInput.fill('ValidPass123');

    await expect(page.getByText('8 characters or more (no spaces)')).toHaveClass(/text-success/);
    await expect(page.getByText('Uppercase and lowercase letters')).toHaveClass(/text-success/);
    await expect(page.getByText('At least one digit')).toHaveClass(/text-success/);
  });

  test('handles form submission', async ({ page }) => {
    await page.getByPlaceholder('Type your email').fill('test@example.com');
    await page.getByPlaceholder('Create your password').fill('ValidPass123');
    await page.route('**', async route => {
      const url = route.request().url();
      if (url.includes('youtube.com')) {
        await route.fulfill({ status: 200 });
      } else {
        await route.continue();
      }
    });

    await page.getByRole('button', { name: 'Sign Up' }).click();

    await expect(page.getByRole('button', { name: 'Creating Your Account' })).toBeVisible();
    await expect(page.getByPlaceholder('Type your email')).toBeDisabled();
    await expect(page.getByPlaceholder('Create your password')).toBeDisabled();
  });
});
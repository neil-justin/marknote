import { Page } from '@playwright/test';
import 'dotenv/config';

export const loginUser = async (page: Page) => {
  await page.goto('/auth/login');

  await page
    .getByRole('textbox', { name: 'johndoe@gmail.com' })
    .fill(process.env.VITE_TEST_EMAIL as string);
  // Password field
  await page
    .getByRole('textbox', { name: '********' })
    .fill(process.env.VITE_TEST_PASSWORD as string);

  page.getByRole('button', { name: 'Log in' }).click();
};

import { Page } from '@playwright/test';

export const loginUser = async (page: Page) => {
  await page.goto('/auth/login');

  await page
    .getByRole('textbox', { name: 'johndoe@gmail.com' })
    .fill('neiljustin.mallari@proton.me');
  // Password field
  await page
    .getByRole('textbox', { name: '********' })
    .fill('!Samplepassword83');

  page.getByRole('button', { name: 'Log in' });
};

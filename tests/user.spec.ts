import test, { expect } from '@playwright/test';

// If this test failed, it could mean that the specified
// email address is already registered
test('User register successfully', async ({ page }) => {
  await page.goto('/auth/register');

  await page
    .getByRole('textbox', { name: 'johndoe@gmail.com' })
    .fill('neiljustin.mallari@proton.me');
  // Password field
  await page
    .getByRole('textbox', { name: '********' })
    .fill('!Samplepassword83');
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(
    page.getByText(
      'Verify your email to proceedWe just sent an email to the address: neiljustin.mallari@'
    )
  ).toBeVisible();
});

test.only('User logged in successfully', async ({ page }) => {
  await page.goto('/auth/register');

  await page
    .getByRole('textbox', { name: 'johndoe@gmail.com' })
    .fill('neiljustin.mallari@proton.me');
  // Password field
  await page
    .getByRole('textbox', { name: '********' })
    .fill('!Samplepassword83');

  // If Login form is hidden, that means user is redirected, hopefully
  // to /notes path or something similar
  await expect(page.getByRole('button', { name: 'Log in' })).toBeHidden();
  //getByText('Log in to your accountEmailEnter valid email addressPasswordMust be more than 8')
});

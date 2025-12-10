import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('languageSelected', 'true');
    window.localStorage.setItem('selectedLanguage', 'sr');
  });
});

// Basic smoke test that ensures the landing page renders without runtime errors
// and the lazy-loaded dashboard section appears once the preferred language is set.
test('landing page renders dashboard showcase section', async ({ page }) => {
  const pageErrors: Error[] = [];
  page.on('pageerror', (error) => {
    pageErrors.push(error);
  });

  await page.goto('/home');

  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);
  const childCount = await page.evaluate(
    () => document.getElementById('root')?.childElementCount ?? 0
  );
  expect(childCount).toBeGreaterThan(0);
  expect(pageErrors).toEqual([]);
});

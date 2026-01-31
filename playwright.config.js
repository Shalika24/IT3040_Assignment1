// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // ⏱️ Global timeout per test
  timeout: 60000,

  // ⏱️ Timeout for expect() conditions
  expect: {
    timeout: 15000
  },

  testDir: './tests',

  /* Run tests in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,

  /* Reporter to generate HTML report */
  reporter: [['html', { open: 'never' }]],

  use: {
    headless: true,
    actionTimeout: 20000,
    navigationTimeout: 30000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },

  /* Configure browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
});

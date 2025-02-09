// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  reporter: 'html',
  expect: {
    timeout: 5000
  },
  use: {
    browserName: 'webkit',
    headless: false,
    screenshot: 'on'
  }
});


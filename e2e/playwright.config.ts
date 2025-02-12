import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://subcontrol.online/',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});

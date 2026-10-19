import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  testMatch: '*.spec.ts',
  fullyParallel: false,
  workers: 1,
  outputDir: './output-tdd/playwright/tailwind-migration/tests',
  use: {
    baseURL: 'http://127.0.0.1:3002',
    viewport: { width: 375, height: 812 },
    hasTouch: true,
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium', channel: 'chromium' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
    { name: 'firefox', use: { browserName: 'firefox' } }
  ],
  webServer: {
    command:
      'node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 3002 --strictPort --open false',
    url: 'http://127.0.0.1:3002',
    reuseExistingServer: true
  }
})

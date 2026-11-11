import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/previews",
  fullyParallel: true,
  workers: 2,
  timeout: 45000,
  use: {
    baseURL: "http://127.0.0.1:3199",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev -- --port 3199",
    url: "http://127.0.0.1:3199",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});

import { test, expect } from "@playwright/test";

test("buttons, theme changes and reset work inside the documentation", async ({
  page,
}) => {
  const videos: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".mp4")) videos.push(request.url());
  });
  await page.goto("/docs/components/button");
  const phone = page.frameLocator(
    'iframe[title="button interactive component preview"]',
  );
  await expect(phone.getByText("Counter: 0", { exact: true })).toBeVisible();
  await phone.getByText("Default", { exact: true }).first().click();
  await expect(phone.getByText("Counter: 1", { exact: true })).toBeVisible();
  await expect(phone.getByText("Default", { exact: true }).first()).toHaveCSS(
    "color",
    "rgb(255, 255, 255)",
  );
  await page.getByRole("button", { name: "Use dark preview theme" }).click();
  await expect(
    phone.getByText("Current mode: dark", { exact: true }),
  ).toBeVisible();
  await expect(phone.getByText("Counter: 1", { exact: true })).toBeVisible();
  await expect(phone.getByText("Default", { exact: true }).first()).toHaveCSS(
    "color",
    "rgb(13, 13, 13)",
  );
  await page.getByRole("button", { name: "Reset preview" }).click();
  await expect(phone.getByText("Counter: 0", { exact: true })).toBeVisible();
  await expect(
    phone.getByText("Current mode: dark", { exact: true }),
  ).toBeVisible();
  expect(videos).toEqual([]);
});

test("checkboxes update their controlled state", async ({ page }) => {
  await page.goto("/previews/index.html?component=checkbox");
  await expect(page.getByText("Current status: Not accepted")).toBeVisible();
  await page.getByRole("checkbox", { name: "terms", exact: true }).click();
  await expect(page.getByText("Current status: Accepted")).toBeVisible();
});

test("text inputs accept keyboard input", async ({ page }) => {
  await page.goto("/previews/index.html?component=input");
  const input = page.getByRole("textbox").first();
  await input.fill("NativeUI on the web");
  await expect(input).toHaveValue("NativeUI on the web");
});

test("tabs switch their content", async ({ page }) => {
  await page.goto("/previews/index.html?component=tabs");
  await page.getByText("Settings", { exact: true }).first().click();
  await expect(
    page
      .getByText("Configure your application settings and preferences here.")
      .first(),
  ).toBeVisible();
});

test("the phone scales to small screens while retaining a 375 by 812 viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/docs/components/button");
  const iframe = page.locator(
    'iframe[title="button interactive component preview"]',
  );
  await expect(iframe).toBeVisible();
  const box = await iframe.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(360);
  const viewport = await iframe
    .contentFrame()
    .locator("html")
    .evaluate(() => ({ width: innerWidth, height: innerHeight }));
  expect(viewport).toEqual({ width: 375, height: 812 });
});

test("dialogs remain inside the phone and close with Escape", async ({
  page,
}) => {
  await page.goto("/docs/components/dialog");
  const phone = page.frameLocator(
    'iframe[title="dialog interactive component preview"]',
  );
  await phone.getByText("Open Dialog", { exact: true }).click();
  await expect(phone.getByRole("dialog")).toBeVisible();
  await expect(
    phone.getByText(
      "This is a basic dialog example with a title and description.",
    ),
  ).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(phone.getByRole("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Reset preview" }),
  ).toBeEnabled();
});

test("the drawer opens and can be dismissed", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/previews/index.html?component=drawer");
  await page.getByText("Open Drawer", { exact: true }).click();
  await expect(page.getByText("Drawer Example", { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByText("Drawer Example", { exact: true })).toHaveCount(
    0,
  );
});

test("calendar date and time selections update the demo", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/previews/index.html?component=calendar");
  const example = page
    .getByText("Date & Time (Default)", { exact: true })
    .locator("..");
  await example.getByText("15", { exact: true }).click();
  await example.getByText("Tap to change", { exact: true }).click();
  await example.getByLabel("Time", { exact: true }).fill("12:35");
  await expect(example.getByText(/Selected date & time:/)).toContainText(
    "12:35",
  );
});

test("disabled buttons do not change state and the demo scrolls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/previews/index.html?component=button");
  await page.getByText("Disabled", { exact: true }).click();
  await expect(page.getByText("Counter: 0", { exact: true })).toBeVisible();
  await page.getByText("Settings", { exact: true }).click();
  await expect(page.getByText("Counter: 1", { exact: true })).toBeAttached();
});

test("a failed preview can be retried", async ({ page }) => {
  await page.route("**/previews/main.js", (route) => route.abort());
  await page.goto("/docs/components/button");
  await expect(
    page.getByText("Unable to load this preview.", { exact: true }),
  ).toBeVisible({ timeout: 35000 });
  await page.unroute("**/previews/main.js");
  await page.getByRole("button", { name: "Try again" }).click();
  const phone = page.frameLocator(
    'iframe[title="button interactive component preview"]',
  );
  await expect(phone.getByText("Counter: 0", { exact: true })).toBeVisible();
});

import { test, expect } from "@playwright/test";
import { readdirSync } from "node:fs";

const components = readdirSync("registry", { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

for (const component of components) {
  test(`${component} renders its registry demo`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    // Some demos intentionally request invalid images to demonstrate fallbacks.
    page.on("console", (message) => {
      if (
        message.type() === "error" &&
        !message.text().startsWith("Failed to load resource:")
      )
        errors.push(message.text());
    });
    page.on("response", (response) => {
      if (
        response.url().startsWith("http://127.0.0.1:3199/") &&
        response.status() >= 400
      )
        errors.push(`${response.status()} ${response.url()}`);
    });
    await page.goto(`/previews/index.html?component=${component}`);
    await expect(page.locator("#root")).not.toBeEmpty();
    await expect(page.getByRole("status")).toHaveCount(0);
    await expect(
      page
        .getByRole("alert")
        .filter({ hasText: /Unable to load|No preview found/ }),
    ).toHaveCount(0);
    await expect(page.locator("#root")).toContainText(
      component === "table"
        ? "Recent Transactions"
        : new RegExp(component.split("-")[0], "i"),
    );
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() =>
      window.postMessage(
        { type: "nativeui-preview-theme", theme: "dark" },
        location.origin,
      ),
    );
    await expect(page.locator("html")).toHaveClass("dark");
    await expect(page.locator("body")).toHaveCSS(
      "background-color",
      "rgb(23, 23, 28)",
    );
    expect(errors).toEqual([]);
  });
}

test("unknown components have an explicit fallback", async ({ page }) => {
  await page.goto("/previews/index.html?component=missing");
  await expect(page.getByRole("alert")).toHaveText(
    "No preview found for this component.",
  );
});

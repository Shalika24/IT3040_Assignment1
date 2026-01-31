const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const URL = "https://www.swifttranslator.com/";

const casesPath = path.join(__dirname, "..", "data", "testcases.json");
const testCases = JSON.parse(fs.readFileSync(casesPath, "utf-8"));

const INPUT = (page) =>
  page.getByRole("textbox", { name: "Input Your Singlish Text Here." });

// Output area:
const OUTPUT = (page) =>
  page.locator(
    ".w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap"
  );

test.describe("SwiftTranslator Singlish → Sinhala (Excel cases)", () => {
  for (const tc of testCases) {
    test(`${tc.id} - ${tc.type}`, async ({ page }) => {

      await page.goto(URL, { waitUntil: "domcontentloaded" });

      await expect(INPUT(page)).toBeVisible();

      await INPUT(page).fill("");
      await INPUT(page).fill(tc.input);

      // Wait 
      await expect(OUTPUT(page)).toBeVisible();
      await expect(OUTPUT(page)).not.toHaveText("", { timeout: 15000 });

      const actual = (await OUTPUT(page).innerText()).trim();

      const normalize = (s) => s.replace(/\s+/g, " ").trim();

      expect(normalize(actual)).toBe(normalize(tc.expected));
    });
  }
});

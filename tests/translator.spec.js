const { test, expect } = require("@playwright/test");
const cases = require("../data/testcases.json");

const URL = "https://www.swifttranslator.com/";

test.describe("SwiftTranslator Singlish → Sinhala (Excel cases)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL, { waitUntil: "domcontentloaded" });
  });

  for (const tc of cases) {
    test(`${tc.id} - ${tc.type}`, async ({ page }) => {

      const input = page.getByRole("textbox", {
        name: "Input Your Singlish Text Here."
      });

      const output = page.locator(
        ".w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap"
      );

      await input.fill("");
      await input.type(tc.input, { delay: 20 });

      await page.waitForTimeout(800);

      const actual = (await output.innerText()).replace(/\s+/g, " ").trim();
      const expected = (tc.expected || "").replace(/\s+/g, " ").trim();

      if (tc.type === "Pos_Fun") {
        await expect(actual, `Mismatch in ${tc.id}`).toBe(expected);

      } else if (tc.type === "Neg_Fun") {
        // Negative passes when system output != correct expected
        await expect(actual, `Neg case did not fail: ${tc.id}`).not.toBe(expected);

      } else if (tc.type === "Pos_UI") {
        await expect(actual.length).toBeGreaterThan(0) ;

      } else if (tc.type === "Neg_UI") {
        await expect(actual, `Neg UI behaved correctly when it should not: ${tc.id}`)
        .not.toBe(expected);
      }

      else {
        throw new Error(`Unknown test type: ${tc.type}`);
      }
    });
  }
});

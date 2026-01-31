const { test, expect } = require("@playwright/test");
const cases = require("../data/testcases.json");

const URL = "https://www.swifttranslator.com/";

function clean(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}

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

      // capture output BEFORE typing
      const before = clean(await output.innerText());

      await input.fill("");
      await input.type(tc.input, { delay: 15 });

      await expect
        .poll(async () => clean(await output.innerText()), { timeout: 15000 })
        .not.toBe(before);

      const actual = clean(await output.innerText());
      const expected = clean(tc.expected);

      if (tc.type === "Pos_Fun") {
        await expect(actual, `Mismatch in ${tc.id}`).toBe(expected);

      } else if (tc.type === "Neg_Fun") {
        // Neg_Fun passes when output when not equal to expected correct output
        await expect(actual, `Neg case did not fail: ${tc.id}`).not.toBe(expected);

      } else if (tc.type === "Pos_UI") {
        await expect(actual.length, `UI output empty: ${tc.id}`).toBeGreaterThan(0);

      } else if (tc.type === "Neg_UI") {
        // Neg_UI passes when output when not equal to  expected
        await expect(actual, `Neg UI did not show the issue: ${tc.id}`).not.toBe(expected);

      } else {
        throw new Error(`Unknown type: ${tc.type}`);
      }
    });
  }
});

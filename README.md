# IT3040 Assignment 1 – Playwright Automation (JavaScript)

This repository contains automated test cases for the SwiftTranslator web application (Singlish → Sinhala) using Playwright with JavaScript.

---

## Prerequisites

Before running the project, make sure you have:

- Node.js (LTS recommended)
- npm (comes with Node.js)
- Git
- VS Code (recommended editor)

Check installation by running:

```bash
node -v
npm -v
git --version
```

---

## Install Dependencies

Clone the repository and install required packages:

```bash
npm install
npx playwright install
```

---

## Run Tests

### Run all tests (all browsers)

```bash
npx playwright test
```

---

### Run only the translator test file

```bash
npx playwright test tests/translator.spec.js
```

---

### Run tests with browser UI (headed mode)

```bash
npx playwright test tests/translator.spec.js --headed
```

---

## View HTML Report

After running tests:

```bash
npx playwright show-report
```

---

## Project Structure

- `tests/translator.spec.js` – Main automated test script
- `data/testcases.json` – Test case data extracted from the Excel sheet
- `playwright.config.js` – Playwright configuration (timeouts, browsers, reporting)
- `package.json` – Project dependencies and scripts
- `.github/workflows/playwright.yml` – CI configuration (if applicable)

---

## Notes

- Tests are executed across Chromium, Firefox, and WebKit browsers.
- Timeout values are configured to support longer translation cases.
- Screenshots and traces are automatically captured on failures.

---

## Repository Link

The GitHub repository link is provided separately in the file:

```
[git_repo_link.txt](https://github.com/Shalika24/IT3040_Assignment1)
```

---

## Author

LEWLE L. I. G. S. L
IT23308084

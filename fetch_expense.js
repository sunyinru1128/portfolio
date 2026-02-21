const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  try {
    console.log("Launching browser...");
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();
    console.log("Navigating...");
    await page.goto('https://fyi.hfl.temporary.site/expense/');
    console.log("Filling password...");
    await page.fill('input[type="password"]', '65b42553caa64');
    console.log("Submitting...");
    await page.click('input[type="submit"]', { force: true });
    console.log("Waiting for navigation...");
    await page.waitForLoadState('networkidle');
    console.log("Extracting HTML...");
    const html = await page.content();
    fs.writeFileSync('expense.html', html);
    console.log("Saved to expense.html");
    await browser.close();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
})();

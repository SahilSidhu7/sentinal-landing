const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto('http://localhost:5173/sentinal-landing/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const height = await page.evaluate(() => document.body.scrollHeight);
  await page.setViewportSize({ width: 1440, height: Math.min(height, 6000) });
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'tmp_pw_check/refine_full.png', fullPage: true });
  await browser.close();
})();

const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto('http://localhost:5173/sentinal-landing/docs', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'tmp_pw_check/refine_docs.png' });

  const mobile = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  await mobile.goto('http://localhost:5173/sentinal-landing/', { waitUntil: 'networkidle' });
  await mobile.waitForTimeout(400);
  const h = await mobile.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 700) {
    await mobile.evaluate((yy) => window.scrollTo(0, yy), y);
    await mobile.waitForTimeout(120);
  }
  await mobile.evaluate(() => window.scrollTo(0,0));
  await mobile.waitForTimeout(300);
  await mobile.screenshot({ path: 'tmp_pw_check/refine_mobile.png', fullPage: true });
  await browser.close();
})();

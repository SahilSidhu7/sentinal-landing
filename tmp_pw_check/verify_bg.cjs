const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('http://localhost:5174/sentinal-landing/', { waitUntil: 'networkidle' });
  await page.waitForSelector('canvas');

  const canvasInfo = await page.evaluate(() => {
    const c = document.querySelector('canvas');
    const style = getComputedStyle(c);
    return {
      position: style.position,
      zIndex: style.zIndex,
      pointerEvents: style.pointerEvents,
      width: c.width,
      height: c.height,
    };
  });
  console.log('Canvas style:', JSON.stringify(canvasInfo));

  await page.mouse.move(300, 300);
  await page.waitForTimeout(200);
  const frame1 = await page.evaluate(() => document.querySelector('canvas').toDataURL());
  await page.mouse.move(900, 600, { steps: 20 });
  await page.waitForTimeout(200);
  const frame2 = await page.evaluate(() => document.querySelector('canvas').toDataURL());
  console.log('Canvas changed after mouse move:', frame1 !== frame2);

  await page.screenshot({ path: 'tmp_pw_check/home_with_bg.png' });

  // click nav + button still work
  await page.click('a[href*="docs"]');
  await page.waitForURL(/docs/);
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'tmp_pw_check/docs_with_bg.png' });

  console.log('Console/page errors:', errors);
  await browser.close();
})();

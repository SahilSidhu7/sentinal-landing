const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto('http://localhost:5174/sentinal-landing/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const result = await page.evaluate(() => {
    const c = document.querySelector('canvas');
    const ctx = c.getContext('2d');
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    let greenPixels = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i+3] > 0 && data[i+1] > data[i] && data[i+1] > data[i+2]) greenPixels++;
    }
    return { totalPixels: data.length / 4, greenPixels };
  });
  console.log(result);
  await browser.close();
})();

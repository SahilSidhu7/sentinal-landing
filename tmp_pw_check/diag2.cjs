const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:8082/sentinal-landing/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // let hero reveal finish

  // cursor blink over 2.2s
  const cursorSamples = [];
  const t0 = Date.now();
  while (Date.now() - t0 < 2200) {
    const op = await page.evaluate(() => {
      const el = document.querySelector('.cursor-blink');
      return el ? getComputedStyle(el).opacity : null;
    });
    cursorSamples.push({ t: Date.now() - t0, op });
    await page.waitForTimeout(150);
  }
  console.log('CURSOR BLINK:', JSON.stringify(cursorSamples));

  // pulse dot over 2.2s
  const pulseSamples = [];
  const t1 = Date.now();
  while (Date.now() - t1 < 2200) {
    const val = await page.evaluate(() => {
      const el = document.querySelector('.pulse-dot');
      if (!el) return null;
      const cs = getComputedStyle(el);
      return { opacity: cs.opacity, transform: cs.transform };
    });
    pulseSamples.push({ t: Date.now() - t1, ...val });
    await page.waitForTimeout(200);
  }
  console.log('PULSE DOT:', JSON.stringify(pulseSamples));

  // Get Started button hover: background/filter/transform before vs during hover
  const before = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('a,button')).find(el => el.textContent.trim() === 'Get started');
    const cs = getComputedStyle(btn);
    return { bg: cs.backgroundColor, filter: cs.filter, transform: cs.transform, boxShadow: cs.boxShadow };
  });
  const btnBox = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('a,button')).find(el => el.textContent.trim() === 'Get started');
    const r = btn.getBoundingClientRect();
    return { x: r.x + r.width/2, y: r.y + r.height/2 };
  });
  await page.mouse.move(btnBox.x, btnBox.y);
  await page.waitForTimeout(250);
  const during = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('a,button')).find(el => el.textContent.trim() === 'Get started');
    const cs = getComputedStyle(btn);
    return { bg: cs.backgroundColor, filter: cs.filter, transform: cs.transform, boxShadow: cs.boxShadow };
  });
  console.log('BUTTON BEFORE HOVER:', JSON.stringify(before));
  console.log('BUTTON DURING HOVER:', JSON.stringify(during));

  await browser.close();
})();

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:8082/sentinal-landing/', { waitUntil: 'domcontentloaded' });

  // Sample opacity of hero children over the first 700ms to check for real staggering
  const samples = [];
  const start = Date.now();
  while (Date.now() - start < 900) {
    const state = await page.evaluate(() => {
      const heroSection = document.querySelector('main section');
      if (!heroSection) return null;
      const children = Array.from(heroSection.children).map((el) => {
        const cs = getComputedStyle(el);
        return { tag: el.tagName, opacity: cs.opacity, transform: cs.transform };
      });
      return children;
    });
    samples.push({ t: Date.now() - start, state });
    await page.waitForTimeout(60);
  }
  console.log(JSON.stringify(samples, null, 1));

  await browser.close();
})();

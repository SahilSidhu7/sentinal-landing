const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  // normal motion
  let page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto('http://localhost:8082/sentinal-landing/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'tmp_pw_check/hero_after.png' });

  // reduced motion context
  const rmContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const rmPage = await rmContext.newPage();
  await rmPage.goto('http://localhost:8082/sentinal-landing/', { waitUntil: 'networkidle' });
  await rmPage.waitForTimeout(100);
  const rmOpacities = await rmPage.evaluate(() => {
    const heroSection = document.querySelector('main section');
    return Array.from(heroSection.children).map(el => getComputedStyle(el).opacity);
  });
  console.log('Reduced motion hero opacities (should all be 1 immediately):', rmOpacities);
  await rmPage.screenshot({ path: 'tmp_pw_check/hero_reduced_motion.png' });

  await browser.close();
})();

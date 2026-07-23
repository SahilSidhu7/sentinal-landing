const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:8082/sentinal-landing/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Button hover check (background/filter change)
  const getBtnStyle = async () => page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('a,button')).find(el => el.textContent.trim() === 'Get started');
    const cs = getComputedStyle(btn);
    return { bg: cs.backgroundColor, filter: cs.filter, transform: cs.transform };
  });
  const before = await getBtnStyle();
  const box = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('a,button')).find(el => el.textContent.trim() === 'Get started');
    const r = btn.getBoundingClientRect();
    return { x: r.x + r.width/2, y: r.y + r.height/2 };
  });
  await page.mouse.move(box.x, box.y);
  await page.waitForTimeout(250);
  const during = await getBtnStyle();
  console.log('PRIMARY BTN before:', JSON.stringify(before));
  console.log('PRIMARY BTN during hover:', JSON.stringify(during));

  // secondary button
  const getSecStyle = async () => page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('a,button')).find(el => el.textContent.trim() === 'Read the docs');
    const cs = getComputedStyle(btn);
    return { bg: cs.backgroundColor, borderColor: cs.borderColor };
  });
  const secBefore = await getSecStyle();
  const secBox = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('a,button')).find(el => el.textContent.trim() === 'Read the docs');
    const r = btn.getBoundingClientRect();
    return { x: r.x + r.width/2, y: r.y + r.height/2 };
  });
  await page.mouse.move(secBox.x, secBox.y);
  await page.waitForTimeout(250);
  const secDuring = await getSecStyle();
  console.log('SECONDARY BTN before:', JSON.stringify(secBefore));
  console.log('SECONDARY BTN during hover:', JSON.stringify(secDuring));

  // Nav underline: navigate to Docs and check active underline width transition
  const homeLink = await page.$('a:has-text("Home")');
  const afterWidth0 = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('a')).find(a => a.textContent.trim() === 'Home');
    return getComputedStyle(el, '::after').width;
  });
  console.log('Home nav-link-active ::after width (should be full width of text):', afterWidth0);

  await browser.close();
})();

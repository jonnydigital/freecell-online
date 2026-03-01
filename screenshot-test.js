const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto('http://localhost:3000');

    // Wait to see if error pops up
    await new Promise(r => setTimeout(r, 3000));

    await page.screenshot({ path: '/tmp/screenshot.png' });
    await browser.close();
})();

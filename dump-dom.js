const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    // Wait for the game to potentially load
    await new Promise(r => setTimeout(r, 2000));

    const html = await page.content();
    console.log(html);
    await browser.close();
})();

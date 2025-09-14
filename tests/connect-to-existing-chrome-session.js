/**
 *  open command prompt and navigae to the folder where chrome is installed and use below command
 *  chrome.exe --remote-debugging-port=9222 --user-data-dir="C:\Temp\ChromeDebug"
 * 
 *  chrom session will ve created then go to url http://localhost:9222/json/version
 *  this will provide similar below data
 *  {
        "Browser": "Chrome/140.0.7339.128",
        "Protocol-Version": "1.3",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
        "V8-Version": "14.0.365.4",
        "WebKit-Version": "537.36 (@36aa3351631d175ee5346a1aaf74ef5d49abe308)",
        "webSocketDebuggerUrl": "ws://localhost:9222/devtools/browser/227eea7e-2181-4489-920e-142b76b2b8b7"
    }
 */

import { test, chromium } from '@playwright/test';

test('Connect to Existing Chrome Session', async () => {
    const browser = await chromium.connectOverCDP('ws://localhost:9222/devtools/browser/227eea7e-2181-4489-920e-142b76b2b8b7');
    const context = browser.contexts()[0];

    // Get existing pages (tabs)
    const pages = context.pages();
    const page = pages[0]; // use the first tab (or choose whichever you need)

    // Open a new page
    // const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("[id='userEmail']").fill("purushotham.test@gmail.com");
    await page.locator('[id="userPassword"]').fill("Test@123");
    await page.locator('[id="login"]').click();
   
   
   
});
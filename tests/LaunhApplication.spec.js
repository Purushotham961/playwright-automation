const {test} = require('@playwright/test');

test.only('Browser context Launch Application', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.pause();



});


test('Launch Application', async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

});
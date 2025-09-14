import {test, expect} from '@playwright/test';

test('Window handling', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise");

    await page.locator("[class='blinkingText']").first().waitFor();

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            page.locator("[class='blinkingText']").first().click()
        ]
    );

    const newPageTitle = await  newPage.title();
    console.log(`New page title : ${newPageTitle}`);

    await page.locator('#username').fill('rahulshetty');
    const value = await page.locator('#username').inputValue();
    console.log(value);





});
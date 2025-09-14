const {test, expect} = require('@playwright/test');
const { sign } = require('crypto');
const { addAbortListener } = require('events');

test('Launch Application', async ({page}) => {

    const user_name = page.locator("#username");
    const password =  page.locator("#password");
    const sign_in = page.locator("[name='signin']");
    const cardTitles = page.locator("[class='card-body'] a");
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await user_name.fill("rahulshettyacademy");
    await password.fill("learning");


    const dropdown = await page.locator('select[class="form-control"]');
    await dropdown.selectOption("consult");

    await page.locator('[id="usertype"]').nth(1).click();
    await page.locator('[id="okayBtn"]').click();

    await expect(page.locator('[id="usertype"]').nth(1)).toBeChecked();

    const isChecked = await page.locator('[id="usertype"]').nth(1).isChecked();
    console.log(`Is user radio checked : ${isChecked}`);

    console.log(await page.locator('[name="terms"]').isChecked());

    expect(await page.locator('[name="terms"]').isChecked()).toBeFalsy();
    await page.locator('[name="terms"]').check();

    console.log(await page.locator('[name="terms"]').isChecked());
    expect(await page.locator('[name="terms"]').isChecked()).toBeTruthy();

    await page.locator('[name="terms"]').uncheck();
    console.log(await page.locator('[name="terms"]').isChecked());



    await page.pause();

});
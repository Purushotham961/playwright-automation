import {test, expect} from '@playwright/test';

test('Login Application', async ({page}) => {

    const product_titles = page.locator('[class="card-body"] h5');

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("[id='userEmail']").fill("purushotham.test@gmail.com");
    await page.locator('[id="userPassword"]').fill("Test@123");
    await page.locator('[id="login"]').click();

    const first_product = await product_titles.first().textContent();
    console.log(`first product : ${first_product}`);

    const all_product_titles = await product_titles.allTextContents();
    console.log(`products : ${all_product_titles}`);

    



});
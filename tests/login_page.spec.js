const {test, expect} = require('@playwright/test');
const { sign } = require('crypto');

test('Launch Application', async ({page}) => {

    const user_name = page.locator("#username");
    const password =  page.locator("#password");
    const sign_in = page.locator("[name='signin']");
    const cardTitles = page.locator("[class='card-body'] a");
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await user_name.fill("rahulshettyacademy1");
    await password.fill("learning");
    await sign_in.click();

    //Validate error message if credentials are invalid
    const error = await page.locator("[style='display: block;']").textContent();
    console.log(`Validation message : ${error}`);
    expect(error).toContain("Incorrect");

    await user_name.fill("rahulshettyacademy");
    await password.fill("learning");
    await sign_in.click();

    const firstProduct = await cardTitles.first().textContent();
    console.log(`First product : ${firstProduct}`);

    const allProducts = await cardTitles.allTextContents();
    console.log(allProducts);

    console.log(`Number of products : ${allProducts.length}`);

    console.log(await cardTitles.size());



    await page.pause();
});
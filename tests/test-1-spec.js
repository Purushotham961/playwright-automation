const {test, expect} = require('@playwright/test');
const exp = require('constants');

test('First test', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle(title);

});

test('Login Page', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    let title = await page.title();
    console.log(title);

    const username = page.locator("[id='username']");
    const password = page.locator("[id='password']");
    const loginBtn = page.locator("[id='signInBtn']");

    await username.fill("rahulshettyacademy");
    await password.fill("learning");
    await loginBtn.click();

    const itemCards = page.locator("[class='card h-100']").all();
    const itemTitle = page.locator("[class='card-title'] a");
    const addBtn = page.locator("[class='btn btn-info']");
    const checkoutBtn = page.locator("[class='nav-link btn btn-primary']");

    await itemTitle.first().waitFor();
    const allTitles = await itemTitle.allTextContents();
    console.log(allTitles);

    


})

test('Automation Practice', async ({page}) => {
    //await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const documentLink = page.locator("[href*='documents-request']");

    const dropdown = await page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator("[id='usertype']").last().click();
    await page.locator("[id='okayBtn']").click();
    console.log(await page.locator("[id='usertype']").last().isChecked());
    expect(await page.locator("[id='usertype']").last().isChecked()).toEqual(true);
    await expect(page.locator("[id='usertype']").last()).toBeChecked();
    await page.locator("[id='terms']").click();
    await page.locator("[id='terms']").uncheck();
    expect(await page.locator("[id='terms']").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

});

test.only('Window handling', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ]);

    const text = await newPage.locator("[class='im-para red']").textContent();
    console.log(text);

    const arr = text.split('with')[0].trim().split(" ");
    console.log(arr);
    const email = arr[arr.length - 1];
    console.log(email);

    const email2 = text.split("with")[0]
    .trim()
    .split(" ")
    .splice(-1)[0];

    console.log(email2);

    

});
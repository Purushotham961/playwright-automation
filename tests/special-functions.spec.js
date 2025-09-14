import {test, expect} from '@playwright/test';

test('Special functions', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();

    await page.getByLabel("Student").click();

    await page.getByLabel("Gender").selectOption("Female");

    await page.getByPlaceholder("Password").fill("Pasword");

    await page.getByRole('button', {name: "Submit"}).click();

    await page.getByRole('link', {name: "Shop"}).click();

    await page.locator("app-card").filter({hasText: 'Blackberry'}).getByRole("button", {name: 'Add'}).click();



    await page.pause();

});
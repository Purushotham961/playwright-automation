import {test, expect} from '@playwright/test';
import exp from 'constants';

test('Automation Practice', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    // await page.goto("https://google.com");

    // await page.goBack();
    // await page.goForward();
    // await page.goBack();

    const hide_show_example = page.locator('[id="displayed-text"]');
    const is_hide_show_visible = await hide_show_example.isVisible();
    console.log(`hide show example textbox status : ${is_hide_show_visible}`);

    await expect(hide_show_example).toBeVisible();

    await page.locator('[id="hide-textbox"]').click();
    await expect(hide_show_example).toBeHidden();

    await page.locator('[id="show-textbox"]').click();
    await expect(hide_show_example).toBeVisible();

    await page.pause();

    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();

    await page.locator('#name').fill("purushotham");
    
    
    let alert_message = "";
    page.once('dialog', async dialog => {
        alert_message = dialog.message();
        console.log(`Alert message on dialog ${alert_message}`);
        // await dialog.accept(); //or dismiss
    });

    await page.locator('#confirmbtn').click();
    console.log("Alert message : {}", alert_message);

    await page.locator('#mousehover').hover();
    await page.getByRole('link', {name: "Reload"}).click();
    
    
    

    









});
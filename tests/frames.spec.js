import {test, expect} from '@playwright/test';

test('Frames', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice");

    const framePage = page.frameLocator("#courses-iframe");
    // const frame = page.frame(framePage, {name: 'iframe-name'});
    const frame = page.frame({ name: 'iframe-name' });

    //approach 1 - Since there are multiple Courses text inside the frame
    const navigation_bar = framePage.locator("[class='navigation clearfix']").first();
    await navigation_bar.getByRole('link', {name: 'Courses'}).click();

    //wait till browse products appears
   await expect(framePage.locator("h2.BrowseProductsTitle")).toBeVisible();
   
//     // Step 2: go back (this affects iframe history as well)
//     await page.goBack();        //there is an issue with goBack() when we use with Frames

//    // re-acquire the navigation bar locator (since frame reloaded)
//     const framePage2 = page.frameLocator("#courses-iframe");

//     const navigation_bar2 = framePage2.locator("[class='navigation clearfix']").first();
//     await navigation_bar2.getByRole('link', { name: 'Courses', exact: true }).click();
    await page.pause();

    await page.reload();

    const framePage2 = page.frameLocator("#courses-iframe");
    await framePage2.locator('a[href="lifetime-access"]:visible').click();

    await page.pause();


});
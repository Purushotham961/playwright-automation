import {test, expect} from '@playwright/test';

test('Login Application', async ({page}) => {

    const product_titles = page.locator('[class="card-body"] h5');
    const product_card = page.locator('[class="card"]');

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("[id='userEmail']").fill("purushotham.test@gmail.com");
    await page.locator('[id="userPassword"]').fill("Test@123");
    await page.locator('[id="login"]').click();

    const first_product = await product_titles.first().textContent();
    console.log(`first product : ${first_product}`);

    const all_product_titles = await product_titles.allTextContents();
    console.log(`products : ${all_product_titles}`);

    await product_card.first().waitFor();

    const cards = await product_card.all();

    for(const card of cards){
        const product_name = await card.locator('[class="card-body"] h5').textContent();
        console.log(`product : ${product_name}`);

        if(product_name === "ADIDAS ORIGINAL"){
            await card.locator('text=" Add To Cart"').click();
            break; //stop iteration after finding the product
        }
    }

    const toast_message = await page.locator('[id="toast-container"] [class*="toast-message"]').textContent();
    console.log(`toast message : ${toast_message}`);


    const cart_button = page.locator('[routerlink="/dashboard/cart"]');

    const product_count = await cart_button.locator("label").textContent();
    console.log(`Product count : ${product_count}`);

    await cart_button.click();

    const items = page.locator('[class*="items"]');

    await items.first().waitFor();

    const allItems = await items.all();
    
    const item_names = [];

    for(const item of allItems){
        const item_name = await item.locator('h3').textContent();
        console.log(`Item name : ${item_name}`);

        const bool = item.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
        console.log("Is ADIDAD ORIGINAL item visible : ", bool);
        
        item_names.push(item_name);
    }

    if(item_names.includes('ADIDAS ORIGINAL')){
        console.log("ADIDAS original is present!")
    }else {
        console.log('ADIDAS original is not present!');
    }

    await page.locator('text="Checkout"').click();

    //configure credit card number
    await page.locator("div:has-text('Credit Card Number ')").locator('+input').fill("7363 8387 7363 8272");

    //configure month
    const month_dropdown = page.locator("div:has-text('Expiry Date ')").locator("+select:first-of-type");
    await month_dropdown.selectOption("05");

    //configure date
    const date_dropdown = page.locator("div:has-text('Expiry Date ')").locator("+select+select");
    await date_dropdown.selectOption("08");

    //configure cvv
    await page.locator("div:has-text('CVV Code ')").locator("+input").fill("123");

    //enter name on card
    await page.locator("div:has-text('Name on Card ')").locator("+input").fill("test");

    //apply coupon
    await page.locator("div:has-text('Apply Coupon ')").locator("+input").fill("rahulshettyacademy");
    await page.locator("button", {hasText: "Apply Coupon"}).click();

    //verify username displayed
    const username_displayed = await page.locator(('[class*="user__name"] label')).textContent();
    expect(username_displayed).toBe("purushotham.test@gmail.com");

    //Wait for coupon to be applied
    const coupon_status = await page.locator("div+input+p").textContent();
    console.log(`Coupon status : ${coupon_status}`);


    //select country
    await page.locator('[placeholder="Select Country"]').pressSequentially("Ind");
    const results_dropdown = page.locator('[class*="ta-results"]');
    await results_dropdown.waitFor();

    const options = await results_dropdown.locator("button").all();

    for(const option of options){
        const option_value = await option.locator("span").textContent();
        console.log(`Option : ${option_value}`);

        if(option_value.trim() === 'India'){
            option.click();
            break;
        }

    }

    await page.locator("text=Place Order ").click();

    await page.locator("h1:has-text(' Thankyou for the order. ')").screenshot();

    //Fetch the order id
    const order_id_generated = await page.locator('[class="box"] tr:last-of-type tr:last-of-type').textContent();
    console.log(`order id : ${order_id_generated}`);

    const is_order_visible = await page.locator("div.title:has-text('ADIDAS ORIGINAL')").isVisible();
    console.log(is_order_visible);

    //go to orders history page
    await page.locator("label:has-text(' Orders History Page ')").click();
    expect(await page.locator("h1:has-text('Your Orders')").isVisible()).toBeTruthy();

    const order_ids = await page.locator("tbody tr th").all();

    for(const order_id of order_ids){
        const actual_order_id = await order_id.textContent();
        console.log(`actual order id : ${actual_order_id}`);

        if(actual_order_id.trim() === order_id_generated){
            console.log(`order id ${order_id_generated} is displayed in orders history`);
            break;
        }
    }





























    await page.pause();




    



});
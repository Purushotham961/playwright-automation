import { test, expect, request } from '@playwright/test';

let token = "";

test.beforeAll( async () => {
    const api_context = await request.newContext();
    const login_response = await api_context.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: { userEmail: "purushotham.test@gmail.com", userPassword: "Test@123" }
    });

    const response_json = await login_response.json();
    console.log(response_json);

    expect(login_response.ok()).toBeTruthy();

    token = response_json.token;
    console.log(token);
    




});

test('Login', async ({ page }) => {

    await page.addInitScript(
        value => {
            window.localStorage.setItem('token', value)
        }, token
    );

    await page.goto("https://rahulshettyacademy.com/client");

    const product_titles = page.locator('[class="card-body"] h5');
    const first_product = await product_titles.first().textContent();
    console.log(`first product : ${first_product}`);

    const all_product_titles = await product_titles.allTextContents();
    console.log(`products : ${all_product_titles}`);

});
import { test, expect, request } from '@playwright/test';

let api_context = "";
let token = "";
let order_id = "";


test.beforeAll(async () => {
    api_context = await request.newContext();
    const login_response = await api_context.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: { userEmail: "purushotham.test@gmail.com", userPassword: "Test@123" }
    });

    const response_json = await login_response.json();
    console.log(response_json);

    expect(login_response.ok()).toBeTruthy();

    token = response_json.token;
    console.log(token);





});

test.beforeEach(async () => {
    const create_order_response = await api_context.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        data: { orders: [{ country: "India", productOrderedId: "68a961959320a140fe1ca57e" }] },
        headers: {
            "Authorization" : token,
            "Content-Type" : 'application/json',
        }
    });

     console.log(await create_order_response.json());

    const order_response = await create_order_response.json();
    order_id = order_response.orders[0];
    console.log(`order id generated : ${order_id}`);
    



    
});

test('Login', async ({ page }) => {

    await page.addInitScript(
        value => {
            window.localStorage.setItem('token', value)
        }, token
    );

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");

    const order_ids = await page.locator("tbody tr th").all();

    for(const temp_order_id of order_ids){
        const actual_order_id = await temp_order_id.textContent();
        console.log(`actual order id : ${actual_order_id}`);

        if(actual_order_id.trim() === order_id){
            console.log(`order id ${actual_order_id} is displayed in orders history`);
            break;
        }
    }
});
import {test, expect} from "@playwright/test"

test("get booking details by id - path param", async({request})=>{

    const bookingId=2642;

    //get request
    const response= await request.get(`/booking/${bookingId}`);
    const responseBody=await response.json();

    console.log(responseBody);

    //add assertions
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

})

test.only('get booking details using query parameter', async({request})=>{

    const firstname="Raja";
    const lastname="Shekar";

    //sending get request using query parameter
    const response=await request.get('/booking',{params:{firstname, lastname}})
    const responseBody=await response.json();

    console.log(responseBody);
    console.log(response.url())

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);

    for(const item of responseBody){
        expect(item).toHaveProperty('bookingid');
        expect(typeof item.bookingid).toBe('number');
        expect(item.bookingid).toBeGreaterThan(0);
    }
   
})
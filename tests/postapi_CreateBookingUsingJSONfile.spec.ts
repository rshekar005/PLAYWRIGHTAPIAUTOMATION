import { test, expect } from "@playwright/test"
import fs from "fs"

test("Create Booking -- Post", async ({ request }) => {

    const requestBody=JSON.parse(fs.readFileSync('testData/postapi.json','utf-8'));
   
    //Send post request
    const response = await request.post("/booking", { data: requestBody });
    const responseBody = await response.json();

    console.log(responseBody)

    //Validate status
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)

    //Validating response having property
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody).toHaveProperty('booking');
    expect(responseBody).toHaveProperty('booking.additionalneeds');

    console.log("booking is : ",responseBody.bookingid)

    //Validating booking details
    const booking = responseBody.booking;
    expect(booking).toMatchObject(
        {
            firstname: requestBody.firstname,
            lastname: requestBody.lastname,
            totalprice:requestBody.totalprice,
            depositpaid:requestBody.depositpaid,
            additionalneeds:requestBody.additionalneeds
        }
    )


    expect(booking.bookingdates).toMatchObject({
        checkin: requestBody.bookingdates.checkin,
        checkout: requestBody.bookingdates.checkout
    })
})
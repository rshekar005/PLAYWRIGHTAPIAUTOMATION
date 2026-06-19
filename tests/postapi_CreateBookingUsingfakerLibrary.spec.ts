import { test, expect } from "@playwright/test"
import fs from "fs"
import { faker } from "@faker-js/faker"
import { DateTime } from "luxon";

/*
    Install faker library
         npm install @faker-js/faker
    
    To deal with dates install below
        npm install luxon


*/
test("Create Booking -- Post", async ({ request }) => {

    //data generation using faker and luxon library
    const firstname=faker.person.firstName();
    const lastname=faker.person.lastName();
    const totalprice=faker.number.int({min:100, max:5000})
    const depositpaid=faker.datatype.boolean();

    const checkin=DateTime.now().toFormat('yyyy-MM-dd')
    const checkout=DateTime.now().plus({days:5}).toFormat('yyyy-MM-dd')

    const additionalneeds="super bowls"

    const requestBody = {
        "firstname": firstname,
        "lastname": lastname,
        "totalprice": totalprice,
        "depositpaid": depositpaid,
        "bookingdates": {
            "checkin": checkin,
            "checkout": checkout
        },
        "additionalneeds": additionalneeds
    }

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

    expect(responseBody.bookingid).not.toBe(null)

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
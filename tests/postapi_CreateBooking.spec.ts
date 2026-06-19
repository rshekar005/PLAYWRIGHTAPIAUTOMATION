import { test, expect } from "@playwright/test"

test("Create Booking -- Post", async ({ request }) => {

    //Request body -- static
    const requestBody = {
        "firstname": "Raja",
        "lastname": "Shekar",
        "totalprice": 1,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-01-01",
            "checkout": "2027-01-01"
        },
        "additionalneeds": "Super bowls"
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

    //Validating booking details
    const booking = responseBody.booking;
    expect(booking).toMatchObject(
        {
            "firstname": "Raja",
            "lastname": "Shekar",
            "totalprice": 1,
            "depositpaid": true,
            "additionalneeds": "Super bowls"
        }
    )


    const bookingDates = responseBody.booking.bookingdates;
    expect(bookingDates).toMatchObject({
        "checkin": "2026-01-01",
        "checkout": "2027-01-01"
    })
})
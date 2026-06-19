import { test, expect } from "@playwright/test"
import fs from "fs"
/*

    1. Create booking id and capture booking
    2. Need token for update/patch
    3. Use that token and booking id for update
*/

function readJson(path: string): string {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

test("Delete request", async ({ request }) => {
    const requestBody = readJson('testData/postapi.json');

    //Send post request
    const createResponse = await request.post("/booking", { data: requestBody });
    expect(createResponse.ok()).toBeTruthy();
    const responseBody = await createResponse.json();
    console.log("Post response :", responseBody)
    const bookingid = responseBody.bookingid;
    console.log('Booking id', bookingid);
    console.log("Post api successfull..............")


    //Get Booking details
    const getResponse = await request.get(`/booking/${bookingid}`);
    const getResponseBody = await getResponse.json();
    console.log("Get response: ", getResponseBody);
    console.log("Get api successfull..............")


    //Token creation
    const tokenBody = readJson('testData/tokenrequestbody.json');
    const tokenResponse = await request.post("/auth", { data: tokenBody });
    expect(tokenResponse.ok()).toBeTruthy();
    const tokenResponseBody = await tokenResponse.json();
    const token = tokenResponseBody.token;
    console.log("Token is ", token)
    console.log("Token generated successfully..............")

    //Update api with token and booking id from put api
    const updateBody = readJson('testData/putapi.json');
    const updatelResponse = await request.put(`/booking/${bookingid}`,
        {
            headers:
                { "Cookie": `token=${token}` },
            data: updateBody
        });
    expect(updatelResponse.ok()).toBeTruthy();
    const updateResponseBody = await updatelResponse.json();
    console.log(updateResponseBody)
    console.log("Booking updated successfully......")


    //Delete api
    const deleteResponse = await request.delete(`/booking/${bookingid}`,
        {
            headers:
                { "Cookie": `token=${token}` },
        });
        console.log(deleteResponse.url())
    expect(deleteResponse.status()).toBe(201);
    expect(deleteResponse.statusText()).toBe("Created")
    console.log("Booking deleted successfully..............")

})
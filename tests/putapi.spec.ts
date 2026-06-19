import { test, expect } from "@playwright/test"
import fs from "fs"
/*

    1. Create booking id and capture booking
    2. Need token for update/patch
    3. Use that token and booking id for update
*/

function readJson(path: string):string {
   return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

test("Update request", async ({ request }) => {
    const requestBody = readJson('testData/postapi.json');

    //Send post request
    const createResponse = await request.post("/booking", { data: requestBody });
    expect(createResponse.ok()).toBeTruthy();
    const responseBody = await createResponse.json();
    const bookingid = responseBody.bookingid;
    console.log('Booking id', bookingid);
    console.log("Post api successfull..............")

    //Token creation
    const tokenBody = readJson('testData/tokenrequestbody.json');
    const tokenResponse = await request.post("/auth", { data: tokenBody });
    expect(tokenResponse.ok()).toBeTruthy();
    const tokenResponseBody = await tokenResponse.json();
    const token = tokenResponseBody.token;
    console.log("Token is ",token)
    console.log("Token generated successfully..............")

    //Update api with token and booking id from post api
    const updateBody = readJson('testData/putapi.json');
    const updateResponse = await request.put(`/booking/${bookingid}`, 
                                {headers:
                                    {"Cookie":`token=${token}`},
                                    data:updateBody
                                } );
    expect(updateResponse.ok()).toBeTruthy();
    const updateResponseBody = await updateResponse.json();
    console.log(updateResponseBody)
    console.log("Booking details updated successfully......")
    
})
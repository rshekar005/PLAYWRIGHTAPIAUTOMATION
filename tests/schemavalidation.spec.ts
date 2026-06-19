/*
pre requistance: Below need to be installed to check schema validations
    npm install --save-dev playwright ajv 


*/

import { test, expect } from "@playwright/test"
import { Ajv } from "ajv"

test('Validate Json schema', async ({ request }) => {
    const response = await request.get('https://mocktarget.apigee.net/json')
    console.log(await response.json())

    //Define the schema
    const schema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Generated schema for Root",
        "type": "object",
        "properties": {
            "firstName": {
                "type": "string"
            },
            "lastName": {
                "type": "string"
            },
            "city": {
                "type": "string"
            },
            "state": {
                "type": "string"
            }
        },
        "required": [
            "firstName",
            "lastName",
            "city",
            "state"
        ]
    }

    const ajv= new Ajv();
    const validator=ajv.compile(schema); // Returns validator function
    const isValid=validator(response) // It checks the response matches with schema validations
    expect(isValid).toBe(true)



})
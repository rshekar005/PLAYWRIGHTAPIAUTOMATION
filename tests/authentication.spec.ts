
import {test, expect} from '@playwright/test'


// No authentication
test("No authentication test", async({request})=>{
    const response=await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.ok()).toBeTruthy();
    const responseData= await response.json();
    console.log(responseData)
})


// Basic authentication
test("Basic authentication", async({request})=>{
    const credentials = Buffer.from('user:pass').toString('base64');
    const response=await request.get("https://httpbin.org/basic-auth/user/pass",{
        headers:{Authorization:`Basic ${credentials}`}
    })
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200)
})


// Bearer token authentication — use env var for token
test('Bearer authentication', async({request})=>{
    const bearerToken = process.env.GITHUB_TOKEN || 'REPLACE_WITH_TOKEN'

    const response=await request.get('https://api.github.com/user/repos',{
        headers:{
            Authorization:`Bearer ${bearerToken}`
        }
    })

    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)

    const responseBody= await response.json();
    console.log(responseBody)

})
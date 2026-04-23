import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";


// access header is read-only type
export async function GET(request: NextRequest){
    // access headers from next/headers
    const headerList = await headers();
    const authHeader = headerList.get("authorization");

    // access request header from request headers
    // const requestHeader = new Headers(request.headers);
    // const authHeader = requestHeader.get("Authorization");

    console.log(authHeader);

    // return NextResponse.json({success: true, data: "Hello world from profile!"})


    // to make new header, you have to pass it as response
    return new Response(
        `<h1>${authHeader}</h1>`,
        {
            headers: {
                "Content-Type": "text/html",
                "X-Custom-Header": "Next.js Tutorial"
            }
        }
    );
}
import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET(request: NextRequest){
    // read cookies from request
    const theme = request.cookies.get("theme");

    console.log(theme);
    const cookieStore = await cookies();

    const result = cookieStore.get("result");

    console.log(result);

    cookieStore.set("score", "222");
    // return NextResponse.json({
    //     message: "Cookie read successfully"
    // })

    // return new Response("settings cookies", {
    //     headers: {
    //         // "set-cookie": "theme=dark",
    //         "set-cookie": "result=1221",
    //     }
    // })

    // better approach
    return NextResponse.json({message: "OK"});
}
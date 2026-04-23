# REST API, Query Param, Header and Cookie

## REST API
Calling an API in Next.Js by default is using proxy route handler by default, to call an api you have to put it inside `/app` directory, for example `/app/api`.
Not only that, you must name your file to `route.ts` or `route.js`.

### GET Request
Route: `/api/get-user`

We have to specify the function name by what request method you want to use. In this case is `GET`
```javascript
export async function GET(req: NextRequest) {
    try{
        
        return NextResponse.json({
            success: true,
            data: users,
            total: users.length
        })
    }catch (error){
        return NextResponse.json({
            success: false,
            error: "failed to get users"
        })
    }
}
```
To call data by id, create new route with `[id]` directory.

Route: `/api/get-user/[id]`
```javascript
export async function GET(request: NextRequest, {params}: {params: Promise<{id: string}>}) {

    try{
        const {id} = await params;
        const userId = parseInt(id);

        const user = users.find((user) => user.id === userId);

        return NextResponse.json(
            {success: true, data: user, message: "user found"},
            {status: 200}
        )
    }catch (err){
        return NextResponse.json(
            {success: false, error: "Failed to update user"},
            {status: 400}
        )
    }
}
```

### POST Request
Route: `/api/create-user`

We have to specify the function name by what request method you want to use. In this case is `POST`
```javascript
export async function POST(request: NextRequest) {
    ...
}
```

### PUT Request
Route: `/api/put-user`

We have to specify the function name by what request method you want to use. In this case is `PUT`
```javascript
export async function PUT(request: NextRequest) {
    ...
}
```

### Delete Request
Route: `/api/delete-user/[id]`

We have to specify the function name by what request method you want to use. In this case is `DELETE`
```javascript
export async function DELETE(request: NextRequest) {
    ...
}
```

## Headers
To access header we can import `next/headers`
```javascript
import {headers} from "next/headers";
```
To access it
```javascript
const headerList = await headers();
const authHeader = headerList.get("authorization");
```

To set headers we can do like this
```javascript
const response = NextResponse.json({success: true, data: "Hello world from profile!"});
response.headers.set("Authorization", "Bearer " + authHeader);

return response;
```

or
```javascript
return new Response(
    `<h1>${authHeader}</h1>`,
    {
        headers: {
            "Content-Type": "text/html",
            "X-Custom-Header": "Next.js Tutorial"
        }
    }
);
```

## Cookie
import `next/headers`
```javascript
import {cookies} from "next/headers";
```

To access cookies
```javascript
const theme = request.cookies.get("theme");
// or
const cookieStore = await cookies(); // better approach
const result = cookieStore.get("result");

// to set
cookieStore.set("score", "222");
```


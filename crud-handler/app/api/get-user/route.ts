import {NextRequest, NextResponse} from "next/server";

declare global {
  var _users: { id: number; name: string; email: string; age: number }[];
}

export const users  = global._users || [
    { id: 1, name: "John", email: "john@mail.com", age: 24 },
    { id: 2, name: "Francis", email: "francis@mail.com", age: 24 },
    { id: 3, name: "Sam", email: "sam@mail.com", age: 24 },
    { id: 4, name: "Jhoni", email: "jhoni@mail.com", age: 24 },
];

export async function GET(req: NextRequest) {
    try{
        const searchParams = req.nextUrl.searchParams;

        const name = searchParams.get("name");
        const age = searchParams.get("age");

        let filterUsers = users;

        if(age){
            filterUsers = filterUsers.filter((user) => user.age === Number(age));
        }

        if(name){
            filterUsers = filterUsers.filter(
                (user) => user.name.toLowerCase().
                includes(name.toLowerCase())
            )
        }


        return NextResponse.json({
            success: true,
            data: filterUsers,
            total: users.length
        })
    }catch (error){
        return NextResponse.json({
            success: false,
            error: "failed to get users"
        })
    }
}
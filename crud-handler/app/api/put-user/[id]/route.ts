import {NextRequest, NextResponse} from "next/server";
import {users} from "@/app/api/get-user/route";

export async function PUT(request: NextRequest, {params}: {params: Promise<{id: string}>}) {

    try{
        const {id} = await params;
        const userId = parseInt(id);

        const userIdx = users.findIndex((user) => user.id === userId);

        if(userIdx === -1){
            return NextResponse.json(
                {success: false, error: "User not found"},
                {status: 404}
            )
        }

        const {name, email, age} = await request.json();

        if(!name || !email || !age){
            return NextResponse.json(
                {success: false, error: "Missing required fields"},
                {status: 400}
            )
        }

        users[userIdx] = {
            id: userId,
            email: email,
            name: name,
            age: age,
        }

        return NextResponse.json(
            {success: true, data: users, message: "user found"},
            {status: 200}
        )
    }catch (err){
        return NextResponse.json(
            {success: false, error: "Failed to update user"},
            {status: 400}
        )
    }
}
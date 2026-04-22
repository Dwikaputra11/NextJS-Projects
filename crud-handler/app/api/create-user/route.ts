import {NextRequest, NextResponse} from "next/server";
import {users} from "@/app/api/get-user/route";

export async function POST(request: NextRequest) {
    try{
        const  {name, email, age} = await request.json();

        console.log(name, email, age);

        if(!name || !email || !age){
            return NextResponse.json(
                {success: false, error: "Missing required fields"},
                {status: 400}
            )
        }

        const emailExists = users.find(user => user.email === email);
        if(emailExists){
            return NextResponse.json(
                {success: false, error: "Email already exists"},
                {status: 400}
            )
        }

        const newUser = {
            id: users.length + 1,
            name: name,
            email: email,
            age: age,
        }

        users.push(newUser);

        return NextResponse.json(
            {success: true, data: users, message: "User successfully saved"},
            {status: 201}
        )
    }catch (error){
        return NextResponse.json({success: false, error: "Failed to create user"})
    }
}
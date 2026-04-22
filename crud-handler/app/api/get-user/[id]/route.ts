import {NextRequest, NextResponse} from "next/server";
import {users} from "../route";

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
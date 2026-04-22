import {NextRequest, NextResponse} from "next/server";
import {users} from "@/app/api/get-user/route";

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}) {

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

        const deletedUser = users[userIdx];

        users.splice(userIdx, 1);

        return NextResponse.json(
            {success: true, data: deletedUser, message: "user deleted successfully"},
            {status: 200}
        )
    }catch (err){
        return NextResponse.json(
            {success: false, error: "Failed to update user"},
            {status: 400}
        )
    }
}
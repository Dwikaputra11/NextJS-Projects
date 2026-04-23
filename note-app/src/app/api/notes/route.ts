import dbConnect from "@/lib/db.js";
import {NextRequest, NextResponse} from "next/server";
import Note from "@/models/Note";


export async function GET(){
    try{
        await dbConnect();
        const notes = await Note.find({}).sort({createdAt: -1});

        return  NextResponse.json({success: true, data:notes})
    }catch (err){
        return NextResponse.json(
            {success: false, error: err.message},
            {status: 400}
        )
    }
}

export async function POST(request: NextRequest){
    try{
        await dbConnect();
        const body = await request.json();

        const note = await Note.create(body)

        return NextResponse.json({success: true, data: note}, {status: 201})
    }catch (err){
        return NextResponse.json(
            {success: false, error: err.message},
            {status: 400}
        )
    }
}


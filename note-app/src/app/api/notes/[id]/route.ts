import {NextRequest, NextResponse} from "next/server";
import dbConnect from "@/lib/db.js";
import Note from "@/models/Note";

export async function DELETE(request: NextRequest, {params}: { params: { id: string } }) {
  try {
    const {id} = await params;

    await dbConnect();

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return NextResponse.json(
        {success: false, error: "Note not found"},
        {status: 404}
      )
    }

    return NextResponse.json({success: true, data: {}})
  } catch (err) {
    return NextResponse.json(
      {success: false, error: err.message},
      {status: 400}
    );
  }
}

export async function PUT(request: NextRequest, {params}: { params: { id: string } }) {
  try {
    const {id} = await params;

    await dbConnect();

    const body = await request.json();

    const note = await Note.findByIdAndUpdate(
      id,
      {...body},
      {new: true, runValidators: true}
    );

    if (!note) {
      return NextResponse.json(
        {success: false, error: "Note not found"},
        {status: 404}
      )
    }

    return NextResponse.json({success: true, data: note})
  } catch (err) {
    return NextResponse.json(
      {success: false, error: err.message},
      {status: 400}
    );
  }
}
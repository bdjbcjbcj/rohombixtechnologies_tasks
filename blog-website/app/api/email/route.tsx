import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/config/db";
import EmailModel from "@/app/lib/models/EmailModel";
import mongoose from "mongoose";

export async function POST(request:NextRequest) {

  try {

    await connectDB();

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // check if already subscribed
    const exists = await EmailModel.findOne({ email });

    if (exists) {
      return NextResponse.json(
        { success: false, message: "Already subscribed" },
        { status: 409 }
      );
    }

    await EmailModel.create({ email });

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully"
    });

  }catch (error) {
  console.error(error);

  return NextResponse.json(
    {
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    },
    { status: 500 }
  );
}
}


// GET ALL SUBSCRIBERS
export async function GET() {

  try {

    await connectDB();

    const subscribers = await EmailModel
      .find({})
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      subscribers
    });

  }catch (error) {
  console.error(error);

  return NextResponse.json(
    {
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    },
    { status: 500 }
  );
}
}




// DELETE SUBSCRIBER
export async function DELETE(request:NextRequest) {

  try {

    await connectDB();

    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is required"
        },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid ID"
        },
        { status: 400 }
      );
    }

    await EmailModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Subscriber deleted successfully"
    });

  }catch (error) {
  console.error(error);

  return NextResponse.json(
    {
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    },
    { status: 500 }
  );
}
}
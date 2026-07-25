import { connectDB } from "@/app/lib/config/db";
import Comment from "@/app/lib/models/CommentModel";
import { NextRequest, NextResponse } from "next/server";

// GET /api/blog/[id]/comments
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Blog id is required" },
        { status: 400 }
      );
    }

    const comments = await Comment.find({ blogId: id }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error("GET comments error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch comments",
      },
      {
        status: 500,
      }
    );
  }
}

// POST /api/blog/[id]/comments
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const { name, message } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog id is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and message are required",
        },
        {
          status: 400,
        }
      );
    }

    const comment = await Comment.create({
      blogId: id,
      name: name.trim(),
      message: message.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        comment,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST comment error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to post comment",
      },
      {
        status: 500,
      }
    );
  }
}
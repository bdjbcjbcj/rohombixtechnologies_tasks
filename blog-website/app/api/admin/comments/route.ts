import { connectDB } from "@/app/lib/config/db";
import Comment from "@/app/lib/models/CommentModel";
import { NextRequest, NextResponse } from "next/server";



// GET /api/admin/comments
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("blogId"); // optional filter

    const query = blogId ? { blogId } : {};

    const comments = await Comment.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error("Admin GET comments error:", error);

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



import { connectDB } from "@/app/lib/config/db";
import Comment from "@/app/lib/models/CommentModel";
import { NextRequest, NextResponse } from "next/server";

// DELETE /api/admin/comments/[commentId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { commentId: string } }
) {
  try {
    await connectDB();
    const { commentId } = await params; // Next.js 15+ requires await

    if (!commentId) {
      return NextResponse.json(
        { success: false, message: "Comment id is required" },
        { status: 400 }
      );
    }

    const deleted = await Comment.findByIdAndDelete(commentId);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Comment deleted" });
  } catch (error) {
    console.error("Admin DELETE comment error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
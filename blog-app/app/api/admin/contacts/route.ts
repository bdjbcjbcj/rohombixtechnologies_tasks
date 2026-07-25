import { connectDB } from "@/app/lib/config/db";
import ContactMessage from "@/app/lib/models/ContactMessageModel";
import { NextResponse } from "next/server";


// GET /api/admin/contacts
export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get("unread") === "true";

    const query = unreadOnly ? { read: false } : {};

    const contacts = await ContactMessage.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, contacts });
  } catch (error) {
    console.error("Admin GET contacts error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
import { connectDB } from "@/app/lib/config/db";
import ContactMessage from "@/app/lib/models/ContactMessageModel";
import { NextResponse } from "next/server";

// DELETE /api/admin/contacts/[contactId]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ contactId: string }> }
) {
  try {
    await connectDB();
    const { contactId } = await params; // Next.js 15+ requires await

    if (!contactId) {
      return NextResponse.json(
        { success: false, message: "Contact id is required" },
        { status: 400 }
      );
    }

    const deleted = await ContactMessage.findByIdAndDelete(contactId);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Contact deleted" });
  } catch (error) {
    console.error("Admin DELETE contact error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete contact" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/contacts/[contactId]  → mark as read/unread
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ contactId: string }> }
) {
  try {
    await connectDB();
    const { contactId } = await params;
    const { read } = await request.json();

    const updated = await ContactMessage.findByIdAndUpdate(
      contactId,
      { read: !!read },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, contact: updated });
  } catch (error) {
    console.error("Admin PATCH contact error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update contact" },
      { status: 500 }
    );
  }
}
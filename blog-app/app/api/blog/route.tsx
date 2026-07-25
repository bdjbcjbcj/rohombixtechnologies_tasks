import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { connectDB } from "@/app/lib/config/db";
import BlogModel from "@/app/lib/models/BlogModel";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

// Connect to DB
await connectDB();

// GET /api/blog
export async function GET(request: NextRequest) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");

    // Single Blog
    if (blogId) {
      if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return NextResponse.json(
          { error: "Invalid MongoDB ID" },
          { status: 400 },
        );
      }

      const blog = await BlogModel.findById(blogId);

      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }

      return NextResponse.json(blog);
    }

    // All Blogs
    const blogs = await BlogModel.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

// Api endpiont to upload blog Data
export async function POST(request: NextRequest) {
  try {
    // await connectDB();

    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");

    if (!image || typeof image === "string") {
      return NextResponse.json(
        { success: false, error: "No image uploaded" },
        { status: 400 },
      );
    }

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    const fileName = `${timestamp}_${image.name || "image.png"}`;
    const filePath = `./public/${fileName}`;

    await writeFile(filePath, buffer);

    const imgUrl = `/${fileName}`;

    const blogData = {
      title: formData.get("title") || "",
      description: formData.get("description") || "",
      category: formData.get("category") || "General",
      author: formData.get("author") || "Admin",
      image: imgUrl,
      authorImg: formData.get("authorImg") || "",
    };

    if (!blogData.title) {
      return NextResponse.json(
        {
          success: false,
          error: "Title is required",
        },
        { status: 400 },
      );
    }

    await BlogModel.create(blogData);

    return NextResponse.json({
      success: true,
      msg: "Blog saved successfully",
      imgUrl,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}

// Delete BLoG
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID required" },
        { status: 400 },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 },
      );
    }

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 },
      );
    }

    if (blog.image) {
      const imagePath = path.join(process.cwd(), "public", blog.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Blog and image deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

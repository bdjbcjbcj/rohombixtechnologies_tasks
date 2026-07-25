"use client";

import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { ImagePlus, Loader2, UploadCloud } from "lucide-react";
import { toast } from "react-toastify";

const Page = () => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Zoni",
    authorImg: "/author_img.png",
  });

  const onChangeHandle = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      return toast.error("Please upload an image");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("authorImg", data.authorImg);
      formData.append("image", image);

      const response = await axios.post("/api/blog", formData);

      if (response.data.success) {
        toast.success(response.data.msg);

        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Zoni",
          authorImg: "/author_img.png",
        });

        setImage(null);
      } else {
        toast.error(response.data.error || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white shadow-lg border border-gray-200">
        
        {/* Header */}
        <div className="rounded-t-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
          <h1 className="text-2xl font-bold text-white">
            Add New Blog
          </h1>
          <p className="mt-1 text-sm text-blue-100">
            Publish your latest article.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmitHandler}
          className="space-y-6 p-6"
        >
          {/* Upload Image */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <ImagePlus size={18} />
              Blog Thumbnail
            </label>

            <label
              htmlFor="image"
              className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-blue-500 hover:bg-blue-50"
            >
              {image ? (
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  width={500}
                  height={180}
                  className="h-full w-full rounded-xl object-cover"
                />
              ) : (
                <>
                  <UploadCloud
                    size={36}
                    className="text-blue-600"
                  />
                  <p className="mt-3 text-sm font-medium text-gray-700">
                    Click to upload image
                  </p>
                  <span className="text-xs text-gray-500">
                    PNG, JPG or JPEG
                  </span>
                </>
              )}
            </label>

            <input
              id="image"
              type="file"
              hidden
              required
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files?.[0] || null)
              }
            />
          </div>

          {/* Blog Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Blog Title
            </label>

            <input
              type="text"
              name="title"
              value={data.title}
              onChange={onChangeHandle}
              placeholder="Enter blog title"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Blog Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Blog Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={data.description}
              onChange={onChangeHandle}
              placeholder="Write your blog..."
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Category
            </label>

            <select
              name="category"
              value={data.category}
              onChange={onChangeHandle}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
            >
              <option value="Startup">Startup</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white shadow-md transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Uploading...
              </>
            ) : (
              "Publish Blog"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
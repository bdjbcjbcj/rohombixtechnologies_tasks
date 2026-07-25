"use client";
// import BlogTableItem from "@/components/AdminComponents/BlogTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

function Page() {
  interface Blog {
    _id: string;
    title: string;
    description: string;
    image: string;
    author: string;
    date: string;
  }
  const [blogs, setBlogs] = useState<Blog[]>([]);
  console.log(blogs);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteBlogs = async (id: string) => {
    try {
      const response = await axios.delete("/api/blog", {
        params: {
          id,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Deleted successfully");
        fetchBlogs();
      } else {
        toast.error(response.data.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 min-h-screen bg-gray-50 p-6 sm:p-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Blogs</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and organize your published blogs.
          </p>
        </div>

        <div className="rounded-xl bg-blue-600 px-5 py-3 text-white shadow-lg">
          <p className="text-xs uppercase tracking-wide opacity-80">
            Total Blogs
          </p>
          <h2 className="text-2xl font-bold">{blogs.length}</h2>
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
        {/* Table Header */}
        <div className="border-b bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Blog List</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
              <tr>
                <th className="hidden px-6 py-4 sm:table-cell">Author</th>

                <th className="px-6 py-4">Blog Title</th>

                <th className="px-6 py-4">Date</th>

                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {blogs.length > 0 ? (
                blogs.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition">
                    <td className="hidden px-6 py-4 sm:table-cell">
                      {item.author}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.title}
                    </td>

                    <td className="px-6 py-4 text-gray-600">{item.date}</td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => deleteBlogs(item._id)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-16 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <div className="mb-3 rounded-full bg-gray-100 p-5">
                        📄
                      </div>

                      <h3 className="text-lg font-semibold text-gray-700">
                        No Blogs Found
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Your blog list is currently empty.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;

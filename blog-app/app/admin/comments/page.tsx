"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Search, MessageSquare, RefreshCw } from "lucide-react";

const AdminCommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/comments");
      setComments(res.data.comments || []);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const filteredComments = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return comments;

    return comments.filter(
      (c) =>
        (c.name || "").toLowerCase().includes(q) ||
        (c.message || "").toLowerCase().includes(q) ||
        (c.blogId || "").toLowerCase().includes(q)
    );
  }, [comments, search]);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`/api/admin/comments/${id}`);
      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-5 py-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="h-7 w-7 text-indigo-600" />
            Manage Comments
          </h1>
          <p className="text-gray-500 mt-1">
            {comments.length} comment{comments.length !== 1 && "s"} total
          </p>
        </div>

        <button
          onClick={fetchComments}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search by name, message, or blog id..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {/* Table / List */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">
          Loading comments...
        </div>
      ) : filteredComments.length === 0 ? (
        <div className="py-20 text-center">
          <div className="text-5xl mb-3">💬</div>
          <p className="text-gray-500">No comments found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="hidden sm:grid grid-cols-[1fr_2fr_1fr_auto] gap-4 bg-gray-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <span>Name</span>
            <span>Comment</span>
            <span>Blog / Date</span>
            <span className="text-right">Action</span>
          </div>

          <AnimatePresence>
            {filteredComments.map((c) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr_auto] gap-2 sm:gap-4 border-t border-gray-100 px-5 py-4 items-start"
              >
                <span className="font-semibold text-gray-900">{c.name}</span>

                <p className="text-sm text-gray-600 leading-6">{c.message}</p>

                <div className="text-xs text-gray-400 space-y-1">
                  <p className="truncate">Blog: {c.blogId}</p>
                  <p>
                    {c.createdAt
                      ? new Date(c.createdAt).toLocaleString()
                      : ""}
                  </p>
                </div>

                <div className="flex sm:justify-end">
                  {confirmId === c._id ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(c._id)}
                        disabled={deletingId === c._id}
                        className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                      >
                        {deletingId === c._id ? "Deleting..." : "Confirm"}
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmId(c._id)}
                      className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Delete comment"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="text-xs font-medium sm:hidden">
                        Delete
                      </span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default AdminCommentsPage;
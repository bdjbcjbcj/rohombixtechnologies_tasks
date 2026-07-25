"use client";

import { blog_data } from "@/Assets/assets";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Search, ArrowUpRight, MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState([]);

  // ---- Comments state ----
  const [activeCommentId, setActiveCommentId] = useState(null); // which card's modal is open
  const [commentsMap, setCommentsMap] = useState({}); // { [blogId]: Comment[] }
  const [countsMap, setCountsMap] = useState({}); // { [blogId]: number }
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [postingComment, setPostingComment] = useState(false);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Merge local + database blogs
  const allBlogs = useMemo(() => {
    return [...blog_data, ...blogs];
  }, [blogs]);

  // Filter blogs (case-insensitive category match + safer string checks)
  const filteredBlogs = useMemo(() => {
    const q = search.trim().toLowerCase();

    return allBlogs.filter((item) => {
      const itemCategory = (item.category || "").trim().toLowerCase();
      const categoryMatch =
        menu === "All" || itemCategory === menu.trim().toLowerCase();

      const searchMatch =
        !q ||
        (item.title || "").toLowerCase().includes(q) ||
        (item.description || "").toLowerCase().includes(q) ||
        (item.category || "").toLowerCase().includes(q);

      return categoryMatch && searchMatch;
    });
  }, [allBlogs, menu, search]);

  const categories = ["All", "Technology", "Startup", "Lifestyle"];
  const categoryStyles = {
    Technology: "bg-indigo-100 text-indigo-700",
    Startup: "bg-amber-100 text-amber-700",
    Lifestyle: "bg-rose-100 text-rose-700",
  };

  // ---- Comment handlers ----

  const openComments = async (e, id) => {
    e.preventDefault(); // don't follow the card's Link
    e.stopPropagation();
    setActiveCommentId(id);

    if (!commentsMap[id]) {
      setLoadingComments(true);
      try {
        const res = await axios.get(`/api/blog/${id}/comments`);
        const list = res.data.comments || [];
        setCommentsMap((prev) => ({ ...prev, [id]: list }));
        setCountsMap((prev) => ({ ...prev, [id]: list.length }));
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        setCommentsMap((prev) => ({ ...prev, [id]: [] }));
      } finally {
        setLoadingComments(false);
      }
    }
  };

  const closeComments = () => {
    setActiveCommentId(null);
    setCommentName("");
    setCommentText("");
  };

  const handlePostComment = async (e, id) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    setPostingComment(true);
    try {
      const res = await axios.post(`/api/blog/${id}/comments`, {
        name: commentName,
        message: commentText,
      });

      const newComment = res.data.comment || {
        id: crypto.randomUUID(),
        name: commentName,
        message: commentText,
        createdAt: new Date().toISOString(),
      };

      setCommentsMap((prev) => ({
        ...prev,
        [id]: [newComment, ...(prev[id] || [])],
      }));
      setCountsMap((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 1,
      }));
      setCommentName("");
      setCommentText("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setPostingComment(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-5 py-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900">Explore Our Blogs</h2>
        <p className="text-gray-500 mt-3">
          Discover the latest articles, tutorials, and insights.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-xl">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-5 py-3 rounded-full border border-gray-300 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setMenu(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer
              ${
                menu === category
                  ? "bg-black text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="mb-8 text-center text-gray-500">
        Showing{" "}
        <span className="font-semibold text-black">{filteredBlogs.length}</span>{" "}
        blog{filteredBlogs.length !== 1 && "s"}
      </div>

      {/* Blog Grid */}
      {filteredBlogs.length > 0 ? (
        <motion.div
          key={`${menu}-${search}`}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredBlogs.map((item, index) => {
            const id = item._id || item.id || index;
            const imgSrc = item.image || "/Assets/placeholder.png";
            const commentCount = countsMap[id] ?? item.commentsCount ?? 0;

            return (
              <motion.div
                key={id}
                variants={card}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <Link
                  href={`/blogs/${id}`}
                  className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={item.title || "Blog"}
                      fill
                      sizes="(max-width:768px)100vw,(max-width:1200px)50vw,25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {item.category && (
                      <span
                        className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow ${
                          categoryStyles[item.category] ||
                          "bg-white text-gray-700"
                        }`}
                      >
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="mb-3 line-clamp-2 text-lg font-bold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-indigo-600">
                        Read More
                      </span>

                      <div className="flex items-center gap-4">
                        {/* Comment trigger — stops the Link navigation */}
                        <button
                          onClick={(e) => openComments(e, id)}
                          className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />
                          {commentCount}
                        </button>

                        <ArrowUpRight className="h-5 w-5 text-indigo-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="py-24 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-700">
            No blogs found
          </h3>
          <p className="text-gray-500 mt-2">
            Try searching with another keyword.
          </p>
        </div>
      )}

      {/* Comments Modal */}
      <AnimatePresence>
        {activeCommentId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={closeComments}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[80vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                  <MessageCircle className="h-5 w-5 text-indigo-600" />
                  Comments ({countsMap[activeCommentId] ?? 0})
                </h3>
                <button
                  onClick={closeComments}
                  className="text-gray-400 hover:text-gray-700"
                  aria-label="Close comments"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Comment form */}
              <form
                onSubmit={(e) => handlePostComment(e, activeCommentId)}
                className="border-b border-gray-100 px-5 py-4"
              >
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="mb-3 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-indigo-500"
                  required
                />
                <textarea
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={2}
                  className="mb-3 w-full resize-none rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-indigo-500"
                  required
                />
                <button
                  type="submit"
                  disabled={postingComment}
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  {postingComment ? "Posting..." : "Post Comment"}
                </button>
              </form>

              {/* Comment list */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {loadingComments ? (
                  <p className="text-sm text-gray-400">Loading comments...</p>
                ) : (commentsMap[activeCommentId] || []).length > 0 ? (
                  (commentsMap[activeCommentId] || []).map((c) => (
                    <div
                      key={c.id || c._id}
                      className="rounded-xl border border-gray-100 bg-gray-50 p-3"
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-900">
                          {c.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {c.createdAt
                            ? new Date(c.createdAt).toLocaleDateString()
                            : ""}
                        </span>
                      </div>
                      <p className="text-sm leading-6 text-gray-600">
                        {c.message}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">
                    No comments yet — be the first to share your thoughts.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogList;

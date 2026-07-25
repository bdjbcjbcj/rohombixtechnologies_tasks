"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Search,
  Mail,
  RefreshCw,
  MailOpen,
  Circle,
} from "lucide-react";

type Contact = {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

const AdminContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterUnread, setFilterUnread] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/contacts", {
        params: filterUnread ? { unread: true } : {},
      });
      setContacts(res.data.contacts || []);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterUnread]);

  const filteredContacts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return contacts;

    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.message.toLowerCase().includes(q)
    );
  }, [contacts, search]);

  const handleToggleExpand = async (contact: Contact) => {
    const opening = expandedId !== contact._id;
    setExpandedId(opening ? contact._id : null);

    // mark as read the first time it's opened
    if (opening && !contact.read) {
      try {
        await axios.patch(`/api/admin/contacts/${contact._id}`, {
          read: true,
        });
        setContacts((prev) =>
          prev.map((c) =>
            c._id === contact._id ? { ...c, read: true } : c
          )
        );
      } catch (error) {
        console.error("Failed to mark as read:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete(`/api/admin/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Failed to delete contact:", error);
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <section className="max-w-5xl mx-auto px-5 py-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Mail className="h-7 w-7 text-indigo-600" />
            Contact Messages
          </h1>
          <p className="text-gray-500 mt-1">
            {contacts.length} message{contacts.length !== 1 && "s"}
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-600">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterUnread((prev) => !prev)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
              filterUnread
                ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {filterUnread ? "Showing unread" : "All messages"}
          </button>

          <button
            onClick={fetchContacts}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search by name, email, or message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">
          Loading messages...
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="py-20 text-center">
          <div className="text-5xl mb-3">📭</div>
          <p className="text-gray-500">No messages found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredContacts.map((c) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                className={`rounded-2xl border bg-white shadow-sm transition-colors ${
                  c.read ? "border-gray-200" : "border-indigo-200 bg-indigo-50/30"
                }`}
              >
                {/* Row header */}
                <button
                  onClick={() => handleToggleExpand(c)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left"
                >
                  <span className="shrink-0">
                    {c.read ? (
                      <MailOpen className="h-4 w-4 text-gray-300" />
                    ) : (
                      <Circle className="h-2.5 w-2.5 fill-indigo-600 text-indigo-600" />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-sm ${
                          c.read
                            ? "font-medium text-gray-700"
                            : "font-bold text-gray-900"
                        }`}
                      >
                        {c.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {c.email}
                      </span>
                    </div>
                    {expandedId !== c._id && (
                      <p className="truncate text-sm text-gray-500 mt-0.5">
                        {c.message}
                      </p>
                    )}
                  </div>

                  <span className="shrink-0 text-xs text-gray-400 whitespace-nowrap">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {expandedId === c._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-gray-100"
                    >
                      <div className="px-5 py-4">
                        <p className="text-sm leading-6 text-gray-700 whitespace-pre-wrap">
                          {c.message}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <a
                            href={`mailto:${c.email}`}
                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                          >
                            Reply via email
                          </a>

                          {confirmId === c._id ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDelete(c._id)}
                                disabled={deletingId === c._id}
                                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                              >
                                {deletingId === c._id
                                  ? "Deleting..."
                                  : "Confirm delete"}
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
                              className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default AdminContactsPage;
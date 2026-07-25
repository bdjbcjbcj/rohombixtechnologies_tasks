"use client";

import SubsTableItem from "@/components/AdminComponents/SubsTableItem";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Search, Mail, Users, Loader2,  } from "lucide-react";

interface Subscriber {
  _id: string;
  email: string;
  Date: string;
}

export default function Page() {
  const [emails, setEmails] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchEmails = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/email");

      if (res.data.success) {
        setEmails(res.data.subscribers);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  const deleteEmail = async (id: string) => {
    try {
      const res = await axios.delete(`/api/email?id=${id}`);

      if (res.data.success) {
        toast.success(res.data.message);

        setEmails((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const filteredEmails = useMemo(() => {
    return emails.filter((item) =>
      item.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [emails, search]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Email Subscriptions
          </h1>

          <p className="text-slate-500 mt-1">
            Manage all newsletter subscribers.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500 text-sm">Total Subscribers</p>

              <h2 className="text-4xl font-bold mt-2">{emails.length}</h2>
            </div>

            <div className="w-14 h-14 rounded-xl bg-cyan-100 flex items-center justify-center">
              <Users className="text-cyan-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left px-6 py-4">Subscriber</th>

              <th className="text-left px-6 py-4">Date</th>

              <th className="text-center px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="py-20 text-center">
                  <Loader2 className="animate-spin mx-auto text-cyan-500" />

                  <p className="mt-4 text-slate-500">Loading...</p>
                </td>
              </tr>
            ) : filteredEmails.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-20 text-center">
                  <Mail className="mx-auto text-slate-300" size={45} />

                  <h3 className="mt-4 font-semibold">No Subscribers Found</h3>
                </td>
              </tr>
            ) : (
              filteredEmails.map((item) => (
                <SubsTableItem
                  key={item._id}
                  id={item._id}
                  email={item.email}
                  Date={item.Date}
                  deleteEmail={deleteEmail}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

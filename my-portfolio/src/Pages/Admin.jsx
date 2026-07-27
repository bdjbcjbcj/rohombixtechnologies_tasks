import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        "http://localhost:3000/api/website/enquiry/View",
        {
          headers: { Authorization: token },
        }
      );
      setData(res.data.EnquiryList || []);
    } catch (err) {
      setError("Failed to load enquiries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auth guard: redirect to login if no token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/admin/login";
    } else {
      getData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 px-4 pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition duration-300 cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* States */}
      {loading && (
        <p className="text-gray-400 text-center mt-20">Loading enquiries...</p>
      )}
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Enquiry Cards */}
      {!loading && !error && data.length === 0 && (
        <p className="text-gray-400 text-center mt-20">No enquiries found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-md hover:border-blue-500 transition duration-300"
          >
            <h3 className="text-white font-semibold text-lg mb-1">{item.name}</h3>
            <p className="text-blue-400 text-sm mb-2">{item.email}</p>
            <p className="text-gray-300 text-sm leading-relaxed">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
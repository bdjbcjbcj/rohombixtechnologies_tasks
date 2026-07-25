"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Registration Successful");

      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-6 py-12">
      <ToastContainer theme="dark" />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Admin<span className="text-cyan-400">Panel</span>
          </h1>

          <p className="text-gray-400 mt-2">
            Create your account and start renting.
          </p>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-gray-300 text-sm mb-2 block">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#1F2937] text-white rounded-xl py-3 pl-12 pr-4 border border-gray-700 outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm mb-2 block">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#1F2937] text-white rounded-xl py-3 pl-12 pr-4 border border-gray-700 outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 text-sm mb-2 block">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#1F2937] text-white rounded-xl py-3 pl-12 pr-4 border border-gray-700 outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-gray-300 text-sm mb-2 block">
                Confirm Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type="password"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-[#1F2937] text-white rounded-xl py-3 pl-12 pr-4 border border-gray-700 outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
            >
              {loading ? "Creating..." : "Create Account"}
              {!loading && <ArrowRight size={18} />}
            </button>

            <p className="text-center text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

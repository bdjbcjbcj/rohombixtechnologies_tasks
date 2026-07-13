import { useState } from "react";
import { Link,useNavigate, useLocation } from "react-router-dom";

import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
const location = useLocation();

const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setIsSubmitting(true);

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // Save JWT Token
    localStorage.setItem("token", data.token);

    // Save User Data
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login Successful!");

    // Redirect to previous page or dashboard
    navigate(from === "/" ? "/dashboard" : from, {
      replace: true,
    });

//     navigate(from === "/" ? "/packages/"  : from, {
//   replace: true,
// });



  } catch (error) {
    console.error("Login Error:", error);
    alert("Server Error");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex bg-blue-100 p-4 rounded-full mb-4">
              <LogIn className="text-blue-600" size={28} />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>

            <p className="text-gray-600 mt-2">
              Sign in to continue your travel journey.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border rounded-xl p-4 pl-11 focus:outline-none focus:ring-2 transition ${
                    errors.email
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full border rounded-xl p-4 pl-11 pr-11 focus:outline-none focus:ring-2 transition ${
                    errors.password
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl flex justify-center items-center gap-2 transition"
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
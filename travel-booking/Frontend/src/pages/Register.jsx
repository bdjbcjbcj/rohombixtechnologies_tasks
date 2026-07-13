import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    let timer;

    if (showOTPModal && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [showOTPModal, countdown]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "Accept Terms & Conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setOtpLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationId(data.verificationId);
        setShowOTPModal(true);
        alert("OTP sent successfully.");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Unable to send OTP.");
    }

    setOtpLoading(false);
  };

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      alert("Enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          verificationId,
          otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowOTPModal(false);

        registerUser();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("OTP verification failed.");
    }
  };

  const resendOTP = async () => {
    try {
      setResendLoading(true);

      const response = await fetch("http://localhost:5000/api/otp/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationId(data.verificationId);
        setCountdown(60);

        alert("OTP sent again.");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }

    setResendLoading(false);
  };

  const registerUser = async () => {
    setRegisterLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful!");

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "user",
        });

        setOtp("");
        setVerificationId("");
        setShowOTPModal(false);
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }

    setRegisterLoading(false);
  };

  return (
    <section className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4">
            <UserPlus className="text-blue-600" size={30} />
          </div>

          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>

          <p className="text-gray-500 mt-2">
            Register to start your travel journey.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}

          <div>
            <label className="font-medium text-gray-700">Full Name</label>

            <div className="relative mt-1">
              <User className="absolute left-3 top-4 text-gray-400" size={18} />

              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}

          <div>
            <label className="font-medium text-gray-700">Email</label>

            <div className="relative mt-1">
              <Mail className="absolute left-3 top-4 text-gray-400" size={18} />

              <input
                type="email"
                name="email"
                placeholder="john@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}

          <div>
            <label className="font-medium text-gray-700">Password</label>

            <div className="relative mt-1">
              <Lock className="absolute left-3 top-4 text-gray-400" size={18} />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="******"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-xl pl-10 pr-10 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}

          <div>
            <label className="font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative mt-1">
              <Lock className="absolute left-3 top-4 text-gray-400" size={18} />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="******"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-xl pl-10 pr-10 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-4"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          {/* Role */}

          <div>
            <label className="font-medium text-gray-700">Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Terms */}

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />

              <span className="text-sm">I agree to the Terms & Conditions</span>
            </label>

            {errors.agreeTerms && (
              <p className="text-red-500 text-sm">{errors.agreeTerms}</p>
            )}
          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={otpLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 transition"
          >
            {otpLoading ? "Sending OTP..." : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      {showOTPModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-[420px] p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-center">
              Email Verification
            </h2>

            <p className="text-center text-gray-500 mt-3">OTP sent to</p>

            <p className="text-center font-semibold text-blue-600">
              {formData.email}
            </p>

            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full border rounded-xl p-3 mt-6 text-center text-2xl tracking-[12px]"
            />

            <button
              onClick={verifyOTP}
              disabled={registerLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 mt-6"
            >
              {registerLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center mt-4">
              {countdown > 0 ? (
                <p className="text-gray-500">Resend OTP in {countdown}s</p>
              ) : (
                <button
                  onClick={resendOTP}
                  disabled={resendLoading}
                  className="text-blue-600 font-semibold"
                >
                  {resendLoading ? "Sending..." : "Resend OTP"}
                </button>
              )}
            </div>

            <button
              onClick={() => {
                setShowOTPModal(false);
                setOtp("");
              }}
              className="w-full mt-5 text-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Register;

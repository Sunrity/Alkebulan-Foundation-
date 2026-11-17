import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import api from "../lib/axios";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Load saved email if 'Remember me' was checked previously
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Persist email if 'Remember me' is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Persist auth tokens and user information
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Trigger success state for animation delay
      setIsSuccess(true);

      setTimeout(() => {
        if (user?.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          // Route logged-in students directly to view available courses
          navigate("/courses");
        }
      }, 800);

    } catch (err: unknown) {
      setError(
        (axios.isAxiosError<{ message?: string }>(err)
          ? err.response?.data?.message
          : undefined) || "Login failed. Please check your credentials."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center pt-16 sm:pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors underline decoration-indigo-200 underline-offset-2"
          >
            Create an account
          </Link>
        </p>
      </motion.div>

      {/* Login Card Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-6 sm:py-8 px-4 sm:px-10 shadow-lg rounded-2xl sm:rounded-xl border border-gray-100">
          {/* Error Alert */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs sm:text-sm overflow-hidden"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-5 sm:space-y-6" onSubmit={handleLogin}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="appearance-none block w-full px-3.5 py-2.5 sm:py-2 border border-gray-300 rounded-xl sm:rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xs sm:text-sm text-gray-900 transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative rounded-xl sm:rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="appearance-none block w-full px-3.5 py-2.5 sm:py-2 pr-10 border border-gray-300 rounded-xl sm:rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xs sm:text-sm text-gray-900 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 sm:h-5 w-4 sm:w-5" />
                  ) : (
                    <Eye className="h-4 sm:h-5 w-4 sm:w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="-mt-3 text-right">
              <Link
                to="/forgot-password"
                className="text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-xs sm:text-sm text-gray-900 cursor-pointer select-none"
                >
                  Remember my email
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading || isSuccess}
                className={`w-full flex justify-center items-center py-2.5 sm:py-2.5 px-4 border border-transparent rounded-xl sm:rounded-md shadow-sm text-xs sm:text-sm font-medium text-white transition-all duration-200 ${
                  isSuccess
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                } disabled:opacity-75`}
              >
                {isSuccess ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 sm:h-5 w-4 sm:w-5 animate-bounce" />
                    Success! Redirecting to courses...
                  </span>
                ) : loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 sm:h-5 w-4 sm:w-5 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          {/* Quick Registration Footer Link */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              New student?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGithub,
  FaEnvelope,
  FaLock,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";

import { loginSchema } from "../../validation/authSchema";
import type { LoginSchema } from "../../validation/authSchema";
import { login } from "../../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await login(data);

      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem("token", response.token);
      storage.setItem("userId", response.user.id);
      storage.setItem("name", response.user.name);
      storage.setItem("email", response.user.email);
      storage.setItem("role", response.user.role ?? "USER");
      storage.setItem("avatar", response.user.avatar ?? "");

      setLoginSuccess(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error: any) {
      console.error(error);

      setErrorMessage(
        error?.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (loginSuccess) {
    return (
      <div className="py-16 text-center animate-fadeIn">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <FaCheckCircle className="h-10 w-10 text-green-600" />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-gray-800">
          Login Successful
        </h2>

        <p className="mt-2 text-gray-500">
          Redirecting to your dashboard...
        </p>

        <div className="mx-auto mt-8 h-2 w-48 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-6 ${
        isLoading ? "pointer-events-none opacity-80" : ""
      }`}
    >
      {/* Error Message */}

      {errorMessage && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 animate-slideDown">
          <FaExclamationTriangle className="text-red-500" />
          <span className="text-sm">{errorMessage}</span>
        </div>
      )}

      {/* Email */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Email Address
        </label>

        <div className="group relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-blue-600">
            <FaEnvelope className="h-4 w-4" />
          </div>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={`w-full rounded-xl border ${
              errors.email ? "border-red-300" : "border-gray-300"
            } bg-white/70 pl-10 pr-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
          />
        </div>

        {errors.email && (
          <p className="mt-2 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Password
        </label>

        <div className="group relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-blue-600">
            <FaLock className="h-4 w-4" />
          </div>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
            className={`w-full rounded-xl border ${
              errors.password ? "border-red-300" : "border-gray-300"
            } bg-white/70 pl-10 pr-12 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-blue-600"
          >
            {showPassword ? (
              <FaEyeSlash className="h-4 w-4" />
            ) : (
              <FaEye className="h-4 w-4" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="mt-2 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Remember Me + Forgot Password */}

<div className="flex items-center justify-between">
  <label className="flex items-center gap-2 text-sm text-slate-600">
    <input
      type="checkbox"
      checked={rememberMe}
      onChange={(e) => setRememberMe(e.target.checked)}
      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
    />
    Remember Me
  </label>

  <Link
    to="/forgot-password"
    className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
  >
    Forgot Password?
  </Link>
</div>

{/* Login Button */}

<button
  type="submit"
  disabled={isSubmitting || isLoading}
  className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-60"
>
  <span className="relative z-10 flex items-center justify-center gap-2">
    {isSubmitting || isLoading ? (
      <>
        <FaSpinner className="h-4 w-4 animate-spin" />
        Logging in...
      </>
    ) : (
      <>
        <FaCheckCircle className="h-4 w-4" />
        Login
      </>
    )}
  </span>
</button>
            {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>

        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-slate-500">
            OR CONTINUE WITH
          </span>
        </div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-300 hover:shadow-md"
        >
          <FaGoogle className="text-red-500" />
          Google
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md"
        >
          <FaGithub className="text-slate-800" />
          GitHub
        </button>
      </div>

      {/* Register Link */}
      <div className="pt-2 text-center">
        <p className="text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
          >
            Create one now
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
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
  FaSpinner
} from "react-icons/fa";

import { loginSchema } from "../../validation/authSchema";
import type { LoginSchema } from "../../validation/authSchema";
import { login } from "../../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await login(data);

// Save authentication
localStorage.setItem("token", response.token);

// Save logged-in user
localStorage.setItem("userId", response.user.id);
localStorage.setItem("name", response.user.name);
localStorage.setItem("email", response.user.email);

await new Promise((resolve) => setTimeout(resolve, 500));

navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200">
            <FaEnvelope className="w-4 h-4" />
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={`w-full rounded-xl border ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            } bg-white/50 backdrop-blur-sm pl-10 pr-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300`}
          />
        </div>
        {errors.email && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <span className="text-xs">⚠</span>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200">
            <FaLock className="w-4 h-4" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
            className={`w-full rounded-xl border ${
              errors.password ? 'border-red-300' : 'border-gray-300'
            } bg-white/50 backdrop-blur-sm pl-10 pr-12 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <span className="text-xs">⚠</span>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Remember & Forgot */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer group">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all duration-200 cursor-pointer"
          />
          <span className="group-hover:text-gray-800 transition-colors duration-200">
            Remember Me
          </span>
        </label>

        <Link
          to="/forgot-password"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isSubmitting || isLoading ? (
            <>
              <FaSpinner className="w-4 h-4 animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              <FaCheckCircle className="w-4 h-4" />
              Login
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">OR</span>
        </div>
      </div>

      {/* Social Login */}
      <div className="space-y-3">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-200 bg-white py-3 font-medium text-gray-700 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group"
        >
          <FaGoogle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
          Continue with Google
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-200 bg-white py-3 font-medium text-gray-700 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group"
        >
          <FaGithub className="w-5 h-5 text-gray-800 group-hover:scale-110 transition-transform" />
          Continue with GitHub
        </button>
      </div>

      {/* Register Link */}
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
        >
          Create one now
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
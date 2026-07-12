import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";

import { loginSchema } from "../../validation/authSchema";
import type { LoginSchema } from "../../validation/authSchema";
import { login } from "../../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
  try {
    const response = await login(data);

    localStorage.setItem(
      "token",
      response.token
    );

    alert("Login Successful!");

    navigate("/dashboard");
  } catch (error: any) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Login failed"
    );
  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Email */}

      <div>
        <label className="mb-2 block font-medium">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}

      <div>
        <label className="mb-2 block font-medium">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            {...register("password")}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-4"
          >
            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Remember */}

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input type="checkbox" />

          Remember Me
        </label>

        <Link
          to="/forgot-password"
          className="text-blue-600 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Login */}

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      {/* Divider */}

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-300" />

        <span className="text-gray-500">
          OR
        </span>

        <div className="h-px flex-1 bg-gray-300" />
      </div>

      {/* Google */}

      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-xl border py-3 hover:bg-gray-100"
      >
        <FaGoogle />

        Continue with Google
      </button>

      {/* GitHub */}

      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-xl border py-3 hover:bg-gray-100"
      >
        <FaGithub />

        Continue with GitHub
      </button>

      {/* Register */}

      <p className="text-center">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-blue-600 hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
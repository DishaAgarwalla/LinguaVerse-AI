import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";

import { register as registerUser } from "../../services/authService";

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        name: data.fullName,
        email: data.email,
        password: data.password,
      });

      alert("Registration Successful!");

      navigate("/login");
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Full Name */}

      <div>
        <label className="block mb-2 font-medium">
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter your full name"
          {...register("fullName", {
            required: "Full name is required",
          })}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        {errors.fullName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Email */}

      <div>
        <label className="block mb-2 font-medium">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
          })}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}

      <div>
        <label className="block mb-2 font-medium">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters",
              },
            })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}

      <div>
        <label className="block mb-2 font-medium">
          Confirm Password
        </label>

        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value) =>
                value === password ||
                "Passwords do not match",
            })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-4"
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700"
      >
        {isSubmitting
          ? "Creating Account..."
          : "Create Account"}
      </button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-300" />
        <span className="text-sm text-gray-500">
          OR
        </span>
        <div className="h-px flex-1 bg-gray-300" />
      </div>

      <button
        type="button"
        className="w-full border rounded-xl py-3 flex items-center justify-center gap-3"
      >
        <FaGoogle />
        Continue with Google
      </button>

      <button
        type="button"
        className="w-full border rounded-xl py-3 flex items-center justify-center gap-3"
      >
        <FaGithub />
        Continue with GitHub
      </button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 font-semibold"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
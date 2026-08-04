import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  FaEnvelope,
  FaSpinner,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

interface ForgotPasswordData {
  email: string;
}

const ForgotPasswordForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>();

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      setIsLoading(true);

      // TODO: Replace with API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log(data);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="animate-fadeIn py-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-300">
          <FaCheckCircle className="h-8 w-8" />
        </div>

        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          Check Your Email
        </h3>

        <p className="mt-2 text-gray-600 dark:text-slate-400">
          We've sent a password reset link to your email address.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
        >
          <FaArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="mb-8 text-center">
        <p className="text-sm text-gray-600 dark:text-slate-400">
          Enter your registered email address and we'll send you a link to
          reset your password.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
          Email Address
        </label>

        <div className="group relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-blue-600 dark:text-slate-500 dark:group-focus-within:text-blue-400">
            <FaEnvelope className="h-4 w-4" />
          </div>

          <input
            type="email"
            placeholder="Enter your registered email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={`w-full rounded-xl border ${
              errors.email
                ? "border-red-300 dark:border-red-500"
                : "border-gray-300 dark:border-slate-700"
            } bg-white/50 py-3 pl-10 pr-4 outline-none backdrop-blur-sm transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-blue-500`}
          />
        </div>

        {errors.email && (
          <p className="mt-1.5 flex items-center gap-1 text-sm text-red-500">
            <span className="text-xs">⚠</span>
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <FaSpinner className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <FaEnvelope className="h-4 w-4" />
              Send Reset Link
            </>
          )}
        </span>

        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
      </button>

      <p className="text-center text-sm text-gray-600 dark:text-slate-400">
        Remember your password?{" "}
        <Link
          to="/login"
          className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
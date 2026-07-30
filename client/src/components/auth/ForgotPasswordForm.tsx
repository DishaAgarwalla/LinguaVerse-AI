import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEnvelope, FaSpinner, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
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
      <div className="text-center py-8 animate-fadeIn">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
          <FaCheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Check Your Email</h3>
        <p className="mt-2 text-gray-600">
          We've sent a password reset link to your email address.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline transition-colors duration-200"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-600 text-sm">
          Enter your registered email address and we'll send you a link to reset your password.
        </p>
      </div>

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
            placeholder="Enter your registered email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
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

      <button
        type="submit"
        disabled={isLoading}
        className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <FaSpinner className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <FaEnvelope className="w-4 h-4" />
              Send Reset Link
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </button>

      <p className="text-center text-sm">
        Remember your password?{" "}
        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
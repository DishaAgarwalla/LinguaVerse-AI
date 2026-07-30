import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { 
  FaEye, 
  FaEyeSlash, 
  FaGoogle, 
  FaGithub,
  FaUser,
  FaEnvelope,
  FaLock,
  FaCheckCircle,
  FaSpinner
} from "react-icons/fa";

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
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      await registerUser({
        name: data.fullName,
        email: data.email,
        password: data.password,
      });

      // Success animation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      alert("Registration Successful! Please login.");
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200">
            <FaUser className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Enter your full name"
            {...register("fullName", {
              required: "Full name is required",
            })}
            className={`w-full rounded-xl border ${
              errors.fullName ? 'border-red-300' : 'border-gray-300'
            } bg-white/50 backdrop-blur-sm pl-10 pr-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300`}
          />
        </div>
        {errors.fullName && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <span className="text-xs">⚠</span>
            {errors.fullName.message}
          </p>
        )}
      </div>

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
            placeholder="Create password (8+ characters)"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)/,
                message: "Must contain letters and numbers",
              },
            })}
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
        {/* Password strength indicator */}
        {password && password.length > 0 && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  password.length < 4 ? 'w-1/3 bg-red-500' :
                  password.length < 8 ? 'w-2/3 bg-yellow-500' :
                  'w-full bg-green-500'
                }`}
              />
            </div>
            <span className="text-xs font-medium text-gray-500">
              {password.length < 4 ? 'Weak' :
               password.length < 8 ? 'Medium' :
               'Strong'}
            </span>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200">
            <FaLock className="w-4 h-4" />
          </div>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className={`w-full rounded-xl border ${
              errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
            } bg-white/50 backdrop-blur-sm pl-10 pr-12 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            {showConfirm ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <span className="text-xs">⚠</span>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Terms */}
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="terms"
          className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all duration-200 cursor-pointer"
          required
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          I agree to the{" "}
          <a href="#" className="text-blue-600 hover:underline font-medium">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline font-medium">
            Privacy Policy
          </a>
        </label>
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
              Creating Account...
            </>
          ) : (
            <>
              <FaCheckCircle className="w-4 h-4" />
              Create Account
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

      {/* Social Registration */}
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

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
        >
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
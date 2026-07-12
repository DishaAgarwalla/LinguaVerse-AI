import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

interface ForgotPasswordData {
  email: string;
}

const ForgotPasswordForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>();

  const onSubmit = (data: ForgotPasswordData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >

      <div>

        <label className="block mb-2 font-medium">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your registered email"
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

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
      >
        Send Reset Link
      </button>

      <p className="text-center">

        Remember your password?{" "}

        <Link
          to="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
        </Link>

      </p>

    </form>
  );
};

export default ForgotPasswordForm;
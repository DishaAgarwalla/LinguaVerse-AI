import AuthLayout from "../../components/auth/AuthLayout";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="We'll help you recover your account"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
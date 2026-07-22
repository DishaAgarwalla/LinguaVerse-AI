import AuthLayout from "../../components/auth/AuthLayout";
import RegisterForm from "../../components/auth/RegisterForm";

const Register = () => {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join LinguaVerse AI and break language barriers"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
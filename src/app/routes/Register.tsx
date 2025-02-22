import { registerUser } from '@/services/user';
import AuthForm from '../../components/AuthForm';
import { User } from 'firebase/auth';

interface RegisterProps {
  updateUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Register = ({ updateUser }: RegisterProps) => (
  <AuthForm
    updateUser={updateUser}
    authFn={registerUser}
    headerText='Register to your account'
    buttonText='Register'
    linkQuestion='Already have an account?'
    linkText='Log in'
    linkPath='/auth/login'
    successRedirectPath='/auth/verification-reminder'
  />
);

export default Register;

import AuthForm from '@/components/AuthForm';
import { loginUser } from '@/services/user';
import { User } from 'firebase/auth';

interface LoginProps {
  updateUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Login = ({ updateUser }: LoginProps) => (
  <AuthForm
    updateUser={updateUser}
    authFn={loginUser}
    headerText='Log in to your account'
    formFor='Log in'
    linkQuestion="Don't have an account yet?"
    linkText='Register'
    linkPath='/auth/register'
    successRedirectPath='/notes'
  />
);

export default Login;

import AuthForm from '@/components/AuthForm';
import { loginUser } from '@/services/user';

const Login = () => (
  <AuthForm
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

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userCredentialSchema } from '@utils/schema';
import { NavLink, useNavigate } from 'react-router';
import { UserCredential } from '@/types';
import TextField from './TextField';
import { User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';

interface AuthFormProps {
  updateUser: React.Dispatch<React.SetStateAction<User | null>>;
  authFn: (user: UserCredential) => Promise<User>;
  headerText: string;
  formFor: 'Register' | 'Log in';
  linkQuestion: string;
  linkText: string;
  linkPath: string;
  successRedirectPath: '/notes' | '/auth/verification-reminder';
}

const AuthForm = ({
  updateUser,
  authFn,
  headerText,
  formFor,
  linkQuestion,
  linkText,
  linkPath,
  successRedirectPath,
}: AuthFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { handleSubmit, register } = useForm<UserCredential>({
    resolver: yupResolver(userCredentialSchema),
  });

  const navigate = useNavigate();

  const onFormSubmit: SubmitHandler<UserCredential> = async (user, event) => {
    try {
      event?.preventDefault();

      const firebaseUser = await authFn(user);

      navigate(successRedirectPath);
      updateUser(firebaseUser);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen gap-5'>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className='flex flex-col gap-6 max-w-xs w-full'
      >
        <h1 className='text-2xl font-bold max-w-xs w-full text-center'>
          {headerText}
        </h1>
        <TextField
          title='email'
          register={register}
        />
        <TextField
          title='password'
          register={register}
        />
        <button
          type='submit'
          className='btn btn-primary btn-lg'
        >
          {formFor}
        </button>
        <p>
          {linkQuestion}{' '}
          <NavLink
            to={linkPath}
            className='text-primary hover:underline'
          >
            {linkText}
          </NavLink>
        </p>
        {errorMessage && (
          <div
            role='alert'
            aria-invalid='true'
            aria-errormessage={errorMessage}
            className='text-error'
          >
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;

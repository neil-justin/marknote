import { User } from 'firebase/auth';
import { NavLink } from 'react-router';

interface VerificationReminderProps {
  user: User | null;
}

const VerificationReminder = ({ user }: VerificationReminderProps) => {
  if (!user) return;

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='flex flex-col items-center h-fit shadow-lg w-fit p-12 gap-4'>
        <h1 className='text-lg font-bold'>Verify your email to proceed</h1>
        <p className='text-center'>
          We just sent an email to the address: <i>{user.email}</i>
          <br />
          Please check your email and click on the link provided to verify your
          email
        </p>
        <p>
          Already verified your account?{' '}
          <NavLink
            to='/signin'
            className='text-primary'
          >
            Sign in
          </NavLink>{' '}
        </p>
      </div>
    </div>
  );
};

export default VerificationReminder;

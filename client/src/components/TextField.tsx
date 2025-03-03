import { UseFormRegister } from 'react-hook-form';
import { UserCredential } from '@/types';

interface TextFieldProps {
  title: 'email' | 'password';
  register: UseFormRegister<UserCredential>;
}

const TextField = ({ title, register }: TextFieldProps) => {
  if (title === 'email') {
    return (
      <fieldset className='fieldset text-base'>
        <legend className='fieldset-legend'>Email</legend>
        <input
          {...register('email')}
          type='email'
          className='input validator'
          required
          placeholder='johndoe@gmail.com'
        />
        <div className='validator-hint hidden text-sm'>
          Enter valid email address
        </div>
      </fieldset>
    );
  } else if (title === 'password') {
    return (
      <fieldset className='fieldset text-base'>
        <legend className='fieldset-legend'>Password</legend>
        <input
          {...register('password')}
          type='password'
          className='input validator'
          required
          placeholder='********'
          minLength={8}
          pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s]).{8,}'
        />
        <p className='validator-hint hidden text-sm'>
          Must be more than 8 characters, including
          <br />
          At least one number
          <br />
          At least one lowercase letter
          <br />
          At least one uppercase letter
          <br />
          At least one special character
        </p>{' '}
      </fieldset>
    );
  }
};

export default TextField;

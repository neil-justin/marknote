import * as yup from 'yup';

const userCredentialSchema = yup
  .object({
    email: yup.string().email('Must be a valid email address').required(),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .required(),
  })
  .required();

export { userCredentialSchema };

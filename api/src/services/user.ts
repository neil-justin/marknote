import User from '@/models/user';
import { User as UserBody, UserDoc } from '@/types';

const saveUser = async (user: UserBody): Promise<UserDoc> => {
  return await new User({ uid: user.uid, email: user.email }).save();
};

export default { saveUser };

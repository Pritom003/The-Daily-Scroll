
import { TUser } from './User.interface';
import User from './User.model';

const createUserDB = async ( payload: TUser) => {

  try {


      const newUser = await User.create(payload);
      return newUser
 
  } catch (err: any) {
    throw new Error(`Error in create User to DB: ${err.message}`);
  }
};

export const UserServices={
  createUserDB
}

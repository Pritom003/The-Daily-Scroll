import { Model } from "mongoose";



export type TUser= {
    _id: string;
    name: string;
    email: string;
    isBlocked: boolean;
    password: string;
    needsPasswordChange: boolean;
    role: 'admin' | 'user' ;
    isDeleted: boolean;
   
  };
  export interface UserModel extends Model<TUser> {
    isUserExistByemail(email: string): Promise<TUser | null>; 
    isPasswordmatched(plainPassword: string, hashPassword: string): Promise<boolean>;
    isUserBlocked(useremail: string): Promise<TUser | null>; 
  }
  

import config from '../../config';
import { TUser } from '../user/User.interface';
import User from '../user/User.model';
import { TLoginUser } from './Auth.interface';
// import jwt from 'jsonwebtoken';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { creatreToken } from './Auth.utils';
const createUserDB = async ( payload: TUser) => {

    try {
        if(!payload.password){
            payload.password=config.default_pass as string
        }
        const newUser = await User.create(payload);
        return newUser
   
    } catch (err: any) {
      throw new Error(`Error in create User to DB: ${err.message}`);
    }
  };

const Loginuserservice = async ( payload: TLoginUser) => {

// check one find the user in db
const user=await User.isUserExistByemail(payload.email)
if(!user){
    throw new Error(`The User is not registered`);
}
const BlockedUser=await User.isUserBlocked(payload.email)
if(BlockedUser){

    throw new Error(`The User is Blocked by admin`);
}
const isUserisDeleted=user?.isDeleted
if(isUserisDeleted){
    throw new Error(`The User is deleted`);
}

const correctPass= await User.isPasswordmatched(payload.password ,user?.password)
if(!correctPass){
    throw new Error(`Your Password is incorrect `);
}
const JwtPayload ={
    id:user._id,
    email:user.email,
    role:user.role
}

const accessToken =creatreToken(JwtPayload,config.access_token,
    config.access_expiredIn)
const refreshToken =creatreToken(JwtPayload,config.refresh_token,config.refresh_expiredIn_token)


return {
    refreshToken,
    accessToken,
   
    
}

};
  

const refreshToken = async ( token:string) => {

  
const decoded = jwt.verify(token, config.refresh_token);

const {email}=decoded as JwtPayload

const user = await User.isUserExistByemail(email)

if(!user){
    throw new Error(`The User is not registered`);
}
const BlockedUser=await User.isUserBlocked(email)
if(BlockedUser){

    throw new Error(`The User is Blocked by admin`);
}
const isUserisDeleted=user?.isDeleted
if(isUserisDeleted){
    throw new Error(`The User is deleted`);
}
const JwtPayload ={
    id:user._id,
    email:user.email,
    role:user.role
}

const accessToken =creatreToken(JwtPayload,config.access_token,
    config.access_expiredIn)
    return {
        accessToken
    }
}


export const AuthServices={
    createUserDB,
    Loginuserservice,refreshToken
}

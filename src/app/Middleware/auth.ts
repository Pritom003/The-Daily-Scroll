import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import CatchAsync from '../utils/fetch.async';
import config from '../config';
import User from '../modules/user/User.model';
const auth=(...requiredRoles: string[])=>{
    return CatchAsync(async(req:Request,res:Response ,
        next:NextFunction)=>
        
        {
        // console.log(req.headers.authorization,requiredRoles);
        const token =req.headers.authorization
        if(!token)
        {
            throw new Error(`Unauthorized User`);
        }

        const decoded = jwt.verify(token, config.access_token,);
      
        const {role,email}=decoded as JwtPayload
        const user=await User.isUserExistByemail(email)
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

 if(requiredRoles && !requiredRoles.includes(role)){
    throw new Error(`Unauthorized User`);
  }
     req.user=decoded as JwtPayload



     next()
        
        })
   
}
export default auth
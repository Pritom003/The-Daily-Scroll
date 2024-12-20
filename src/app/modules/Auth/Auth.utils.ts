
import Jwt from 'jsonwebtoken';
export const creatreToken=(
JwtPayload:{id:string ,email:string,role:string},
secret:string,expiredIn:string

)=>{
   return Jwt.sign(
        JwtPayload, secret,
         { expiresIn: expiredIn });
}
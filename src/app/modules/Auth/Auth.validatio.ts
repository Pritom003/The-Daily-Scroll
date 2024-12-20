import { z } from 'zod';


const LoggedInUserValSchema = z.object({
  body: z.object({
    email:z.string({required_error:'Id is required'}),
    password:z.string(),
  }),
});
const RefreshTokenValSchema = z.object({
  cookies: z.object({
    refreshToken:z.string({required_error:'RefreshToken is required'}),
 
  }),
});

export const AuthValidation = {
    LoggedInUserValSchema,RefreshTokenValSchema

};

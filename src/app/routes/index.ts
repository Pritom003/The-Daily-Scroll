import express from 'express';
import { userRoutes } from '../modules/user/User.router';
import { AuthRoutes } from '../modules/Auth/Auth.router';
import { BlogRoutes } from '../modules/Blog/Blog.router';
const router = express.Router();

const moduleRoutes=[
 {
    path:'/admin',
    route:userRoutes
 },
 {
   path:'/auth',
   route:AuthRoutes
},
 
{
  path:'/blogs',
  route:BlogRoutes
},
]
moduleRoutes.forEach(route=>router.use(route.path,route.route))




export default router
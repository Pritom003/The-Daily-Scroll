import express from 'express';
import { userRoutes } from '../modules/user/User.router';
import { AuthRoutes } from '../modules/Auth/Auth.router';
const router = express.Router();

const moduleRoutes=[
 {
    path:'/users',
    route:userRoutes
 },
 {
   path:'/auth',
   route:AuthRoutes
},
 

]
moduleRoutes.forEach(route=>router.use(route.path,route.route))




export default router
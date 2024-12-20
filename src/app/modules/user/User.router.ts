import express from 'express';
import { UserController } from './User.controller';
import auth from '../../Middleware/auth';
import validationRequest from '../../Middleware/ValidationRequest';
import { UserValidation } from './User.validation';
import { BlogValidationScheema } from '../Blog/Blog.validation';


// import StudentValidation  from '../students/student.validation';
const router = express.Router();
router.patch(
  '/users/:userId/block',auth('admin'), validationRequest(UserValidation.UpdateUserValSchema), UserController.BlockUserbyAdmin
);
router.delete(
  '/blogs/:id',auth('admin'),validationRequest(BlogValidationScheema.UpdateblogValidationSchema),UserController.DeleteBlogbyAdmin
);
// call the controller
router.get(
  '/',auth('admin'),UserController.getAllUsers
);
export const userRoutes = router;
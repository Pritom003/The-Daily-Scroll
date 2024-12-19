import express from 'express';
import validationRequest from '../../Middleware/ValidationRequest';
import { UserValidation } from './User.validation';
import { UserController } from './User.controller';


// import StudentValidation  from '../students/student.validation';
const router = express.Router();

// call the controller
router.post(
  '/create-user',validationRequest(UserValidation.CreateUserValSchema),UserController.createUser
);
export const userRoutes = router;
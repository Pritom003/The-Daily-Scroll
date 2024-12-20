import express from 'express';
import validationRequest from '../../Middleware/ValidationRequest';
import { AuthValidation } from './Auth.validatio';
import { UserValidation } from '../user/User.validation';
import { AuthController } from './Auth.controller';



// import StudentValidation  from '../students/student.validation';
const router = express.Router();

// call the controller
router.post(
    '/register',validationRequest(UserValidation.CreateUserValSchema),AuthController.RegisterUser
  );
router.post(
  '/login',validationRequest(AuthValidation.LoggedInUserValSchema),AuthController.LogInUser
);
router.post(
  '/refresh-token',validationRequest(AuthValidation.RefreshTokenValSchema),AuthController.RefreshToken
);
export const AuthRoutes = router;
import express from 'express';
import { UserController } from './User.controller';
import auth from '../../Middleware/auth';


// import StudentValidation  from '../students/student.validation';
const router = express.Router();

// call the controller
router.get(
  '/',auth('admin'),UserController.getAllUsers
);
export const userRoutes = router;
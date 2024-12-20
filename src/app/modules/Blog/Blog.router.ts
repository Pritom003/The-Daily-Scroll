import express from 'express';
import auth from '../../Middleware/auth';
import validationRequest from '../../Middleware/ValidationRequest';
import { BlogValidationScheema } from './Blog.validation';
import { BLogController } from './BLog.controller';


// import StudentValidation  from '../students/student.validation';
const router = express.Router();
router.post(
    '/blogs',auth('user'),validationRequest(BlogValidationScheema.createblogValidationSchema),BLogController.CreateBlog
  );
// call the controller
router.get(
  '/',auth('admin'),
);
export const BlogRoutes = router;
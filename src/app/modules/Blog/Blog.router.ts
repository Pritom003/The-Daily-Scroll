import express from 'express';
import auth from '../../Middleware/auth';
import validationRequest from '../../Middleware/ValidationRequest';
import { BlogValidationScheema } from './Blog.validation';
import { BLogController } from './BLog.controller';


// import StudentValidation  from '../students/student.validation';
const router = express.Router();
router.post(
    '/',auth('user'),validationRequest(BlogValidationScheema.createblogValidationSchema),BLogController.CreateBlog
  );
// call the controller
router.get(
  '/',BLogController.getAllBlogs
);

router.patch(
    '/:id',auth('user'),validationRequest(BlogValidationScheema.UpdateblogValidationSchema),BLogController.UpdateBlog
  );


  router.delete(
    '/:id',auth('user' ,'admin'),BLogController.DeleteBlog
  );
export const BlogRoutes = router;
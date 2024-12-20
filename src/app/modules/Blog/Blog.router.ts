import express from 'express';
import auth from '../../Middleware/auth';


// import StudentValidation  from '../students/student.validation';
const router = express.Router();

// call the controller
router.get(
  '/',auth('admin','user'),
);
export const BlogRoutes = router;
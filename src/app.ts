
import cors from 'cors';
import cookieParser from'cookie-parser'
import express, { Application,  Request, Response } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/Middleware/globalerrorHandler';
import notFound from './app/Middleware/NotFound';

const app: Application = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cookieParser())
app.use(cors());

// app Routes
app.use('/api', router);


// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Express app!');
});
app.use(globalErrorHandler);
app.use(notFound)
export default app;
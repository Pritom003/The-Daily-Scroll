
import cors from 'cors';
import express, { Application,  Request, Response } from 'express';
import router from './app/routes';

const app: Application = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// app Routes
app.use('/api/v1', router);


// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Express app!');
});


export default app;
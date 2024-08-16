import express, { Request, Response } from 'express';
import userRouter from './routes/user';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!')
});

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

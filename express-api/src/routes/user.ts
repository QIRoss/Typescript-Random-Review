import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'List of users' });
});

router.post('/', (req: Request, res: Response) => {
  const newUser = req.body;
  res.json({ message: 'User created', user: newUser });
});

export default router;

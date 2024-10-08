import express, { Request, Response } from 'express';
import userRouter from './routes/user';
import { Template } from './template';

const app = express();
const port = 3000;

const stringTemplate = new Template<string>();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!')
});

app.use('/users', userRouter);

app.post('/items', (req: Request, res: Response) => {
  const item = req.body.item;
  if (item && typeof item === 'string') {
    stringTemplate.addItem(item);
    res.status(201).json({ message: 'Item added successfully', item });
  } else {
    res.status(400).json({ message: 'Invalid item' });
  }
});

app.get('/items', (req: Request, res: Response) => {
  const items = stringTemplate.getItems();
  res.json({ items });
});

app.get('/items/:index', (req: Request, res: Response) => {
  const index = parseInt(req.params.index, 10);
  const item = stringTemplate.getItemByIndex(index);
  if (item !== null) {
    res.json({ item });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.delete('/items/:index', (req: Request, res: Response) => {
  const index = parseInt(req.params.index, 10);
  const removedItem = stringTemplate.removeItem(index);
  if (removedItem !== null) {
    res.json({ message: 'Item removed successfully', removedItem });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'David', age: 40 },
  { id: 5, name: 'Eve', age: 45 }
];

app.get('/usernames', (req: Request, res: Response) => {
  const usernames = users.map(user => user.name);
  res.json({ usernames });
});

app.get('/users/older-than/:age', (req: Request, res: Response) => {
  const age = parseInt(req.params.age, 10);
  const olderUsers = users.filter(user => user.age > age);
  res.json({ olderUsers });
});

app.get('/users/total-age', (req: Request, res: Response) => {
  const totalAge = users.reduce((total, user) => total + user.age, 0);
  res.json({ totalAge });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

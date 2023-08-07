import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await prisma.users.findMany();

  return res.send(users);
});

app.post('/users', async (req, res) => {});

app.listen(3003, () => {
  console.log('server 3003');
});

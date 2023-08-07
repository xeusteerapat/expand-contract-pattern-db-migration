import express from 'express';
import { PrismaClient } from '@prisma/client';
import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await prisma.users.findMany();

  return res.send(users);
});

app.post(
  '/users',
  validateRequest({
    body: z.object({
      name: z.string(),
      email: z.string(),
    }),
  }),
  async (req, res) => {}
);

app.listen(3003, () => {
  console.log('server 3003');
});

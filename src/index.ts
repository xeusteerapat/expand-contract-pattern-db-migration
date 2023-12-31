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
      fullname: z.string(),
      email: z.string(),
    }),
  }),
  async (req, res) => {
    const { fullname, email } = req.body;

    const newUser = await prisma.users.create({
      data: {
        fullname,
        email,
      },
    });

    return res.send(newUser);
  }
);

app.listen(3003, () => {
  console.log('server 3003');
});

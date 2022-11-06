import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { userRouter } from './user/user.router';
import { authRouter } from './auth/auth.router';
import { postRouter } from './post/post.router';
import { categoryRouter } from './category/category.router';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/category', categoryRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

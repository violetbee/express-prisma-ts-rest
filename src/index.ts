import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { authorRouter } from './author/author.router';
import { bookRouter } from './books/book.router';
import { authRouter } from './auth/auth.router';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/authors', authorRouter);
app.use('/api/books', bookRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

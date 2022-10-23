import { Response, Request, Router } from 'express';
import * as AuthService from './auth.service';

export const authRouter = Router();

authRouter.post('/', async (req: Request, res: Response) => {
  try {
    const authorInfo = req.body;
    const author = await AuthService.loginAuthor(authorInfo);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(401).json({ msg: 'Password is not correct' });
    }
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
});

import { Response, Request, Router } from 'express';
import * as AuthService from './auth.service';
import { checkAuth } from '../middleware/checkAuth';

export const authRouter = Router();

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const authorInfo = req.body as { email: string; password: string };
    const token = await AuthService.loginUser(authorInfo);
    if (token) {
      res.cookie('token', token, { httpOnly: true }).status(200).json({
        maxAge: 86400000, // 1 day
        message: 'Login successful',
      });
    } else {
      res.status(401).json({ msg: 'Password is not correct' });
    }
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
});

authRouter.get('/logout', checkAuth, async (req: Request, res: Response) => {
  try {
    res
      .clearCookie('token')
      .status(200)
      .json({ message: 'Successfully logged out 😏 🍀' });
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
});

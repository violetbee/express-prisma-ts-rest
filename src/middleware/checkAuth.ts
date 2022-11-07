import jwt, { JwtPayload } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export interface IGetUserAuthInfoRequest extends Request {
  user?: JwtPayload | string | { id: string; exp: number; iat: number };
}

export const checkAuth = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ msg: 'Unauthorized' });
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = decoded;
      next();
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

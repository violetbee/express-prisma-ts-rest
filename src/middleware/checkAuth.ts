//Cookies

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
    console.log(token);
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

// Headers

// import jwt, { JwtPayload } from 'jsonwebtoken';
// import type { Request, Response, NextFunction } from 'express';

// export interface IGetUserAuthInfoRequest extends Request {
//   token?: JwtPayload | string;
// }

// export const checkAuth = (
//   req: IGetUserAuthInfoRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
//     if (!token) {
//       throw new Error();
//     } else {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//       (req as IGetUserAuthInfoRequest).token = decoded;
//       next();
//     }
//   } catch (error: any) {
//     res.status(500).json({ msg: error.message });
//   }
// };

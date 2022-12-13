import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log(req.headers);
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as jwt.Secret);
    next();
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
};

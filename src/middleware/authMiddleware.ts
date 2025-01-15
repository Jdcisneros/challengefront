import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: Token not provided' });
    return 
  }

  const token = authHeader.split(' ')[1];
  try {
    const secretKey = process.env.JWT_SECRET || 'defaultsecret';
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    if (typeof decoded === 'object' && decoded.id && decoded.email) {
      (req as AuthRequest).user = { id: decoded.id, email: decoded.email };
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized: Invalid token' });
      return 
    }
  } catch (error) {
res.status(401).json({ message: 'Unauthorized: Invalid or expired token'});
return 
  }
};
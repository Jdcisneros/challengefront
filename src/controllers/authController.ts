import  dontenv  from 'dotenv';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';


dontenv.config()

const JWT_SECRET = process.env.JWT_SECRET || ''   ;

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const lowerCaseEmail = email.toLowerCase()

    const existingUser = await User.findOne({ where: { email:lowerCaseEmail } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return 
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
 
    const user = await User.create({ username, email, password: hashedPassword });  

    res.status(201).json({ message: 'User created', user });
    return 
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return 
    }

    const isPasswordValid = await bcrypt.compare(password, user.get('password') as string);
    if (!isPasswordValid) {
    res.status(401).json({ message: 'Invalid credentials' });
    return 
    }

    const token = jwt.sign(
      { id: user.get('id'), email: user.get('email') },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token, user: { id: user.get('id'), username: user.get('username') }, });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
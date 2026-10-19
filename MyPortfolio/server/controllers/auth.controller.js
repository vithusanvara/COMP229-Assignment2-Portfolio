import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { revoke } from '../middleware/auth.js';
export async function signin(req, res) {
  const { email, password } = req.body || {};
  if (typeof email !== 'string' || typeof password !== 'string')
    return res.status(400).json({ message: 'Email and password are required.' });
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
  if (!user || !await bcrypt.compare(password, user.password))
    return res.status(401).json({ message: 'Invalid email or password.' });
  const token = jwt.sign({}, process.env.JWT_SECRET, {
    jwtid: randomUUID(), subject: user.id, expiresIn: '1h', algorithm: 'HS256',
  });
  res.json({ token, user });
}
export function signout(req, res) {
  revoke(req.auth.token, req.auth.exp);
  res.json({ message: 'Signed out successfully.' });
}

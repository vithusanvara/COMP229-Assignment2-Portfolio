import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
// Demo logout revocation lasts until expiry or server restart.
const revoked = new Map();
export function revoke(token, exp) { revoked.set(token, exp); }
export async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.match(/^Bearer (.+)$/i)?.[1];
  if (!token) return res.status(401).json({ message: 'A Bearer token is required.' });
  try {
    const now = Date.now() / 1000;
    for (const [key, exp] of revoked) if (exp <= now) revoked.delete(key);
    const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    if (revoked.has(token)) return res.status(401).json({ message: 'Token has been signed out.' });
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: 'User no longer exists.' });
    req.auth = { user, token, exp: payload.exp };
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError' || err.name === 'CastError')
      return res.status(401).json({ message: 'Invalid or expired token.' });
    next(err);
  }
}

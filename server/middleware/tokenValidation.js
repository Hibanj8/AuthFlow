import db from '../models/index.js';

export function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: 'user not authenticated' })
  }
  try {
    const validToken = db.jwt.verify(token, db.secretKey)
    if (validToken) {
      req.user = {
        id: validToken.id,
        username: validToken.username,
        email: validToken.email
      };
      req.authenticated = true;
      console.log(req.user);
      return next();
    }
  } catch (err) {
    return res.status(400).json({error: err})
  }
}

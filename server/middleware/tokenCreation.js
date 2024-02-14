import db from '../models/index.js';

export const createToken = (user) => {
  const expiresIn = "1d";
  const token = db.jwt.sign({
    id: user._id,
    username: user.username,
    email: user.email
  }, db.secretKey, { expiresIn });
  return token;
};

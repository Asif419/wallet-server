import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: number; userEmail: string },
  secret: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: "1d",
  });
};

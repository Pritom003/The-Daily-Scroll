import Jwt from 'jsonwebtoken';

export const creatreToken = (
  JwtPayload: { id: string; email: string; role: string },
  secret: string,
  expiredIn: string
): string => {
  const token = Jwt.sign(JwtPayload, secret, { expiresIn: expiredIn });
  return `Bearer ${token}`;
};

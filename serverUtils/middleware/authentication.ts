import type { NextFetchEvent } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const authentication = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextFetchEvent
) => {
  const accesToken = req.headers['authorization']?.split(' ')[1];
  const refreshToken = req.headers['authorization']?.split(' ')[2];
  if (!accesToken) return res.status(403).json({ status: false });
  jwt.verify(accesToken, process.env.TOKEN as string, (err, result) => {
    if (err) {
      return res.status(403).json({ status: false });
    }
    return res.status(200).json({ status: true, result });
  });
};

export default authentication;

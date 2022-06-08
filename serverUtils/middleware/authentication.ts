import type { NextFetchEvent } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const authentication = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextFetchEvent
) => {
  const accesToken = req.headers['authorization']?.split(' ')[1];
  if (!accesToken) return res.status(403).json({ status: false });
};

export default authentication;

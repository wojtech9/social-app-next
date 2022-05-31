import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import { user } from '../../components/login/Login';

// Register user api

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userData: user = req.body;
    console.log(userData);
    userData.password = await bcrypt.hash(userData.password, 10);
    return res.status(200).json({
      status: true,
      payload: 'User successfully registered',
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: false });
  }
}

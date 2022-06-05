import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// interfaces

import user from '../../interfaces/User.interface';
import { NextApiRequest, NextApiResponse } from 'next';

// db imports

import dbConnection from '../../utils/dbConnect';
import { Users } from '../../models/Users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userData = req.body;

    if (!dbConnection.isInitialized) {
      await dbConnection.initialize();
    }
    const UsersRepository = dbConnection.getRepository(Users);
    const checkData: user | null = await UsersRepository.findOneBy({
      nickname: userData.nickname,
    });

    // checking password if user exists
    if (checkData) {
      const result = await bcrypt.compare(
        userData.password,
        checkData.password
      );
      // invalid password
      if (!result) {
        throw new Error('invalid password');
      }
      // correct password
      return res.status(200).json({ status: true });
    }
    // user doesn't exist
    else {
      throw new Error("User doesnt' exists");
    }
  } catch (e) {
    return res.status(500).json({ status: false });
  }
}

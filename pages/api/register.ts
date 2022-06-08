import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

// db imports

import dbConnection from '../../databaseUtils/dbConnect';
import { Users } from '../../databaseUtils/models/Users';

// interfaces
import user from '../../interfaces/User.interface';

// Register user api

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // init connection with db
    if (!dbConnection.isInitialized) {
      await dbConnection.initialize();
    }

    // hashing password
    const userData: user = req.body;
    userData.password = await bcrypt.hash(userData.password, 10);

    // inserting new user
    const newUser = new Users();
    newUser.nickname = userData.nickname;
    newUser.password = userData.password;
    const usersRepository = dbConnection.getRepository(Users);
    await usersRepository.save(newUser);

    return res.status(200).json({
      status: true,
      payload: 'User successfully registered',
    });
  } catch (e) {
    return res.status(500).json({ status: false });
  }
}

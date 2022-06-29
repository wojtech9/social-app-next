import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// interfaces

import user from '../../interfaces/User.interface';
import { NextApiRequest, NextApiResponse } from 'next';

// db imports

import dbConnection from '../../databaseUtils/dbConnect';
import { Users } from '../../databaseUtils/models/Users';

// tokens

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
    const checkData = await UsersRepository.findOneBy({
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

      // jwt authentication
      const accessToken = jwt.sign(
        { nickname: userData.nickname },
        process.env.TOKEN as string,
        {
          expiresIn: '2h',
        }
      );
      const refreshToken = jwt.sign(
        { nickname: userData.nickname },
        process.env.REFRESH_TOKEN as string
      );
      await UsersRepository.save({ id: checkData.id, refreshToken });
      return res.status(200).json({
        status: true,
        accessToken,
        refreshToken,
        nickname: userData.nickname,
      });
    }
    // user doesn't exist
    else {
      throw new Error("User doesnt' exists");
    }
  } catch (e) {
    return res.json({ status: false });
  }
}

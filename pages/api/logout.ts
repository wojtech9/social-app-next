// types
import { NextApiRequest, NextApiResponse } from 'next';

// utils

import dbConnection from '../../databaseUtils/dbConnect';
import { Users } from '../../databaseUtils/models/Users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!dbConnection.isInitialized) await dbConnection.initialize();
    const usersRepository = dbConnection.getRepository(Users);
    console.log(req.body);
    const checkData = await usersRepository.findOneBy({
      nickname: req.body,
    });
    if (checkData)
      await usersRepository.save({ id: checkData.id, refreshToken: '' });

    return res.status(200).json({ status: true });
  } catch (e) {
    console.log(e);
    return { status: false };
  }
}

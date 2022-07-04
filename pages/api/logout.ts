// types
import { NextApiRequest, NextApiResponse } from 'next';

// utils

import dbConnection from '../../databaseUtils/dbConnect';
import { Users } from '../../databaseUtils/models/Users';
import clientAuth from '../../utils/clientAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await clientAuth(req);
    if (data.props.loginStatus) {
      if (!dbConnection.isInitialized) await dbConnection.initialize();
      const usersRepository = dbConnection.getRepository(Users);

      const checkData = await usersRepository.findOneBy({
        nickname: req.body,
      });
      if (checkData)
        await usersRepository.save({ id: checkData.id, refreshToken: '' });

      return res.status(200).json({ status: true });
    } else {
      return res.json({ status: false });
    }
  } catch (e) {
    return res.json({ status: false });
  }
}

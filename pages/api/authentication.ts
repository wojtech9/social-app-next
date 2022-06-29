import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnection from '../../databaseUtils/dbConnect';
import { Users } from '../../databaseUtils/models/Users';
import { Console } from 'console';

// authentication

const authentication = (req: NextApiRequest, res: NextApiResponse) => {
  const accesToken = req.headers['authorization']?.split(' ')[1];
  const refreshToken = req.headers['authorization']?.split(' ')[2];
  const nickname = req.headers['authorization']?.split(' ')[3];

  if (!accesToken) return res.status(403).json({ status: false });

  jwt.verify(accesToken, process.env.TOKEN as string, async (err, result) => {
    if (err) {
      // refresh session

      if (!dbConnection.isInitialized) await dbConnection.initialize();
      const usersRepository = dbConnection.getRepository(Users);
      const user = await usersRepository.findOneBy({ nickname });

      if (!user) return res.status(403).json({ status: false });
      else if (user.refreshToken !== refreshToken)
        return res.status(403).json({ status: false });
      else {
        const newAccessToken = jwt.sign(
          { nickname },
          process.env.TOKEN as string,
          {
            expiresIn: '2h',
          }
        );

        return res
          .status(200)
          .json({ status: true, result: { nickname }, newAccessToken });
      }
    }

    return res.status(200).json({ status: true, result });
  });
};

export default authentication;

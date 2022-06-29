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
  } catch (e) {
    return { status: false };
  }
}

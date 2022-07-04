import { NextApiRequestQuery } from 'next/dist/server/api-utils';
import dbConnection from '../../databaseUtils/dbConnect';
import { Users } from '../../databaseUtils/models/Users';

const Profile = ({ userData }: any) => {
  return <h1></h1>;
};

export async function getServerSideProps({ query }: NextApiRequestQuery) {
  if (!dbConnection.isInitialized) await dbConnection.initialize();
  const UsersRepository = dbConnection.getRepository(Users);

  return {
    props: { userData: query },
  };
}

export default Profile;

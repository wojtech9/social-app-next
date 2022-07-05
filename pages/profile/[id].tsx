import { NextApiRequestQuery } from 'next/dist/server/api-utils';
import dbConnection from '../../databaseUtils/dbConnect';
import { Users } from '../../databaseUtils/models/Users';

const Profile = ({ userData }: any) => {
  return <h1></h1>;
};

export async function getServerSideProps({ params }: any) {
  console.log(params);
  if (!dbConnection.isInitialized) await dbConnection.initialize();
  const UsersRepository = dbConnection.getRepository(Users);
  const data = await UsersRepository.findOneBy({ id: params.id });
  if (data?.nickname) {
    return {
      props: { userData: { nickname: data.nickname } },
    };
  } else {
    return {
      props: { userData: { nickname: 'Invalid profile ID' } },
    };
  }
}

export default Profile;

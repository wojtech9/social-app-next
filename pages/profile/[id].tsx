import { NextApiRequest } from 'next';
import dbConnection from '../../databaseUtils/dbConnect';
import { Users } from '../../databaseUtils/models/Users';
import clientAuth from '../../utils/clientAuth';
// components

import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';

const Profile = ({ userData }: any) => {
  return (
    <Layout status={true}>
      <h1>{userData.nickname}</h1>
    </Layout>
  );
};

export async function getServerSideProps(req: any) {
  try {
    const router = useRouter();
    const { props } = await clientAuth(req);
    if (props.loginStatus) {
      if (!dbConnection.isInitialized) await dbConnection.initialize();
      const UsersRepository = dbConnection.getRepository(Users);
      const data = await UsersRepository.findOneBy({ id: req.params.id });
      if (data?.nickname) {
        return {
          props: { userData: { nickname: data.nickname } },
        };
      }
    } else {
      router.push('/');
    }
  } catch (e) {
    return {
      props: { userData: { nickname: 'Invalid profile ID' } },
    };
  }
}

export default Profile;

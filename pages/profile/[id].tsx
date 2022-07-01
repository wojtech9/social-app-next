import { useRouter } from 'next/router';
import { NextApiRequestQuery } from 'next/dist/server/api-utils';

const Profile = ({ userData }: any) => {
  const router = useRouter();
  console.log(userData);
  return <h1></h1>;
};

export async function getServerSideProps({ query }: NextApiRequestQuery) {
  console.log(query);
  return {
    props: { userData: query },
  };
}

export default Profile;

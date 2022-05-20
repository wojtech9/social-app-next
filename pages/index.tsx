import type { NextPage } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next';

// components

import Layout from '../components/layout/Layout';
import Login from '../components/login/Login';

const Home: NextPage = ({ cookie }: any) => {
  return <Layout>{cookie === 'none' ? <Login /> : <h1>content</h1>}</Layout>;
};

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  if (req.headers.cookie !== undefined) {
    return {
      props: { cookie: req.headers.cookie },
    };
  } else {
    return {
      props: { cookie: 'none' },
    };
  }
}

export default Home;

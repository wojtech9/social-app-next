import type { NextPage } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next';

// components

import Layout from '../components/layout/Layout';
import Login from '../components/login/Login';
import MainPage from '../components/contentPage/MainPage';

const Home: NextPage = ({ cookie }: any) => {
  return (
    <>
      {cookie === 'none' ? (
        <Layout status={false}>
          <Login />
        </Layout>
      ) : (
        <Layout status={true}>
          <MainPage />
        </Layout>
      )}
    </>
  );
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

import type { NextPage } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next';

// components

import Layout from '../components/layout/Layout';
import Login from '../components/login/Login';
import MainPage from '../components/contentPage/MainPage';
import clientAuth from '../utils/clientAuth';
import { useEffect } from 'react';

const Home: NextPage = ({ loginStatus, data, newCookie }: any) => {
  useEffect(() => {
    // refresh session
    if (newCookie) document.cookie = newCookie;
  });

  return (
    <>
      {loginStatus ? (
        <Layout status={false}>
          <MainPage />
          <h1>{data.nickname}</h1>
        </Layout>
      ) : (
        <Layout status={true}>
          <Login />
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
  const data = await clientAuth(req);
  return data;
}

export default Home;

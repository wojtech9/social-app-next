import type { NextPage } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next';

// components

import Layout from '../components/layout/Layout';
import Login from '../components/login/Login';
import MainPage from '../components/contentPage/MainPage';

const Home: NextPage = ({ loginStatus, data }: any) => {
  return (
    <>
      {loginStatus ? (
        <Layout status={false}>
          <MainPage />
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
  // if cookies exist

  if (req.headers.cookie !== undefined) {
    const response = await fetch('http://localhost:3000/api/authentication', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${'test'} ${'test2'}`,
      },
    });
    const data = await response.json();
    if (data.status) {
      return {
        props: { loginStatus: true, data: { nickname: data.payload.nickname } },
      };
    } else {
      return {
        props: { loginStatus: false, data: { nickname: 'none' } },
      };
    }
  } else {
    return {
      props: { loginStatus: false, data: { nickname: 'none' } },
    };
  }
}

export default Home;

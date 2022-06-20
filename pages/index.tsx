import type { NextPage } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next';

// components

import Layout from '../components/layout/Layout';
import Login from '../components/login/Login';
import MainPage from '../components/contentPage/MainPage';

// utils

import getCookie from '../utils/getCookie';

const Home: NextPage = ({ loginStatus, data }: any) => {
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
  // if cookies exist

  if (req.headers.cookie !== undefined) {
    const accesToken = getCookie('accesToken', req.headers.cookie as string);
    const refreshToken = getCookie(
      'refreshToken',
      req.headers.cookie as string
    );
    const nickname = getCookie('nickname', req.headers.cookie as string);
    const response = await fetch('http://localhost:3000/api/authentication', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accesToken} ${refreshToken} ${nickname}`,
      },
    });
    const data = await response.json();
    if (data.status) {
      let newCookie;
      if (data.newAccessToken) {
        const d = new Date();
        d.setTime(d.getTime() + 2 * 60 * 60 * 1000);
        let expires = 'expires=' + d.toUTCString();
        newCookie =
          'accesToken' + '=' + data.newAccessToken + ';' + expires + ';path=/';
      }
      return {
        props: {
          loginStatus: true,
          data: { nickname: data.result.nickname },
          newCookie,
        },
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

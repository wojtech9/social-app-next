// types

import type { NextApiRequest } from 'next';

// utils

import getCookie from '../utils/getCookie';

const clientAuth = async (
  req: NextApiRequest | { headers: { cookie: string } }
) => {
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
      let newCookie = '';
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
};

export default clientAuth;

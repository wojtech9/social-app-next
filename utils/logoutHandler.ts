// utils

import clientAuth from './clientAuth';

// function which handles user's logout

const logoutHandler = async (router: any) => {
  const req = { headers: { cookie: document.cookie } };
  const data = await clientAuth(req);
  if (!data.props.loginStatus) router.push('/');
  else {
    document.cookie =
      'accesToken=;path:/;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'nickname=;path:/;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie =
      'refreshToken=;path:/;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/');
  }
};

export default logoutHandler;

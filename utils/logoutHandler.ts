// function which handles user's logout

// utils
import getCookie from './getCookie';

const logoutHandler = async (router: any) => {
  const nickname = getCookie('nickname', document.cookie);
  if (nickname) {
    const response = await fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nickname),
    });
    const responseData = await response.json();
    if (responseData.status) {
      document.cookie =
        'accesToken=;path:/;expires=Thu, 01 Jan 1970 00:00:01 GMT';
      document.cookie =
        'nickname=;path:/;expires=Thu, 01 Jan 1970 00:00:01 GMT';
      document.cookie =
        'refreshToken=;path:/;expires=Thu, 01 Jan 1970 00:00:01 GMT';
      router.push('/');
    } else {
      router.push('/');
    }
  }
};

export default logoutHandler;

import user from '../../interfaces/User.interface';

// submit handler
const loginHandler = async (
  userData: user,
  setDataCorrect: React.Dispatch<React.SetStateAction<boolean>>
): Promise<boolean> => {
  let pattern1 = /^[A-Za-z0-9]{3,12}$/;
  let pattern2 = /^[A-Za-z0-9]{6,12}$/;
  let status = false;
  // data validating

  if (pattern1.test(userData.nickname) && pattern2.test(userData.password)) {
    const response = await fetch('/api/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!data.status) {
      setDataCorrect(true);
      setTimeout(() => {
        setDataCorrect(false);
      }, 2500);
    } else {
      const d = new Date();
      d.setTime(d.getTime() + 2 * 60 * 60 * 1000);
      let expires = 'expires=' + d.toUTCString();
      document.cookie =
        'accesToken' + '=' + data.accessToken + ';' + expires + ';path=/';
      document.cookie = 'refreshToken' + '=' + data.refreshToken + ';';
      status = true;
    }
  }
  return status;
};

export default loginHandler;

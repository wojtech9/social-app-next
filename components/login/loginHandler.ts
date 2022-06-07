import user from '../../interfaces/User.interface';

// submit handler
const loginHandler = async (
  userData: user,
  setUserData: React.Dispatch<React.SetStateAction<user>>,
  setDataCorrect: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let pattern1 = /^[A-Za-z0-9]{3,12}$/;
  let pattern2 = /^[A-Za-z0-9]{6,12}$/;

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
      return;
    }
  }
};

export default loginHandler;

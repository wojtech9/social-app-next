import user from '../../interfaces/User.interface';

// submit handler
const registerHandler = async (userData: user) => {
  let pattern1 = /^[A-Za-z0-9]{3,12}$/;
  let pattern2 = /^[A-Za-z0-9]{6,12}$/;

  // data validating
  if (pattern1.test(userData.nickname) && pattern2.test(userData.password)) {
    const data = await fetch('/api/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const { status } = await data.json();
    if (status) {
      console.log('zarejstrowano');
    } else {
      console.log('nazwa zajeta');
    }
  }
};

export default registerHandler;

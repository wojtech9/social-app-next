import classes from './Login.module.css';
import { useState } from 'react';

interface user {
  nickname: string;
  password: string;
}

const Login = () => {
  const [userData, setUserData] = useState<user>({
    nickname: '',
    password: '',
  });

  const loginHandler = (): void => {
    if (userData.nickname === '' || userData.password === '') {
      return;
    }
    console.log(userData);
  };

  return (
    <section className={classes.container}>
      <div className={classes.loginContainer}>
        <div className={classes.loginBox}>
          <h1 className={classes.description}>Login</h1>
          <form className={classes.form}>
            <input
              type='text'
              placeholder='Nickname'
              value={userData.nickname}
              onChange={(e) => {
                setUserData({ ...userData, nickname: e.currentTarget.value });
              }}
            />
            <input
              type='password'
              placeholder='Password'
              value={userData.password}
              onChange={(e) => {
                setUserData({ ...userData, password: e.currentTarget.value });
              }}
            />
            <button
              type='submit'
              onClick={(e) => {
                e.preventDefault();
                loginHandler();
              }}
            >
              Login
            </button>
          </form>
          <p className={classes.registerInfo}>If You haven't got account:</p>
          <p className={classes.registerButton}>Register</p>
        </div>
      </div>
    </section>
  );
};

export default Login;

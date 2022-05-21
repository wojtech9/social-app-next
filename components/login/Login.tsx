import classes from './Login.module.css';
import { useState } from 'react';
import Link from 'next/link';

export interface user {
  nickname: string;
  password: string;
}

const Login = () => {
  const [userData, setUserData] = useState<user>({
    nickname: '',
    password: '',
  });

  const loginHandler = async () => {
    if (userData.nickname === '' || userData.password === '') {
      return;
    }
    const data = await fetch('/api/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
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
          <Link href='/register'>
            <p className={classes.registerButton}>Register</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;

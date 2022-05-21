import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import classes from '../../components/login/Login.module.css';
import { user } from '../../components/login/Login';
import { useState } from 'react';
import Link from 'next/link';

export default () => {
  const [userData, setUserData] = useState<user>({
    nickname: '',
    password: '',
  });

  const registerHandler = async () => {
    if (userData.nickname === '' || userData.password === '') {
      return;
    }
    const data = await fetch('/api/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Layout>
        <section className={classes.container}>
          <div className={classes.loginContainer}>
            <div className={classes.loginBox}>
              <h1 className={classes.description}>Register</h1>
              <form className={classes.form}>
                <input
                  type='text'
                  placeholder='Nickname'
                  value={userData.nickname}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      nickname: e.currentTarget.value,
                    });
                  }}
                />
                <input
                  type='password'
                  placeholder='Password'
                  value={userData.password}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      password: e.currentTarget.value,
                    });
                  }}
                />
                <button
                  type='submit'
                  onClick={(e) => {
                    e.preventDefault();
                    registerHandler();
                  }}
                >
                  Register
                </button>
              </form>
              <p className={classes.registerInfo}>
                Creating an account is free
              </p>
              <Link href='/'>
                <p className={classes.registerButton}>Back</p>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

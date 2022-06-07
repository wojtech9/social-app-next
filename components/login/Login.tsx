import { useState } from 'react';
import Link from 'next/link';

// styles
import classes from './Login.module.css';

// components
import InputFormer from '../InputFormer/InputFormer';

// helpers
import loginHandler from './loginHandler';

// interfaces
import user from '../../interfaces/User.interface';

const Login = () => {
  // form validation states
  const [userData, setUserData] = useState<user>({
    nickname: '',
    password: '',
  });
  const [checkFocus, setCheckFocus] = useState({
    login: 'false',
    password: 'false',
  });
  const [dataCorrect, setDataCorrect] = useState<boolean>(false);
  // change input handler
  const changeHandler = (e: any) => {
    setUserData({ ...userData, [e.currentTarget.name]: e.currentTarget.value });
  };

  // array which specifies type of inputs provided to InputFormer component

  const inputArray = [
    {
      key: 1,
      label: 'Username',
      type: 'text',
      name: 'nickname',
      placeholder: 'Username',
      value: userData.nickname,
      required: true,
      pattern: '^[A-Za-z0-9]{3,12}$',
      onChange: changeHandler,
      error: 'Username must have 3-12 characters',
      focused: checkFocus.login,
      onBlur: function () {
        setCheckFocus({ ...checkFocus, login: 'true' });
      },
    },
    ,
    {
      key: 2,
      label: 'Password',
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      value: userData.password,
      required: true,
      pattern: '^[A-Za-z0-9]{6,12}$',
      onChange: changeHandler,
      error: 'Password must have 6-12 characters',
      focused: checkFocus.password,
      onClick: function () {
        setCheckFocus({ ...checkFocus, password: 'true' });
      },
    },
  ];

  return (
    <section className={classes.container}>
      <div className={classes.loginContainer}>
        <div className={classes.loginBox}>
          <h1 className={classes.description}>Login</h1>
          <form className={classes.form}>
            {inputArray.map((value) => (
              <InputFormer {...value} />
            ))}
            <button
              type='submit'
              onClick={(e) => {
                e.preventDefault();
                loginHandler(userData, setUserData, setDataCorrect);
              }}
            >
              Login
            </button>
            {dataCorrect && (
              <span
                style={{
                  color: 'red',
                  textAlign: 'center',
                  paddingTop: '1.5em',
                }}
              >
                Invalid nickname or password
              </span>
            )}
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

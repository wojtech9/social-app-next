import classes from '../login/Login.module.css';
import { user } from '../login/Login';
import { useState } from 'react';
import Link from 'next/link';
import InputFormer from '../InputFormer/InputFormer';

// component, which displays register subpage

const Register = () => {
  const [userData, setUserData] = useState<user>({
    nickname: '',
    password: '',
  });
  const [checkFocus, setCheckFocus] = useState({
    login: 'false',
    password: 'false',
  });

  const changeHandler = (e: any) => {
    setUserData({ ...userData, [e.currentTarget.name]: e.currentTarget.value });
  };

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

  // register handler

  const registerHandler = async () => {
    let pattern1 = /^[A-Za-z0-9]{3,12}$/;
    let pattern2 = /^[A-Za-z0-9]{6,12}$/;
    if (pattern1.test(userData.nickname) && pattern2.test(userData.password)) {
      const data = await fetch('/api/register', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
    }
  };

  return (
    <section className={classes.container}>
      <div className={classes.loginContainer}>
        <div className={classes.loginBox}>
          <h1 className={classes.description}>Register</h1>
          <form className={classes.form}>
            {inputArray.map((value) => (
              <InputFormer {...value} />
            ))}
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
          <p className={classes.registerInfo}>Creating an account is free</p>
          <Link href='/'>
            <p className={classes.registerButton}>Back</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;

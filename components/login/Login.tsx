import classes from './Login.module.css';

const Login = () => {
  return (
    <section className={classes.container}>
      <div className={classes.loginContainer}>
        <div className={classes.loginBox}>
          <h1>Login</h1>
          <form>
            <input type='text' placeholder='Nickname' />
            <input type='password' placeholder='Password' />
            <button type='submit'>Login</button>
          </form>
          <p>If You haven't got account</p>
          <button type='button'>Register</button>
        </div>
      </div>
    </section>
  );
};

export default Login;

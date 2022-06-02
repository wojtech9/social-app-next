import classes from '../login/Login.module.css';

// Inputs constructor

const InputFormer = (props: any) => {
  return (
    <>
      <label className={classes.label}>{props.label}</label>
      {props.name === 'nickname' ? (
        <>
          <input {...props} className={classes.inputNickname} />
          <span className={classes.errorLogin}>{props.error}</span>
          <span
            id='usernameTaken'
            style={{ color: 'red', paddingBottom: '0.5em', display: 'none' }}
          >
            Username taken
          </span>
        </>
      ) : (
        <>
          <input {...props} className={classes.inputPassword} />
          <span className={classes.errorPassword}> {props.error}</span>
        </>
      )}
    </>
  );
};
export default InputFormer;

import classes from '../login/Login.module.css';

const InputFormer = (props: any) => {
  return (
    <>
      <label className={classes.label}>{props.label}</label>
      {props.name === 'nickname' ? (
        <>
          <input {...props} className={classes.inputNickname} />
          <span className={classes.errorLogin}>{props.error}</span>
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

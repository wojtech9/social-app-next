import classes from './Layout.module.css';
import Head from 'next/head';

export default function Layout(props: any) {
  return (
    <>
      <Head>
        <title>Social App</title>
      </Head>
      <main className={classes.mainContainer}>
        <header className={classes.header}>
          <h1 className={classes.logo}>MeetUp</h1>
        </header>
        {props.children}
      </main>
    </>
  );
}

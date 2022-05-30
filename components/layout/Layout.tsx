import classes from './Layout.module.css';
import Head from 'next/head';

export default function Layout({
  status,
  children,
}: {
  status: boolean;
  children: any;
}) {
  return (
    <>
      <Head>
        <title>Social App</title>
      </Head>
      <main className={classes.mainContainer}>
        {status ? (
          <header className={classes.header}>
            <h1 className={classes.logo}>MeetUp2</h1>
          </header>
        ) : (
          <header className={classes.header}>
            <h1 className={classes.logo}>MeetUp</h1>
          </header>
        )}
        {children}
      </main>
    </>
  );
}

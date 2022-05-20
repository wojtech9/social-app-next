import classes from './Layout.module.css';
import Head from 'next/head';

export default function Layout(props: any) {
  return (
    <>
      <Head>
        <title>Social App</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Public+Sans:wght@500;600&display=swap'
          rel='stylesheet'
        />
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

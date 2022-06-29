import Head from 'next/head';

// styles
import classes from './Layout.module.css';

// Layout component

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
            <h1 className={classes.logo}>MeetUp</h1>
          </header>
        ) : (
          <header className={classes.header}>
            <h1 className={classes.logo}>MeetUp</h1>
            <nav className={classes.menu}>
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
              </ul>
            </nav>
          </header>
        )}
        {children}
      </main>
    </>
  );
}

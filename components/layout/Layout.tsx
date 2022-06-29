import Head from 'next/head';

// styles
import classes from './Layout.module.css';

//icons

import { FiLogOut, FiSettings, FiUsers } from 'react-icons/fi';
import { FaUserAlt, FaBell, FaEnvelope } from 'react-icons/fa';

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
            <h1 className={classes.logo}>
              <FiUsers /> MeetUp
            </h1>
            <nav className={classes.menu}>
              <ul>
                <li>
                  <FaUserAlt />
                </li>
                <li>
                  <FaBell />
                </li>
                <li>
                  <FaEnvelope />
                </li>
                <li>
                  <FiSettings />
                </li>
                <li>
                  <FiLogOut />
                </li>
              </ul>
            </nav>
          </header>
        ) : (
          <header className={classes.header}>
            <h1 className={classes.logo}>
              <FiUsers /> MeetUp
            </h1>
          </header>
        )}
        {children}
      </main>
    </>
  );
}

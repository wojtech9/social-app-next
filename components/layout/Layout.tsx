import Head from 'next/head';

// styles
import classes from './Layout.module.css';

//icons

import { FiLogOut, FiSettings, FiUsers } from 'react-icons/fi';
import { FaUserAlt, FaBell, FaEnvelope, FaSearch } from 'react-icons/fa';

//utils
import logoutHandler from '../../utils/logoutHandler';
import { useRouter } from 'next/router';
// Layout component

export default function Layout({
  status,
  children,
}: {
  status: boolean;
  children: any;
}) {
  const router = useRouter();
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
            <section className={classes.searchBar}>
              <form className={classes.searchForm}>
                <input type='text' placeholder='Find your friends' />
                <FaSearch />
              </form>
            </section>
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
                <li onClick={() => logoutHandler(router)}>
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

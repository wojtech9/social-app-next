import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import Register from '../../components/register/Register';

export default () => {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Layout status={false}>
        <Register />
      </Layout>
    </>
  );
};

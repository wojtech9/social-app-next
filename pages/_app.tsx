import '../global_styles/globals.css';
import type { AppProps } from 'next/app';
import 'reflect-metadata';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
console.log(process.env);

export default MyApp;

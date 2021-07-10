import { AppProps } from 'next/app';
import 'styles/tailwind.css';
import 'styles/global.css';
import 'typeface-dm-sans';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;

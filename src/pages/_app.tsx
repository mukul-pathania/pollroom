import { AppProps } from 'next/app';
import 'styles/tailwind.css';
import 'styles/global.css';
import 'typeface-dm-sans';
import AuthProvider from 'contexts/AuthContext';
import layout from 'layouts/default';

type Apptype = AppProps & { Component: { layout?: typeof layout } };

function MyApp({ Component, pageProps }: Apptype): JSX.Element {
  const Layout = Component.layout || layout;
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;

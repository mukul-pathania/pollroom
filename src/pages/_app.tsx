import { AppProps } from 'next/app';
import 'styles/tailwind.css';
import 'styles/global.css';
import 'typeface-dm-sans';
import AuthProvider from 'contexts/AuthContext';
import layout from 'layouts/default';
import ToastProvider from 'contexts/ToastContext';

type Apptype = AppProps & { Component: { layout?: typeof layout } };

function MyApp({ Component, pageProps }: Apptype): JSX.Element {
  const Layout = Component.layout || layout;
  return (
    <AuthProvider>
      <ToastProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ToastProvider>
    </AuthProvider>
  );
}

export default MyApp;

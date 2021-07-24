import React from 'react';
import LoginPage from 'components/LoginSignUp/LoginPage';
import Head from 'next/head';
import Layout from 'layouts/main';

const login = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>PollRoom - Login</title>
      </Head>
      <div className="bg-gradient-to-b from-white to-primary-700 pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-20 py-12">
        <LoginPage
          heading="Welcome back"
          subHeading="You've been missed"
          oAuthText="Login with"
          buttonText="Login"
          credentialsText="Or login with credentials"
        />
      </div>
    </>
  );
};

login.layout = Layout;

export default login;

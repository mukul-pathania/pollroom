import React from 'react';
import LoginSignUp from 'components/LoginSignUp';
import Head from 'next/head';
import Toast from 'components/Toast';
import { useRouter } from 'next/router';
import Layout from 'layouts/main';

type alertStateType = {
  open: boolean;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'ERROR';
};

const login = (): JSX.Element => {
  const [alertState, setAlertState] = React.useState<alertStateType>({
    open: false,
    message: '',
    type: 'INFO',
  });
  const { query } = useRouter();
  React.useEffect(() => {
    if (query.redirectMessage) {
      const message = query.redirectMessage;
      setAlertState((state) => ({
        ...state,
        open: true,
        message: message as string,
        type: 'INFO',
      }));
    }
  }, []);

  return (
    <>
      <Toast
        open={alertState.open}
        message={alertState.message}
        type={alertState.type}
        onClose={() => {
          setAlertState((state) => ({ ...state, open: false }));
        }}
        autoCloseInterval={5000}
      />
      <Head>
        <title>PollRoom - Login</title>
      </Head>
      <div className="bg-gradient-to-b from-white to-primary-700 pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-20 py-12">
        <LoginSignUp
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

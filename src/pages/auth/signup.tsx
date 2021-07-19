import LoginSignUp from 'components/LoginSignUp';
import Header from 'components/header';
import Head from 'next/head';

const signup = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>PollRoom - Sign up</title>
      </Head>
      <div className="bg-gradient-to-b from-white to-primary-700 pt-32 px-4 sm:px-6 lg:px-20 py-12">
        <Header />
        <LoginSignUp
          heading="Welcome!"
          subHeading="Fill the form below to create your account"
          oAuthText="Sign up with"
          buttonText="Create Account"
          credentialsText="Or signup with credentials"
          isSignUpPage
        />
      </div>
    </>
  );
};

export default signup;

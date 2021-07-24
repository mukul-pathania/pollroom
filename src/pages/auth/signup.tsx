import SignUpPage from 'components/LoginSignUp/SignUpPage';
import Head from 'next/head';
import Layout from 'layouts/main';
const signup = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>PollRoom - Sign up</title>
      </Head>
      <div className="bg-gradient-to-b from-white to-primary-700 pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-20 py-12">
        <SignUpPage
          heading="Welcome!"
          subHeading="Fill the form below to create your account"
          oAuthText="Sign up with"
          buttonText="Create Account"
          credentialsText="Or signup with credentials"
        />
      </div>
    </>
  );
};

signup.layout = Layout;

export default signup;

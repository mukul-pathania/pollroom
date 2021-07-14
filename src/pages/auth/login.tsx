import LoginSignUp from 'components/LoginSignUp';
import Header from 'components/header';
const login = (): JSX.Element => {
  return (
    <div className="bg-gradient-to-b from-white to-primary-700 pt-32 px-4 sm:px-6 lg:px-20 py-12">
      <Header />
      <LoginSignUp
        heading="Welcome back"
        subHeading="You've been missed"
        oAuthText="Login with"
        buttonText="Login"
        credentialsText="Or login with credentials"
      />
    </div>
  );
};

export default login;

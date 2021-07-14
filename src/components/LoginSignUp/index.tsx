import { FcGoogle } from 'react-icons/fc';
import { IoLogoGithub } from 'react-icons/io';

type propTypes = {
  heading: string;
  subHeading: string;
  oAuthText: string;
  credentialsText: string;
  buttonText: string;
  isSignUpPage?: boolean;
};

const LoginSignUp = ({
  heading,
  subHeading,
  oAuthText,
  credentialsText,
  buttonText,
  isSignUpPage,
}: propTypes): JSX.Element => {
  return (
    <>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center pt-2">
        {heading}
      </h2>
      <p className="text-2xl md:text-3xl lg:text-4xl text-gray-500 text-center font-semibold pt-2">
        {subHeading}
      </p>
      <div className="bg-gray-200 rounded-md p-6 mt-8 w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto mb-8">
        <div className="w-full">
          <p className="text-center text-gray-600 font-medium pb-2">
            {oAuthText}
          </p>
          <div className="flex justify-center items-center">
            <button
              className="flex items-center space-between py-2 px-4 m-4 bg-white text-primary-700 hover:bg-gray-300 transition-all duration-500 rounded shadow text-base font-medium"
              role="button"
            >
              <FcGoogle
                style={{ display: 'inline-block', marginRight: '8px' }}
                size={21}
              />
              Google
            </button>
            <button
              className="flex items-center space-between py-2 px-4 m-4 bg-white text-primary-700 hover:bg-gray-300 transition-all duration-500 rounded shadow text-base font-medium"
              role="button"
            >
              <IoLogoGithub
                style={{ display: 'inline-block', marginRight: '8px' }}
                size={21}
              />
              Github
            </button>
          </div>
          <hr className="w-full h-1 bg-primary-700 rounded-full my-2" />
          <div>
            <p className="text-center text-gray-600 font-medium pb-4 pt-4">
              {credentialsText}
            </p>
            <form action="">
              {isSignUpPage && (
                <input
                  className="mx-auto mb-5 p-4 font-medium placeholder-gray-500 rounded border-none outline-none bg-white text-primary-700 block w-full shadow-lg"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              )}
              <input
                className="mx-auto mb-5 p-4 font-medium placeholder-gray-500 rounded border-none outline-none bg-white text-primary-700 block w-full shadow-lg"
                type="email"
                name="email"
                placeholder="Email"
              />
              <input
                className="mx-auto mb-5 p-4 font-medium placeholder-gray-500 rounded border-none outline-none bg-white text-primary-700 block w-full shadow-lg"
                type="password"
                name="password"
                placeholder="Password"
              />
              {isSignUpPage && (
                <input
                  className="mx-auto mb-5 p-4 font-medium placeholder-gray-500 rounded border-none outline-none bg-white text-primary-700 block w-full shadow-lg"
                  type="password"
                  name="confirm-password"
                  placeholder="Confirm Password"
                />
              )}

              <input
                className="mx-auto mt-8 block bg-primary-700 text-white py-4 px-6 text-lg uppercase font-bold cursor-pointer rounded hover:bg-secondary-900 transition-all duration-500 hover:shadow-md"
                type="submit"
                value={buttonText}
              />
            </form>
            {!isSignUpPage && (
              <div className="flex w-full justify-between pt-8">
                <a
                  href=""
                  className="text-primary-600 hover:text-secondary-900"
                >
                  Forgot password?
                </a>
                <a
                  href=""
                  className="text-primary-600 hover:text-secondary-900"
                >
                  Create new account
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;

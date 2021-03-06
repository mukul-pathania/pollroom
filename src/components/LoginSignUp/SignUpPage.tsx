import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoGithub } from 'react-icons/io';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signUpWithEmailPassword } from 'adapters/auth';
import clsx from 'clsx';
import links from 'link';
import { useRouter } from 'next/router';
import { useToast } from 'contexts/ToastContext';
import Error from 'components/ErrorMessageInput';

type propTypes = {
  heading: string;
  subHeading: string;
  oAuthText: string;
  credentialsText: string;
  buttonText: string;
};

type Inputs = {
  username: string;
  email: string;
  password: string;
  'confirm-password': string;
};

const ERROR_MESSAGES = {
  passwordLength: 'Password must have length of atleast 6',
  passwordRequired: 'Password is required',
  userNameRequired: 'Username is required',
  userNameLength: 'Username must be atleast 5 characters',
  passwordsMatch: 'Passwords should match',
  emailRequired: 'Email is required',
};

const SignUpPage = (props: propTypes): JSX.Element => {
  const { setToast } = useToast();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm<Inputs>();
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setButtonDisabled(true);
      const signUpResponse = await signUpWithEmailPassword(
        data.email,
        data.username as string,
        data.password,
      );
      if (!signUpResponse.error) {
        setToast(
          true,
          'Check your inbox and verify your email before logging in',
          'INFO',
          links.login,
          5000,
        );
        router.push(links.login);
      } else {
        setToast(
          true,
          signUpResponse.message,
          signUpResponse.error ? 'ERROR' : 'SUCCESS',
          links.signup,
          5000,
        );
      }
      setButtonDisabled(false);
    } catch (error) {
      setToast(
        true,
        'An error occured while processing your request',
        'ERROR',
        router.pathname,
        5000,
      );
    }
  };

  return (
    <>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center pt-2">
        {props.heading}
      </h2>
      <p className="text-2xl md:text-3xl lg:text-4xl text-gray-500 text-center font-semibold pt-2">
        {props.subHeading}
      </p>
      <div className="bg-gray-200 rounded p-6 mt-8 w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto mb-8">
        <div className="w-full">
          <p className="text-center text-gray-600 font-medium pb-2">
            {props.oAuthText}
          </p>
          <div className="flex justify-center items-center">
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/signup`}
              className="flex items-center space-between py-2 px-4 m-4 bg-white text-primary-700 hover:bg-gray-300 transition-all duration-500 rounded shadow text-base font-medium cursor-pointer"
            >
              <FcGoogle
                style={{ display: 'inline-block', marginRight: '8px' }}
                size={21}
              />
              Google
            </a>
            <a
              href="#"
              className="flex items-center space-between py-2 px-4 m-4 bg-white text-primary-700 hover:bg-gray-300 transition-all duration-500 rounded shadow text-base font-medium cursor-pointer"
            >
              <IoLogoGithub
                style={{ display: 'inline-block', marginRight: '8px' }}
                size={21}
              />
              Github
            </a>
          </div>
          <hr className="w-full h-1 bg-primary-700 rounded-full my-2" />
          <div>
            <p className="text-center text-gray-600 font-medium pb-4 pt-4">
              {props.credentialsText}
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className={clsx(
                  'mx-auto mt-6 p-4 font-medium placeholder-gray-500 rounded border-none outline-none bg-white text-primary-700 block w-full shadow-lg',
                  formErrors.username
                    ? 'form-error-message'
                    : 'focus:ring-2 focus:ring-primary-700',
                )}
                type="text"
                {...register('username', {
                  required: {
                    value: true,
                    message: ERROR_MESSAGES.userNameRequired,
                  },
                  minLength: {
                    value: 5,
                    message: ERROR_MESSAGES.userNameLength,
                  },
                })}
                placeholder="Username"
              />
              {formErrors.username && (
                <Error errorMessage={formErrors.username.message} />
              )}
              <input
                className={clsx(
                  'mx-auto mt-6 p-4 font-medium placeholder-gray-500 rounded border-none outline-none bg-white text-primary-700 block w-full shadow-lg',
                  formErrors.email
                    ? 'form-error-message'
                    : 'focus:ring-primary-700 focus:ring-2',
                )}
                type="email"
                {...register('email', {
                  required: {
                    value: true,
                    message: ERROR_MESSAGES.emailRequired,
                  },
                })}
                placeholder="Email"
              />
              {formErrors.email && (
                <Error errorMessage={formErrors.email.message} />
              )}
              <input
                className={clsx(
                  'mx-auto mt-6 p-4 font-medium placeholder-gray-500 rounded border-none outline-none bg-white text-primary-700 block w-full shadow-lg',
                  formErrors.password
                    ? 'form-error-message'
                    : 'focus:ring-2 focus:ring-primary-700',
                )}
                type="password"
                {...register('password', {
                  required: {
                    value: true,
                    message: ERROR_MESSAGES.passwordRequired,
                  },
                  minLength: {
                    value: 6,
                    message: ERROR_MESSAGES.passwordLength,
                  },
                })}
                placeholder="Password"
              />
              {formErrors.password && (
                <Error errorMessage={formErrors.password.message} />
              )}
              <input
                className={clsx(
                  'mx-auto mt-6 p-4 font-medium placeholder-gray-500 rounded border-none outline-none bg-white text-primary-700 block w-full shadow-lg',
                  formErrors['confirm-password']
                    ? 'form-error-message'
                    : 'focus:ring-2 focus:ring-primary-700',
                )}
                type="password"
                {...register('confirm-password', {
                  required: {
                    value: true,
                    message: '',
                  },
                  validate: {
                    matchPassword: (value) => {
                      return (
                        value === watch('password') ||
                        ERROR_MESSAGES.passwordsMatch
                      );
                    },
                  },
                })}
                placeholder="Confirm Password"
              />
              {formErrors['confirm-password'] && (
                <Error errorMessage={formErrors['confirm-password'].message} />
              )}
              <input
                className="mx-auto mt-8 block bg-primary-700 disabled:bg-gray-400 text-white py-4 px-6 text-lg uppercase font-bold cursor-pointer rounded hover:bg-secondary-900 transition-all duration-500 hover:shadow-md"
                type="submit"
                value={props.buttonText}
                disabled={
                  buttonDisabled || Object.keys(formErrors).length !== 0
                }
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

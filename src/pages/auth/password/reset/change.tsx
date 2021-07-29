import React from 'react';
import Head from 'next/head';
import main from 'layouts/main';
import { useForm, SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import querystring from 'querystring';
import { useToast } from 'contexts/ToastContext';
import Error from 'components/ErrorMessageInput';
import { resetPassword } from 'adapters/auth';
import { useRouter } from 'next/router';
import link from 'link';

type Inputs = { password: string; 'confirm-password': string };

const ERROR_MESSAGES = {
  passwordLength: 'Password must have length of atleast 6',
  passwordRequired: 'Password is required',
  passwordsMatch: 'Passwords should match',
};

const PasswordChangePage = (): JSX.Element => {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const router = useRouter();
  const { setToast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setButtonDisabled(true);
      const queryParams = querystring.parse(location.hash.substring(1));
      if (queryParams.token) {
        const response = await resetPassword(
          queryParams.token as string,
          data.password,
        );
        setToast(
          true,
          response.message,
          response.error ? 'ERROR' : 'SUCCESS',
          link.login,
          5000,
        );
        router.push(link.login);
      } else {
        setToast(
          true,
          'You might have clicked on an invalid link',
          'ERROR',
          link.signup,
          5000,
        );
        router.push(link.signup);
      }
      setButtonDisabled(false);
    } catch (error) {
      setToast(
        true,
        'An error occured while processing your request',
        'ERROR',
        link.resetPassword,
        5000,
      );
    }
  };

  return (
    <>
      <Head>
        <title>PollRoom - Reset Password</title>
      </Head>
      <div className="bg-gradient-to-b from-white to-primary-700 pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-20 py-12 min-h-screen">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center pt-2">
          Reset your password
        </h2>
        <div className="bg-gray-200 rounded p-6 mt-8 w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto mb-8">
          <div className="w-full">
            <p className="text-center text-gray-600 font-medium pb-2">
              Provide new password
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                className="mx-auto mt-8 block bg-primary-700 disabled:bg-gray-400 text-white py-4 px-6 text-lg uppercase font-bold cursor-pointer rounded hover:bg-secondary-900 transition-all duration-500 hover:shadow-md w-full"
                disabled={
                  buttonDisabled || Object.keys(formErrors).length !== 0
                }
                type="submit"
                value="Change Password"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

PasswordChangePage.layout = main;

export default PasswordChangePage;

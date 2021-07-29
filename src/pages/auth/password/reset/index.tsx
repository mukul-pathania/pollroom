import React from 'react';
import Head from 'next/head';
import main from 'layouts/main';
import { useForm, SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import Error from 'components/ErrorMessageInput';
import link from 'link';
import { useRouter } from 'next/router';
import { useToast } from 'contexts/ToastContext';
import { sendResetPasswordEmail } from 'adapters/auth';
type Inputs = { email: string };

const ERROR_MESSAGES = { emailRequired: 'Email is required' };

const PasswordResetPage = (): JSX.Element => {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const router = useRouter();
  const { setToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setButtonDisabled(true);
      const response = await sendResetPasswordEmail(data.email);
      setToast(
        true,
        response.message,
        response.error ? 'ERROR' : 'SUCCESS',
        link.login,
        5000,
      );
      router.push(link.login);
      setButtonDisabled(false);
    } catch (error) {
      setToast(
        true,
        'An error occured while processing your request',
        'ERROR',
        link.changePassword,
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
              Provide your email to reset your password
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                className="mx-auto mt-8 block bg-primary-700 disabled:bg-gray-400 text-white py-4 px-6 text-lg uppercase font-bold cursor-pointer rounded hover:bg-secondary-900 transition-all duration-500 hover:shadow-md w-full"
                type="submit"
                disabled={
                  buttonDisabled || Object.keys(formErrors).length !== 0
                }
                value="Send Email"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

PasswordResetPage.layout = main;

export default PasswordResetPage;

import React from 'react';
import Head from 'next/head';
import mainLayout from 'layouts/main';
import WithAuth from 'components/WithAuth';
import { useForm, SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import Error from 'components/ErrorMessageInput';
import { useRouter } from 'next/router';
import { useToast } from 'contexts/ToastContext';
import { joinRoom } from 'adapters/room';

type Inputs = {
  name: string;
};

const JoinRoom = (): JSX.Element => {
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
      const response = await joinRoom(data.name);
      if (!response.error) {
        // room/[rid] is required otherwise toast will not show up
        setToast(
          true,
          'Room joined successfully',
          'SUCCESS',
          '/room/[rid]',
          5000,
        );
        router.push({
          pathname: '/room/[rid]',
          query: { rid: response.roomId },
        });
      } else {
        setToast(
          true,
          response.message,
          response.error ? 'ERROR' : 'SUCCESS',
          router.pathname,
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
      <Head>
        <title>PollRoom - Join a room with its name</title>
      </Head>
      <div className="bg-gray-50 pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-20 py-12 min-h-screen">
        {/* <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-primary-600 text-center"> */}
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-primary-600 text-center mb-6">
          Join a room
        </h2>
        <p className="font-medium text-primary-400 text-lg pt-2 text-center">
          Provide name of the room you want to join
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full pt-8">
          <input
            className={clsx(
              'mx-auto mt-6 p-4 font-medium placeholder-gray-500 rounded border-none outline-none bg-white text-primary-700 block w-full shadow-lg max-w-md',
              formErrors.name
                ? 'form-error-message'
                : 'focus:ring-primary-700 focus:ring-2',
            )}
            type="text"
            {...register('name', {
              required: {
                value: true,
                message: 'Name is required',
              },
            })}
            placeholder="Name"
          />
          {formErrors.name && (
            <div className="mx-auto w-full max-w-md">
              <Error errorMessage={formErrors.name.message} />
            </div>
          )}
          <input
            className="mx-auto mt-8 block bg-primary-700 disabled:bg-gray-400 text-white py-4 px-6 text-lg uppercase font-bold cursor-pointer rounded hover:bg-secondary-900 transition-all duration-500 hover:shadow-md max-w-md w-full"
            type="submit"
            value="Join room"
            disabled={buttonDisabled || Object.keys(formErrors).length !== 0}
          />
        </form>
      </div>
    </>
  );
};

JoinRoom.layout = mainLayout;

export default WithAuth(JoinRoom);

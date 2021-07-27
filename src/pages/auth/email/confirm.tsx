import React from 'react';
import PageLoadingSkeleton from 'components/PageLoadingSkeleton';
import querystring from 'querystring';
import { useToast } from 'contexts/ToastContext';
import { verifyEmail } from 'adapters/auth';
import link from 'link';
import { useRouter } from 'next/router';

const ConfirmEmail = (): JSX.Element => {
  const { setToast } = useToast();
  const router = useRouter();
  const sendVerifyEmailRequest = async () => {
    const queryParams = querystring.parse(location.hash.substring(1));
    if (queryParams.token) {
      const response = await verifyEmail(queryParams.token as string);
      setToast(
        true,
        response.message,
        response.error ? 'ERROR' : 'SUCCESS',
        response.error ? link.signup : link.login,
        5000,
      );
      router.push(response.error ? link.signup : link.login);
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
  };
  React.useEffect(() => {
    sendVerifyEmailRequest();
  }, []);
  return <PageLoadingSkeleton loading />;
};

export default ConfirmEmail;

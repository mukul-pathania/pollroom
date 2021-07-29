import React from 'react';
import PageLoadingSkeleton from 'components/PageLoadingSkeleton';
import { useRouter } from 'next/router';
import { useToast } from 'contexts/ToastContext';
import link from 'link';

const Success = (): JSX.Element => {
  const router = useRouter();
  const { setToast } = useToast();
  React.useEffect(() => {
    setToast(true, 'Signed up successfully', 'SUCCESS', link.login, 5000);
    router.push(link.login);
  }, []);
  return <PageLoadingSkeleton loading />;
};

export default Success;

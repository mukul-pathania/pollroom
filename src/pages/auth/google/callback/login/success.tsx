import React from 'react';
import PageLoadingSkeleton from 'components/PageLoadingSkeleton';
import { useRouter } from 'next/router';
import { useToast } from 'contexts/ToastContext';
import link from 'link';

const Success = (): JSX.Element => {
  const router = useRouter();
  const { setToast } = useToast();
  React.useEffect(() => {
    setToast(true, 'Logged in successfully', 'SUCCESS', link.dashboard, 5000);
    router.push(link.dashboard);
  }, []);
  return <PageLoadingSkeleton loading />;
};

export default Success;

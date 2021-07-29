import React from 'react';
import PageLoadingSkeleton from 'components/PageLoadingSkeleton';
import { useRouter } from 'next/router';
import { useToast } from 'contexts/ToastContext';
import link from 'link';
import querystring from 'querystring';

const Failed = (): JSX.Element => {
  const router = useRouter();
  const { setToast } = useToast();
  React.useEffect(() => {
    const queryParams = querystring.parse(location.hash.substring(1));
    if (queryParams.message)
      setToast(true, queryParams.message as string, 'ERROR', link.signup, 5000);
    router.push(link.signup);
  }, []);
  return <PageLoadingSkeleton loading />;
};

export default Failed;

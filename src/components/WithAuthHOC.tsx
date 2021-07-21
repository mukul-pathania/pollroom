import React from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import links from 'link';
import PageLoadingSkeleton from './PageLoadingSkeleton';

type propTypes = { children: React.ReactNode };
const withAuthHOC = (props: propTypes): JSX.Element => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push({
        pathname: links.login,
        query: { redirectMessage: 'You need to login first' },
      });
    }
  }, []);
  return (
    <>
      <PageLoadingSkeleton loading={loading}>
        {props.children}
      </PageLoadingSkeleton>
    </>
  );
};

export default withAuthHOC;

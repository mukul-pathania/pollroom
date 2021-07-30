import React from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import links from 'link';
import PageLoadingSkeleton from './PageLoadingSkeleton';
import { useToast } from 'contexts/ToastContext';

type propTypes = { children: React.ReactNode };
const WithAuth = (props: propTypes): JSX.Element => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const { setToast } = useToast();
  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      setToast(true, 'You need to login first', 'INFO', links.login, 5000);
      router.push(links.login);
    }
  }, [loading, isAuthenticated]);
  // Don't mess with this conditional this is correct as redirection might take some time
  if (loading || !isAuthenticated) return <PageLoadingSkeleton loading />;
  else return <>{props.children}</>;
};

export default WithAuth;

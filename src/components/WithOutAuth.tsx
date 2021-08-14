import React from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import links from 'link';
import PageLoadingSkeleton from './PageLoadingSkeleton';

const WithOutAuth = (Component: {
  (): JSX.Element;
  layout: ({ children }: { children: React.ReactNode }) => JSX.Element;
}): {
  (): JSX.Element;
  layout: ({ children }: { children: React.ReactNode }) => JSX.Element;
} => {
  const WithOutAuthComponent = (): JSX.Element => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    React.useEffect(() => {
      if (!loading && isAuthenticated) {
        router.push(links.dashboard);
      }
    }, [loading, isAuthenticated]);
    // Don't mess with this conditional this is correct as redirection might take some time
    if (loading || isAuthenticated) return <PageLoadingSkeleton loading />;
    else return <Component />;
  };
  WithOutAuthComponent.layout = Component.layout;
  return WithOutAuthComponent;
};

export default WithOutAuth;

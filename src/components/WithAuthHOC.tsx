import React from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import links from 'link';

type propTypes = { children: React.ReactNode };
const withAuthHOC = (props: propTypes): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  React.useEffect(() => {
    if (isAuthenticated) setLoading(false);
    else
      router.push({
        pathname: links.login,
        query: { redirectMessage: 'You need to login first' },
      });
  }, []);
  if (loading) return <div>...loading</div>;
  return <>{props.children}</>;
};

export default withAuthHOC;

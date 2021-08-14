import React from 'react';
import { checkAuthWithServer, logout as logoutFromServer } from 'adapters/auth';
import PageLoadingSkeleton from 'components/PageLoadingSkeleton';
import { useRouter } from 'next/router';
import link from 'link';

type AuthContextType = {
  loading: boolean;
  logout: () => void;
  setLoggedIn: () => void;
  user: { username: string; email: string };
  isAuthenticated: boolean | undefined;
};
type AuthStateType = {
  loading: boolean;
  user: { username: string; email: string };
  isAuthenticated: boolean | undefined;
};
type AuthProviderProps = { children: React.ReactNode };

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [authState, setAuthState] = React.useState<AuthStateType>({
    loading: true,
    isAuthenticated: undefined,
    user: { username: '', email: '' },
  });
  const router = useRouter();

  const checkAuth = async (): Promise<void> => {
    try {
      setAuthState((authState) => ({ ...authState, loading: true }));
      const response = await checkAuthWithServer();
      setAuthState((authState) => ({
        ...authState,
        isAuthenticated: response.isAuthenticated,
        user: {
          email: response.email,
          username: response.username,
        },
        loading: false,
      }));
    } catch (error) {
      setAuthState((authState) => ({
        ...authState,
        isAuthenticated: false,
        loading: false,
      }));
    }
  };

  const logout = async () => {
    setAuthState((authState) => ({ ...authState, loading: true }));
    await router.push(link.home.hero);
    await logoutFromServer();
    setAuthState((authState) => ({
      ...authState,
      loading: false,
      isAuthenticated: false,
    }));
  };
  const setLoggedIn = () => {
    setAuthState((authState) => ({
      ...authState,
      loading: false,
      isAuthenticated: true,
    }));
  };

  React.useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user: authState.user,
    loading: authState.loading,
    logout,
    isAuthenticated: authState.isAuthenticated,
    setLoggedIn,
  };
  if (authState.loading)
    return <PageLoadingSkeleton loading={authState.loading} />;
  else
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export default AuthProvider;
export { useAuth };

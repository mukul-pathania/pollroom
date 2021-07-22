import React from 'react';
import { checkAuthWithServer, logout as logoutFromServer } from 'adapters/auth';
import PageLoadingSkeleton from 'components/PageLoadingSkeleton';

type AuthContextType = {
  loading: boolean;
  logout: () => void;
  login: () => void;
  isAuthenticated: boolean | undefined;
};
type AuthStateType = {
  loading: boolean;
  isAuthenticated: boolean | undefined;
};
type AuthProviderProps = { children: React.ReactNode };

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [authState, setAuthState] = React.useState<AuthStateType>({
    loading: true,
    isAuthenticated: undefined,
  });

  const checkAuth = async (): Promise<void> => {
    try {
      setAuthState((authState) => ({ ...authState, loading: true }));
      const isAuthenticated = await checkAuthWithServer();
      setAuthState((authState) => ({
        ...authState,
        isAuthenticated,
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
    await logoutFromServer();
    setAuthState((authState) => ({
      ...authState,
      loading: false,
      isAuthenticated: false,
    }));
  };
  const login = () => {
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
    loading: authState.loading,
    logout,
    isAuthenticated: authState.isAuthenticated,
    login,
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

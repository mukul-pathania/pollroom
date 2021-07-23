import React from 'react';
import Toast from 'components/Toast';
import { useRouter } from 'next/router';

type ToastContextType = {
  message: string;
  autoCloseInterval?: number;
  type: 'ERROR' | 'SUCCESS' | 'INFO';
  open: boolean;
  page: string;
  setToast: (
    open: boolean,
    message: string,
    type: 'ERROR' | 'SUCCESS' | 'INFO',
    page: string,
    autoCloseInterval?: number,
  ) => void;
};
type ToastStateType = {
  message: string;
  autoCloseInterval?: number;
  type: 'ERROR' | 'SUCCESS' | 'INFO';
  open: boolean;
  page: string;
};
type ToastProviderProps = { children: React.ReactNode };

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined,
);

const ToastProvider = (props: ToastProviderProps): JSX.Element => {
  const [toastState, setToastState] = React.useState<ToastStateType>({
    message: '',
    type: 'INFO',
    open: false,
    page: '',
  });
  const { pathname } = useRouter();
  const setToast = (
    open: boolean,
    message: string,
    type: 'ERROR' | 'SUCCESS' | 'INFO',
    page: string,
    autoCloseInterval?: number,
  ): void => {
    setToastState((state) => ({
      ...state,
      open,
      message,
      type,
      page,
      autoCloseInterval,
    }));
  };
  return (
    <ToastContext.Provider
      value={{
        message: toastState.message,
        open: toastState.open,
        autoCloseInterval: toastState.autoCloseInterval,
        type: toastState.type,
        page: toastState.page,
        setToast,
      }}
    >
      <Toast
        open={toastState.open && pathname === toastState.page}
        message={toastState.message}
        type={toastState.type}
        onClose={() => setToastState((state) => ({ ...state, open: false }))}
        autoCloseInterval={toastState.autoCloseInterval}
      />
      {props.children}
    </ToastContext.Provider>
  );
};

const useToast = (): ToastContextType => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;
export { useToast };

import React from 'react';
import { MdClose, MdError, MdCheckCircle, MdInfo } from 'react-icons/md';
import { Transition } from '@headlessui/react';

const ERROR_COLOR = '#DC2626';
const SUCCESS_COLOR = '#059669';
const INFO_COLOR = '#5584ab';
const ErrorIcon = (): JSX.Element => {
  return <MdError style={{ fill: ERROR_COLOR }} size={24} />;
};

const SuccessIcon = (): JSX.Element => {
  return <MdCheckCircle size={24} style={{ fill: SUCCESS_COLOR }} />;
};

const InfoIcon = (): JSX.Element => {
  return <MdInfo size={24} style={{ fill: INFO_COLOR }} />;
};

type propTypes = {
  message: string;
  autoCloseInterval?: number;
  onClose: () => void;
  type: 'ERROR' | 'SUCCESS' | 'INFO';
  open: boolean;
};

const Toast = (props: propTypes): JSX.Element => {
  const timeOutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

  const closeHandler = (): void => {
    timeOutRef.current = undefined;
    props.onClose();
  };
  React.useEffect(() => {
    if (props.open && props.autoCloseInterval) {
      timeOutRef.current = setTimeout(closeHandler, props.autoCloseInterval);
    }
    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
        timeOutRef.current = undefined;
      }
    };
  }, [props.open]);

  const CLOSE_ICON_COLOR =
    props.type === 'ERROR'
      ? ERROR_COLOR
      : props.type === 'INFO'
      ? INFO_COLOR
      : SUCCESS_COLOR;

  return (
    <Transition
      show={props.open}
      enter="transition duration-500 transform"
      enterFrom="-translate-y-full"
      enterTo="translate-y-0"
      leave="transition duration-500 transform"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed w-screen z-50 pointer-events-none top-0 left-0 flex items-center justify-center"
    >
      <div className="mx-12 mt-12 pointer-events-auto ring-1 ring-primary-900 ring-opacity-5 p-4 space-x-4 flex justify-center items-center bg-white rounded-full shadow-2xl">
        <div>
          {props.type === 'ERROR' && <ErrorIcon />}
          {props.type === 'INFO' && <InfoIcon />}
          {props.type === 'SUCCESS' && <SuccessIcon />}
        </div>
        <div className="flex flex-col">
          <p className="text-center font-medium text-sm md:text-base">
            {props.message}
          </p>
        </div>
        <div>
          <MdClose
            onClick={props.onClose}
            style={{ fill: CLOSE_ICON_COLOR, padding: '4px', display: 'block' }}
            size={28}
            className="cursor-pointer hover:bg-gray-300 rounded-full"
          />
        </div>
      </div>
    </Transition>
  );
};

export default Toast;

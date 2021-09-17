import { Transition } from '@headlessui/react';
import MenuItem from './MenuItem';
import clsx from 'clsx';
import React from 'react';
import links from 'link';
import { useAuth } from 'contexts/AuthContext';
import link from 'link';

const LoginSignUpButtons = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-around mt-4 space-y-2">
      <a
        href={links.login}
        className="hover:text-accent-700 text-primary-500 font-main font-medium text-base cursor-pointer"
      >
        Login
      </a>
      <a
        href={links.signup}
        className="text-primary-700 border-primary-500 hover:text-accent-700 hover:border-accent-700 px-6 py-2 font-main rounded font-semibold text-lg border-2 transition duration-500 cursor-pointer"
      >
        Sign Up
      </a>
    </div>
  );
};

const Menu = (): JSX.Element => {
  const { logout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-around mt-4 space-y-4">
      <a
        className="text-primary-500 font-medium hover:text-accent-600 cursor-pointer"
        href={link.dashboard}
      >
        Dashboard
      </a>

      <a className="text-primary-500 font-medium hover:text-accent-600 cursor-pointer">
        My Profile
      </a>
      <a className="text-primary-500 font-medium hover:text-accent-600 cursor-pointer">
        Settings
      </a>
      <a
        className="text-primary-500 font-medium hover:text-accent-600 cursor-pointer"
        onClick={logout}
      >
        Logout
      </a>
    </div>
  );
};

type propTypes = {
  isOpen: boolean;
  isScrolled: boolean;
  closeMobileNav: () => void;
  menuData: { key: number; label: string; path: string; className: string }[];
};

const MobileNav = ({
  isOpen,
  isScrolled,
  closeMobileNav,
  menuData,
}: propTypes): JSX.Element => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const { isAuthenticated } = useAuth();

  return (
    <Transition
      show={isOpen}
      enter="transition duration-500 transform"
      enterFrom="opacity-0 -translate-x-full"
      enterTo="opacity-100 translate-x-0"
      leave="transition duration-500 transform"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-full"
      className={clsx(
        'headerBreakpoint:hidden fixed py-8 left-0 border-b-2 border-secondary-900 w-full flex flex-col items-center justify-around',
        isScrolled ? 'top-14 bg-white' : 'top-18 bg-gray-100',
      )}
    >
      {menuData.map((menuitem) => (
        <MenuItem
          key={menuitem.key}
          path={menuitem.path}
          closeMobileNav={closeMobileNav}
          className={menuitem.className}
        >
          {menuitem.label}
        </MenuItem>
      ))}
      <hr className="h-1 w-2/12 bg-gray-300 rounded-full my-2" />
      {isAuthenticated ? <Menu /> : <LoginSignUpButtons />}
    </Transition>
  );
};

export default MobileNav;

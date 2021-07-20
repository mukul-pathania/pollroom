import { Transition } from '@headlessui/react';
import MenuItem from './MenuItem';
import clsx from 'clsx';
import React from 'react';

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
        'md:hidden fixed py-8 left-0 bg-white w-full flex flex-col items-center justify-around',
        isScrolled ? 'top-14' : 'top-16',
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
      <div className="flex flex-col items-center justify-around mt-4 space-y-2">
        <a className="hover:text-secondary-700 text-primary-700 font-main font-medium text-base cursor-pointer">
          Login
        </a>
        <a className="text-primary-700 border-primary-700 hover:text-secondary-700 hover:border-secondary-700 px-6 py-2 font-main rounded-md font-semibold text-lg border-2 transition duration-500 cursor-pointer">
          Sign Up
        </a>
      </div>
    </Transition>
  );
};

export default MobileNav;

import { Transition } from '@headlessui/react';

type propTypes = { isOpen: boolean };
import MenuItem from './MenuItem';
import MenuData from './MenuData';

const MobileNav = ({ isOpen }: propTypes): JSX.Element => {
  return (
    <Transition
      show={isOpen}
      enter="transition duration-500 transform"
      enterFrom="opacity-0 -translate-x-full"
      enterTo="opacity-100 translate-x-0"
      leave="transition duration-500 transform"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-full"
      className="md:hidden fixed top-16 py-8 left-0 bg-white w-full flex flex-col items-center justify-around"
    >
      {MenuData.map((menuitem) => (
        <MenuItem key={menuitem.key} path={menuitem.path}>
          {menuitem.label}
        </MenuItem>
      ))}
      <div className="flex flex-col items-center justify-around mt-4 space-y-2">
        <a className="hover:text-pink-900 text-pink-700 font-main font-medium text-base cursor-pointer">
          Login
        </a>
        <a className="text-pink-700 border-pink-700 hover:text-pink-900 hover:border-pink-900 px-6 py-2 font-main rounded-md font-semibold text-lg border-2 transition duration-500 cursor-pointer">
          Sign Up
        </a>
      </div>
    </Transition>
  );
};

export default MobileNav;

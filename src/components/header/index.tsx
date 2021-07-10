import * as React from 'react';
import Logo from './Logo';
import MenuItem from './MenuItem';
import MenuData from './MenuData';
import ToggleButton from './ToggleButton';
import MobileNav from './MobileNav';

function Nav(): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16 w-full">
        <div className="flex items-center justify-between w-full my-4">
          <Logo />
          <div className="hidden md:flex justify-between">
            <div className="ml-10 flex items-baseline space-x-4">
              {MenuData.map((menuitem) => (
                <MenuItem key={menuitem.key} path={menuitem.path}>
                  {menuitem.label}
                </MenuItem>
              ))}
            </div>
          </div>
          <div className="space-x-4 items-baseline hidden md:flex">
            <a className="hover:text-pink-700 font-main font-medium text-base cursor-pointer">
              Login
            </a>
            <a className="hover:text-white hover:bg-pink-700 text-pink-700 px-6 py-2 font-main rounded-md font-semibold text-lg border-pink-700 border-2 transition-colors duration-500 cursor-pointer">
              Sign Up
            </a>
          </div>
        </div>
        <ToggleButton isOpen={isOpen} toggleOpen={() => setIsOpen(!isOpen)} />
      </div>
      <MobileNav isOpen={isOpen} />
    </nav>
  );
}

export default Nav;

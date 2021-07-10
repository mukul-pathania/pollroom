import * as React from 'react';
import Logo from './Logo';
import MenuItem from './MenuItem';
import MenuData from './MenuData';
import ToggleButton from './ToggleButton';
import MobileNav from './MobileNav';
import clsx from 'clsx';

function Nav(): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const scrollHandler = (): void => {
    if (window.scrollY > 20) {
      return setIsScrolled(true);
    } else if (window.scrollY < 20) {
      return setIsScrolled(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <nav
      className={clsx(
        'mx-auto px-4 sm:px-6 lg:px-10 fixed top-0 left-0 w-full transition-all duration-500',
        isScrolled ? 'bg-white py-2 md:py-4' : 'py-4 md:py-8',
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between w-full">
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
            <a className="hover:text-white hover:bg-pink-700 text-pink-700 px-6 py-2 font-main rounded-md font-semibold text-base border-pink-700 border-2 transition-colors duration-500 cursor-pointer">
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

import * as React from 'react';
import Logo from './Logo';
import MenuItem from './MenuItem';
import ToggleButton from './ToggleButton';
import MobileNav from './MobileNav';
import clsx from 'clsx';
import links from 'link';

type propsType = {
  menuData: { key: number; label: string; path: string; className: string }[];
};

function Nav(props: propsType): JSX.Element {
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
        'z-50 mx-auto px-4 sm:px-6 lg:px-20 fixed top-0 left-0 w-full transition-all duration-500',
        isScrolled ? 'bg-white py-2 md:py-4 shadow-lg' : 'py-4 md:py-8',
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between w-full">
          <Logo />
          <div className="hidden md:flex justify-between">
            <div className="ml-10 flex items-baseline space-x-4">
              {props.menuData.map((menuitem) => (
                <MenuItem
                  key={menuitem.key}
                  path={menuitem.path}
                  className={menuitem.className}
                >
                  {menuitem.label}
                </MenuItem>
              ))}
            </div>
          </div>
          <div className="space-x-4 items-baseline hidden md:flex">
            <a
              href={links.login}
              className="hover:text-accent-700 font-main font-medium text-base cursor-pointer"
            >
              Login
            </a>
            <a
              href={links.signup}
              className="hover:text-white hover:bg-accent-700 text-primary-700 px-6 py-2 font-main rounded font-semibold text-base border-primary-700 hover:border-accent-700 border-2 transition-colors duration-500 cursor-pointer"
            >
              Sign Up
            </a>
          </div>
        </div>
        <ToggleButton isOpen={isOpen} toggleOpen={() => setIsOpen(!isOpen)} />
      </div>
      <MobileNav
        isOpen={isOpen}
        isScrolled={isScrolled}
        closeMobileNav={() => setIsOpen(false)}
        menuData={props.menuData}
      />
    </nav>
  );
}

export default Nav;

import React from 'react';

type propsType = {
  children: React.ReactNode;
  path: string;
  closeMobileNav?: () => void;
  className: string;
};

const MenuItem = ({
  children,
  path,
  closeMobileNav,
  className,
}: propsType): JSX.Element => {
  return (
    <a
      onClick={
        closeMobileNav
          ? closeMobileNav
          : () => {
              return;
            }
      }
      href={path}
      className={className}
    >
      {children}
    </a>
  );
};

export default MenuItem;

import React from 'react';
import Link from 'next/link';

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
    <Link href={path}>
      <a
        onClick={
          closeMobileNav
            ? closeMobileNav
            : () => {
                return;
              }
        }
        className={className}
      >
        {children}
      </a>
    </Link>
  );
};

export default MenuItem;

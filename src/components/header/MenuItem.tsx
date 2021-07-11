import React from 'react';

type propsType = {
  children: React.ReactNode;
  path: string;
};

const MenuItem = ({ children, path }: propsType): JSX.Element => {
  return (
    <a
      href={path}
      className="hover:text-secondary-700 text-black px-3 py-2 rounded-md font-main font-regular text-base"
    >
      {children}
    </a>
  );
};

export default MenuItem;

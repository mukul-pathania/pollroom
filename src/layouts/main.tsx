import Header from 'components/header';

type propsType = { children: React.ReactNode };

const Layout = ({ children }: propsType): JSX.Element => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;

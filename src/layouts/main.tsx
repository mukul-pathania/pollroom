import Header from 'components/header';
import { useRouter } from 'next/router';
import links from 'link';
import Footer from 'components/Footer';
import link from 'link';

const landingPageData = [
  {
    key: 1,
    label: 'Features',
    path: links.home.features,
    className:
      'hover:text-accent-700 text-primary-500 px-3 py-2 rounded font-main font-regular text-base',
  },
  {
    key: 2,
    label: 'Join a room',
    path: link.joinRoom,
    className:
      'hover:text-accent-700 text-primary-500 px-3 py-2 rounded font-main font-regular text-base',
  },
  {
    key: 3,
    label: 'Testimonials',
    path: links.home.testimonials,
    className:
      'hover:text-accent-700 text-primary-500 px-3 py-2 rounded font-main font-regular text-base',
  },
];
const headerData = [
  {
    key: 1,
    label: 'Join a room',
    path: link.joinRoom,
    className:
      'hover:text-accent-700 text-primary-500 px-3 py-2 font-main font-medium text-base',
  },
  {
    key: 2,
    label: 'Create a room',
    path: link.createNewRoom,
    className:
      'hover:text-accent-700 text-primary-500 px-3 py-2 font-main font-medium text-base',
  },
];

type propsType = { children: React.ReactNode };

const Layout = ({ children }: propsType): JSX.Element => {
  const { pathname } = useRouter();
  const menuData = pathname === '/' ? landingPageData : headerData;
  return (
    <>
      <Header menuData={menuData} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

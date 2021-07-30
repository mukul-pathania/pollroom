import Head from 'next/head';
import mainLayout from 'layouts/main';
import Image404 from 'assets/images/404.svg';
import link from 'link';

const Page404 = (): JSX.Element => {
  console.log(Image404);
  return (
    <>
      <Head>
        <title>404 - This page could not be found</title>
      </Head>
      <div className="pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-20 py-12 min-h-screen">
        <img
          src={Image404.src}
          alt=""
          className="block mx-auto rounded lg:w-6/12 mb-8 mt-8"
        />
        <p className="text-7xl text-center font-bold py-6 text-primary-700">
          OOPS!
        </p>
        <p className="text-center text-xl pb-6">
          The page you are looking for could not be found
        </p>
        <p className="text-center mt-10">
          <a
            href={link.home.hero}
            className="py-4 px-6 bg-accent-600 rounded font-medium text-xl text-white hover:bg-accent-900 transition duration-500"
          >
            Go back to home
          </a>
        </p>
      </div>
    </>
  );
};

Page404.layout = mainLayout;

export default Page404;

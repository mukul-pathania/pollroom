import { useAuth } from 'contexts/AuthContext';
import links from 'link';

const Background = (): JSX.Element => {
  return (
    <div className="absolute w-full h-full top-0 left-0">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <linearGradient id="a" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ea1e8f" />
            <stop offset="1" stopColor="#4d779a" />
          </linearGradient>
        </defs>
        <pattern id="b" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle fill="#03233e" cx="12" cy="12" r="12" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#a)" />
        <rect width="100%" height="100%" fill="url(#b)" fillOpacity="0.1" />
      </svg>
    </div>
  );
};

const SignUp = (): JSX.Element => {
  const { isAuthenticated } = useAuth();
  return (
    <section className="mx-auto mt-4 px-4 sm:px-6 lg:px-20 bg-primary-700 relative">
      <Background />
      <div className="flex flex-col md:flex-row py-12 md:py-12 relative items-center justify-between">
        <p className="text-center md:text-left text-white py-2 mb-4 md:mb-0 text-3xl font-bold md:w-8/12">
          Create polls for your meetings, webinars, events and more!
        </p>
        {isAuthenticated ? (
          <a
            href={links.createNewRoom}
            className="text-accent-500 bg-white rounded py-4 px-6 font-semibold text-xl hover:bg-primary-700 hover:text-white transition transform duration-300"
          >
            Create a room
          </a>
        ) : (
          <a
            href={links.signup}
            className="text-accent-500 bg-white rounded py-4 px-6 font-semibold text-xl hover:bg-primary-700 hover:text-white transition transform duration-300"
          >
            Sign Up
          </a>
        )}
      </div>
    </section>
  );
};
export default SignUp;

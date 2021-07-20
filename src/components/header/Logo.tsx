import LogoImage from 'assets/images/logo.png';
import links from 'link';

const Logo = (): JSX.Element => {
  return (
    <a
      href={links.home.hero}
      className="flex items-center space-x-2 cursor-pointer"
    >
      <img src={LogoImage.src} alt="Logo" className="h-8" />
      <p className="font-main font-semibold md:text-2xl text-xl">PollRoom</p>
    </a>
  );
};

export default Logo;

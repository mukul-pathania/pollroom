import LogoImage from 'assets/images/logo.png';
import links from 'link';
import Link from 'next/link';
const Logo = (): JSX.Element => {
  return (
    <Link href={links.home.hero}>
      <a className="flex items-center space-x-2 cursor-pointer">
        <img src={LogoImage.src} alt="Logo" className="h-8" />
        <p className="font-main font-semibold md:text-2xl text-xl">PollRoom</p>
      </a>
    </Link>
  );
};

export default Logo;

import LogoImage from 'assets/images/logo.png';

const Logo = (): JSX.Element => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <img src={LogoImage.src} alt="Logo" className="h-8" />
      <p className="font-main font-semibold md:text-2xl text-xl">PollRoom</p>
    </div>
  );
};

export default Logo;

import { IoCodeSlashSharp, IoHeart } from 'react-icons/io5';

const Footer = (): JSX.Element => {
  return (
    <footer className="py-6 bg-gradient-to-b from-white to-gray-300 border-t-2 border-accent-900">
      <p className="flex items-center justify-center text-lg text-primary-900">
        <IoCodeSlashSharp size={28} color="#4d779a" />
        <span className="px-1">with</span>
        <IoHeart size={28} color="#DC2626" />
        <span className="px-1">by Mukul</span>
      </p>
    </footer>
  );
};

export default Footer;

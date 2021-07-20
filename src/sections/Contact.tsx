import { IoLocationSharp, IoLogoLinkedin } from 'react-icons/io5';
import { FaPhoneAlt } from 'react-icons/fa';
// import { MdEmail } from 'react-icons/md';
import { ImGithub } from 'react-icons/im';
import clsx from 'clsx';

type contactItemProps = {
  icon: JSX.Element;
  heading: string;
  text: JSX.Element;
  link?: string;
};

const ContactItem = ({
  icon,
  text,
  heading,
  link,
}: contactItemProps): JSX.Element => {
  return (
    <a
      className={clsx(link ? 'cursor-pointer' : 'cursor-default')}
      href={link ? link : ''}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex justify-between items-center md:items-start mb-12 flex-col md:flex-row">
        <div className="md:pr-4 py-2">{icon}</div>
        <div className="flex flex-col justify-between items-center md:items-start pl-4">
          <h4 className="font-medium text-lg text-center md:text-left pb-2 text-gray-200">
            {heading}
          </h4>
          {text}
        </div>
      </div>
    </a>
  );
};

const address = (
  <p className="text-gray-300 text-center md:text-left">
    Kharghar, Navi Mumbai,
    <br />
    Maharashtra, India,
    <br />
    410210
  </p>
);

const Contact = (): JSX.Element => {
  return (
    <section className="mx-auto pt-12 px-4 sm:px-6 lg:px-20 bg-primary-900">
      <h3 className="font-bold text-4xl text-center pb-2 text-white">
        Contact
      </h3>
      <h4 className="text-center font-medium text-gray-400 pb-6 text-lg">
        Get in touch with me
      </h4>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <h4 className="pt-4 text-center md:text-left text-xl font-semibold pb-6 text-gray-50">
            Contact Info
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-col md:items-start">
            <ContactItem
              icon={<IoLocationSharp size={42} style={{ fill: 'white' }} />}
              heading="Address"
              text={address}
              link="https://goo.gl/maps/LGYR2rb2qsWQvqEZA"
            />
            <ContactItem
              icon={<FaPhoneAlt size={42} color="white" />}
              heading="Phone"
              text={<p className="text-gray-300">+917977540418</p>}
              link="tel:+917977540418"
            />
            {/* <ContactItem
              icon={<MdEmail style={{ fill: 'white' }} size={42} />}
              heading="Email"
              text={<p className="text-gray-300">mukulpathania96@gmail.com</p>}
            /> */}
            <ContactItem
              icon={<ImGithub style={{ fill: 'white' }} size={42} />}
              heading="Github"
              text={<p className="text-gray-300">mukul-pathania</p>}
              link="https://github.com/mukul-pathania"
            />
            <ContactItem
              icon={<IoLogoLinkedin style={{ fill: 'white' }} size={42} />}
              heading="LinkedIn"
              text={<p className="text-gray-300">mukul-pathania-b37aa71b3</p>}
              link="https://www.linkedin.com/in/mukul-pathania-b37aa71b3/"
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <h4 className="pt-4 md:text-left text-center text-xl font-semibold pb-6 text-gray-50">
            Write a message for me
          </h4>
          <form
            action="mailto:mukulpathania96@gmail.com"
            method="POST"
            className="flex flex-col items-center md:items-start mb-12 md:mb-0"
          >
            <input
              className="mb-5 p-4 placeholder-secondary-300 rounded border-none outline-none bg-primary-500 text-white block w-10/12"
              type="text"
              name="fullname"
              placeholder="Full Name"
            />
            <input
              className="mb-5 p-4 placeholder-secondary-300 rounded border-none outline-none bg-primary-500 text-white block w-10/12"
              type="text"
              name="email"
              placeholder="Email"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              id=""
              className="mb-5 p-4 placeholder-secondary-300 rounded border-none resize-none outline-none bg-primary-500 h-56 text-white block w-10/12"
            />
            <input
              className="w-10/12 bg-accent-700 text-white py-4 px-6 text-lg uppercase font-bold cursor-pointer rounded hover:bg-accent-900 transition-all duration-500 hover:shadow-md"
              type="submit"
              value="Send Message"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

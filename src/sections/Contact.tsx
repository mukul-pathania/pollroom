import React from 'react';
import { IoLocationSharp, IoLogoLinkedin } from 'react-icons/io5';
import { ImGithub } from 'react-icons/im';
import clsx from 'clsx';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useForm, SubmitHandler } from 'react-hook-form';
import Error from 'components/ErrorMessageInput';
import { sendReviewEmail } from 'adapters/review';
import { useToast } from 'contexts/ToastContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
    <Link href={link ? link : ''}>
      <a
        className={clsx(link ? 'cursor-pointer' : 'cursor-default')}
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
    </Link>
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

type Inputs = { name: string; email: string; message: string };

const Contact = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm<Inputs>();
  const router = useRouter();
  const { setToast } = useToast();
  const [hCaptchaToken, sethCaptchaToken] = React.useState('');
  const hCaptchaRef = React.useRef<HCaptcha>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!hCaptchaToken) {
      setToast(
        true,
        'Solve the captcha to send the message',
        'ERROR',
        router.pathname,
        5000,
      );
      return;
    }
    const response = await sendReviewEmail(
      data.email,
      data.name,
      data.message,
      hCaptchaToken,
    );
    setToast(
      true,
      response.message,
      response.error ? 'ERROR' : 'SUCCESS',
      router.pathname,
      5000,
    );
    reset({ name: '', email: '', message: '' });
    sethCaptchaToken('');
    hCaptchaRef.current?.resetCaptcha();
  };

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
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center md:items-start mb-12 md:mb-6"
          >
            <input
              className="mt-5 p-4 placeholder-secondary-300 rounded border-none outline-none bg-primary-500 text-white block w-10/12"
              type="text"
              {...register('name', {
                required: {
                  value: true,
                  message: 'Name is required',
                },
              })}
              placeholder="Full Name"
            />
            {formErrors.name && (
              <Error errorMessage={formErrors.name.message} />
            )}

            <input
              className="mt-5 p-4 placeholder-secondary-300 rounded border-none outline-none bg-primary-500 text-white block w-10/12"
              type="email"
              placeholder="Email"
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is required',
                },
              })}
            />
            {formErrors.email && (
              <Error errorMessage={formErrors.email.message} />
            )}

            <textarea
              placeholder="Your Message"
              {...register('message', {
                required: { value: true, message: 'Message is required' },
              })}
              className="mt-5 p-4 placeholder-secondary-300 rounded border-none resize-none outline-none bg-primary-500 h-56 text-white block w-10/12"
            />
            {formErrors.message && (
              <Error errorMessage={formErrors.message.message} />
            )}
            <div className="mt-5">
              <HCaptcha
                ref={hCaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string}
                onVerify={(token) => sethCaptchaToken(token)}
              />
            </div>
            <input
              className="w-10/12 bg-accent-700 disabled:bg-gray-400 text-white py-4 px-6 text-lg uppercase font-bold cursor-pointer rounded hover:bg-accent-900 transition-all duration-500 hover:shadow-md mt-5"
              type="submit"
              value="Send Message"
              disabled={Object.keys(formErrors).length !== 0}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

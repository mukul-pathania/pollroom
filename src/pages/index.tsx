import Header from 'components/header';
import Contact from 'sections/Contact';
import Features from 'sections/Features';
import Hero from 'sections/Hero';
import SignUp from 'sections/SignUpCTA';
import Testimonial from 'sections/Testimonials';
import Head from 'next/head';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>PollRoom - Better way to organize your polls</title>
      </Head>
      <Header />
      <Hero />
      <Features />
      <SignUp />
      <Testimonial />
      <Contact />
    </>
  );
}

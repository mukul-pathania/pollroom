import Contact from 'sections/Contact';
import Features from 'sections/Features';
import Hero from 'sections/Hero';
import SignUp from 'sections/SignUpCTA';
import Testimonial from 'sections/Testimonials';
import Head from 'next/head';
import Layout from 'layouts/main';

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>PollRoom - Better way to organize your polls</title>
      </Head>
      <Hero />
      <Features />
      <SignUp />
      <Testimonial />
      <Contact />
    </>
  );
};

Home.layout = Layout;

export default Home;

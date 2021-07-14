import Header from 'components/header';
import Contact from 'sections/Contact';
import Features from 'sections/Features';
import Hero from 'sections/Hero';
import SignUp from 'sections/SignUpCTA';
import Testimonial from 'sections/Testimonials';

export default function Home(): JSX.Element {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <SignUp />
      <Testimonial />
      <Contact />
    </>
  );
}

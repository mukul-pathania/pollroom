import Header from 'components/header';
import Features from 'sections/Features';
import Hero from 'sections/Hero';
import Testimonial from 'sections/Testimonials';

export default function Home(): JSX.Element {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Testimonial />
    </>
  );
}

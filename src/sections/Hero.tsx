import heroImage from 'assets/images/asset1.svg';
import links from 'link';

const Hero = (): JSX.Element => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center md:items-start mx-auto px-4 pt-24 md:pt-32 lg:pt-48 sm:px-6 lg:px-20 bg-gray-100">
      <div className="md:pr-8 md:w-1/2">
        <h3 className="font-bold text-3xl md:text-4xl lg:text-6xl text-center md:text-left mb-5">
          A better way to
          <span className="text-secondary-600"> create &#38; organize </span>
          multiple
          <span className="text-secondary-600"> real-time </span>
          polls
        </h3>
        <p className="font-normal text-lg text-center md:text-left mb-6">
          Organize multipe questions into rooms
          <br />
          Different rooms for different purposes
        </p>
        <a
          href={links.createNewRoom}
          className="mx-auto md:mx-0 md:mb-12 block max-w-max px-6 py-2 md:py-4 rounded font-bold text-xl md:text-2xl text-white bg-primary-600 hover:bg-accent-700 transition-all duration-500 transform md:hover:scale-105"
        >
          Create a room
        </a>
      </div>
      <div className="md:w-1/2">
        <img
          src={heroImage.src}
          alt="banner"
          className="lg:-mt-24 md:-mt-12 block mt-8 max-h-60 sm:max-h-96 md:max-h-full"
        />
      </div>
    </section>
  );
};

export default Hero;

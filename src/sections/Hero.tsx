import heroImage from 'assets/images/asset1.svg';

const Hero = (): JSX.Element => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center md:items-start mx-auto px-4 pt-24 md:pt-48 sm:px-6 lg:px-20 bg-gray-100">
      <div className="md:pr-8 md:w-1/2">
        <h3 className="font-bold text-4xl md:text-5xl lg:text-6xl text-center md:text-left mb-5">
          A better way to{' '}
          <span className="text-secondary-600"> create &#38; organize </span>
          multiple
          <span className="text-secondary-600"> real-time </span>
          polls
        </h3>
        <p className="font-normal text-lg text-center md:text-left leading-8 mb-6">
          Organize multipe poll questions into rooms
          <br />
          Different rooms for different purposes
        </p>
        <button
          role="button"
          className="mx-auto md:mx-0 block px-6 py-2 md:py-4 rounded-md font-bold text-xl md:text-2xl text-white bg-primary-600 hover:bg-secondary-700 transition-all transform md:hover:scale-x-110"
        >
          Create a room
        </button>
      </div>
      <div className="md:w-1/2">
        <img
          src={heroImage.src}
          alt="banner"
          className="md:-mt-24 block mt-8 max-h-60 sm:max-h-96 md:max-h-full"
        />
      </div>
    </section>
  );
};

export default Hero;

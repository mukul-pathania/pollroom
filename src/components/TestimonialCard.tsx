type propTypes = {
  text: string;
  image: string;
  name: string;
  username: string;
};

const TestimonialCard = ({
  text,
  image,
  name,
  username,
}: propTypes): JSX.Element => {
  return (
    <div className="bg-white rounded-md mb-8 p-5 m-2 w-80 shadow hover:shadow-2xl">
      <p className="text-gray-700">{text}</p>
      <div className="flex items-center mt-5">
        <img src={image} alt={name} className="block mr-4 max-h-8" />
        <div>
          <h3 className="text-primary-900 text-base font-medium">{name}</h3>
          <p className="text-accent-500 font-medium text-sm">{username}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

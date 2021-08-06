import clsx from 'clsx';
import TickImage from 'assets/images/tick.svg';

type propTypes = {
  question: string;
  options: {
    id: string;
    created_at: Date;
    option_text: string;
    votes: {
      id: string;
      option_id: string;
      created_at: Date;
      user_id: string;
    }[];
  }[];
  pollNumber: number;
};

const Poll = (props: propTypes): JSX.Element => {
  return (
    <div className="mb-4 md:mb-8">
      <span className="text-3xl lg:text-5xl opacity-30 text-accent-700 font-bold block mb-2 mt-4 md:mt-0">
        Q{props.pollNumber}
      </span>
      <p className="font-medium text-2xl lg:text-4xl mb-8">{props.question}</p>
      <div className="mt-4 flex flex-col space-y-8">
        {props.options.map((option) => (
          <p
            key={option.id}
            className={clsx(
              'flex justify-between ring-2 ring-secondary-800 ring-opacity-30  rounded p-4 lg:p-6 text-lg lg:text-2xl font-medium max-w-lg cursor-pointer',
              // option.isSelected
              //   ? 'transform translate-x-2 ring-4 ring-opacity-100'
              //   : 'hover:shadow-xl hover:ring-accent-700 transform hover:-translate-y-2 transition duration-500',
              'hover:shadow-xl hover:ring-accent-700 transform hover:-translate-y-2 transition duration-500',
            )}
          >
            {option.option_text}
            {/* {option.isSelected && <img src={TickImage.src} className="h-8" />} */}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Poll;

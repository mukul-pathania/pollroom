import clsx from 'clsx';
import TickImage from 'assets/images/tick.svg';

type propTypes = {
  id: string;
  question: string;
  options: {
    created_at: Date;
    id: string;
    option_text: string;
    _count: { votes: number } | null;
  }[];
  pollNumber: number;
  selectedOption?: number;
  addOrUpdateVote: (
    pollId: string,
    optionId: string,
    pollIndex: number,
    optionIndex: number,
  ) => void;
};

const VoteCount = (props: { count?: number }): JSX.Element => {
  if (props.count)
    return (
      <p className="text-base">
        {props.count} {props.count > 1 ? 'votes' : 'vote'}
      </p>
    );
  return <p className="text-base">0 vote</p>;
};

const Poll = (props: propTypes): JSX.Element => {
  return (
    <div className="mb-4 md:mb-8">
      <span className="text-3xl lg:text-5xl opacity-30 text-accent-700 font-bold block mb-2 mt-4 md:mt-0">
        Q{props.pollNumber}
      </span>
      <p className="font-medium text-2xl lg:text-4xl mb-8">{props.question}</p>
      <div className="mt-4 flex flex-col space-y-8">
        {props.options.map((option, optionIndex) => (
          <div
            onClick={() => {
              // Do this only if the option is not already selected
              if (props.selectedOption !== optionIndex)
                props.addOrUpdateVote(
                  props.id,
                  option.id,
                  props.pollNumber - 1,
                  optionIndex,
                );
            }}
            key={option.id}
            className={clsx(
              'flex justify-between ring-2 ring-secondary-800 ring-opacity-30 rounded p-4 lg:px-6 lg:py-4 text-lg lg:text-2xl font-medium max-w-lg cursor-pointer transform transition duration-500',
              props.selectedOption === optionIndex
                ? 'translate-x-2 ring-4 ring-opacity-100'
                : 'hover:shadow-xl hover:ring-accent-700 hover:-translate-y-2',
            )}
          >
            <div>
              {option.option_text}
              <VoteCount count={option._count?.votes} />
            </div>
            {props.selectedOption === optionIndex && (
              <img src={TickImage.src} className="h-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Poll;

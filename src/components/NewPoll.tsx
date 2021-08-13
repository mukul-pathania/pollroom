import React from 'react';
import { GoPlus } from 'react-icons/go';
import { BsTrash } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

type propTypes = { pollNumber: number };

const NewPoll = (props: propTypes): JSX.Element => {
  const [options, setOptions] = React.useState<
    Array<{ option_text: string; key: string }>
  >([]);

  return (
    <div className="mb-4 md:mb-8">
      <span className="text-3xl lg:text-5xl opacity-30 text-accent-700 font-bold block mb-2 mt-4 md:mt-0">
        Q{props.pollNumber}
      </span>
      <textarea
        className="mt-2 p-4 font-medium text-2xl lg:text-4xl mb-8 border-none outline-none focus:ring-2 focus:ring-primary-700 rounded resize-none"
        rows={2}
        placeholder="Eg. Which is your favourite sport?"
      />
      <div className="mt-4 flex flex-col space-y-8">
        {options.map((option, index) => (
          <div
            key={option.key}
            className="relative flex space-x-4 group items-center justify-between"
          >
            <input
              placeholder={`Option ${index + 1}`}
              key={option.key}
              onChange={(e) => {
                const optionCopy = [...options];
                optionCopy[index].option_text = e.target.value;
                setOptions(optionCopy);
              }}
              className="outline-none border-none focus:shadow-xl focus:ring-opacity-100 ring-2 ring-secondary-800 ring-opacity-30 rounded p-4 lg:px-6 lg:py-4 text-lg lg:text-2xl font-medium cursor-pointer transform transition duration-500 group block w-full max-w-lg"
            />
            <button className="group-hover:visible invisible block p-2 cursor-pointer hover:bg-gray-300 rounded">
              <BsTrash
                size={32}
                className="text-red-500"
                onClick={() => {
                  const optionsCopy = [...options];
                  optionsCopy.splice(index, 1);
                  setOptions(optionsCopy);
                }}
              />
            </button>
          </div>
        ))}
      </div>
      <button
        className={clsx(
          'mt-4 font-medium text-xl rounded bg-accent-600 text-white py-4 px-6 flex items-center transition duration-500 hover:bg-accent-900 shadow-xl',
          options.length >= 6 && 'hidden',
        )}
        onClick={() => {
          if (options.length < 6)
            setOptions((options) => [
              ...options,
              { option_text: '', key: uuidv4() },
            ]);
        }}
      >
        Add a option
        <span className="pl-4">
          <GoPlus />
        </span>
      </button>
      <button className="w-full bg-accent-700 text-white py-4 px-6 mt-12 text-lg uppercase font-bold cursor-pointer rounded hover:bg-accent-900 transition-all duration-500 hover:shadow-md">
        Create your poll
      </button>
    </div>
  );
};

export default NewPoll;

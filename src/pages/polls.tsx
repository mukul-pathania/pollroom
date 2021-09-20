import WithAuth from 'components/WithAuth';
import Head from 'next/head';
import mainLayout from 'layouts/main';
import Link from 'next/link';
import link from 'link';
import { formatDistanceToNow } from 'date-fns';
import { getPollsCreated, pollsCreatedType } from 'adapters/dashboard';
import React from 'react';
import { useToast } from 'contexts/ToastContext';
import { useRouter } from 'next/router';
import { Listbox, Transition } from '@headlessui/react';
import { IoIosArrowDown } from 'react-icons/io';
import clsx from 'clsx';

type PollCardProps = {
  created_at: Date;
  votes: number;
  question: string;
  id: string;
  room_id: string;
  roomName: string;
};

const PollCard = (props: PollCardProps): JSX.Element => {
  return (
    <Link href={{ pathname: link.specificRoom, query: { rid: props.room_id } }}>
      <div className="cursor-pointer relative px-6 py-12 bg-white max-w-lg rounded hover:shadow-2xl duration-500 transform hover:-translate-y-1">
        <h3 className="text-3xl text-primary-500 font-semibold pb-2 truncate">
          {props.question}
        </h3>
        <p className="text-lg font-medium text-gray-500">
          Created{' '}
          {formatDistanceToNow(new Date(props.created_at), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </p>
        <p className="text-xl font-medium text-secondary-800 pt-6">
          {props.roomName}
        </p>
        <p className="absolute -top-4 md:-top-4 -right-3 md:-right-10 w-24 h-12 border-2 border-secondary-400 bg-gray-200 rounded-full flex justify-center items-center p-2 font-medium text-base">
          {props.votes} {props.votes === 1 ? 'vote' : 'votes'}
        </p>
      </div>
    </Link>
  );
};

const sortingOptions = [
  { id: '1', text: 'recent' },
  { id: '2', text: 'popular' },
];

type pollsStateType = pollsCreatedType;
const Polls = (): JSX.Element => {
  const { setToast } = useToast();
  const router = useRouter();
  const [polls, setPolls] = React.useState<pollsStateType>([]);

  const [sortingOption, setSortingOption] = React.useState<{
    id: string;
    text: string;
  }>(sortingOptions[1]);

  const fetchPolls = async () => {
    const response = await getPollsCreated(
      sortingOption.text === 'recent' ? 'recent' : 'popular',
    );
    if (response.error) {
      setToast(true, response.message, 'ERROR', router.pathname, 5000);
    }
    setPolls(response.pollsCreated);
  };

  React.useEffect(() => {
    fetchPolls();
  }, [sortingOption]);
  return (
    <>
      <Head>
        <title>PollRoom - Your Polls</title>
      </Head>
      <div className="pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-20 pb-12 lg:py-28 bg-gray-100 min-h-screen">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-primary-600">
            Your Polls
          </h2>
          <Listbox value={sortingOption} onChange={setSortingOption}>
            <div className="relative mt-1">
              <Listbox.Button
                className={({ open }) =>
                  clsx(
                    open ? 'bg-white' : 'bg-gray-300',
                    'px-3 md:px-5 py-2 md:py-4 outline-none border-none transition duration-500 flex space-x-4 items-center rounded capitalize font-medium md:text-lg text-base',
                  )
                }
              >
                <span className="block truncate">{sortingOption.text}</span>
                <span className="block">
                  <IoIosArrowDown />
                </span>
              </Listbox.Button>
              <Transition
                as={React.Fragment}
                enter="transition transform duration-300"
                enterFrom="scale-0 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="transition transform duration-300"
                leaveFrom="scale-100"
                leaveTo="scale-0"
              >
                <Listbox.Options className="absolute w-full outline-none my-1 bg-white rounded max-h-60 z-10">
                  {sortingOptions.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      value={option}
                      className={({ selected, active }) =>
                        clsx(
                          selected ? 'bg-gray-200 font-medium' : 'font-normal',
                          active ? 'bg-gray-50' : null,
                          'py-2 px-4 cursor-pointer capitalize',
                        )
                      }
                    >
                      {option.text}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <p className="font-medium text-primary-400 text-lg pt-2">
          These are the polls you created
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          {polls.map((poll) => (
            <PollCard
              key={poll.id}
              votes={poll._count?.vote || 0}
              created_at={poll.created_at}
              question={poll.question}
              id={poll.id}
              room_id={poll.room_id}
              roomName={poll.room.name}
            />
          ))}
        </div>
        {polls.length === 0 ? (
          <p className="font-medium text-primary-400 text-lg md:text-xl text-center">
            {"You haven't created any poll yet"}
          </p>
        ) : null}
      </div>
    </>
  );
};

Polls.layout = mainLayout;

export default WithAuth(Polls);

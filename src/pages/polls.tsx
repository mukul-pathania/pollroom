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
        <h3 className="text-3xl text-primary-500 font-semibold pb-4 truncate">
          {props.question}
        </h3>
        <p className="text-lg font-medium text-primary-300 pb-2">
          Created{' '}
          {formatDistanceToNow(new Date(props.created_at), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </p>
        <p className="text-lg font-medium text-primary-300">
          room: {props.roomName}
        </p>
        <p className="absolute -top-4 md:-top-4 -right-3 md:-right-10 w-24 h-12 border-2 border-primary-500 bg-gray-200 rounded-full flex justify-center items-center p-2 font-medium text-base">
          {props.votes} {props.votes === 1 ? 'vote' : 'votes'}
        </p>
      </div>
    </Link>
  );
};

type pollsStateType = pollsCreatedType;
const Polls = (): JSX.Element => {
  const { setToast } = useToast();
  const router = useRouter();
  const [polls, setPolls] = React.useState<pollsStateType>([]);
  const fetchPolls = async () => {
    const response = await getPollsCreated();
    if (response.error) {
      setToast(true, response.message, 'ERROR', router.pathname, 5000);
    }
    setPolls(response.pollsCreated);
  };

  React.useEffect(() => {
    fetchPolls();
  }, []);
  return (
    <>
      <Head>
        <title>PollRoom - Your Polls</title>
      </Head>
      <div className="pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-20 pb-12 lg:py-28 bg-gray-100 min-h-screen">
        <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-primary-600">
          Your Polls
        </h2>
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
      </div>
    </>
  );
};

Polls.layout = mainLayout;

export default WithAuth(Polls);

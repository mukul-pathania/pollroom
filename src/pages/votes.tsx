import WithAuth from 'components/WithAuth';
import Head from 'next/head';
import mainLayout from 'layouts/main';
import React from 'react';
import { useToast } from 'contexts/ToastContext';
import { useRouter } from 'next/router';
import { getVotesCast, vote } from 'adapters/dashboard';
import link from 'link';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import TickImage from 'assets/images/tick.svg';

type VoteCardProps = { vote: vote };

const VoteCard = (props: VoteCardProps): JSX.Element => {
  return (
    <Link
      href={{ pathname: link.specificRoom, query: { rid: props.vote.roomId } }}
    >
      <div className="cursor-pointer relative px-6 py-8 bg-white max-w-lg rounded hover:shadow-2xl duration-500 transform hover:-translate-y-1">
        <h3
          className="text-3xl text-primary-500 font-semibold pb-2 truncate"
          title="Question"
        >
          {props.vote.question}
        </h3>
        <p className="text-lg font-medium text-gray-500">
          Created{' '}
          {formatDistanceToNow(new Date(props.vote.pollCreatedAt), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </p>
        <div className="flex items-center space-x-2 pt-6">
          <img src={TickImage.src} className="h-4" />
          <p className="text-lg font-medium text-secondary-800">
            You voted{' '}
            <span className="font-semibold text-primary-900">
              {props.vote.optionText}
            </span>{' '}
            on this poll{' '}
            {formatDistanceToNow(new Date(props.vote.voteUpdatedAt), {
              addSuffix: true,
              includeSeconds: true,
            })}
          </p>
        </div>
        <p
          className="text-lg font-medium text-secondary-800 pt-2"
          title="Roomname"
        >
          {props.vote.roomName}
        </p>
      </div>
    </Link>
  );
};

const RoomsJoined = (): JSX.Element => {
  const { setToast } = useToast();
  const router = useRouter();
  const [votesState, setVotesState] = React.useState<{
    votes: Array<vote>;
    loading: boolean;
  }>({ votes: [], loading: true });
  const fetchVotesCast = async () => {
    const response = await getVotesCast();
    if (response.error) {
      setToast(true, response.message, 'ERROR', router.pathname, 5000);
      setVotesState((state) => ({ ...state, loading: false }));
    }
    setVotesState({ loading: false, votes: response.votes });
  };

  React.useEffect(() => {
    fetchVotesCast();
  }, []);

  return (
    <>
      <Head>
        <title>PollRoom - Your Votes</title>
      </Head>
      <div className="pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-20 pb-12 lg:py-28 bg-gray-100 min-h-screen">
        <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-primary-600">
          Votes Cast
        </h2>
        <p className="font-medium text-primary-400 text-lg pt-2">
          Polls you voted on
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          {votesState.votes.map((vote) => (
            <VoteCard vote={vote} key={vote.id} />
          ))}
        </div>
        {!votesState.loading && votesState.votes.length === 0 ? (
          <p className="font-medium text-primary-400 text-lg md:text-xl text-center">
            {"You haven't voted on any poll yet"}
          </p>
        ) : null}
      </div>
    </>
  );
};

RoomsJoined.layout = mainLayout;

export default WithAuth(RoomsJoined);

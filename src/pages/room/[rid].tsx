import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { io, Socket } from 'socket.io-client';
import mainLayout from 'layouts/main';
import Poll from 'components/Poll';
import WithAuth from 'components/WithAuth';
import { getRoomInfo, roomInfo } from 'adapters/room';
import { GoPlus } from 'react-icons/go';
import NewPoll from 'components/NewPoll';
import { useToast } from 'contexts/ToastContext';
import link from 'link';
import PageLoadingSkeleton from 'components/PageLoadingSkeleton';
import { useAuth } from 'contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import registerSocketHandlers, { poll } from 'adapters/socketHandlers';

type roomState = roomInfo;
const defaultState: roomState = {
  creator: { username: '', id: '' },
  created_at: new Date(),
  name: '',
  polls: [],
};
const Room = (): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [roomState, setRoomState] = React.useState<roomState>(defaultState);
  const [creatingPoll, setCreatingPoll] = React.useState<boolean>(false);
  const [socketToken, setSocketToken] = React.useState<string>('');
  const [socket, setSocket] = React.useState<Socket>();
  const { user } = useAuth();
  const { setToast } = useToast();
  const onCreatePoll = (data: {
    question: string;
    options: Array<{ option_text: string }>;
  }) => {
    if (socket && socket.connected) {
      socket.emit('poll:create', data.question, data.options);
    } else {
      setToast(
        true,
        'Poll creation failed: Not connected through websocket',
        'ERROR',
        router.pathname,
        5000,
      );
    }
    setCreatingPoll(false);
  };

  const addOrUpdateVote = (
    pollId: string,
    optionId: string,
    pollIndex: number,
    optionIndex: number,
  ) => {
    const pollsCopy = roomState.polls;
    pollsCopy[pollIndex].selectedOption = optionIndex;
    setRoomState((currentState) => ({ ...currentState, polls: pollsCopy }));
    if (socket && socket.connected) {
      socket.emit('poll:castvote', pollId, optionId);
    }
  };

  const addPoll = (poll: poll) => {
    poll.selectedOption = -1;
    const pollsCopy = roomState.polls;
    pollsCopy.push(poll);
    setRoomState((currentState) => ({
      ...currentState,
      polls: pollsCopy,
    }));
  };
  const updatePolls = (poll: poll) => {
    const pollsCopy = roomState.polls;
    const indexToUpdate = pollsCopy.findIndex(
      (currentPoll) => currentPoll.id === poll.id,
    );
    if (indexToUpdate === -1) {
      pollsCopy.push(poll);
    } else {
      poll.selectedOption = pollsCopy[indexToUpdate].selectedOption;
      pollsCopy[indexToUpdate] = poll;
    }
    setRoomState((currentState) => ({ ...currentState, polls: pollsCopy }));
  };

  const setRoomData = async () => {
    try {
      const roomData = await getRoomInfo(router.query.rid as string);
      if (roomData.error) throw new Error(roomData.message);
      if (roomData.roomInfo) setRoomState(roomData.roomInfo);
      if (roomData.socketToken) setSocketToken(roomData.socketToken);
      setLoading(false);
    } catch (error) {
      setToast(
        true,
        (error as { message: string }).message,
        'ERROR',
        link.home.hero,
        5000,
      );
      router.push(link.home.hero);
    }
  };

  React.useEffect(() => {
    setRoomData();
  }, []);

  React.useEffect(() => {
    if (!socketToken) return;
    const serverURL = process.env.NEXT_PUBLIC_BASE_URL as string;
    const createdSocket = io(serverURL, {
      auth: { token: socketToken },
      transports: ['websocket', 'polling'], //Use websockets first if available
    });
    setSocket(createdSocket);
    registerSocketHandlers(
      createdSocket,
      router.query.rid as string,
      addPoll,
      updatePolls,
    );
    return () => {
      createdSocket.close();
    };
  }, [socketToken]);

  if (loading) return <PageLoadingSkeleton loading />;
  return (
    <>
      <Head>
        <title>PollRoom - {roomState.name}</title>
      </Head>
      <div className="bg-gray-50 pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-20 py-12 min-h-screen">
        <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-primary-600">
          {roomState.name}
        </h2>
        <p className="font-medium text-primary-100 text-lg pt-2">
          Created by
          <span className="text-primary-900">
            {' '}
            {roomState.creator.username === user.username
              ? 'you'
              : roomState.creator.username}{' '}
          </span>
          {formatDistanceToNow(new Date(roomState.created_at), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </p>
        <div className="mt-8 grid grid-cols1 md:grid-cols-2 gap-8 divide-y-2 divide-secondary-700 md:divide-none">
          {roomState.polls.map((poll, index) => (
            <Poll
              question={poll.question}
              options={poll.options}
              key={poll.id}
              id={poll.id}
              pollNumber={index + 1}
              addOrUpdateVote={addOrUpdateVote}
              selectedOption={poll.selectedOption}
            />
          ))}
          {creatingPoll && (
            <NewPoll
              pollNumber={roomState.polls.length + 1 || 1}
              onCreation={onCreatePoll}
              onClose={() => setCreatingPoll(false)}
            />
          )}
        </div>
        {/* <hr className="h-1 w-full bg-primary-700 rounded-full my-6" /> */}
        {!creatingPoll && user.username === roomState.creator.username && (
          <div className="flex items-center justify-center">
            <button
              className="font-medium text-xl rounded bg-accent-600 text-white py-4 px-6 mt-8 flex items-center transition duration-500 hover:bg-accent-900 shadow-xl"
              onClick={() => setCreatingPoll(true)}
            >
              Add a poll
              <span className="pl-4">
                <GoPlus />
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

Room.layout = mainLayout;

export default WithAuth(Room);

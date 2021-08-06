import React from 'react';
import { useRouter } from 'next/router';
import mainLayout from 'layouts/main';
import Poll from 'components/Poll';
import WithAuth from 'components/WithAuth';
import { getRoomInfo, roomInfo } from 'adapters/room';

type roomState = roomInfo;
const Room = (): JSX.Element => {
  const router = useRouter();
  const [roomState, setRoomState] = React.useState<roomState | undefined>();
  console.log(router.query.rid);
  const setRoomData = async () => {
    try {
      const roomData = await getRoomInfo(router.query.rid as string);
      setRoomState(roomData.roomInfo);
    } catch (error) {}
  };
  React.useEffect(() => {
    setRoomData();
  }, []);
  return (
    <WithAuth>
      <div className="bg-gray-50 pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-20 py-12 min-h-screen">
        <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-primary-600">
          {/* RoomName */}
          {roomState?.name}
        </h2>
        <p className="font-medium text-primary-100 text-lg pt-2">
          Created by
          <span className="text-primary-900">
            {' '}
            {roomState?.creator.username}{' '}
          </span>
          {roomState?.created_at}
        </p>
        <div className="mt-8 grid grid-cols1 md:grid-cols-2 gap-8 divide-y-2 divide-secondary-700 md:divide-none">
          {/* {placeholderData.map((poll, index) => (
            <Poll
              question={poll.question}
              options={poll.options}
              key={poll.id}
              pollNumber={index + 1}
            />
          ))} */}
          {roomState?.polls.map((poll, index) => (
            <Poll
              question={poll.question}
              options={poll.options}
              key={poll.id}
              pollNumber={index + 1}
            />
          ))}
        </div>
      </div>
    </WithAuth>
  );
};

Room.layout = mainLayout;

export default Room;

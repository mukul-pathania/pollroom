import WithAuth from 'components/WithAuth';
import Head from 'next/head';
import mainLayout from 'layouts/main';
import React from 'react';
import { getRoomsJoined, roomsJoined } from 'adapters/dashboard';
import { useToast } from 'contexts/ToastContext';
import { useRouter } from 'next/router';
import RoomCard from 'components/RoomCard';

const RoomsJoined = (): JSX.Element => {
  const { setToast } = useToast();
  const router = useRouter();
  const [roomsJoined, setRoomsJoined] = React.useState<Array<roomsJoined>>([]);
  const fetchRoomsJoined = async () => {
    const response = await getRoomsJoined();
    if (response.error) {
      setToast(true, response.message, 'ERROR', router.pathname, 5000);
    }
    setRoomsJoined(response.roomsJoined);
  };

  React.useEffect(() => {
    fetchRoomsJoined();
  }, []);

  return (
    <>
      <Head>
        <title>PollRoom - Rooms Joined</title>
      </Head>
      <div className="pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-20 pb-12 lg:py-28 bg-gray-100 min-h-screen">
        <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-primary-600">
          Rooms joined
        </h2>
        <p className="font-medium text-primary-400 text-lg pt-2">
          Below are the rooms you have joined
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          {roomsJoined.map((room) => (
            <RoomCard
              key={room.id}
              name={room.name}
              members={room.memberCount}
              polls={room.pollCount}
              created_at={room.created_at}
              room_id={room.id}
            />
          ))}
        </div>
        {roomsJoined.length === 0 ? (
          <p className="font-medium text-primary-400 text-lg md:text-xl text-center">
            {"You haven't joined any room yet"}
          </p>
        ) : null}
      </div>
    </>
  );
};

RoomsJoined.layout = mainLayout;

export default WithAuth(RoomsJoined);

import mainLayout from 'layouts/main';
import WithAuth from 'components/WithAuth';
import voteImage from 'assets/images/vote.png';
import pollImage from 'assets/images/poll.png';
import roomImage from 'assets/images/room.png';
import Head from 'next/head';
import { getDashboardInfo, createdRooms } from 'adapters/dashboard';
import React from 'react';
import { useToast } from 'contexts/ToastContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import link from 'link';
import RoomCard from 'components/RoomCard';
import { BiRightArrowAlt } from 'react-icons/bi';

type StatCardProps = {
  icon: string;
  count: number;
  text: string;
  link: string;
};
const StatCard = (props: StatCardProps): JSX.Element => {
  return (
    <Link href={props.link}>
      <div className="px-6 py-12 rounded cursor-pointer bg-white ring-1 ring-primary-900 ring-opacity-5 transform duration-500 hover:shadow-2xl hover:-translate-y-1 group">
        <div className="flex justify-center items-center my-6">
          <img src={props.icon} alt="" className="max-w-xs max-h-20 my-2" />
        </div>
        <p className="text-center font-bold text-6xl text-primary-700">
          {props.count}
        </p>
        <p className="text-center p-2 text-lg text-primary-400 font-medium flex justify-center space-x-1 items-center">
          <span className="block">{props.text}</span>
          <span className="hidden group-hover:block transition duration-300 text-accent-500">
            <BiRightArrowAlt size={30} />
          </span>
        </p>
      </div>
    </Link>
  );
};

type dashboardStateType = {
  roomsJoined: number;
  pollsCreated: number;
  votesCasted: number;
  createdRooms: createdRooms;
};
const dashboard = (): JSX.Element => {
  const { setToast } = useToast();
  const router = useRouter();
  const [dashBoardState, setDashBoardState] =
    React.useState<dashboardStateType>({
      roomsJoined: 0,
      pollsCreated: 0,
      votesCasted: 0,
      createdRooms: [],
    });
  const fetchDashBoardInfo = async () => {
    const response = await getDashboardInfo();
    if (response.error) {
      setToast(true, response.message, 'ERROR', router.pathname, 5000);
    }
    setDashBoardState((state) => ({
      ...state,
      pollsCreated: response.pollsCreated,
      roomsJoined: response.roomsJoined,
      votesCasted: response.votesCasted,
      createdRooms: response.createdRooms,
    }));
  };
  React.useEffect(() => {
    fetchDashBoardInfo();
  }, []);
  return (
    <>
      <Head>
        <title>PollRoom - Dashboard</title>
      </Head>
      <div className="pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-20 pb-12 lg:py-28 bg-gray-100 min-h-screen">
        <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-primary-600">
          Dashboard
        </h2>
        <p className="font-medium text-primary-400 text-lg pt-2">
          Some stats around your activity
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 my-10">
          <StatCard
            link={link.roomsJoined}
            icon={roomImage.src}
            count={dashBoardState.roomsJoined}
            text="Rooms joined"
          />
          <StatCard
            link={link.polls}
            icon={pollImage.src}
            count={dashBoardState.pollsCreated}
            text="Polls created"
          />
          <StatCard
            link={''}
            icon={voteImage.src}
            count={dashBoardState.votesCasted}
            text="Votes cast"
          />
        </div>
        <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-primary-600">
          Rooms created
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          {dashBoardState.createdRooms.map((room) => (
            <RoomCard
              room_id={room.id}
              key={room.id}
              polls={room._count?.polls || 0}
              members={room._count?.users || 0}
              created_at={room.created_at}
              name={room.name}
            />
          ))}
        </div>
        {dashBoardState.createdRooms.length === 0 ? (
          <p className="font-medium text-primary-400 text-lg md:text-xl text-center">
            {"You haven't created any room yet"}
          </p>
        ) : null}
      </div>
    </>
  );
};

dashboard.layout = mainLayout;
export default WithAuth(dashboard);

import mainLayout from 'layouts/main';
import WithAuth from 'components/WithAuth';
import voteImage from 'assets/images/vote.png';
import pollImage from 'assets/images/poll.png';
import roomImage from 'assets/images/room.png';
import Head from 'next/head';
import { getDashboardInfo } from 'adapters/dashboard';
import React from 'react';
import { useToast } from 'contexts/ToastContext';
import { useRouter } from 'next/router';

type StatCardProps = { icon: string; count: number; text: string };
const StatCard = (props: StatCardProps): JSX.Element => {
  return (
    <div className="px-6 py-12 shadow-lg rounded bg-white ring-1 ring-primary-900 ring-opacity-5">
      <div className="flex justify-center items-center my-6">
        <img src={props.icon} alt="" className="max-w-xs max-h-20 my-2" />
      </div>
      <p className="text-center font-bold text-6xl text-primary-700">
        {props.count}
      </p>
      <p className="text-center p-2 text-lg text-primary-400 font-medium">
        {props.text}
      </p>
    </div>
  );
};

const dashboard = (): JSX.Element => {
  const { setToast } = useToast();
  const router = useRouter();
  const [dashBoardState, setDashBoardState] = React.useState({
    roomsJoined: 0,
    pollsCreated: 0,
    votesCasted: 0,
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
      <WithAuth>
        <div className="pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-20 pb-12 lg:py-28 bg-gray-100 min-h-screen">
          <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-primary-600">
            Dashboard
          </h2>
          <p className="font-medium text-primary-400 text-lg pt-2">
            Some stats around your activity
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-10">
            <StatCard
              icon={roomImage.src}
              count={dashBoardState.roomsJoined}
              text="Rooms joined"
            />
            <StatCard
              icon={pollImage.src}
              count={dashBoardState.pollsCreated}
              text="Polls created"
            />
            <StatCard
              icon={voteImage.src}
              count={dashBoardState.votesCasted}
              text="Votes cast"
            />
          </div>
        </div>
      </WithAuth>
    </>
  );
};

dashboard.layout = mainLayout;
export default dashboard;

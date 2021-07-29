import mainLayout from 'layouts/main';
import WithAuthHOC from 'components/WithAuthHOC';
import voteImage from 'assets/images/vote.png';
import pollImage from 'assets/images/poll.png';
import roomImage from 'assets/images/room.png';

type StatCardProps = { icon: string; count: number; text: string };
const StatCard = (props: StatCardProps): JSX.Element => {
  return (
    <div className="px-6 py-12 shadow-lg rounded ring-1 ring-primary-900 ring-opacity-5">
      <div className="flex justify-center items-center my-6">
        <img src={props.icon} alt="" className="max-w-xs max-h-20 my-2" />
      </div>
      {/* <div className="mx-auto">
        <img src={props.icon} alt="icon" />
      </div> */}
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
  return (
    <WithAuthHOC>
      <div className="pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-20 py-12 bg-gray-100 min-h-screen">
        <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-primary-600">
          Dashboard
        </h2>
        <p className="font-medium text-primary-400 text-lg pt-2">
          Some stats around your activity
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-10">
          <StatCard icon={roomImage.src} count={7} text="Rooms created" />
          <StatCard icon={pollImage.src} count={11} text="Polls created" />
          <StatCard icon={voteImage.src} count={28} text="Votes casted" />
        </div>
      </div>
    </WithAuthHOC>
  );
};

dashboard.layout = mainLayout;
export default dashboard;

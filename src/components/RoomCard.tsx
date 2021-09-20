import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import link from 'link';

type RoomCardProps = {
  name: string;
  created_at: Date;
  polls: number;
  members: number;
  room_id: string;
};
const RoomCard = (props: RoomCardProps): JSX.Element => {
  return (
    <Link href={{ pathname: link.specificRoom, query: { rid: props.room_id } }}>
      <div className="cursor-pointer relative px-6 py-12 bg-white max-w-lg rounded hover:shadow-2xl duration-500 transform hover:-translate-y-1">
        <h3 className="text-3xl text-primary-500 font-semibold pb-2 truncate">
          {props.name}
        </h3>
        <p className="text-lg font-medium text-gray-500">
          Created{' '}
          {formatDistanceToNow(new Date(props.created_at), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </p>
        <p className="text-lg font-medium text-secondary-800 pt-6">
          {props.members} members
        </p>
        <p className="absolute -top-4 md:-top-4 -right-3 md:-right-10 w-24 h-12 border-2 border-primary-500 bg-gray-200 rounded-full flex justify-center items-center p-2 font-medium text-base">
          {props.polls} {props.polls === 1 ? 'poll' : 'polls'}
        </p>
      </div>
    </Link>
  );
};

export default RoomCard;

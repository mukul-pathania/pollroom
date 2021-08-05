import { useRouter } from 'next/router';
import mainLayout from 'layouts/main';
import Poll from 'components/Poll';
import WithAuth from 'components/WithAuth';

const placeholderData = [
  {
    question: 'Test question 1',
    id: 1,
    options: [
      { content: 'Test option 1', id: 1, isSelected: true },
      { content: 'Test option 2', id: 2 },
      { content: 'Test option 3', id: 3 },
      { content: 'Test option 4', id: 4 },
    ],
  },
  {
    question:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, adipisci?',
    id: 2,
    options: [
      { content: 'Test option 1', id: 1 },
      { content: 'Test option 2', id: 2 },
      { content: 'Test option 3', id: 3, isSelected: true },
      { content: 'Test option 4', id: 4 },
    ],
  },
  {
    question: 'Test question 3',
    id: 3,
    options: [
      { content: 'Test option 1', id: 1 },
      { content: 'Test option 2', id: 2, isSelected: true },
      { content: 'Test option 3', id: 3 },
      { content: 'Test option 4', id: 4 },
    ],
  },
  {
    question: 'Test question 4',
    id: 4,
    options: [
      { content: 'Test option 1', id: 1 },
      { content: 'Test option 2', id: 2 },
      { content: 'Test option 3', id: 3 },
      { content: 'Test option 4', id: 4, isSelected: true },
    ],
  },
  {
    question: 'Test question 5',
    id: 5,
    options: [
      { content: 'Test option 1', id: 1 },
      { content: 'Test option 2', id: 2 },
      { content: 'Test option 3', id: 3 },
      {
        content:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium molestias provident quibusdam, corporis mollitia illum deserunt commodi quam ipsum ratione.',
        id: 4,
        isSelected: true,
      },
    ],
  },
  {
    question: 'Test question 6',
    id: 6,
    options: [
      { content: 'Test option 1', id: 1 },
      { content: 'Test option 2', id: 2 },
      { content: 'Test option 3', id: 3, isSelected: true },
      { content: 'Test option 4', id: 4 },
    ],
  },
  {
    question: 'Test question 7',
    id: 7,
    options: [
      { content: 'Test option 1', id: 1 },
      { content: 'Test option 2', id: 2, isSelected: true },
      { content: 'Test option 3', id: 3 },
      { content: 'Test option 4', id: 4 },
    ],
  },
];

const Room = (): JSX.Element => {
  const router = useRouter();
  console.log(router.query.rid);
  return (
    <WithAuth>
      <div className="bg-gray-50 pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-20 py-12 min-h-screen">
        <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-primary-600">
          RoomName
        </h2>
        <p className="font-medium text-primary-100 text-lg pt-2">
          Created by <span className="text-primary-900">testuser</span> 2 hours
          ago
        </p>
        <div className="mt-8 grid grid-cols1 md:grid-cols-2 gap-8 divide-y-2 divide-secondary-700 md:divide-none">
          {placeholderData.map((poll, index) => (
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

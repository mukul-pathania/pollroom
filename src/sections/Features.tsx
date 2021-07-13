import commentImage from 'assets/images/features/comments.png';
import historyImage from 'assets/images/features/history.png';
import organizedImage from 'assets/images/features/organized.png';
import pulicImage from 'assets/images/features/public.png';
import securityImage from 'assets/images/features/security.png';
import sharingImage from 'assets/images/features/sharing.png';
import speedImage from 'assets/images/features/speed.png';
import switchImage from 'assets/images/features/switch.png';

type FeatureBoxPropTypes = {
  icon: string;
  heading: string;
  text: string;
  alt?: string;
};

const FeatureData: FeatureBoxPropTypes[] = [
  {
    icon: speedImage.src,
    heading: 'Realtime Updates',
    text: 'See your poll change as more and more votes are casted or when people change their minds.',
  },
  {
    icon: organizedImage.src,
    heading: 'Easy Organisation',
    text: 'Organise multiple related poll questions into rooms. Create different rooms for different purposes.',
  },
  {
    icon: securityImage.src,
    heading: 'Full Security',
    text: 'Your private polls are only visible to registered users who are in the room.',
  },
  {
    icon: historyImage.src,
    heading: 'Profile History',
    text: 'See all the polls you have participated in and where did your vote go.',
  },
  {
    icon: switchImage.src,
    heading: 'Open/Close Voting',
    text: 'Close or open participation on any poll you created at any time.',
  },
  {
    icon: commentImage.src,
    heading: 'Poll Comments',
    text: 'Allow the registered users to comment on polls and engage in detailed discussions.',
  },
  {
    icon: pulicImage.src,
    heading: 'Public Rooms',
    text: 'Create or engage in public polls which are open to all registered users.',
  },
  {
    icon: sharingImage.src,
    heading: 'Share Polls',
    text: 'You can share polls with anyone you want by providing them with url of the room.',
  },
];

const FeatureBox = ({
  icon,
  heading,
  text,
}: FeatureBoxPropTypes): JSX.Element => {
  return (
    <div className="px-6 py-8 shadow-lg hover:shadow-xl bg-gray-50 hover:bg-secondary-50 rounded transition-all duration-500 transform hover:-translate-y-2">
      <div className="flex justify-center items-center">
        <img src={icon} alt="" className="max-w-xs max-h-20 my-2" />
      </div>
      <h4 className="font-bold text-xl pt-2 pb-4 text-center text-primary-700">
        {heading}
      </h4>
      <p className="text-center text-gray-700">{text}</p>
    </div>
  );
};

const Features = (): JSX.Element => {
  return (
    <div
      id="features"
      className="flex flex-col mx-auto pt-12 px-4 sm:px-6 lg:px-20"
    >
      <h3 className="font-bold text-4xl text-center pb-6">Our features</h3>
      <div className="grid gap-8 grid-cols-1 grid-rows-8 sm:grid-cols-2 sm:grid-rows-4 lg:grid-cols-3 lg:grid-rows-3 py-8">
        {FeatureData.map((feature, index) => (
          <FeatureBox
            key={`${feature.icon}${index}`}
            icon={feature.icon}
            heading={feature.heading}
            text={feature.text}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;

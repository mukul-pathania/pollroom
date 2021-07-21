import { ScaleLoader } from 'react-spinners';

const Loader = (): JSX.Element => {
  return (
    <>
      <div className="z-40 flex h-full w-full fixed opacity-30 bg-black" />
      <div className="z-50 hidden md:flex w-screen h-screen items-center justify-center fixed top-0 left-0">
        <ScaleLoader
          loading
          height={200}
          width={20}
          radius={20}
          margin={10}
          color="#032745"
        />
      </div>
      <div className="z-50 md:hidden flex w-screen h-screen items-center justify-center fixed top-0 left-0">
        <ScaleLoader
          loading
          height={100}
          width={10}
          radius={10}
          margin={5}
          color="#032745"
        />
      </div>
    </>
  );
};

type propsType = { children?: React.ReactNode; loading: boolean };
const PageLoadingSkeleton = (props: propsType): JSX.Element => (
  <>
    {props.loading && <Loader />}
    {props.children}
  </>
);

export default PageLoadingSkeleton;

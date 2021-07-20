import WithAuthHOC from 'components/WithAuthHOC';

const dashboard = (): JSX.Element => {
  return (
    <WithAuthHOC>
      <div>Dashboard</div>
    </WithAuthHOC>
  );
};

export default dashboard;

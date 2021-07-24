type errorMessageProps = { errorMessage?: string };
const Error = ({ errorMessage }: errorMessageProps): JSX.Element => {
  return <p className="text-red-500 pt-2">{errorMessage}</p>;
};

export default Error;

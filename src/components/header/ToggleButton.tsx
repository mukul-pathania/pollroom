type propsTypes = { isOpen: boolean; toggleOpen: () => void };

const ToggleButton = ({ isOpen, toggleOpen }: propsTypes): JSX.Element => {
  return (
    <div className="-mr-2 flex headerBreakpoint:hidden">
      <button
        onClick={toggleOpen}
        type="button"
        className="inline-flex items-center justify-center p-2 rounded hover:bg-blueGray-300"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        <span className="sr-only">Open or Close main menu</span>
        {!isOpen ? (
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        ) : (
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ToggleButton;

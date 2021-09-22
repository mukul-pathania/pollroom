import { Dialog } from '@headlessui/react';
import React from 'react';

type props = { isOpen: boolean; onClose: () => void };

const TestimonialModal = (props: props): JSX.Element => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      className="fixed inset-0 z-30 overflow-y-auto"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
      <div className="min-h-screen px-4 flex justify-center items-center min-w-full">
        <div className="bg-gray-100 rounded px-4 py-6 z-30 w-full max-w-xl shadow-2xl">
          <Dialog.Title className="font-bold text-2xl md:text-3xl lg:text-4xl pb-2 text-center">
            Write your review
          </Dialog.Title>
          {/* <Dialog.Description className="text-lg md:text-xl lg:text-2xl text-gray-500 text-center font-semibold">
            Provide your review below
          </Dialog.Description> */}
          <textarea
            name="Review"
            className="mt-2 p-4 placeholder-blueGray-500 rounded border-none resize-none outline-none bg-gray-200 h-56 text-black block w-full mx-auto"
            placeholder="Your message..."
            maxLength={480}
          ></textarea>
          <button
            className="mx-auto mt-4 block bg-accent-700 hover:bg-accent-900 disabled:bg-gray-400 w-full text-white py-4 px-6 text-lg uppercase font-bold cursor-pointer rounded transition-all duration-500 hover:shadow-md"
            onClick={() => props.onClose()}
          >
            Submit
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default TestimonialModal;

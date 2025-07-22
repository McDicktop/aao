import React from "react";

function ConfirmationModal({ ok, cancel, message }) {
  return (
    <div className="z-100 absolute left-[0px] top-[0px] right-[0px] bottom-[0px] bg-gray-600/80 rounded-md flex items-center justify-center">
      <div className="z-100  w-[240px] h-[150px] bg-neutral-800 rounded-md">
        <div className="flex flex-col justify-center align-center h-20">
          <p className="h-16 p-2 h-fit text-center font-semibold text-neutral-300">
            {message}
          </p>
        </div>

        <div className="flex justify-center gap-8">
          <button
            type="button"
            className="rounded-xl bg-red-500 w-20 h-10 font-semibold text-neutral-100 hover:text-neutral-200 hover:bg-red-600 duration-200 cursor-pointer"
            onClick={ok}
          >
            OK
          </button>
          <button
            type="button"
            className="rounded-xl bg-blue-500 w-20 h-10 font-semibold text-neutral-100 hover:text-neutral-200 hover:bg-blue-600 duration-200 cursor-pointer"
            onClick={cancel}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;

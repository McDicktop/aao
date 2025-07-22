import React from "react";

function Modal({ isOpen = false, onClose, children }) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="z-1000 fixed bg-gray-500/80 flex justify-center items-center top-0 right-0 bottom-0 left-0 select-none">
      <div className="bg-neutral-700 px-10 py-4 relative rounded-md">
        <button
          className="absolute top-[0px] right-[10px] cursor-pointer text-[30px] text-neutral-200"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;

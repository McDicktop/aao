import { ChevronLeft, ChevronRight, X } from "lucide-react";

function GalleryModal({
  currentIndex = 0,
  array = [],
  handleChange = () => { },
  handleClose = () => { },
}) {
  return (
    <div
      // onClick={() => handleClose()}
      className="absolute w-screen h-screen bg-neutral-900/50 flex items-center justify-center gap-3 top-0"
    >
      {" "}
      {/* КОНТЕЙНЕР МОДАЛЬНОГО ОКНА - ВЕСЬ ЭКРАН  */}




      <div className="relative bg-white p-2.5 rounded-3xl flex flex-col gap-1.5">
        {" "}
        {/* САМО МОДАЛЬНОЕ ОКНО  */}
        <div className="flex items-center justify-between">
          <span className="size-7"></span>
          <p className="bg-gray-100/60 border border-gray-100 text-neutral-700 px-4 py-0.5 rounded-full font-medium text-sm">
            {currentIndex + 1} of {array.length}
          </p>

          <span
            onClick={() => handleClose()}
            className="border border-gray-100 bg-transparent opacity-60 hover:opacity-90 cursor-pointer hover:bg-gray-100 hover:border-gray-200 p-1 rounded-2xl"
          >
            <X className="size-5" />
          </span>
        </div>
        <div className="relative w-5xl h-[70vh] rounded-2xl overflow-hidden group">
          <img
            src={array[currentIndex].filename}
            alt={`Photo ${currentIndex}`}
            className="absolute z-20 w-fit max-w-[90%] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-fit max-h-full rounded-2xl object-contain scale-95 duration-300 transition-all"
          />

          <img
            src={array[currentIndex].filename}
            alt={`Photo ${currentIndex}`}
            className="absolute z-10 w-full h-full object-cover blur-md opacity-70 scale-120 group-hover:blur-lg duration-300 transition-all"
          />

          <button
            className="absolute z-30 top-1/2 left-3 -translate-y-1/2 p-1.5 bg-white rounded-full border border-gray-200"
            onClick={() => handleChange(-1)}
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            className="absolute z-30 top-1/2 right-3 -translate-y-1/2 p-1.5 bg-white rounded-full border border-gray-200"
            onClick={() => handleChange(1)}
          >
            <ChevronRight className="size-6" />
          </button>

          <p className="absolute z-30 bottom-6 left-1/2 -translate-x-1/2 bg-white px-4 py-0.75 pb-1 rounded-xl text-sm font-normal text-gray-800/95">
            {array[currentIndex].title[0]}
          </p>
        </div>
      </div>




      {/* <div className="bg-white p-2.5 rounded-3xl h-[76%] w-70"></div> */}
    </div>
  );
}

export default GalleryModal;

import { useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Modal from "./layout/Modal";

function GalleryModal({
  currentIndex = 0,
  array = [],
  handleChange,
  isOpen,
  onClose
}) {

  const app = useSelector((state) => state.app)

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>

        <div className="flex flex-col items-center justify-center gap-4">

          <p className="bg-gray-100/60 text-neutral-950 px-4 py-0.5 rounded-full font-medium text-sm">
            {currentIndex + 1} of {array.length}
          </p>

          <div className="relative w-5xl h-[80vh] rounded-2xl overflow-hidden group">

            <img
              src={array[currentIndex].filename}
              alt={`Photo ${currentIndex}`}
              className="absolute z-20 w-fit max-w-[90%] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-fit max-h-full rounded-2xl object-contain scale-95 duration-300 transition-all"
            />

            <img
              src={array[currentIndex].filename}
              alt={`Photo ${currentIndex}`}
              className="absolute z-10 w-full h-full object-cover blur-md opacity-70 scale-120  duration-300 transition-all"
            />

            <button
              className="absolute z-30 top-1/2 left-3 -translate-y-1/2 p-1.5 bg-gray-100/60 rounded-full cursor-pointer hover:bg-gray-400/60 duration-300"
              onClick={() => handleChange(-1)}
            >
              <ChevronLeft className="size-6 text-neutral-950" />
            </button>
            <button
              className="absolute z-30 top-1/2 right-3 -translate-y-1/2 p-1.5 bg-gray-100/60 rounded-full cursor-pointer hover:bg-gray-400/60 duration-300"
              onClick={() => handleChange(1)}
            >
              <ChevronRight className="size-6 text-neutral-950" />
            </button>

          </div>

          <div className="rounded-full flex flex-col font-medium text-xs text-neutral-950 bg-gray-100/60 px-6 py-2">
            <p className="text-sm">
              {array[currentIndex].title[app.language]}
            </p>
            <div className="flex gap-4">
              <p className="">
                {array[currentIndex].description[app.language]}
              </p>
              <p className="">
                {`${array[currentIndex].size.width} cm / ${array[currentIndex].size.height} cm ( ${(array[currentIndex].size.width / 2.54).toFixed(2)}'' / ${(array[currentIndex].size.height / 2.54).toFixed(2)}'' )`}
              </p>
            </div>
          </div>

        </div>

      </Modal>

    </>
  );
}

export default GalleryModal;

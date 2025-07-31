import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { setCurrentArtwork } from "../../../features/gallerySlice";
import { handleForm } from "../../../features/appSlice";
import { Pencil, EyeClosed, Eye, GripVertical } from "lucide-react";

function Artwork({ artwork, currentGallery, isDragOn }) {
  const dispatch = useDispatch();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: artwork._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative flex items-center gap-2 p-2 mx-2 border border-gray-100/0 hover:border-yellow-400 rounded-md select-none`}
    >
      <button
        className={`absolute top-4 right-4 size-fit flex items-center justify-center duration-200 ${currentGallery
            ? "text-neutral-400 cursor-pointer hover:text-neutral-100"
            : "text-neutral-700"
          }`}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
        disabled={!currentGallery}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(setCurrentArtwork(artwork._id));
          dispatch(handleForm({ form: "editArtwork", isOpen: true }));
        }}
      >
        <Pencil className="size-6" />
      </button>

      <div
        {...listeners}
        {...attributes}
        data-drag-handle
        className={`size-10 flex-shrink-0 flex items-center justify-center duration-200 ${isDragOn
            ? "text-neutral-400 cursor-grab hover:text-neutral-100"
            : "text-neutral-700"
          } ${isDragging ? "cursor-grabbing" : ""} ${!isDragOn ? "pointer-events-none" : ""
          }`}
      >
        <GripVertical />
      </div>

      <img
        src={artwork.filename
          .replace("images", "thumbs")
          .replace("jpg", "webp")}
        alt={`Photo ${artwork.title.en}`}
        className={`cursor-pointer size-18 flex-shrink-0 rounded-lg object-cover duration-50  `}
        onClick={() => {
          dispatch(setCurrentArtwork(artwork._id));
          dispatch(handleForm({ form: "artworkView", isOpen: true }));
        }}
      />

      <div className="flex flex-col gap-2 w-full self-start overflow-hidden">
        <p className="flex items-center gap-2 font-medium w-8/9 overflow-hidden text-neutral-100">
          <span className="select-none mt-1 flex-shrink-0">
            {!artwork.status ? (
              <EyeClosed className="size-4.5" />
            ) : (
              <Eye className="size-4" />
            )}
          </span>

          <span className="w-full overflow-hidden truncate">
            {artwork.title.en}
          </span>
        </p>
        <p className="flex flex-col text-sm">
          <span className="w-full overflow-hidden truncate">
            {artwork.description.en}
          </span>
          <span className="">
            {`size: ${artwork.size.width} cm x ${artwork.size.height} cm`}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Artwork;

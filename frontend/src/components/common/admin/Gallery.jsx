import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { setCurrentGallery } from "../../../features/gallerySlice";
import { Pencil, EyeClosed, Eye, GripVertical } from "lucide-react";

function Gallery({ gallery, galleryState, modalOpen, isDragOn }) {
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: gallery._id,
    modifiers: [{ name: "restrictToDragElement", options: { enabled: true } }],
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const prefix = gallery.content.length > 1 ? " artworks" : " artwork";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative flex items-center gap-2 p-2 mx-2 border border-gray-100/0 hover:border-yellow-400 rounded-md select-none ${
        gallery._id === galleryState.currentGallery ? "border-yellow-400 " : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        dispatch(setCurrentGallery(gallery._id));
      }}
    >
      <button
        className={`absolute top-4 right-4 size-fit flex items-center justify-center text-neutral-500 cursor-pointer  duration-200 hover:text-gray-50`}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(setCurrentGallery(gallery._id));
          modalOpen("editGallery");
        }}
      >
        <Pencil className="size-6" />
      </button>

      <div
        {...listeners}
        {...attributes}
        data-drag-handle
        className={`size-10 flex-shrink-0 flex items-center justify-center duration-200 
                    ${
                      isDragOn
                        ? "text-neutral-400 cursor-grab hover:text-neutral-100"
                        : "text-neutral-700"
                    }
                     ${isDragging ? "cursor-grabbing" : ""}
                      ${!isDragOn ? "pointer-events-none" : ""}`}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <GripVertical />
      </div>

      <img
        src={gallery.cover.replace("images", "thumbs").replace("jpg", "webp")}
        alt={`Photo ${gallery.title.en}`}
        className={`cursor-pointer size-24 flex-shrink-0 rounded-lg object-cover duration-50 ${
          isHovered ? "opacity-50" : ""
        } ${gallery._id === galleryState.currentGallery ? "opacity-30" : ""}`}
        onClick={() => {
          dispatch(setCurrentGallery(gallery._id));
        }}
      />

      <div className="flex flex-col gap-2 w-full self-start overflow-hidden">
        <p className="flex items-center gap-2 font-medium w-5/6 overflow-hidden text-neutral-100">
          <span className="mt-1 flex-shrink-0">
            {!gallery.status ? (
              <EyeClosed className="size-4.5" />
            ) : (
              <Eye className="size-4" />
            )}
          </span>
          <span className="w-full overflow-hidden truncate">
            {gallery.title.en}
          </span>
        </p>
        <p className="text-sm">
          {`${
            gallery.content.length
              ? "contains " + gallery.content.length + prefix
              : "Empty gallery"
          }`}
        </p>
      </div>
    </div>
  );
}

export default Gallery;

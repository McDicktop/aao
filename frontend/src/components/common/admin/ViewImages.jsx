import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateImages,
  updateGalleries,
  setCurrentGallery,
} from "../../../features/gallerySlice";
import { handleForm } from "../../../features/appSlice";
import { changeArtworkOrder } from "../../../api/images";
import { fetchAllData } from "../../../utils/fetchAllData";
import { Plus, GripVertical } from "lucide-react";
import Artwork from "./Artwork";

function ViewImages({ gallery, search }) {
  const dispatch = useDispatch();

  const [galleryContent, setGalleryContent] = useState([]);
  const [galleryTitle, setGalleryTitle] = useState("All");

  const [filteredContent, setFilterdeContent] = useState([]);

  const [isDragOn, setIsDragOn] = useState(false);

  useEffect(() => {
    if (gallery.currentGallery) {
      const currentGallery = gallery.galleries.find(
        (item) => item._id === gallery.currentGallery
      );
      setGalleryTitle(currentGallery.title.en);
      setGalleryContent(
        currentGallery.content.map((item) =>
          gallery.images.find((image) => image._id === item)
        )
      );
      return;
    }
    setGalleryTitle("All");
  }, [gallery]);

  useEffect(() => {
    const result = gallery.images.reduce((prev, current) => {
      const { _id, ...rest } = current.title;
      for (let item of Object.keys(rest)) {
        if (rest[item].toLowerCase().includes(search.toLowerCase())) {
          prev.push(current);
          return prev;
        }
      }
      return prev;
    }, []);

    setFilterdeContent(result);
    dispatch(setCurrentGallery(null));
  }, [search]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!active?.id || !over?.id) {
      alert("You can't drag and drop here");
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = galleryContent.findIndex(
        (item) => item._id === active.id
      );
      const newIndex = galleryContent.findIndex((item) => item._id === over.id);

      setGalleryContent((items) => {
        return arrayMove(items, oldIndex, newIndex);
      });

      // Запрос в БД на изменение порядка в галерее
      const res = await changeArtworkOrder({
        imageId: active.id,
        newIndex,
        galleryId: gallery.currentGallery,
      });

      if (res.message) {
        alert("Error: Drag and drop error");
        return;
      }

      const { galleries, images } = await fetchAllData();

      dispatch(updateGalleries(galleries));
      // dispatch(updateImages(images));

      setIsDragOn(false);
    }
  };

  return (
    <div className="text-neutral-300 rounded-2xl ml-3 my-3 min-w-140 max-w-140 h-[calc(100vh-1.5rem)] overflow-y-auto overflow-x-hidden relative">
      <div className="mt-6 mb-4 flex items-center justify-between px-4">
        <p className="text-xl font-medium truncate pr-4">{`Artworks ( ${galleryTitle} )`}</p>

        <span className="flex gap-6">
          <button
            onClick={() => {
              setIsDragOn((prev) => !prev);
            }}
            className={`w-27 flex items-center justify-center gap-1 px-1 py-1.5 rounded-xl font-semibold duration-200 ${!gallery.currentGallery || galleryContent.length < 2
              ? "bg-neutral-700 text-neutral-500"
              : "bg-neutral-100 hover:bg-neutral-400 text-neutral-800 cursor-pointer"
              }`}
            disabled={!gallery.currentGallery || galleryContent.length < 2}
          >
            <GripVertical className="size-5" />
            {`Drag ${isDragOn ? "off" : "on"}`}
          </button>

          <button
            onClick={() =>
              dispatch(handleForm({ form: "uploadArtwork", isOpen: true }))
            }
            className={`w-27 flex items-center justify-center gap-1 px-1 py-1.5 rounded-xl font-semibold duration-200 ${!gallery.currentGallery
              ? "bg-neutral-700 text-neutral-500"
              : "bg-neutral-100 hover:bg-neutral-400 text-neutral-800 cursor-pointer"
              }`}
            disabled={!gallery.currentGallery}
          >
            <Plus className="size-5" />
            New
          </button>
        </span>
      </div>

      {!gallery.currentGallery ? (
        <div className="flex flex-col justify-center">
          {filteredContent.length ? (
            <div className="">
              {filteredContent.map((el, ind) => (
                <Artwork key={`ind_${ind}`} artwork={el} />
              ))}
            </div>
          ) : (
            <p className="p-3">No artworks found</p>
          )}
        </div>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext
            items={galleryContent.map((item) => item._id)}
            strategy={rectSortingStrategy}
          >
            <div className="flex flex-col justify-center">
              {galleryContent.length > 0 ? (
                <>
                  {galleryContent.map((el, ind) => (
                    <Artwork
                      key={`ind_${ind}`}
                      artwork={el}
                      currentGallery={gallery.currentGallery}
                      isDragOn={isDragOn}
                    />
                  ))}
                </>
              ) : (
                <p className="p-3">
                  No artworks in this gallery yet. You can add new artwork
                </p>
              )}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

export default ViewImages;

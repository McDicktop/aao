import Gallery from "./Gallery";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GripVertical, Plus, Home, Search, X, LogOut } from "lucide-react";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  updateImages,
  updateGalleries,
  setCurrentGallery,
} from "../../../features/gallerySlice";
import { handleForm } from "../../../features/appSlice";
import { changeGalleryPosition } from "../../../api/images";
import { fetchAllData } from "../../../utils/fetchAllData";
import { userLogout } from "../../../features/authSlice";

function ViewGalleries({ modalOpen, gallery, search, handleSearch }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDragOn, setIsDragOn] = useState(false);
  const [sortedGalleries, setSortedGalleries] = useState([]);

  useEffect(() => {
    if (gallery.galleries.length) {
      const newArr = [...gallery.galleries];
      setSortedGalleries(newArr.sort((a, b) => a.position - b.position));
    }
  }, [gallery]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!active?.id || !over?.id) {
      alert("You can't drag and drop here");
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = sortedGalleries.findIndex(
        (item) => item._id === active.id
      );
      const newIndex = sortedGalleries.findIndex(
        (item) => item._id === over.id
      );

      setSortedGalleries((items) => {
        return arrayMove(items, oldIndex, newIndex);
      });

      // Запрос в БД на изменение позиции галереи
      const res = await changeGalleryPosition({
        newPos: newIndex,
        galleryId: active.id,
      });

      if (res.message) {
        alert("Error: Drag and drop error");
        return;
      }

      const { galleries, images } = await fetchAllData();

      dispatch(updateGalleries(galleries));
      dispatch(updateImages(images));

      // setIsDragOn(false);
    }
  };

  const handleLogout = async () => {
    dispatch(userLogout());
    navigate("/login");
  }

  return (
    <div className="text-neutral-300 rounded-2xl ml-3 my-3 min-w-100 h-[calc(100vh-1.5rem)] overflow-y-auto overflow-x-hidden relative bg-neutral-900">
      <div className="flex items-center gap-3 px-4 mt-4">
        <button
          onClick={() => dispatch(setCurrentGallery(null))}
          className="bg-neutral-800 border border-neutral-700 p-2 rounded-xl text-neutral-400 flex-shrink-0 cursor-pointer hover:text-neutral-300"
        // title="Show all artworks"
        >
          <Home className="size-6" />
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-neutral-800 border border-neutral-700 p-2 rounded-xl text-neutral-400 flex-shrink-0 cursor-pointer hover:text-neutral-300"
        // title="Log out"
        >
          <LogOut className="size-6" />
        </button>
        <div className="relative w-full">
          <Search className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 size-5" />
          <input
            value={search}
            type="text"
            name=""
            id=""
            className="w-full h-full border border-neutral-700 px-10 py-2 rounded-xl bg-neutral-900"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <X
            className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-600 size-4 hover:text-gray-100"
            onClick={() => handleSearch("")}
          />
        </div>
      </div>

      <div className="mt-6 mb-4 border-gray-500 flex items-center justify-between px-4">
        <p className="text-xl font-medium">Galleries</p>
        <span className="flex gap-6">
          <button
            onClick={() => setIsDragOn((prev) => !prev)}
            className={`w-27 flex items-center justify-center gap-1 px-1 py-1.5 rounded-xl font-semibold duration-200
                             ${gallery.galleries.length < 2
                ? "bg-neutral-700 text-neutral-500"
                : "bg-neutral-100 hover:bg-neutral-400 text-neutral-800 cursor-pointer"
              }`}
          >
            <GripVertical className="size-5" />
            {`Drag ${isDragOn ? "off" : "on"}`}
          </button>
          <button
            onClick={() =>
              dispatch(handleForm({ form: "createGallery", isOpen: true }))
            }
            className="w-27 flex items-center justify-center gap-1 px-1 py-1.5 rounded-xl bg-neutral-100 font-semibold duration-200 text-neutral-800 hover:bg-neutral-400 cursor-pointer"
          >
            <Plus className="size-5" />
            New
          </button>
        </span>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext
          items={sortedGalleries.map((item) => item._id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedGalleries.length && (
            <div className="flex flex-col ">
              {sortedGalleries.map((el, ind) => (
                <Gallery
                  key={`ind_${ind}`}
                  gallery={el}
                  galleryState={gallery}
                  modalOpen={modalOpen}
                  isDragOn={isDragOn}
                />
              ))}
            </div>
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default ViewGalleries;

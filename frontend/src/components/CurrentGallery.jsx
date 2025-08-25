import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { toggleFullsize } from "../features/gallerySlice";

import GalleryModal from "./GalleryModal";

function CurrentGallery() {
  const { id } = useParams();

  const gallery = useSelector((state) => state.gallery);
  const dispatch = useDispatch();

  const [galleryContent, setGalleryContent] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (gallery.images.length && gallery.galleries.length) {
      const galleryIds = gallery.galleries.find((el) => el._id === id).content;
      setGalleryContent(
        galleryIds.map((el) => gallery.images.find((item) => item._id === el))
      );
    }
  }, [gallery.images, gallery.galleries, id]);

  function handleChangeCurrentImageIndex(direction = 1) {
    // посмотреть внимательней алгоритм!!
    setCurrentImageIndex((prevIndex) => {
      const newIndex =
        (prevIndex + direction + galleryContent.length) % galleryContent.length;
      return newIndex;
    });
  }

  function handleCloseModal() {
    dispatch(toggleFullsize(false));
  }

  return (
    <div className="flex flex-col items-center h-[calc(100vh-5rem)] overflow-auto py-10">
      {/* <div className="grid w-4/5 grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] justify-items-center gap-16"> */}
      <div className="grid w-4/5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-16">
        {galleryContent.length &&
          galleryContent.filter((item) => item.status).map((el, ind) => (
            <div
              className="max-w-[280px] w-full"
              key={`image_${ind}`}
            >
              <img
                onClick={() => {
                  setCurrentImageIndex(ind);
                  dispatch(toggleFullsize(true));
                }}
                src={el.filename
                  .replace("images", "thumbs")
                  .replace("jpg", "webp")}
                alt={`Photo ${el.title.en}`}
                className="aspect-[4/4] w-full h-full object-cover rounded-2xl cursor-pointer duration-300 hover:blur-[1px] hover:opacity-80"
              />
            </div>

          ))}
      </div>

      {gallery.isImageFullsize && (
        <GalleryModal
          currentIndex={currentImageIndex}
          array={galleryContent}
          handleChange={handleChangeCurrentImageIndex}
          onClose={handleCloseModal}
          isOpen={gallery.isImageFullsize}
        />
      )}
    </div>
  );
}

export default CurrentGallery;
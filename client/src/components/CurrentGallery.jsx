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
    <div className="flex flex-col items-center">
      <div className="grid xl:grid-cols-4 sm:grid-cols-3 xl:gap-20 lg:gap-16 md:gap-10 sm:gap-6 place-items-center w-4/5">
        {galleryContent.length &&
          galleryContent.map((el, ind) => (
            <div
              className=""
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
                className="aspect-[4/4] w-full h-full object-cover rounded-2xl cursor-pointer border"
              // className="rounded-2xl cursor-pointer"
              />
            </div>

          ))}
      </div>

      {gallery.isImageFullsize && (
        <GalleryModal
          currentIndex={currentImageIndex}
          array={galleryContent}
          handleChange={handleChangeCurrentImageIndex}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default CurrentGallery;

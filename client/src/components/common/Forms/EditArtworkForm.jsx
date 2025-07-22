import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateGalleries, updateImages, setCurrentGallery } from "../../../features/gallerySlice";
import {
  removeImageFromGallery,
  placeImageToGallery,
  deleteImage,
  deleteArtwork,
  editArtwork,
} from "../../../api/images";
import { fetchAllData } from "../../../utils/fetchAllData";
import InputField from "../Inputs/InputField";
import ConfirmationModal from "../Modals/ConfirmationModal";
import Modal from "../../layout/Modal";

function EditArtworkForm({ isOpen, onClose, gallery }) {
  const dispatch = useDispatch();

  const init = {
    _id: "",
    filename: "",
    title: {
      en: "",
      es: "",
      ru: "",
    },
    description: {
      en: "",
      es: "",
      ru: "",
    },
    size: {
      width: "",
      height: "",
    },
    status: false,
  };

  const [initState, setInitState] = useState({ ...init });
  const [newState, setNewState] = useState({ ...init });

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // состояние модального окна подтверждения

  const [targetGallery, setTargetGallery] = useState(null);

  useEffect(() => {
    // if (gallery.currentArtwork) {
    setTargetGallery(gallery.currentGallery);

    const currentArtwork = gallery.images.find(
      (el) => el._id === gallery.currentArtwork
    );

    const { _id: titleId, ...titleRest } = currentArtwork.title;
    const { _id: descriptionId, ...descriptionRest } =
      currentArtwork.description;
    const { _id: sizeId, ...sizeRest } = currentArtwork.size;

    setInitState((prev) => ({
      ...prev,
      _id: currentArtwork._id,
      filename: currentArtwork.filename,
      status: currentArtwork.status,
      title: { ...titleRest },
      description: { ...descriptionRest },
      size: { ...sizeRest },
    }));

    setNewState((prev) => ({
      ...prev,
      _id: currentArtwork._id,
      filename: currentArtwork.filename,
      status: currentArtwork.status,
      title: { ...titleRest },
      description: { ...descriptionRest },
      size: { ...sizeRest },
    }));
  }, []);

  const isFormChanged = () => {
    if (
      !newState.title.en ||
      !newState.title.es ||
      !newState.title.ru ||
      !newState.description.en ||
      !newState.description.es ||
      !newState.description.ru ||
      !newState.size.width ||
      !newState.size.height
    )
      return false;
    return (
      initState.title.en !== newState.title.en ||
      initState.title.es !== newState.title.es ||
      initState.title.ru !== newState.title.ru ||
      initState.description.en !== newState.description.en ||
      initState.description.es !== newState.description.es ||
      initState.description.ru !== newState.description.ru ||
      initState.size.width != newState.size.width ||
      initState.size.height != newState.size.height ||
      initState.status !== newState.status ||
      targetGallery !== gallery.currentGallery
    );
  };

  const handleInputChange = (e, feat, key) => {
    setNewState((prev) => {
      if (feat === "size") {
        if (/^[0-9]+$/u.test(e.target.value) || e.target.value === "") {
          return {
            ...prev,
            [feat]: { ...prev[feat], [key]: e.target.value },
          };
        }
        return { ...prev };
      }
      if (feat === "status") {
        return {
          ...prev,
          [feat]: !prev[feat],
        };
      }
      return {
        ...prev,
        [feat]: { ...prev[feat], [key]: e.target.value },
      };
    });
  };

  const handleChangeGallery = (event) => {
    setTargetGallery(event.target.value);
  };

  const handleDeleteArtwork = async () => {
    // УДАЛИТЬ image._id из галлереи
    if (!gallery.currentGallery || !gallery.currentArtwork) {
      alert("Error: no gallery or artwork selected");
      setIsConfirmationOpen(false);
      onClose();
    }

    const removedImage = await removeImageFromGallery(
      gallery.currentGallery,
      gallery.currentArtwork
    );

    if (removedImage.message) {
      alert(
        `Error: ${removedImage?.response?.data?.message || removedImage.message
        }`
      );
      setIsConfirmationOpen(false);
      onClose();
      return;
    }
    // УДАЛИТЬ image из коллекции БД
    const deletedArtwork = await deleteArtwork(gallery.currentArtwork);

    if (deletedArtwork.message) {
      /////   ВОЗМОЖНО НУЖНО ДОБАВИТЬ ОБРАТНО В ГАЛЛЕРЕЮ ID УДАЛЕННОЙ КАРТИНКИ

      alert(
        `Error: ${deletedArtwork?.response?.data?.message || deletedArtwork.message
        }`
      );
      setIsConfirmationOpen(false);
      onClose();
      return;
    }

    // УДАЛИТЬ файл картинки и миниатюры с сервера

    const filename = initState.filename.slice(
      initState.filename.lastIndexOf("/") + 1
    );

    const deletedImage = await deleteImage(filename);

    if (deletedImage.message) {
      console.error(deletedImage.message);
      alert(
        `Error: ${deletedImage?.response?.data?.message || deletedImage.message
        }. Delete ${filename} manually.`
      );
      setIsConfirmationOpen(false);
      onClose();
      return;
    }

    const { galleries, images } = await fetchAllData();

    dispatch(updateGalleries(galleries));
    dispatch(updateImages(images));

    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      initState.title.en !== newState.title.en ||
      initState.title.es !== newState.title.es ||
      initState.title.ru !== newState.title.ru ||
      initState.description.en !== newState.description.en ||
      initState.description.es !== newState.description.es ||
      initState.description.ru !== newState.description.ru ||
      initState.size.width != newState.size.width ||
      initState.size.height != newState.size.height ||
      initState.status !== newState.status
    ) {
      const editedArtwork = await editArtwork(gallery.currentArtwork, {
        title: {
          en: newState.title.en,
          es: newState.title.es,
          ru: newState.title.ru,
        },
        description: {
          en: newState.description.en,
          es: newState.description.es,
          ru: newState.description.ru,
        },
        size: {
          width: +newState.size.width,
          height: +newState.size.height,
        },
        status: newState.status,
      });

      if (editedArtwork.message) {
        alert(
          `Error: ${editedArtwork?.response?.data?.message || editedArtwork.message
          }`
        );
        return;
      }
    }

    if (targetGallery !== gallery.currentGallery) {
      // ПЕРЕМЕЩАЕМ В ДРУГУЮ ГАЛЕРЕЮ

      const removedImage = await removeImageFromGallery(
        gallery.currentGallery,
        gallery.currentArtwork
      );

      if (removedImage.message) {
        alert(
          `Error: ${removedImage?.response?.data?.message || removedImage.message
          }`
        );
        onClose();
        return;
      }

      const movedImage = await placeImageToGallery(
        targetGallery,
        gallery.currentArtwork
      );

      if (movedImage.message) {
        alert(
          `Error: ${movedImage?.response?.data?.message || movedImage.message}`
        );
        onClose();
        return;
      }
    }

    const { galleries, images } = await fetchAllData();

    dispatch(updateGalleries(galleries));
    dispatch(updateImages(images));

    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="font-semibold text-center mb-6 py-2 bg-neutral-800 rounded-md text-neutral-300">
          {`Edit artwork`}
        </h2>
        {isConfirmationOpen && (
          <ConfirmationModal
            ok={handleDeleteArtwork}
            cancel={() => setIsConfirmationOpen(false)}
            // message={message}
            message={"Delete artwork from server completely?"}
          />
        )}
        {initState._id && (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-2 items-center">
                <input
                  className="w-5 h-5"
                  type="checkbox"
                  id="isHide"
                  name="isHide"
                  checked={newState.status}
                  value={newState.status}
                  onChange={(e) => handleInputChange(e, "status")}
                />
                <label
                  className="text-neutral-300 hover:underline"
                  htmlFor="isHide"
                >
                  Show artwork on site
                </label>
              </div>

              <div className="">
                <label className="text-neutral-300" htmlFor="gallery-select">
                  Transfer artwork to gallery:
                </label>

                <select
                  className="cursor-pointer text-neutral-300 ml-2"
                  name="gallery-select"
                  id="gallery-select"
                  value={targetGallery}
                  onChange={handleChangeGallery}
                >
                  {gallery.galleries.map((el, ind) => (
                    <option
                      className="text-neutral-300 bg-neutral-600"
                      key={`ind_${ind}`}
                      value={el._id}
                    >
                      {el.title.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex w-[600px] justify-center gap-10 text-neutral-300">
              <div className="flex flex-col gap-1 pt-4">
                <p className="text-center text-sm">Artwork title:</p>
                <InputField
                  className="w-[280px] border border-gray-400 pl-9 pr-2 py-1 rounded-md mb-4"
                  placeholder="Enter artwork title in English"
                  id="titleEn"
                  label="EN"
                  value={newState.title.en}
                  onChange={(e) => handleInputChange(e, "title", "en")}
                />
                <InputField
                  className="w-[280px] border border-gray-400 pl-9 pr-2 py-1 rounded-md mb-4"
                  placeholder="Enter artwork title in Spanish"
                  id="titleEs"
                  label="ES"
                  value={newState.title.es}
                  onChange={(e) => handleInputChange(e, "title", "es")}
                />
                <InputField
                  className="w-[280px] border border-gray-400 pl-9 pr-2 py-1 rounded-md mb-4"
                  placeholder="Enter artwork title in Russian"
                  id="titleRu"
                  label="RU"
                  value={newState.title.ru}
                  onChange={(e) => handleInputChange(e, "title", "ru")}
                />
              </div>
              <div className="flex flex-col gap-1 pt-4">
                <p className="text-neutral-300 text-center text-sm">
                  Artwork description:
                </p>
                <InputField
                  className="w-[280px] border border-gray-400 pl-9 pr-2 py-1 rounded-md mb-4"
                  placeholder="Enter artwork description in English"
                  id="descriptionEn"
                  label="EN"
                  value={newState.description.en}
                  onChange={(e) => handleInputChange(e, "description", "en")}
                />
                <InputField
                  className="w-[280px] border border-gray-400 pl-9 pr-2 py-1 rounded-md mb-4"
                  placeholder="Enter artwork description in Spanish"
                  id="descriptionEs"
                  label="ES"
                  value={newState.description.es}
                  onChange={(e) => handleInputChange(e, "description", "es")}
                />
                <InputField
                  className="w-[280px] border border-gray-400 pl-9 pr-2 py-1 rounded-md mb-4"
                  placeholder="Enter artwork description in Russian"
                  id="descriptionRu"
                  label="RU"
                  value={newState.description.ru}
                  onChange={(e) => handleInputChange(e, "description", "ru")}
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 mt-4 text-neutral-300">
              <p className="text-sm">Artwork size (width / height in cm):</p>
              <div className="flex gap-4">
                <InputField
                  className="w-[134px] border border-gray-400 pl-9 pr-2 py-1 rounded-md"
                  placeholder="Enter width"
                  id="sizeX"
                  label="X:"
                  value={newState.size.width}
                  onChange={(e) => handleInputChange(e, "size", "width")}
                />
                <InputField
                  className="w-[134px] border border-gray-400 pl-9 pr-2 py-1 rounded-md"
                  placeholder="Enter height"
                  id="sizeY"
                  label="Y:"
                  value={newState.size.height}
                  onChange={(e) => handleInputChange(e, "size", "height")}
                />
              </div>
            </div>

            <div className="flex gap-10 justify-center mt-10 text-neutral-300">
              <button
                className={`bg-blue-500 w-20 h-10 rounded-xl font-semibold ${!isFormChanged()
                  ? "opacity-50"
                  : "cursor-pointer hover:bg-blue-600 duration-300"
                  }`}
                type="submit"
                disabled={!isFormChanged()}
              >
                Edit
              </button>

              <button
                className="bg-blue-500 w-20 h-10 rounded-xl font-semibold cursor-pointer hover:bg-blue-600 duration-300"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>

              {initState.title.en !== "root" && (
                <button
                  className="bg-red-500 w-20 h-10 rounded-xl font-semibold cursor-pointer hover:bg-red-600 duration-300"
                  type="button"
                  onClick={() => {
                    // setMessage("Delete artwork from server completely?");
                    setIsConfirmationOpen(true);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}

export default EditArtworkForm;

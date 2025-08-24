import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  updateGalleries,
  setCurrentGallery,
  updateImages,
} from "../../../features/gallerySlice";
import {
  deleteGallery,
  deleteImage,
  editGallery,
  changeCover,
} from "../../../api/images";
import { fetchAllData } from "../../../utils/fetchAllData";
import InputField from "../Inputs/InputField";
import ConfirmationModal from "../Modals/ConfirmationModal";
import Modal from "../../layout/Modal";

function EditGalleryForm({ isOpen, onClose, gallery }) {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState(null); // превью обложки
  const [newCover, setNewCover] = useState(null); // файл новой обложки

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // состояние модального окна подтверждения
  const [message, setMessage] = useState(""); // текст в модальном окне подтверждения

  const init = {
    _id: "",
    title: { en: "", es: "", ru: "" },
    cover: "",
    content: [],
    status: false,
  };

  const [initState, setInitState] = useState({ ...init });
  const [newState, setNewState] = useState({ ...init });

  useEffect(() => {
    // if (gallery.currentGallery) {
    const currentGallery = gallery.galleries.find(
      (el) => el._id === gallery.currentGallery
    );

    const { _id, ...rest } = currentGallery.title; // убираем _id из currentGallery.title

    setInitState((prev) => {
      return {
        ...prev,
        _id: currentGallery._id,
        cover: currentGallery.cover,
        content: [...currentGallery.content],
        status: currentGallery.status,
        title: { ...rest },
      };
    });

    setNewState((prev) => {
      return {
        ...prev,
        _id: currentGallery._id,
        cover: currentGallery.cover,
        content: [...currentGallery.content],
        status: currentGallery.status,
        title: { ...rest },
      };
    });

    setPreviewImage(currentGallery.cover);
    // }
  }, []);

  const handleInputChange = (e, arg) => {
    setNewState((prev) => {
      if (arg === "status") {
        return { ...prev, status: !prev.status };
      } else {
        return {
          ...prev,
          title: { ...prev.title, [arg]: e.target.value },
        };
      }
    });
  };

  const handleFileChange = (e) => {
    ///   РАЗОБРАТЬСЯ!!!!
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
      setNewCover(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const isFormChanged = () => {
    if (!newState.title.en || !newState.title.es || !newState.title.ru)
      return false;
    return (
      initState.title.en !== newState.title.en ||
      initState.title.es !== newState.title.es ||
      initState.title.ru !== newState.title.ru ||
      initState.status !== newState.status ||
      initState.cover !== previewImage
    );
  };

  const handleDeleteGallery = async () => {
    if (initState.content.length) {
      setMessage("The gallery should be empty before deleting");
      return;
    }

    if (initState.title.en === "root") {
      setMessage("The root gallery can not be deleted");
      return;
    }

    // Удаляем галлерею из коллекции
    const deletedGallery = await deleteGallery(initState._id);

    if (deletedGallery.message) {
      alert(
        `Error: ${
          deletedGallery?.response?.data?.message || deletedGallery.message
        }`
      );
      return;
    }

    const coverFilename = initState.cover.slice(
      initState.cover.lastIndexOf("/") + 1
    );
    // Удаляем изображение обложки на сервере
    const deletedFile = await deleteImage(coverFilename);

    if (deletedFile.message) {
      alert(
        `Error: ${
          deletedFile?.response?.data?.message || deletedFile.message
        }. Delete ${coverFilename} manually`
      );
      return;
    }

    const { galleries, images } = await fetchAllData();

    dispatch(updateGalleries(galleries));
    dispatch(updateImages(images));
    dispatch(setCurrentGallery(null));

    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (initState.cover !== previewImage) {
      // МЕНЯЕМ ОБЛОЖКУ
      const formData = new FormData();
      formData.append("image", newCover);

      const res = await changeCover(initState._id, formData);

      if (res.message) {
        alert(`Error: ${res?.response?.data?.message || res.message}`);
        return;
      }

      // Удаляем изображение обложки на сервере
      const coverFilename = initState.cover.slice(
        initState.cover.lastIndexOf("/") + 1
      );

      const deletedFile = await deleteImage(coverFilename);

      if (deletedFile.message) {
        alert(
          `Error: ${
            deletedFile?.response?.data?.message || deletedFile.message
          }. Delete ${coverFilename} manually`
        );
        return;
      }
    }

    if (
      initState.title.en !== newState.title.en ||
      initState.title.es !== newState.title.es ||
      initState.title.ru !== newState.title.ru ||
      initState.status !== newState.status
    ) {
      // Меняем названия и статус
      const editedGallery = await editGallery(initState._id, {
        en: newState.title.en,
        es: newState.title.es,
        ru: newState.title.ru,
        status: newState.status,
      });

      if (editedGallery.message) {
        alert(
          `Error: ${
            editedGallery?.response?.data?.message || editedGallery.message
          }`
        );
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
          {`Edit gallery ${initState.title.en}`}
        </h2>
        {isConfirmationOpen && (
          <ConfirmationModal
            ok={handleDeleteGallery}
            cancel={() => setIsConfirmationOpen(false)}
            message={message}
          />
        )}
        {initState._id && (
          <form onSubmit={handleSubmit}>
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
                Show gallery on site
              </label>
            </div>

            {initState.title.en !== "root" && (
              <div className="flex flex-col gap-4 pt-4 ">
                <InputField
                  className="w-[100%] border border-gray-400 rounded-md text-neutral-300 outline-none pl-9 pr-2 py-1"
                  placeholder="Enter gallery title in English"
                  id="titleEn"
                  label="EN"
                  value={newState.title.en}
                  onChange={(e) => handleInputChange(e, "en")}
                />
                <InputField
                  className="w-[100%] border border-gray-400 rounded-md text-neutral-300 outline-none pl-9 pr-2 py-1"
                  placeholder="Enter gallery title in Spanish"
                  id="titleEs"
                  label="ES"
                  value={newState.title.es}
                  onChange={(e) => handleInputChange(e, "es")}
                />
                <InputField
                  className="w-[100%] border border-gray-400 rounded-md text-neutral-300 outline-none pl-9 pr-2 py-1"
                  placeholder="Enter gallery title in Russian"
                  id="titleRu"
                  label="RU"
                  value={newState.title.ru}
                  onChange={(e) => handleInputChange(e, "ru")}
                />
              </div>
            )}

            <div className="relative inline-block mt-4">
              <img
                src={previewImage}
                alt="Preview"
                className="flex flex-col justify-center items-center w-[320px] h-[320px] rounded-xl"
              />

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <button
                onClick={handleClick}
                className="absolute top-[10px] right-[10px] text-white rounded-xl bg-black/50 w-[160px] h-[30px] cursor-pointer text-xl pb-[4px] pl-[1px]"
                type="button"
              >
                Set new cover
              </button>
            </div>

            <div className="flex gap-10 justify-center mt-10 text-neutral-300">
              <button
                className={`bg-blue-500 w-20 h-10 rounded-xl font-semibold ${
                  !isFormChanged()
                    ? "opacity-50"
                    : "cursor-pointer hover:bg-blue-600 duration-300"
                }`}
                type="submit"
                disabled={!isFormChanged()}
              >
                Submit
              </button>

              <button
                className="bg-blue-500 w-20 h-10 rounded-xl font-semibold cursor-pointer hover:bg-blue-600 duration-300"
                onClick={onClose}
              >
                Cancel
              </button>

              {initState.title.en !== "root" && (
                <button
                  className={`bg-red-500 w-20 h-10 rounded-xl font-semibold ${
                    !newState.content.length
                      ? "cursor-pointer hover:bg-red-600 duration-300"
                      : "opacity-50"
                  }`}
                  type="button"
                  disabled={newState.content.length > 0}
                  onClick={() => {
                    setMessage("Delete gallery from server completely?");
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

export default EditGalleryForm;

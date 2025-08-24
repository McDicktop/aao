import { useState } from "react";
import { addImage, placeImageToGallery } from "../../../api/images";
import { fetchAllData } from "../../../utils/fetchAllData";
import { useDispatch } from "react-redux";
import { updateGalleries, updateImages } from "../../../features/gallerySlice";
import ImageUploader from "../Button/ImageUploader";
import InputField from "../Inputs/InputField";
import Modal from "../../layout/Modal";

function UploadImageForm({ isOpen, onClose, gallery }) {
  const dispatch = useDispatch();

  const init = {
    title: { en: "", es: "", ru: "" },
    description: { en: "", es: "", ru: "" },
    size: { width: "", height: "" },
  };

  const [artwork, setArtwork] = useState({ ...init });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e, feat, key) => {
    setArtwork((prev) => {
      if (feat === "size") {
        if (/^[0-9]+$/u.test(e.target.value) || e.target.value === "") {
          return {
            ...prev,
            [feat]: { ...prev[feat], [key]: e.target.value },
          };
        }
        return { ...prev };
      } else {
        return {
          ...prev,
          [feat]: { ...prev[feat], [key]: e.target.value },
        };
      }
    });
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const isFormFilled = () => {
    return (
      artwork.title.en &&
      artwork.title.es &&
      artwork.title.ru &&
      artwork.description.en &&
      artwork.description.es &&
      artwork.description.ru &&
      artwork.size.width &&
      artwork.size.height &&
      selectedFile
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "content",
      JSON.stringify({
        title: {
          en: artwork.title.en,
          es: artwork.title.es,
          ru: artwork.title.ru,
        },
        description: {
          en: artwork.description.en,
          es: artwork.description.es,
          ru: artwork.description.ru,
        },
        size: {
          width: +artwork.size.width,
          height: +artwork.size.height,
        },
      })
    );
    formData.append("image", selectedFile);

    // Загрузка файла на сервер
    const newImage = await addImage(formData);

    if (newImage.message) {
      alert(`Error: ${newImage?.response?.data?.message || newImage.message}`);
      return;
    }

    // Добавление картинки в текущую галерею
    const isAdded = await placeImageToGallery(
      gallery.currentGallery,
      newImage.data._id
    );

    if (isAdded.message) {
      alert(`Error: ${isAdded?.response?.data?.message || isAdded.message}`);
      return;
    }

    const { galleries, images } = await fetchAllData();
    dispatch(updateImages(images));
    dispatch(updateGalleries(galleries));
    onClose();
    return;
  };

  return (
    <div className="flex flex-col">
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="font-semibold text-center mb-6 py-2 bg-neutral-800 rounded-md text-neutral-300">
          Create new artwork
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex w-[600px] justify-center gap-10">
            <div className="flex flex-col gap-4 pt-4 pb-8">
              <InputField
                className="w-[280px] border border-gray-400 rounded-md text-neutral-300 outline-none pl-9 pr-2 py-1"
                placeholder="Enter artwork title in English"
                id="titleEn"
                label={"EN"}
                value={artwork.title.en}
                onChange={(e) => handleInputChange(e, "title", "en")}
              />
              <InputField
                className="w-[280px] border border-gray-400 rounded-md text-neutral-300 outline-none pl-9 pr-2 py-1"
                placeholder="Enter artwork title in Spanish"
                id="titleEs"
                label={"ES"}
                value={artwork.title.es}
                onChange={(e) => handleInputChange(e, "title", "es")}
              />
              <InputField
                className="w-[280px] border border-gray-400 rounded-md text-neutral-300 outline-none pl-9 pr-2 py-1"
                placeholder="Enter artwork title in Russian"
                id="titleRu"
                label={"RU"}
                value={artwork.title.ru}
                onChange={(e) => handleInputChange(e, "title", "ru")}
              />
            </div>

            <div className="flex flex-col gap-4 pt-4 pb-8">
              <InputField
                className="w-[280px] border border-gray-400 rounded-md text-neutral-300 outline-none pl-9 pr-2 py-1"
                placeholder="Enter description in English"
                id="descriptionEn"
                label={"EN"}
                value={artwork.description.en}
                onChange={(e) => handleInputChange(e, "description", "en")}
              />
              <InputField
                className="w-[280px] border border-gray-400 rounded-md text-neutral-300 outline-none pl-9 pr-2 py-1"
                placeholder="Enter description in Spanish"
                id="descriptionEs"
                label={"ES"}
                value={artwork.description.es}
                onChange={(e) => handleInputChange(e, "description", "es")}
              />
              <InputField
                className="w-[280px] border border-gray-400 rounded-md text-neutral-300 outline-none pl-9 pr-2 py-1"
                placeholder="Enter description in Russian"
                id="descriptionRu"
                label={"RU"}
                value={artwork.description.ru}
                onChange={(e) => handleInputChange(e, "description", "ru")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 text-center">
            <InputField
              className="w-[300px] border border-gray-400 px-2 py-1 rounded-md text-neutral-300 outline-none"
              placeholder="Enter x-axis size in cm"
              id="sizeX"
              value={artwork.size.width}
              onChange={(e) => handleInputChange(e, "size", "width")}
            />
            <InputField
              className="w-[300px] border border-gray-400 px-2 py-1 rounded-md text-neutral-300 outline-none mb-4"
              placeholder="Enter y-axis size in cm"
              id="sizeY"
              value={artwork.size.height}
              onChange={(e) => handleInputChange(e, "size", "height")}
            />
          </div>

          <ImageUploader uploadFile={handleFileChange} />

          <div className="flex gap-10 justify-center mt-10 text-neutral-300">
            <button
              className={`bg-blue-500 w-20 h-10 rounded-xl  font-semibold ${!isFormFilled()
                ? "opacity-50"
                : "cursor-pointer hover:bg-blue-600 duration-300"
                }`}
              type="submit"
              disabled={!isFormFilled()}
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-blue-500 w-20 h-10 rounded-xl  font-semibold cursor-pointer hover:bg-blue-600 duration-300"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default UploadImageForm;

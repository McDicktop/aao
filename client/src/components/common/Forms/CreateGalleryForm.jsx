import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  updateGalleries,
  updateImages,
  setCurrentGallery,
} from "../../../features/gallerySlice";
import { createGallery } from "../../../api/images";
import { fetchAllData } from "../../../utils/fetchAllData";
import ImageUploader from "../Button/ImageUploader";
import InputField from "../Inputs/InputField";
import Modal from "../../layout/Modal";

function CreateGalleryForm({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState({ en: "", es: "", ru: "" });

  const isFormFilled = useCallback(() => {
    return title.en && title.es && title.ru && selectedFile;
  }, [title, selectedFile]);

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const handleInputChange = (e, key) => {
    setTitle((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", JSON.stringify({ title }));
    formData.append("image", selectedFile);

    const newGallery = await createGallery(formData);

    if (newGallery.message) {
      alert(
        `Error: ${newGallery?.response?.data?.message || newGallery.message}`
      );
      return;
    }

    const { galleries, images } = await fetchAllData();

    dispatch(updateGalleries(galleries));
    dispatch(updateImages(images));
    dispatch(setCurrentGallery(newGallery.data._id));
    onClose();
  };

  return (
    <div className="flex flex-col">
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="font-semibold text-center mb-6 py-2 bg-neutral-800 rounded-md text-neutral-300">
          Create new gallery
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 pt-4 pb-8">
            <InputField
              className="w-[100%] border border-gray-400 rounded-md text-neutral-300 outline-none pl-9 pr-2 py-1"
              placeholder="Enter gallery title in English"
              id="titleEn"
              value={title.en}
              label="EN"
              onChange={(e) => handleInputChange(e, "en")}
            />
            <InputField
              className="w-[100%] border border-gray-400 rounded-md text-neutral-300 outline-none pl-9 pr-2 py-1"
              placeholder="Enter gallery title in Spanish"
              id="titleEs"
              value={title.es}
              label="ES"
              onChange={(e) => handleInputChange(e, "es")}
            />
            <InputField
              className="w-[100%] border border-gray-400 rounded-md text-neutral-300 outline-none pl-9 pr-2 py-1"
              placeholder="Enter gallery title in Russian"
              id="titleRu"
              value={title.ru}
              label="RU"
              onChange={(e) => handleInputChange(e, "ru")}
            />
          </div>

          <ImageUploader uploadFile={handleFileChange} />

          <div className="flex gap-10 justify-center mt-10 text-neutral-300">
            <button
              className={`bg-blue-500 w-20 h-10 rounded-xl  font-semibold ${
                !isFormFilled()
                  ? "opacity-50"
                  : "cursor-pointer hover:bg-blue-600 duration-300"
              }`}
              type="submit"
              disabled={!isFormFilled()}
            >
              Submit
            </button>
            <button
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

export default CreateGalleryForm;

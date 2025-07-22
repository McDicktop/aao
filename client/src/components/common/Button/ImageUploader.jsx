import React, { useRef, useState } from "react";

const ImageUploader = ({ uploadFile }) => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
      uploadFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleRemove = () => {
    setPreviewImage(null);
    fileInputRef.current.value = "";
    uploadFile(null);
  };

  return (
    <div className="text-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {previewImage ? (
        <div className="relative inline-block">
          <img
            src={previewImage}
            alt="Preview"
            className="flex flex-col justify-center items-center w-[300px] h-[300px] rounded-xl"
          />
          <button
            onClick={handleRemove}
            className="absolute top-[10px] right-[10px] text-white rounded-full bg-black/50 w-[30px] h-[30px] cursor-pointer text-xl pb-[4px] pl-[1px]"
          >
            ×
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="flex flex-col justify-center items-center cursor-pointer w-[300px] h-[300px] rounded-xl border-dashed border-[2px] border-gray-300 my-[6px] mx-auto"
        >
          <span className="text-[50px] text-gray-400">+</span>
          <p className="font-semibold text-gray-400">Upload image</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

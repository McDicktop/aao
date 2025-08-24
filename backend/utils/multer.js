const config = require("../config");
const multer = require("multer");
const path = require("path");

// Multer settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploads.imagesDir); // folder to upload
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // generate filename
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File extension filter (only images allowed)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Getting file
  } else {
    cb(
      new Error("Prohibited file type. Only JPEG, PNG, GIF и WebP allowed."),
      false
    );
  }
};

// Set multer limitations
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // File max size (10Mb)
    files: 1, // Only 1 file
  },
});


module.exports = upload;
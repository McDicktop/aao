const config = require("../config");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Автоматическое создание папок (если их нет)
Object.values(config.uploads).forEach(dir => {
    if (typeof dir === "string" && !fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });


// Multer settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, "cache/images/"); // folder to upload
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

// Multer errors handle middleware
const handleMulterErrors = (uploadMiddleware) => {
  return (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        // Multer errors
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res
              .status(400)
              .json({ error: "Only one file to upload is allowed" });
          }
          if (err.code === "LIMIT_FILE_SIZE") {
            return res
              .status(400)
              .json({ error: "Too big file. Only 10Mb allowed" });
          }
          return res.status(400).json({ error: err.message });
        }
        // fileFilter errors (Prohibited file type)
        if (err.message.includes("Prohibited file type")) {
          return res.status(400).json({ error: err.message });
        }
        // Other errors (file system errors for example)
        return res.status(500).json({ error: "File upload error" });
      }
      next();
    });
  };
};

module.exports = handleMulterErrors(upload.single("image"));

const multer = require('multer')

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

// module.exports = handleMulterErrors(upload.single("image"));
module.exports = handleMulterErrors;

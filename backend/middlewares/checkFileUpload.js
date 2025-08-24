const checkFileUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file to upload" });
  }
  next();
};

module.exports = checkFileUpload;

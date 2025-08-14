// Middleware для создания превью
const config = require("../config");
const sharp = require("sharp")

const processImage = async (req, res, next) => {
  if (!req.file) return next();

  const originalPath = req.file.path;
  const thumbName = req.file.filename.replace(/\.[^/.]+$/, "") + "." + config.uploads.thumbnailOptions.format;
  const thumbPath = config.uploads.thumbDir + thumbName;

  try {
    await sharp(originalPath)
      .resize(config.uploads.thumbnailOptions.width)
      .toFormat(config.uploads.thumbnailOptions.format, {
        quality: config.uploads.thumbnailOptions.quality,
      })
      .toFile(thumbPath);

    req.imageData = {
      original: "/" + originalPath.replace(/\\/g, "/"),
      thumbnail: "/" + thumbPath.replace(/\\/g, "/"),
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = processImage;
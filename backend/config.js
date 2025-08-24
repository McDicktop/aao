module.exports = {
  secret: "secret_key",
  minWidth: 1,
  maxWidth: 10000,
  minHeight: 1,
  maxHeight: 10000,
  uploads: {
    baseDir: "cache/", // Базовая папка
    imagesDir: "cache/images/", // Оригиналы
    thumbDir: "cache/thumbs/", // Превью
    tempDir: "cache/temp/", // Временные файлы (если нужно)
    thumbnailOptions: {
      // Настройки превью
      width: 500,
      format: "webp", // webp/jpeg/png
      quality: 100, // Качество (для webp/jpeg) 
    },
  },
};

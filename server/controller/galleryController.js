const path = require("path");
const mongoose = require("mongoose");
const Image = require("../models/Image.js");
const Gallery = require("../models/Gallery.js");
const deleteFileFromServer = require("../utils/deleteFileFromServer.js");
const validateSize = require("../utils/validateSize.js");
const validateString = require("../utils/validateString.js");
const { uploads } = require("../config.js");
class galleryController {

  async getGalleries(req, res) {
    try {
      const galleries = await Gallery.find();
      return res.status(200).send(galleries);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  async getGalleryItems(req, res) {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid gallery id",
        error: "INVALID_ID",
      });
    }

    try {
      const galleryContent = await Gallery.findById(id);

      if (!galleryContent) {
        return res.status(404).json({
          message: "Gallery not found",
          error: "CONTENT_MISSING",
        });
      }

      return res.status(200).send(galleryContent);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  async addGallery(req, res) {
    try {
      const filename = req.file.filename;

      if (!req.body.content) {
        return res.status(400).json({
          message: "Content data is required",
          error: "CONTENT_MISSING",
        });
      }

      let body;

      try {
        body = JSON.parse(req.body.content);
      } catch (parseError) {
        return res.status(400).json({
          message: "Invalid JSON format in content",
          error: "INVALID_JSON",
        });
      }

      if (
        !body.title ||
        typeof body.title !== "object" ||
        !validateString(body.title?.en) ||
        !validateString(body.title?.es) ||
        !validateString(body.title?.ru)
      ) {
        return res.status(400).json({
          message:
            "Gallery titles are invalid. All language versions (en, es, ru) are required.",
          error: "INVALID_TITLES",
        });
      }

      const title = {
        en: body.title.en.trim(),
        es: body.title.es.trim(),
        ru: body.title.ru.trim(),
      };

      const existingGallery = await Gallery.findOne({
        $or: [
          { "title.en": title.en },
          { "title.es": title.es },
          { "title.ru": title.ru },
        ],
      });

      if (existingGallery) {
        return res.status(409).json({
          message: "Gallery with this title already exists",
          error: "DUPLICATE_GALLERY",
        });
      }

      const baseUrl = process.env.BASE_URL || "http://localhost:8080";

      const position = (await Gallery.find()).length;

      const gallery = new Gallery({
        title,
        position,
        cover: `${baseUrl}/cache/images/${filename}`,
      });
      await gallery.save();

      return res.status(201).json({
        message: "Gallery created successfully",
        data: {
          id: gallery._id,
          title: gallery.title,
          position: gallery.position,
          cover: gallery.cover,
        },
      });
    } catch (e) {
      console.log(e);

      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  async changeCover(req, res) {
    try {
      const filename = req.file.filename;

      const { id } = req.params;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid gallery id",
          error: "INVALID_ID",
        });
      }

      const isExist = await Gallery.findById(id);

      if (!isExist) {
        return res.status(404).json({
          message: "Gallery not found",
          error: "CONTENT_MISSING",
        });
      }

      const updatedGallery = await Gallery.findByIdAndUpdate(
        id,
        {
          $set: {
            cover: `http://localhost:8080/cache/images/${filename}`,
            updatedAt: new Date(),
          },
        },
        { new: true }
      );

      return res.status(200).send(updatedGallery);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  async deleteGallery(req, res) {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid gallery id",
        error: "INVALID_ID",
      });
    }

    try {
      const gallery = await Gallery.findById(id);

      if (!gallery) {
        return res.status(404).json({
          message: "Gallery not found",
          error: "CONTENT_MISSING",
        });
      }

      if (gallery.title.en === "root") {
        return res.status(403).json({
          message: "Root gallery cannot be deleted",
          error: "DELETION_PROHIBITED",
        });
      }

      if (gallery.content.length) {
        return res.status(403).json({
          message: "Cannot delete gallery because it contains artworks. Remove all artworks first",
          error: "DELETION_PROHIBITED",
        });
      }

      const deletedGallery = await Gallery.findByIdAndDelete(id);

      return res.status(200).send(deletedGallery);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  async addImageToGallery(req, res) {
    const { id } = req.params;
    const { imageId } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid gallery id",
        error: "INVALID_ID",
      });
    }

    if (!imageId || !mongoose.Types.ObjectId.isValid(imageId)) {
      return res.status(400).json({
        message: "Invalid artwork id",
        error: "INVALID_ID",
      });
    }

    try {
      const editedGallery = await Gallery.findById(id); // находим галлерею, в которую нужно добавить картинку

      if (!editedGallery) {
        return res.status(404).json({
          message: "Gallery not found",
          error: "CONTENT_MISSING",
        });
      }

      const isImageExist = editedGallery.content.includes(imageId); // проверяем, что в галлерее нет картинки с таким id

      if (isImageExist) {
        return res.status(409).json({
          message: "Gallery includes this artwork",
          error: "ARTWORK_EXISTS",
        });
      }

      const image = await Image.findById(imageId); // находим объект картинки в коллекции

      if (!image) {
        return res.status(404).json({
          message: "Artwork not found",
          error: "CONTENT_MISSING",
        });
      }

      const updatedGallery = await Gallery.findByIdAndUpdate(
        id,
        {
          $push: { content: imageId },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );

      return res.status(200).send(updatedGallery);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  async removeImageFromGallery(req, res) {
    const { id } = req.params;
    const { imageId } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid gallery id",
        error: "INVALID_ID",
      });
    }

    if (!imageId || !mongoose.Types.ObjectId.isValid(imageId)) {
      return res.status(400).json({
        message: "Invalid artwork id",
        error: "INVALID_ID",
      });
    }

    try {
      const editedGallery = await Gallery.findById(id); // находим галлерею, из которой нужно удалить картинку

      if (!editedGallery) {
        return res.status(404).json({
          message: "Gallery not found",
          error: "CONTENT_MISSING",
        });
      }

      const isImageExist = editedGallery.content.includes(imageId); // проверяем, что в галлерее есть картинка с таким id

      if (!isImageExist) {
        return res.status(404).json({
          message: "Artwork not found in this gallery",
          error: "CONTENT_MISSING",
        });
      }

      const updatedGallery = await Gallery.findByIdAndUpdate(
        id,
        {
          $pull: { content: imageId },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );

      return res.status(200).send(updatedGallery);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  async editGallery(req, res) {
    try {
      const { id } = req.params;
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid gallery id",
          error: "INVALID_ID",
        });
      }

      const { en, es, ru, status } = req.body;

      if (
        !validateString(en) ||
        !validateString(es) ||
        !validateString(ru) ||
        typeof status !== "boolean"
      ) {
        return res.status(400).json({
          message:
            "Gallery titles or status are invalid",
          error: "INVALID_DATA",
        });
      }

      const isExist = await Gallery.findById(id);

      if (!isExist) {
        return res.status(404).json({
          message: "Gallery not found",
          error: "CONTENT_MISSING",
        });
      }

      const editedGallery = await Gallery.findByIdAndUpdate(
        id,
        {
          title: { en, es, ru },
          status,
          updatedAt: new Date(),
        },
        {
          new: true,
        }
      );

      await editedGallery.save();
      return res.status(200).send(editedGallery);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  async moveImage(req, res) {
    try {
      const { id } = req.params;
      const { imageId, newIndex } = req.body;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid gallery id",
          error: "INVALID_ID",
        });
      }

      const isExist = await Gallery.findById(id);

      if (!isExist) {
        return res.status(404).json({
          message: "Gallery not found",
          error: "CONTENT_MISSING",
        });
      }

      const currentIndex = isExist.content.indexOf(imageId);

      if (currentIndex < 0) {
        return res.status(404).json({
          message: "Artwork not found in this gallery",
          error: "CONTENT_MISSING",
        });
      }

      if (currentIndex === newIndex) {
        return res.status(204).end();       // ПРОИСХОДИТ ПЕРЕТАСКИВАНИЕ НА ИЗНАЧАЛЬНУЮ ПОЗИЦИЮ 
      }

      if (
        typeof newIndex !== "number" ||
        newIndex < 0 ||
        newIndex > isExist.content.length - 1
      ) {
        return res.status(400).json({
          message: "Invalid artwork position",
          error: "INVALID_POSITION",
        });
      }

      const replaced = isExist.content.splice(currentIndex, 1)[0];
      isExist.content.splice(newIndex, 0, replaced);

      const updatedGallery = await Gallery.findByIdAndUpdate(
        id,
        {
          $set: {
            content: isExist.content,
            updatedAt: new Date(),
          },
        },
        { new: true }
      );

      return res.status(200).send(updatedGallery);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  // router.patch('/gallery/position/:id', controller.changePosition);
  async changePosition(req, res) {
    try {
      const { id } = req.params;
      const { newPos } = req.body;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid gallery id",
          error: "INVALID_ID",
        });
      }

      if (typeof newPos !== "number" || newPos < 0) {
        return res.status(400).json({
          message: "Invalid artwork position",
          error: "INVALID_POSITION",
        });
      }

      const gallery = await Gallery.findById(id);
      if (!gallery) {
        return res.status(404).json({
          message: "Gallery not found",
          error: "CONTENT_MISSING",
        });
      }

      const oldPos = gallery.position;

      if (newPos === oldPos) {
        return res.status(204).end();
      }

      if (newPos > oldPos) {
        // Двигаем вниз - уменьшаем позиции между oldPos и newPos
        await Gallery.updateMany(
          { position: { $gt: oldPos, $lte: newPos }, _id: { $ne: id } },
          { $inc: { position: -1 } }
        );
      } else if (newPos < oldPos) {
        // Двигаем вверх - увеличиваем позиции между newPos и oldPos
        await Gallery.updateMany(
          { position: { $gte: newPos, $lt: oldPos }, _id: { $ne: id } },
          { $inc: { position: 1 } }
        );
      }

      const updated = await Gallery.updateOne({ _id: id }, { $set: { position: newPos } });

      return res.status(200).send(updated);

    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////

  async getImages(req, res) {
    try {
      const images = await Image.find();
      return res.status(200).send(images);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  async postImage(req, res) {

    console.log('ssdfsdfs')

    try {
      const filename = await req.file.filename;

      if (!req.body.content) {
        return res.status(404).json({
          message: "Get no data",
          error: "CONTENT_MISSING",
        });
      }

      let body;
      // const body = JSON.parse({ ...req.body }.content); // проверка валидности JSON!!!!

      try {
        body = JSON.parse({ ...req.body }.content);
      } catch (parseError) {
        return res.status(400).json({
          message: "Invalid JSON format in content",
          error: "INVALID_JSON",
        });
      }

      if (
        !body.title ||
        !body.description ||
        !body.size ||
        !validateString(body.title.en) ||
        !validateString(body.title.es) ||
        !validateString(body.title.ru) ||
        !validateString(body.description.en) ||
        !validateString(body.description.es) ||
        !validateString(body.description.ru) ||
        !validateSize(body.size.width, "width") ||
        !validateSize(body.size.height, "height")
      ) {
        return res.status(400).json({
          message:
            "Artwork data is invalid",
          error: "INVALID_DATA",
        });
      }

      const image = new Image({
        ...body,
        filename: `http://localhost:8080/cache/images/${filename}`,
      });

      await image.save();

      return res.status(200).send(image);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  async editImage(req, res) {
    try {
      const { id } = req.params;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid artwork id",
          error: "INVALID_ID",
        });
      }

      const { title, description, size, status } = req.body;

      if (
        !title ||
        !description ||
        !size ||
        !validateString(title.en) ||
        !validateString(title.es) ||
        !validateString(title.ru) ||
        !validateString(description.en) ||
        !validateString(description.es) ||
        !validateString(description.ru) ||
        !validateSize(size.width, "width") ||
        !validateSize(size.height, "height") ||
        typeof status !== "boolean"
      ) {
        return res.status(400).json({
          message:
            "Artwork data is invalid",
          error: "INVALID_DATA",
        });
      }

      const isExist = await Image.findById(id);

      if (!isExist) {
        return res.status(404).json({
          message: "Artwork not found in this database",
          error: "CONTENT_MISSING",
        });
      }

      const update = {
        title: {
          en: title.en.trim(),
          es: title.es.trim(),
          ru: title.ru.trim(),
        },
        description: {
          en: description.en.trim(),
          es: description.es.trim(),
          ru: description.ru.trim(),
        },
        size,
        status,
        updatedAt: new Date(),
      };

      const editedImage = await Image.findByIdAndUpdate(id, update, {
        new: true,
      });

      await editedImage.save();
      return res.status(200).send(editedImage);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  async deleteArtwork(req, res) {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid artwork id",
        error: "INVALID_ID",
      });
    }

    try {
      const deletedArtwork = await Image.findByIdAndDelete(id);

      if (!deletedArtwork) {
        return res.status(404).json({
          message: "Artwork not found in this database",
          error: "CONTENT_MISSING",
        });
      }

      return res.status(200).send(deletedArtwork);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  async deleteFile(req, res) {
    try {
      const { filename } = req.params;
      const imgDir = path.join(__dirname, "../" + uploads.imagesDir);
      const thumbDir = path.join(__dirname, "../" + uploads.thumbDir);

      await deleteFileFromServer(filename, imgDir);
      await deleteFileFromServer(filename.replace("jpg", "webp"), thumbDir);

      return res.status(200).send({
        success: true,
        message: "Файл успешно удален",
      });
    } catch (error) {
      if (error.message === "File not found") {
        return res.status(404).json({
          success: false,
          message: "Файл не найден",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Ошибка при удалении файла",
      });
    }
  }
}

module.exports = { controller: new galleryController() };

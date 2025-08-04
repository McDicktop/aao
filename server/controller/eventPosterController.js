const path = require("path");
const mongoose = require("mongoose");
const Poster = require("../models/EventPoster.js");
const deleteFileFromServer = require("../utils/deleteFileFromServer.js");
const { uploads } = require("../config.js");
class posterController {

  async getPosters(req, res) {
    try {
      const poster = await Poster.find();
      return res.status(200).send(poster);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  async addPoster(req, res) {
    try {
      const filename = req.file.filename;

      const baseUrl = process.env.BASE_URL || "http://localhost:8080";

      const poster = new Poster({
        image: `${baseUrl}/cache/images/${filename}`,
      });
      await poster.save();

      return res.status(201).json({
        message: "Poster created successfully"
      });

    } catch (e) {
      console.log(e);

      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  async toggleStatus(req, res) {
    try {
      const { id } = req.params;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid poster id",
          error: "INVALID_ID",
        });
      }

      const updatedPoster = await Poster.findByIdAndUpdate(
        id,
        [{ $set: { status: { $not: "$status" } } }],
        { new: true }
      );

      return res.status(200).send(updatedPoster);

    } catch (e) {

      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }


  async deletePoster(req, res) {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid poster id",
        error: "INVALID_ID",
      });
    }

    try {
      const poster = await Poster.findById(id);

      if (!poster) {
        return res.status(404).json({
          message: "Event poster not found",
          error: "CONTENT_MISSING",
        });
      }

      const deletedPoster = await Poster.findByIdAndDelete(id);

      return res.status(200).send(deletedPoster);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }





  // async deleteFile(req, res) {
  //   try {
  //     const { filename } = req.params;
  //     const imgDir = path.join(__dirname, "../" + uploads.imagesDir);
  //     const thumbDir = path.join(__dirname, "../" + uploads.thumbDir);

  //     await deleteFileFromServer(filename, imgDir);
  //     await deleteFileFromServer(filename.replace("jpg", "webp"), thumbDir);

  //     return res.status(200).send({
  //       success: true,
  //       message: "Файл успешно удален",
  //     });
  //   } catch (error) {
  //     if (error.message === "File not found") {
  //       return res.status(404).json({
  //         success: false,
  //         message: "Файл не найден",
  //       });
  //     }

  //     return res.status(500).json({
  //       success: false,
  //       message: "Ошибка при удалении файла",
  //     });
  //   }
  // }
}

module.exports = { controller: new posterController() };

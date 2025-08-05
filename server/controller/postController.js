const path = require("path");
const mongoose = require("mongoose");
const Post = require("../models/Post.js");
const deleteFileFromServer = require("../utils/deleteFileFromServer.js");
const { uploads } = require("../config.js");
class postController {

  async getPosts(req, res) {
    try {
      const post = await Post.find();
      return res.status(200).send(post);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }

  async addPost(req, res) {
    try {
      const filename = req.file.filename;

      const baseUrl = process.env.BASE_URL || "http://localhost:8080";

      if (!req.body.content) {
        const post = new Post({
          image: `${baseUrl}/cache/images/${filename}`,
        });
        await post.save();

        return res.status(201).json({
          message: "Poster created successfully"
        });
      }

      let body;

      try {
        body = JSON.parse({ ...req.body }.content);
      } catch (parseError) {
        return res.status(400).json({
          message: "Invalid JSON format in content",
          error: "INVALID_JSON",
        });
      }

      if (body.title && typeof body.title !== 'object' || body.description && typeof body.description !== 'object') {
        return res.status(400).json({
          message:
            "Post data is invalid",
          error: "INVALID_DATA",
        });
      }

      if (body.title?.en && typeof body.title?.en !== 'string' ||
        body.title?.es && typeof body.title?.es !== 'string' ||
        body.title?.ru && typeof body.title?.ru !== 'string' ||
        body.description?.en && typeof body.description?.en !== 'string' ||
        body.description?.es && typeof body.description?.es !== 'string' ||
        body.description?.ru && typeof body.description?.ru !== 'string') {
        return res.status(400).json({
          message:
            "Post data is invalid",
          error: "INVALID_DATA",
        });
      }


      const post = new Post({
        ...body,
        image: `http://localhost:8080/cache/images/${filename}`,
      });

      await post.save();

      return res.status(200).send(post);

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

      const updatedPost = await Post.findByIdAndUpdate(
        id,
        [{ $set: { status: { $not: "$status" } } }],
        { new: true }
      );

      return res.status(200).send(updatedPost);

    } catch (e) {

      return res.status(500).json({
        message: "Internal server error",
        error: "SERVER_ERROR",
      });
    }
  }


  async deletePost(req, res) {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid poster id",
        error: "INVALID_ID",
      });
    }

    try {
      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({
          message: "Event poster not found",
          error: "CONTENT_MISSING",
        });
      }

      const deletedPost = await Post.findByIdAndDelete(id);

      return res.status(200).send(deletedPost);
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

module.exports = { controller: new postController() };

const { Schema, model } = require("mongoose");
const Joi = require("joi");

const GallerySchema = new Schema({
    position: {
        type: Number,
        required: [true, "Position number is required"],
    },
    title: {
        type: {
            en: {
                type: String,
                required: [true, "EN Title is required"],
            },
            es: {
                type: String,
                required: [true, "ES Title is required"],
            },
            ru: {
                type: String,
                required: [true, "RU Title is required"],
            }
        }
    },
    cover: {
        type: String,
        required: [true, "Cover filename is required"],
    },
    content: {
        type: [String],
        default: [],
    },
    status: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


// const Gallery = model("Gallery", GallerySchema);

// const galleryValidation = Joi.object({
//     title: Joi.string().alphanum().min(3).max(24).required(),
//     cover: Joi.string().required(),  // проверка регуляркой
//     content: Joi.array().items(Joi.string()).required(),
// })


module.exports = model("Gallery", GallerySchema);
// module.exports = { Gallery, galleryValidation };



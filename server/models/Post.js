const { Schema, model } = require("mongoose");
const Joi = require("joi");

const PostSchema = new Schema({
    image: {
        type: String,
        default: '',
    },
    title: {
        type: {
            en: {
                type: String,
                default: '',
            },
            es: {
                type: String,
                default: '',
            },
            ru: {
                type: String,
                default: '',
            }
        },
    },
    description: {
        type: {
            en: {
                type: String,
                default: '',
            },
            es: {
                type: String,
                default: '',
            },
            ru: {
                type: String,
                default: '',
            }
        }
    },
    status: {
        type: Boolean,
        default: true,
    },
    createdAt: {
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


module.exports = model("Post", PostSchema);
// module.exports = { Gallery, galleryValidation };



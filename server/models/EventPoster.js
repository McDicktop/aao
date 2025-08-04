const { Schema, model } = require("mongoose");
const Joi = require("joi");

const EventPosterSchema = new Schema({
    image: {
        type: String,
        default: '',
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


module.exports = model("EventPoster", EventPosterSchema);
// module.exports = { Gallery, galleryValidation };



const { Schema, model } = require("mongoose");

const { minWidth, maxWidth, minHeight, maxHeight } = require("../config");

const ImageSchema = new Schema({
    filename: {
        type: String,
        required: [true, "filename is required"],
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
    description: {
        type: {
            en: {
                type: String,
                required: [true, "EN Description is required"],
            },
            es: {
                type: String,
                required: [true, "ES Description is required"],
            },
            ru: {
                type: String,
                required: [true, "RU Description is required"],
            }
        }
    },
    size: {
        type: {
            width: {
                type: Number,
                min: [minWidth, "Width must be at least 1cm"],
                max: [maxWidth, "Width must not exeed 10000cm"],
                required: [true, "Width is required"],
            },
            height: {
                type: Number,
                min: [minHeight, "Height must be at least 1cm"],
                max: [maxHeight, "Height must not exeed 10000cm"],
                required: [true, "Height is required"],
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
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = model("Image", ImageSchema);

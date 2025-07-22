const { minWidth, maxWidth, minHeight, maxHeight } = require("../config.js")

const validateSize = (arg, side) => {

    if (typeof arg !== "number" || typeof side !== "string") {
        return false;
    }

    switch (side) {
        case "width": {
            return arg >= minWidth && arg <= maxWidth
        }
        case "height": {
            return arg >= minHeight && arg <= maxHeight
        }
        default:
            return false;
    }
}

module.exports = validateSize;
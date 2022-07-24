const mongoose = require("mongoose");
const { Schema } = mongoose;

const characterSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    vision: {
        type: String,
        enum: ["cryo", "pyro"],
        required: [true, "Vision is required"],
    }
});

const Character = mongoose.model("Character", characterSchema);
module.exports = Character;
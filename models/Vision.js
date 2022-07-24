import mongoose from "mongoose";
import { Schema } from "mongoose";

const VisionSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    character: {
        type: Schema.Types.ObjectId,
        ref: "Character",
    },
});

const Vision = mongoose.model("Vision", VisionSchema);

module.exports = Vision;
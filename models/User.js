const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"],
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: [true, "Role is required"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    favoriteCharacter: {
        type: Schema.Types.ObjectId,
        ref: "Character",
        default: null,
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
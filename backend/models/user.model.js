const { Schema, model } = require("mongoose");

const userSchema = Schema({
    name: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"], required: true },
    passwordSalt: { type: String }
});

const User = model("user", userSchema);

module.exports = User;
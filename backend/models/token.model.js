const { Schema, model, SchemaTypes } = require("mongoose");

const userSchema = Schema({
    token: {type: String, required: true},
    user: {type: SchemaTypes.ObjectId, ref: 'user'}
});

const Token = model("token", userSchema);

module.exports = Token;
const { Schema, model, SchemaTypes } = require("mongoose");

const tweetSchema = Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    category: { type: String, required: true, enum: ["education", "development", "fun", "sports"] },
    user: { type: SchemaTypes.ObjectId, ref: "user" }
});

const Tweet = model("tweet", tweetSchema);

module.exports = Tweet;
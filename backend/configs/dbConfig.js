const mongoose = require('mongoose');
const { MONGOOSE_URL } = require("../constants");

const url = MONGOOSE_URL;

const databaseConnection = mongoose.connect(url);

module.exports = databaseConnection
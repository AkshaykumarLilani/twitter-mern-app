require('dotenv').config();

const MONGOOSE_URL = process.env.MONGOOSE_URL;
const PORT = process.env.PORT || 3000;
const JSON_TOKEN_SECRET = process.env.JSON_TOKEN_SECRET;

module.exports = {
    MONGOOSE_URL,
    PORT,
    JSON_TOKEN_SECRET
}
const path = require("path");
require("dotenv").config({ path: path.join(process.cwd(), 'environments', `${process.env.MODE}.env`)});

module.exports = {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT || 8080,
    TOKEN_SECRET: process.env.TOKEN_SECRET
}
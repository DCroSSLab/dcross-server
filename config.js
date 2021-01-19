const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    mongo_uri: process.env.MONGO_URI,
}
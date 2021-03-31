/**
*
* Project Name: 	DCroSS
* Author List: 		Faraaz Biyabani
* Filename: 		config.js
* Description:      Uses dotenv to set environment variables from .env file
*
*/


const dotenv = require('dotenv');
dotenv.config();
//Make .env in dcross-server directory and add a variable called MONGO_URI
//MONGO_URI="mongodb://localhost:27017/"
module.exports = {
    mongo_uri: process.env.MONGO_URI,
}
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = mongoose.connect(process.env.mongoUrl);

module.exports = {connectDB};
const mongoose = require('mongoose');

const localDb = process.env.NODE_ENV === "test" ? 'mongodb://127.0.0.1:27017/masonic-lodges-test' : 'mongodb://127.0.0.1:27017/masonic-lodges'; 

mongoose.connect(process.env.MONGODB_URI || localDb);

module.exports = mongoose.connection;

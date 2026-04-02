const mongoose = require('mongoose');
const Record = require('../models/EachRecord.js');
require('dotenv').config();

const connectDB = async () => {
    try {
        
        await mongoose.connect(`${process.env.MONGODBURL}`);
        console.log("DataBase connected:", mongoose.connection.name); 
        await Record.init();
        console.log(mongoose.connection.collections);
    } catch (err) {
        console.error("DB connection error:", err);
    }
}

module.exports = connectDB;


const sensorDataSchema = require("../models/EachRecord.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require('dotenv').config();

const fetchAllRecords = async (req, res) => {
    try {
        const records = await sensorDataSchema.find({});  
        console.log("the all records are -> " + records);
        res.json({success: true, data: records});
    } catch (error) {
        console.error("Error fetching records:", error);
        res.json({success: false, message: "Server Error"});
    }
};

const fetchSpecificRecords = async (req,res) => {
      try {
            const { id } = req.body;
            const record = await sensorDataSchema.findOne({_id: id});
            const mlResponse = await axios.post('http://localhost:5001/predict', {
                  soilMoisture: record.soilMoisture,
                  soilTemp: record.soilTemp,
                  humidity: record.humidity,
                  airTemp: record.airTemp
});
            console.log("the specific record is -> " + record);
            console.log("ML Service Response: ", mlResponse.data);
            res.json({success: true, data: record,result: mlResponse.data});

      } catch (error) {
            console.error("Error fetching specific record:", error);
            res.json({success: false, message: "Server Error"});
      }
}
module.exports = {fetchAllRecords, fetchSpecificRecords};
const {fetchAllRecords, fetchSpecificRecords} = require("../controllers/recordController.js");

const express = require("express");

const RecordRouter = express.Router();

RecordRouter.get("/fetchAll",fetchAllRecords);
RecordRouter.post("/fetchSpecific",fetchSpecificRecords);

module.exports = RecordRouter;  
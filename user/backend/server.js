const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb.js');
require('dotenv').config();
const recordRouter = require('./routes/record.js');
const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
connectDB();

app.use("/records", recordRouter);

app.listen(PORT,'0.0.0.0',() => {
    console.log(`Server is running on http://localhost:${PORT}`);
})




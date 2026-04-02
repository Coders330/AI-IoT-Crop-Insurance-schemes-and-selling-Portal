const mongoose = require('mongoose');



const sensorDataSchema = new mongoose.Schema(
  {
    soilMoisture: {
      type: Number,
      required: true
    },
    airTemp: {
      type: Number,
      required: true
    },
    humidity: {
      type: Number,
      required: true
    },
    soilTemp: {
      type: Number,
      required: true
    },
    heartRate: {
      type: Number,
      required: true
    },
    spo2: {
      type: Number,
      required: true
    },
    time: {
      type: Date,
      required: true
    }
  },
  {
    collection: "sensordatas",
    timestamps: false,   // you already store `time`
    minimize: false
  }
);

module.exports = mongoose.model("SensorData", sensorDataSchema);



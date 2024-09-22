const mongoose = require('mongoose');

// Define the Appointment Schema
const appointmentSchema = new mongoose.Schema({
  childName: { type: String, required: true },
  age: { type: Number, required: true },
  hospital: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  userId: { type: String }, // User's unique ID
});

// Create the Appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

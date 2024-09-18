const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString() // Unique ID generation
  },
  parentName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  houseNumber: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  children: [{
    childName: String,
    dateOfBirth: Date,
    gender: String,
    medicalHistory: String,
    age: Number,
  }],
});

module.exports = mongoose.model('FormData', formDataSchema);
